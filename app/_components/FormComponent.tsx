"use client";
import React from "react";
import { useState, useEffect } from "react";
import InputComponent from "./InputComponent";

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
    username: "",
    email: "",
    message: "",
  });

  const handleUpdateFormInfor = function (
    e: React.ChangeEvent<HTMLInputElement>,
    updatedField: InputBoxName
  ) {
    setFormInfor((prevState: FormInfor) => {
      const newForm = { ...prevState };
      newForm[updatedField] = e.target.value;
      return newForm;
    });
  };

  const isFormValid = function () {
    if (!formInfor.username) {
      return false;
    }

    return true;
  };

  return (
    <div>
      {inputBoxeInforArr.map((box: InputBoxInfor) => {
        return (
          <InputComponent
            key={box.id}
            inputName={box.name}
            inputOnchangeHandler={handleUpdateFormInfor}
          />
        );
      })}
    </div>
  );
}
