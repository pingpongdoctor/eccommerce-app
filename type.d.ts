interface FormInfor {
  username: string;
  email: string;
  message: string;
}

type InputBoxName = "username" | "email" | "message";

type InputBoxInfor = {
  id: string;
  name: InputBoxName;
};
