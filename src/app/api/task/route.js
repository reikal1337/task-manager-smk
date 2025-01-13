import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Ne prisijunges!" }, { status: 401 });

  const user = req.auth.user;

  const usersTasks = await prisma.task.find({
    where: {
      userId: user.id,
    },
  });
  return NextResponse.json({ tasks: usersTasks }, { status: 200 });
});

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Ne prisijunges!" }, { status: 401 });

  const user = req.auth.user;
  const taskData = req.data;

  const usersTasks = await prisma.task.create({
    where: {
      userId: user.id,
      ...taskData,
    },
  });
  return NextResponse.json({ tasks: usersTasks }, { status: 200 });
});

export const UPDATE = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Ne prisijunges!" }, { status: 401 });

  const user = req.auth.user;
});

export const DELETE = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Ne prisijunges!" }, { status: 401 });

  const user = req.auth.user;
  const taskData = req.data;

  const taskToDelete = await prisma.task.delete({
    where: {
      userId: user.id,
      id: data.id,
    },
  });

  return NextResponse.json({ message: "Ne prisijunges!" }, { status: 200 });
});
