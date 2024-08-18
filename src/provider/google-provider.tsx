import { ENV_VAR } from "@/lib/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

export function GoogleAuthProvider(props: React.PropsWithChildren) {
  const { children } = props;
  
  return (
    <GoogleOAuthProvider clientId={ENV_VAR.GOOGLE_AUTH_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}
