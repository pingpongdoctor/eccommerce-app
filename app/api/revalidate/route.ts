import { type NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const tag = searchParams.get("tag");

  try {
    if (!tag) {
      return NextResponse.json(
        { message: "Missed required query" },
        { status: 400 }
      );
    }

    revalidateTag(tag);
    return NextResponse.json(
      { message: "successful revalidation" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal Server Error" + error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
