import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return <h1>Protected page...</h1>;
};

export default page;
