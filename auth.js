import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/db/prisma";
import { saltAndhashPassword } from "@/utils/hash";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        console.log("creds: ", credentials);

        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const { email, password } = credentials;

        let user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordIsCorrect = bcrypt.compareSync(password, user.password);
        console.log("1 lol?");

        if (!passwordIsCorrect) {
          throw new Error("Netinkami prisijungimo duomenys!");
        }

        delete user.password;
        console.log("2 lol?");
        return user;
      },
    }),
  ],
});
