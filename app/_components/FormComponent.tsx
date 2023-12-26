"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import { postUserData } from "../_lib/postUserData";
import { notify } from "./ReactToastifyProvider";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [formInfor, setFormInfor] = useState<FormInfor>({
    username: { value: "", isError: false },

    email: { value: "", isError: false },

    message: { value: "", isError: false },
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const updateFormInforState = function (
    value: string,
    updatedField: Field,
    isError: boolean,
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
    isError: boolean,
  ): void {
    updateFormInforState(e.target.value, updatedField, isError);
  };

  const isFormValid = function (): boolean {
    try {
      const fieldArr: Field[] = ["username", "email", "message"];

      let isValid = true;

      for (let i = 0; i < fieldArr.length; i++) {
        if (!formInfor[fieldArr[i]].value) {
          notify(
            "error",
            `Please provide your ${fieldArr[i]}`,
            `error-missing-${fieldArr[i]}`,
          );
          updateFormInforState(formInfor[fieldArr[i]].value, fieldArr[i], true);
          isValid = false;
        }

        if (
          fieldArr[i] == "email" &&
          formInfor[fieldArr[i]].value &&
          !formInfor[fieldArr[i]].value.match(validEmailRegex)
        ) {
          notify("error", "Email is invalid", `error-invalid-${fieldArr[i]}`);
          updateFormInforState(formInfor[fieldArr[i]].value, fieldArr[i], true);
          isValid = false;
        }
      }

      return isValid;
    } catch (e) {
      console.log("Validate form error" + e);
      notify("error", "Validate form error", `error-validate-form`);
      return false;
    }
  };

  const submitFormHanlder = async function (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    setIsDisabled(true);

    if (isFormValid()) {
      try {
        const { username, message, email } = formInfor;
        await postUserData(username.value, message.value, email.value);

        try {
          //Revalidate user data by triggering the "revalidate" endpoint
          await fetch(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/revalidate?tag=getuserdata`,
            {
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error) {
          console.log("Revalidating user data error" + error);
        }
        notify(
          "success",
          "User data has been submitted",
          "success-submit-data",
        );

        const formEle = e.target as HTMLFormElement;
        formEle.reset();
        router.refresh();
      } catch (e) {
        console.log("Submit form error" + e);
        notify("error", "Submit form error", "error-submit-form");
      }
    }
    setIsDisabled(false);
  };

  useEffect(() => {
    setFormInfor((prevState: FormInfor) => {
      const newState: FormInfor = { ...prevState };
      for (const field in newState) {
        newState[field as Field].isError = false;
      }
      return newState;
    });
  }, [
    formInfor.email.value,
    formInfor.message.value,
    formInfor.username.value,
  ]);

  return (
    <form
      onSubmit={submitFormHanlder}
      className="m-auto mb-[5rem] flex w-full flex-col items-center justify-center sm:max-w-[500px]"
    >
      <h1 className="font-dancingScript font-bold">Fill the form please</h1>
      <ul className="mb-6 flex w-full list-none flex-col gap-4 pl-0 sm:mb-8 sm:gap-6">
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
        animate={true}
      />
    </form>
  );
}
