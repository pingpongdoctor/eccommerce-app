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

  useEffect(() => {
    console.log(formInfor);
  }, [formInfor]);

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
