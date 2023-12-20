"use client";
import React from "react";
import { useState } from "react";
import InputComponent from "./InputComponent";

interface FormInfor {
  username: string;
  email: string;
  message: string;
}

export default function FormComponent() {
  const [formInfor, setFormInfor] = useState<FormInfor>({
    username: "",
    email: "",
    message: "",
  });

  const handleUpdateFormInfor = function (
    field: "username" | "email" | "message",
    val: string
  ) {
    setFormInfor((prevState: FormInfor) => {
      const newForm = { ...prevState };
      newForm[field] = val;
      return newForm;
    });
  };

  const inputBoxesInforArr = [
    {
      name: "username",
    },
    { name: "email" },
    { name: "message" },
  ];
  return (
    <div>
      <InputComponent />
    </div>
  );
}
