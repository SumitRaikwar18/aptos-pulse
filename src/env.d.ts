
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_MONAD_RPC_URL: string;
  readonly VITE_COINGECKO_API_KEY: string;
  readonly VITE_DEXSCREENER_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
