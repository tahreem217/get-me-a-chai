import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"; 
import mongoose from "mongoose";
import User from "@/models/Users";
import dbConnect from "@/lib/dbConnect";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({  
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        try {
          await dbConnect();
          
          
          const userEmail = user.email || `${profile.id}@github.com`;
          const dbUser = await User.findOne({ email: userEmail });

          if (!dbUser) {
            await User.create({
              email: userEmail,
              name: user.name || profile?.login,
              username: userEmail.split("@")[0],
            });
          }
          return true;
        } catch (err) {
          console.error("Error during signIn:", err);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      try {
        await dbConnect();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
        
          session.user.username = dbUser.username;
          session.user.id = dbUser._id.toString();
        }
      } catch (err) {
        console.error("Error in session callback:", err);
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };