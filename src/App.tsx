
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { PrivyProvider } from '@privy-io/react-auth';
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Dashboard from "./pages/Dashboard";
// import Documentation from "./pages/Documentation";

// // Update the query client with better defaults
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     },
//   },
// });

// const App = () => {
//   // Handle successful login with redirection
//   const handleLogin = (user: any) => {
//     // Redirect to dashboard after successful login
//     window.location.href = '/dashboard';
//   };

//   return (
//     <PrivyProvider
//       appId="cm7zzyclp00nc5x4sd4it9wcf"
//       config={{
//         appearance: {
//           theme: 'light',
//           accentColor: '#000000',
//           logo: 'https://your-logo-url.com/logo.png', // Replace with your logo URL
//         },
//         loginMethods: ['wallet'],
//         embeddedWallets: {
//           createOnLogin: 'all-users',
//         },
//       }}
//       onSuccess={handleLogin}
//     >
//       <QueryClientProvider client={queryClient}>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <Routes>
//               <Route path="/" element={<Index />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/documentation" element={<Documentation />} />
//               {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </BrowserRouter>
//         </TooltipProvider>
//       </QueryClientProvider>
//     </PrivyProvider>
//   );
// };

// export default App;

// frontend/src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivyProvider } from "@privy-io/react-auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Documentation from "./pages/Documentation";

// Update the query client with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  // Handle successful login with redirection
  const handleLogin = (user: any) => {
    console.log("User logged in:", user); // Debug login
    window.location.href = "/dashboard";
  };

  // Debug environment variable
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID || "cm7zzyclp00nc5x4sd4it9wcf";
  console.log("Privy App ID:", privyAppId); // Check if env variable is loaded

  return (
    <PrivyProvider
      appId={privyAppId} // Use env variable with fallback
      config={{
        appearance: {
          theme: "light",
          accentColor: "#000000",
          logo: "https://your-logo-url.com/logo.png", // Replace with your logo URL
        },
        loginMethods: ["wallet"],
        embeddedWallets: {
          createOnLogin: "all-users",
        },
      }}
      onSuccess={handleLogin}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

export default App;