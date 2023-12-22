import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, message, email } = await req.json();

  if (!name || !message || !email) {
    return NextResponse.json(
      { message: "Missing required data" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API}/userData`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ name, message, email }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Fail posting user data" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "New user data is created" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Posting user data error" + error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(_req: Request) {
  try {
    const response = await fetch(`${process.env.BACKEND_API}/userData`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Fail getting user data" },
        { status: 500 }
      );
    }

    const userData: User[] = await response.json();

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.log("Getting user data error" + error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
