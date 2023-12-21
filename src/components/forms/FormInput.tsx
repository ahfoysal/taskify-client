"use client";

import { getErrorMessageByPropertyName } from "@/utils/SchemaValidator";
import { Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  label?: string;
  size?: "large" | "small";
  value?: string | number | string[] | undefined;
  placeholder?: string;
  validation?: object;
  id?: string;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  label,
  placeholder,
  validation,
  id,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label && <Typography.Title level={5}>{label}</Typography.Title>}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              status={errorMessage ? "error" : ""}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              type={type}
              status={errorMessage ? "error" : ""}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
      {errorMessage && (
        <Typography.Paragraph type="danger">
          {errorMessage}
        </Typography.Paragraph>
      )}
    </>
  );
};

export default FormInput;
