export const postUserData = async function (
  name: string,
  message: string,
  email: string
): Promise<void> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ name, message, email }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    console.log("Post user data error" + e);
  }
};
