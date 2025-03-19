import GitHub from "@auth/core/providers/github";
import  { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    signIn({ profile }) {
      return profile.email === import.meta.env.ADMIN_EMAIL;
    }
  },
  pages: {
    error: "/error"
  }
});
