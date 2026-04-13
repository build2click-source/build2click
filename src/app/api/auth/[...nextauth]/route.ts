import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { careerdnaPrisma } from "@/lib/prisma-careerdna";
import { compare } from "bcryptjs";
import NextAuth from "next-auth/next";

export const careerdnaAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(careerdnaPrisma as any),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await careerdnaPrisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("No account found with this email.");

        const isPasswordValid = await compare(credentials.password, user.password || "");
        if (!isPasswordValid) throw new Error("Invalid password. Please try again.");

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: { signIn: "/careerdna/login" },
  secret: process.env.CAREERDNA_NEXTAUTH_SECRET || "fallback_secret_for_development_only",
};

const handler = NextAuth(careerdnaAuthOptions);
export { handler as GET, handler as POST };
