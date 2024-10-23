import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

 const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
      checks: ['none']
    }),
  ],
  callbacks: {
    async redirect({url, baseUrl}){
      if(url.startsWith(baseUrl)){
        return url;
      }
      else if(url.startsWith('/')){
        return new URL(url,baseUrl).toString();
      }
      return baseUrl;
    },
    // async signIn({user, account, profile}){
    //   const {email, name, image} = user;

    //   const res = await axios.post()
    // }

  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };