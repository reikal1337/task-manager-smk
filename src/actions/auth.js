import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../../auth";

export const login = async (provider) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};
