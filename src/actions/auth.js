import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../../auth";
import { prisma } from "@/db/prisma";

const getuserByEmail = async (email) => {
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

export const login = async (provider) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCredentials = async (formData) => {
  const rawFromData = {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/",
  };

  const userExists = await getuserByEmail(rawFromData.email);
  console.log(userExists);

  try {
    await signIn("Credentials", rawFromData);
  } catch (error) {
    return { errorMessage: "Nepavyko prisijungti!" };
  }

  revalidatePath("/");
};
