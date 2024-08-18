import { createRoot } from "react-dom/client";

// Styles
import "./index.css";

// Provider
import { GoogleAuthProvider } from "@/provider/google-provider";
import { AppRouteProvider } from "./provider/app-router.tsx";

createRoot(document.getElementById("root")!).render(
  <GoogleAuthProvider>
    <AppRouteProvider />
  </GoogleAuthProvider>
);
