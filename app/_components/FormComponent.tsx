"use client";
import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";

const inputBoxeInforArr: InputBoxInfor[] = [
  {
    id: "1",
    name: "username",
  },
  { id: "2", name: "email" },
  { id: "3", name: "message" },
];

const validEmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function FormComponent() {
  const [formInfor, setFormInfor] = useState<FormInfor>({
    username: { value: "", isError: false },

    email: { value: "", isError: false },

    message: { value: "", isError: false },
  });

  const updateFormInforState = function (
    value: string,
    updatedField: InputBoxName,
    isError: boolean
  ) {
    try {
      setFormInfor((prevState: FormInfor) => {
        const newForm: FormInfor = { ...prevState };
        newForm[updatedField] = { value, isError };
        return newForm;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateFormInforState = function (
    e: ChangeEvent<HTMLInputElement>,
    updatedField: InputBoxName,
    isError: boolean
  ) {
    updateFormInforState(e.target.value, updatedField, isError);
  };

  const isFormValid = function () {
    if (
      !formInfor.username.value ||
      !formInfor.message.value ||
      !formInfor.email.value ||
      !formInfor.email.value.match(validEmailRegex)
    ) {
      return false;
    }

    return true;
  };

  return (
    <form className="flex flex-col justify-center items-center w-full sm:max-w-[500px] m-auto">
      <h1 className="font-bold font-dancingScript">Fill the form please</h1>
      <ul className="flex flex-col gap-4 mb-6 sm:mb-8 sm:gap-6 list-none w-full pl-0">
        {inputBoxeInforArr.map((box: InputBoxInfor) => {
          return (
            <li className="w-full" key={box.id}>
              <InputComponent
                inputName={box.name}
                inputOnchangeHandler={handleUpdateFormInforState}
              />
            </li>
          );
        })}
      </ul>
      <ButtonComponent buttonName="Submit" buttonType="submit" />
    </form>
  );
}
