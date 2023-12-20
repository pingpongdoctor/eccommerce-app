"use client";
import React from "react";
import { useState } from "react";
import InputComponent from "./InputComponent";

interface FormInfor {
  username: string;
  email: string;
  message: string;
}

type InputBoxName = "username" | "email" | "message";

const inputBoxesInforArr: {
  id: string;
  name: InputBoxName;
}[] = [
  {
    id: "1",
    name: "username",
  },
  { id: "2", name: "email" },
  { id: "3", name: "message" },
];

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

  return (
    <div>
      {inputBoxesInforArr.map((box: { id: string; name: InputBoxName }) => {
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
