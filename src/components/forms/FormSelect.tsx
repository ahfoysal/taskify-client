"use client";

import { getErrorMessageByPropertyName } from "@/utils/SchemaValidator";
import { Input, Select, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type IOptions = {
  value: string;
  label: string;
};

type ISelect = {
  name: string;

  label?: string;
  size?: "large" | "small";
  value?: string | number | string[] | undefined;
  options?: IOptions[];
  defaultValue?: string;
};

const FormSelect = ({
  name,
  defaultValue,
  size,
  value,
  label,
  options,
}: ISelect) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label && <Typography.Title level={5}>{label}</Typography.Title>}
      <Controller
        control={control}
        defaultValue={defaultValue || ""}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            defaultValue={defaultValue || ""}
            style={{ width: "100%" }}
            value={value}
            status={errorMessage ? "error" : ""}
            onChange={onChange}
            options={options}
            size={size}
          />
        )}
      />
      {errorMessage && (
        <Typography.Paragraph type="danger">
          {errorMessage}
        </Typography.Paragraph>
      )}
    </>
  );
};

export default FormSelect;
