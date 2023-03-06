import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyPassword } from "../../../lib/password";
import { connectDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },

  secret: process.env.SECRET,

  providers: [
    CredentialsProvider({
      id: "credentials",

      async authorize(credentials) {
        const client = await connectDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("User does not exist");
        }

        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          client.close();
          throw new Error("Password is incorrent");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
