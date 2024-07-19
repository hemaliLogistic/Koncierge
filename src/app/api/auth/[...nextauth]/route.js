// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

if (!process.env.FACEBOOK_ID || !process.env.FACEBOOK_SECRET) {
  throw new Error("Missing Facebook OAuth environment variables");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn callback:", {
        user,
        account,
        profile,
        email,
        credentials,
      });
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect callback:", { url, baseUrl });
      return baseUrl;
    },
    async session({ session, token, user }) {
      console.log("session callback:", { session, token, user });
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt callback:", {
        token,
        user,
        account,
        profile,
        isNewUser,
      });
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },

  events: {
    error: (message) => {
      console.error("Error event:", message);
    },
  },

  debug: true,
});

export { handler as GET, handler as POST };
