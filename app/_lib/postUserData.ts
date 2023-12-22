export const postUserData = async function (
  name: string,
  message: string,
  email: string
): Promise<void> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ name, message, email }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.log("Error when posting user data" + errorData.message);
    }
  } catch (e) {
    console.log("Post user data error" + e);
  }
};
