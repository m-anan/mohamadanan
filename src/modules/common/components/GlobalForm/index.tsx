"use client";
import React, { HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Schema } from "zod";
import useThrottle from "../../hooks/useThrottle";
import { zodResolver } from "@hookform/resolvers/zod";
interface MsFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: React.ReactNode;
  onSubmit?: (data: any, reset: () => void) => void;
  schema?: Schema;
  defaultValues?: any;
}
const GlobalForm: React.FC<MsFormProps> = ({
  children,
  onSubmit,
  schema,
  defaultValues,
  ...props
}) => {
  const form = useForm(
    schema
      ? { resolver: zodResolver(schema), defaultValues: defaultValues }
      : { defaultValues: defaultValues }
  );

  // useEffect(() => {
  //   if (errors) {
  //     for (const field of errors) {
  //       form.setError(field.id, { message: field.value.join(" - ") });
  //     }
  //   }
  // }, [errors]);
  const internalOnSubmit = (data: any) => {
    onSubmit?.(data, form.reset);
  };
  const throttledSubmit = useThrottle(internalOnSubmit, 6000);
  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit ? form.handleSubmit(throttledSubmit) : undefined}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};
export default GlobalForm;
