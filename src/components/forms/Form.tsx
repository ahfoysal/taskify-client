"use client";
import React, { ReactElement, ReactNode } from "react";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

export default function Form({
  children,
  submitHandler,
  resolver,
  defaultValues,
}: FormProps) {
  const formConfig: FormConfig = {};
  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm<FormProps>(formConfig);
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
    // reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        style={{
          minWidth: "100%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
