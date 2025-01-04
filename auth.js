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
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const hashedPassword = saltAndhashPassword(credentials.password);

        let user = await prisma.user.findunique({
          where: {
            email,
          },
        });

        if (!user) {
          user = await db.user.create({
            data: {
              email,
              password: hashedPassword,
            },
          });
        } else {
          const passwordIsCorrect = bcrypt.compareSync(
            credentials.password,
            user.password
          );

          if (!passwordIsCorrect) {
            throw new Error("Netinkami prisijungimo duomenys!");
          }

          delete user.password;

          return user;
        }
      },
    }),
  ],
});
