import { createRoot } from "react-dom/client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styles
import "./index.css";

// Provider
import { GoogleAuthProvider } from "@/provider/google-provider";
import { AppRouteProvider } from "./provider/app-router.tsx";
import { StoreProvider } from "./provider/store-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <GoogleAuthProvider>
    <StoreProvider>
      <AppRouteProvider />
      <ToastContainer position="bottom-right"/>
    </StoreProvider>
  </GoogleAuthProvider>
);
