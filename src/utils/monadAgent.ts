// // src/utils/monadAgent.ts
// import axios from "axios";

// export const sendMessageToAgent = async (input: string, privateKey?: string) => {
//   const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000/agent";
//   console.log("Sending request to:", apiEndpoint); // Debug log
//   try {
//     const response = await axios.post(
//       apiEndpoint,
//       { input, privateKey },
//       { headers: { "Content-Type": "application/json" } }
//     );
//     console.log("Response from backend:", response.data); // Debug log
//     return response.data;
//   } catch (error) {
//     console.error("Error sending message to agent:", error); // Detailed error log
//     throw error;
//   }
// };

// src/utils/monadAgent.ts
// src/utils/monadAgent.ts
// src/utils/monadAgent.ts
// src/utils/monadAgent.ts
import axios from "axios";

export const sendMessageToAgent = async (input: string, privateKey?: string) => {
  const apiEndpoint =
    import.meta.env.VITE_API_ENDPOINT ||
    "https://opulent-tribble-vw7qxp454q73xwrq-3000.app.github.dev/agent";
  console.log("Sending POST request to:", apiEndpoint);
  console.log("Request payload:", { input, privateKey });
  try {
    const response = await axios.post(
      apiEndpoint,
      { input, privateKey },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Response from backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};