import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import * as dotenv from "dotenv";
import * as express from "express";
import * as schedule from "node-schedule";
import axios from "axios";

// Load environment variables
dotenv.config();

interface Command {
    name: string;
    description: string;
    execute: (args: string[], aptos: Aptos, account: Account | null) => Promise<string>;
}

class AptosChatbot {
    private account: Account | null = null;
    private network: Network;
    private commands: Command[];
    private app: express.Express;
    private aptos: Aptos;

    constructor(network: Network = Network.MAINNET) {
        this.network = network;
        const aptosConfig = new AptosConfig({ network: this.network });
        this.aptos = new Aptos(aptosConfig);
        this.app = express();
        this.app.use(express.json());

        this.commands = [
            { name: "set-wallet", description: "Set wallet using private key", execute: async (args) => this.setWallet(args[0]) },
            { name: "balance", description: "Check account balance", execute: async (args) => this.getBalance(args[0] || "") },
            { name: "transfer", description: "Transfer tokens: transfer <to_address> <amount>", execute: async (args) => this.transferTokens(args[0], args[1]) },
            { name: "schedule-tx", description: "Schedule a transfer: schedule-tx <to_address> <amount> <timestamp>", execute: async (args) => this.scheduleTransaction(args[0], args[1], args[2]) },
            { name: "price-feed", description: "Get token price from external chain: price-feed <token>", execute: async (args) => this.getExternalPrice(args[0]) },
            { name: "monitor-account", description: "Monitor account balance: monitor-account <address> <threshold>", execute: async (args) => this.monitorAccount(args[0], args[1]) },
            { name: "batch-transfer", description: "Batch transfer: batch-transfer <address1,amount1;address2,amount2>", execute: async (args) => this.batchTransfer(args[0]) },
            { name: "network-stats", description: "Get network stats", execute: async () => this.getNetworkStats() },
            { name: "help", description: "Show all commands", execute: async () => this.showHelp() }
        ];

        this.setupServer();
    }

    private setupServer() {
        this.app.post('/command', async (req, res) => {
            const { command, args } = req.body;
            const cmd = this.commands.find(c => c.name === command.toLowerCase());
            if (cmd) {
                const result = await cmd.execute(args || [], this.aptos, this.account);
                res.json({ result });
            } else {
                res.status(400).json({ error: "Command not found" });
            }
        });

        this.app.listen(3000, () => {
            console.log(`Aptos Chatbot running on ${this.network} at http://localhost:3000`);
        });
    }

    private async setWallet(privateKey: string): Promise<string> {
        try {
            let cleanedKey = privateKey.trim();
            if (cleanedKey.startsWith("0x")) cleanedKey = cleanedKey.slice(2);
            this.account = Account.fromPrivateKey({ privateKey: new Ed25519PrivateKey(cleanedKey) });
            return `Wallet set successfully. Address: ${this.account.accountAddress}`;
        } catch (error) {
            return `Error setting wallet: ${(error as Error).message}`;
        }
    }

    private checkAccount(): string {
        if (!this.account) return "Please set wallet first using: set-wallet <private_key>";
        return "";
    }

    private getExplorerUrl(txnHash: string): string {
        return `https://explorer.aptoslabs.com/txn/${txnHash}?network=${this.network.toLowerCase()}`;
    }

