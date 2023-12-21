type Field = "username" | "email" | "message";

interface FormInfor {
  [index: Field]: { value: string; isError: boolean };
  username: { value: string; isError: boolean };
  message: { value: string; isError: boolean };
  email: { value: string; isError: boolean };
}

interface InputBoxInfor {
  id: string;
  name: Field;
}
