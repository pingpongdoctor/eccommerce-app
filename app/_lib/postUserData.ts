export const postUserData = async function (
  name: string,
  message: string,
  email: string
) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/userdata`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ name, message, email }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