    private async getBalance(address: string): Promise<string> {
        const check = this.checkAccount();
        if (check) return check;
        try {
            const resources = await this.aptos.getAccountResources({
                accountAddress: address || this.account!.accountAddress.toString()
            });
            const coinResource = resources.find(r => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
            const balance = coinResource ? (coinResource.data as any).coin.value : "0";
            return `Balance: ${Number(balance) / 10**8} APT`;
        } catch (error) {
            return `Error getting balance: ${(error as Error).message}`;
        }
    }

    private async transferTokens(toAddress: string, amount: string): Promise<string> {
        const check = this.checkAccount();
        if (check) return check;
        try {
            const transaction = await this.aptos.transaction.build.simple({
                sender: this.account!.accountAddress.toString(),
                data: {
                    function: "0x1::aptos_account::transfer",
                    functionArguments: [toAddress, BigInt(parseFloat(amount) * 10**8)]
                },
            });
            const senderAuthenticator = this.aptos.transaction.sign({ signer: this.account!, transaction });
            const pendingTxn = await this.aptos.transaction.submit.simple({ transaction, senderAuthenticator });
            await this.aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
            return `Transfer successful: <a href="${this.getExplorerUrl(pendingTxn.hash)}">${pendingTxn.hash}</a>`;
        } catch (error) {
            return `Transfer failed: ${(error as Error).message}`;
        }
    }

    private async scheduleTransaction(toAddress: string, amount: string, timestamp: string): Promise<string> {
        const check = this.checkAccount();
        if (check) return check;
        try {
            const date = new Date(timestamp);
            if (isNaN(date.getTime())) throw new Error("Invalid timestamp format. Use e.g., '2025-03-25T10:00:00Z'");
            schedule.scheduleJob(date, async () => {
                const result = await this.transferTokens(toAddress, amount);
                console.log(`Scheduled transfer executed at ${new Date().toISOString()}: ${result}`);
            });
            return `Transaction scheduled for ${timestamp}`;
        } catch (error) {
            return `Error scheduling transaction: ${(error as Error).message}`;
        }
    }

    private async getExternalPrice(token: string): Promise<string> {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`, {
                headers: { "x-cg-api-key": process.env.COINGECKO_API_KEY }
            });
            const price = response.data[token]?.usd || "N/A";
            return `Current ${token} price: ${price} USD`;
        } catch (error) {
            return `Error fetching price: ${(error as Error).message}`;
        }
    }

    private async monitorAccount(address: string, threshold: string): Promise<string> {
        try {
            const thresholdApt = parseFloat(threshold);
            if (isNaN(thresholdApt)) throw new Error("Threshold must be a number");
            schedule.scheduleJob("*/30 * * * * *", async () => {
                const resources = await this.aptos.getAccountResources({ accountAddress: address });
                const coinResource = resources.find(r => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
                const balance = coinResource ? Number((coinResource.data as any).coin.value) / 10**8 : 0;
                if (balance < thresholdApt) {
                    console.log(`Alert: Balance of ${address} dropped below ${thresholdApt} APT. Current: ${balance} APT`);
                }
            });
            return `Monitoring ${address} for balance below ${thresholdApt} APT`;
        } catch (error) {
            return `Error monitoring account: ${(error as Error).message}`;
        }
    }

    private async batchTransfer(transferList: string): Promise<string> {
        const check = this.checkAccount();
        if (check) return check;
        try {
            const transfers = transferList.split(";").map(pair => {
                const [toAddress, amount] = pair.split(",");
                return { toAddress: toAddress.trim(), amount: amount.trim() };
            });
            const results: string[] = [];
            for (const t of transfers) {
                const result = await this.transferTokens(t.toAddress, t.amount);
                results.push(`${t.toAddress}: ${result}`);
            }
            return `Batch transfer completed:\n${results.join("\n")}`;
        } catch (error) {
            return `Batch transfer failed: ${(error as Error).message}`;
        }
    }

    private async getNetworkStats(): Promise<string> {
        try {
            const ledgerInfo = await this.aptos.getLedgerInfo();
            return `Network Stats:\nBlock Height: ${ledgerInfo.block_height}\nChain ID: ${ledgerInfo.chain_id}\nEpoch: ${ledgerInfo.epoch}`;
        } catch (error) {
            return `Error fetching network stats: ${(error as Error).message}`;
        }
    }

    private showHelp(): string {
        return this.commands.map(cmd => `${cmd.name}: ${cmd.description}`).join("\n");
    }
}

const networkArg = process.argv[2]?.toLowerCase();
let network: Network;
switch (networkArg) {
    case "testnet": network = Network.TESTNET; break;
    case "devnet": network = Network.DEVNET; break;
    case "mainnet":
    default: network = Network.MAINNET;
}

const chatbot = new AptosChatbot(network);