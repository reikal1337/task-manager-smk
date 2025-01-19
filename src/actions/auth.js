"use server";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../../auth";
import { prisma } from "@/db/prisma";
import { saltAndhashPassword } from "@/utils/hash";
import { redirect } from "next/navigation";

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const createNewUser = async (email, password) => {
  try {
    const hashedPassword = saltAndhashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const login = async (provider) => {
  await signIn(provider);
  revalidatePath("/");
};

export const logout = async () => {
  await signOut();
  revalidatePath("/");
};

export const loginWithCredentials = async (formData) => {
  try {
    await signIn("credentials", { ...formData, redirect: false });
    return { message: "Prisijungiai!" };
  } catch (error) {
    console.log(error);
    return { message: "Nepavyko prisijungti, netinkami duomenys catch!" };
  }

  revalidatePath("/");
};

export const registerWithCredentials = async (formData) => {
  const userExists = await getUserByEmail(formData.email);
  if (userExists) {
    return { message: "Nepavyko prisiregistruoti, netinkami duomenys!" };
  }

  const newUser = await createNewUser(formData.email, formData.password);

  try {
    if (newUser) {
      const loginData = {
        email: newUser.email,
        password: formData.password,
      };
    }
    return { message: "Prisiregistarvai!" };
  } catch (error) {
    console.log(error);
    return { message: "Nepavyko prisiregistruoti, netinkami duomenys!" };
  }
};
