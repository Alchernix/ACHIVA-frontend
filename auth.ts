import NextAuth from "next-auth";
import Cognito from "next-auth/providers/cognito";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Cognito({
      clientId: process.env.AUTH_COGNITO_ID!,
      issuer: process.env.AUTH_COGNITO_ISSUER!,
      checks: ["pkce", "state"],
      client: { token_endpoint_auth_method: "none" },
      authorization: {
        params: {
          scope: "openid email phone",
          lang: "ko",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
