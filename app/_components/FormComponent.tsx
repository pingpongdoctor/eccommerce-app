"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import { postUserData } from "../_lib/postUserData";
import { notify } from "./ReactToastifyProvider";

const inputBoxInforArr: InputBoxInfor[] = [
  {
    id: "1",
    name: "username",
  },
  { id: "2", name: "email" },
  { id: "3", name: "message" },
];

const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function FormComponent() {
  const [formInfor, setFormInfor] = useState<FormInfor>({
    username: { value: "", isError: false },

    email: { value: "", isError: false },

    message: { value: "", isError: false },
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const updateFormInforState = function (
    value: string,
    updatedField: Field,
    isError: boolean
  ): void {
    try {
      setFormInfor((prevState) => ({
        ...prevState,
        [updatedField]: { value, isError },
      }));
    } catch (e) {
      console.log("Update form state" + e);
    }
  };

  const handleUpdateFormInforState = function (
    e: ChangeEvent<HTMLInputElement>,
    updatedField: Field,
    isError: boolean
  ): void {
    updateFormInforState(e.target.value, updatedField, isError);
  };

  const isFormValid = function (): boolean {
    try {
      const fieldArr: Field[] = ["username", "email", "message"];

      for (let i = 0; i < fieldArr.length; i++) {
        if (!formInfor[fieldArr[i]].value) {
          notify("error", `Please provide your ${fieldArr[i]}`);
          updateFormInforState(formInfor[fieldArr[i]].value, fieldArr[i], true);
          return false;
        }
      }

      if (!formInfor.email.value.match(validEmailRegex)) {
        notify("error", "Email is invalid");
        return false;
      }
      return true;
    } catch (e) {
      console.log("Validate form error" + e);
      notify("error", "Validate form error");
      return false;
    }
  };

  const submitFormHanlder = async function (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setIsDisabled(true);
    if (isFormValid()) {
      try {
        const { username, message, email } = formInfor;
        await postUserData(username.value, message.value, email.value);
        notify("success", "User data has been submitted");
      } catch (e) {
        console.log("Submit form error" + e);
        notify("error", "Validate form error");
      }
    }
    setIsDisabled(false);
  };

  return (
    <form
      onSubmit={submitFormHanlder}
      className="flex flex-col justify-center items-center w-full sm:max-w-[500px] m-auto"
    >
      <h1 className="font-bold font-dancingScript">Fill the form please</h1>
      <ul className="flex flex-col gap-4 mb-6 sm:mb-8 sm:gap-6 list-none w-full pl-0">
        {inputBoxInforArr.map((box: InputBoxInfor) => {
          return (
            <li className="w-full" key={box.id}>
              <InputComponent
                inputName={box.name}
                inputOnchangeHandler={handleUpdateFormInforState}
                isError={formInfor[box.name].isError}
              />
            </li>
          );
        })}
      </ul>
      <ButtonComponent
        buttonName="Submit"
        buttonType="submit"
        isDisabled={isDisabled}
      />
    </form>
  );
}
