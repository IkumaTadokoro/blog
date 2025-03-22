import GitHub from "@auth/core/providers/github";
import  { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    GitHub({
      clientId: import.meta.env.ADMIN_GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.ADMIN_GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email repo"
        }
      }
    })
  ],
  callbacks: {
    signIn({ profile }) {
      return profile.email === import.meta.env.ADMIN_EMAIL;
    },
    jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = account.providerAccountId
      }
      return token
    },
    session({ session, token }) {
      session.accessToken = token.accessToken
      session.user.id = token.id
      return session
    }
  },
  pages: {
    error: "/error"
  }
});
