"use client";

import { AuthProvider } from "react-oidc-context";
import type { UserManagerSettings } from "oidc-client-ts";

export const oidcConfig: UserManagerSettings = {
  authority:
    "https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_MmVclnRmP",
  client_id: "a3kaacto97fom3ved1bjivbiu",
  redirect_uri:
    (process.env.NODE_ENV === "production"
      ? "https://www.achiva.kr"
      : "http://localhost:3000") + "/callback",
  response_type: "code",
  scope: "phone openid email",
  extraQueryParams: {
    lang: "ko",
  },
};

export default function AuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
