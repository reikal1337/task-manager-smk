"use server";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../../auth";
import { prisma } from "@/db/prisma";
import { saltAndhashPassword } from "@/utils/hash";

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
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCredentials = async (formData) => {
  try {
    await signIn("credentials", formData, { redirectTo: "/dashboard" });
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

      await loginWithCredentials(loginData);
    }
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return { message: "Nepavyko prisiregistruoti, netinkami duomenys!" };
  }
};
