// frontend/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PRIVY_APP_ID: string;
    readonly VITE_API_ENDPOINT: string;
    // Add other env variables if needed
    readonly VITE_APP_TITLE?: string; // Example optional variable
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }