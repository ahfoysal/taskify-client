"use client";

import { Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { getErrorMessageByPropertyName } from "@/utils/SchemaValidator";
import { PickerProps } from "antd/es/date-picker/generatePicker";

const { RangePicker } = DatePicker;
interface IDatePicker {
  name: string;
  label?: string;
  size?: "large" | "small";
  value?: string | number | string[] | undefined;
  placeholder?: string;
  validation?: object;
  id?: string;
  disabledDate?: any;
  defaultValue?: Dayjs;

  onChange?: (valueOne: any, valueTwo: any) => void;
}

const FormDatePicker = ({
  name,
  disabledDate,
  defaultValue,
  size,
  value,
  label,
  placeholder,
  validation,

  id,
  onChange,
}: IDatePicker) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const handleOnChange: DatePickerProps["onChange"] = (dates, dateString) => {
    setValue(name, dateString);
    if (onChange) {
      onChange(dates, dateString);
    }
  };
  const errorMessage = getErrorMessageByPropertyName(errors, name);
  // console.log(defaultValue)
  return (
    <>
      {label && <Typography.Title level={5}>{label}</Typography.Title>}
      <Controller
        control={control}
        defaultValue={dayjs(new Date())}
        name={name}
        render={({ field }) => (
          <DatePicker
            style={{
              width: "100%",
            }}
            size={size}
            status={errorMessage ? "error" : ""}
            defaultValue={dayjs(defaultValue)}
            value={dayjs(field.value)}
            // disabledDate={disabledDate}
            placeholder={placeholder}
            onChange={handleOnChange}
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

export default FormDatePicker;
