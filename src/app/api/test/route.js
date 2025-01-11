import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

// Apsaugotas route.
export const GET = auth(function GET(req) {
  if (req.auth) return NextResponse.json(req.auth);

  return NextResponse.json({ message: "Ne prisijunges!" }, { status: 401 });
});

// Paprastas route

// export const GET = () => {
//   return NextResponse.json({ message: "veikia!" }, { status: 200 });
// };
