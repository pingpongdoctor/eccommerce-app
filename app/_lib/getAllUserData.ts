import { baseUrl } from "../utils/baseUrl";

export const getAllUserData = async function (): Promise<User[] | undefined> {
  try {
    const res = await fetch(`${baseUrl}/api/user`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600, tags: ["getuserdata"] },
    });

    if (!res.ok) {
      const errorData: { message: string } = await res.json();
      console.log("Error when posting user data" + errorData.message);
      return undefined;
    }
    const data: User[] = await res.json();
    return data;
  } catch (e) {
    console.log("Post user data error" + e);
  }
};
