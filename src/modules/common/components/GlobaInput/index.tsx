"use client";
import React, { InputHTMLAttributes, HTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
export interface GlobalInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?:
    | "text"
    | "password"
    | "email"
    | "date"
    | "time"
    | "url"
    | "number"
    | "hidden";
  name: string;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  confirmField?: string;
}
const GlobalInput: React.FC<GlobalInputProps> = ({
  label,
  required,
  containerProps,
  type = "text",
  name,
  onChange,
  confirmField,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const formContext = useFormContext();
  const getProps = (): InputHTMLAttributes<HTMLInputElement> => {
    if (formContext) {
      return {
        ...formContext.register(name, {
          onChange: onChange,
          validate: confirmField
            ? (value) => {
                value == formContext.watch(confirmField) ||
                  "password not match";
                return true;
              }
            : undefined,
          required,
        }),
        ...props,
        type: type == "password" && showPassword ? "text" : type,
        className: `${props.className} ${
          formContext && formContext.formState.errors[name]
            ? "border border-error"
            : ""
        } input input-bordered  w-full  rounded-md border   transition`,
      };
    }
    return {
      ...props,
      onChange: onChange,
      type: type == "password" && showPassword ? "text" : type,
      className: `${props.className}  input h-10 border-gray-300 focus:outline-0 input-bordered  w-full  rounded-md border   transition`,
    };
  };
  return (
    <div
      {...containerProps}
      className={`form-control gap-2 caret-brand ${containerProps?.className} `}
    >
      {label && (
        <label>
          <span className="text-sm  ">
            {label} {required && "*"}
          </span>
        </label>
      )}
      <div className=" relative">
        <input {...getProps()} />

        {type == "password" && (
          <div className=" absolute right-0 top-0  btn btn-square btn-link">
            <label className="swap">
              <input
                type="checkbox"
                onClick={() => setShowPassword((previous) => !previous)}
              />
              <div className="swap-on text-icons-secondary">
                <BsEyeSlash />
              </div>
              <div className="swap-off text-icons-secondary">
                <BsEye />
              </div>
            </label>
          </div>
        )}
      </div>
      {formContext && formContext.formState.errors[name] && (
        <label className=" label-text-alt text-error">
          {formContext.formState.errors[name]?.message?.toString()}
        </label>
      )}
    </div>
  );
};

export default GlobalInput;
