"use client";
import { HTMLAttributes, ReactNode, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { BiSort } from "react-icons/bi";
import { BsArrowDown } from "react-icons/bs";
import { CgArrowDown } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";
import Select, { SingleValue } from "react-select";
interface GlobalSelectProps {
  label?: string;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  data: {
    label: string;
    value: string | number;
    isDisabled?: boolean;
    values?: string[];
  }[];
  name: string;
  onchange?: (
    newValue: SingleValue<{
      label: string;
      value: string | number;
      values?: string[];
    }>
  ) => void;
  defaultValue?: any;
  value?: any;
  isDisabled?: boolean;
  placeholder?: string;
  sortIcon?: boolean;
  required?: boolean;
}
const GlobalSelect: React.FC<GlobalSelectProps> = ({
  label,
  containerProps,
  data,
  onchange,
  name,
  defaultValue,
  required,
  isDisabled,
  value,
  placeholder,
  sortIcon,
}) => {
  const formContext = useFormContext();

  return (
    <div
      {...containerProps}
      className={`flex items-center gap-10 ${containerProps?.className}`}
    >
      {label && (
        <div className="w-16">
          <label className="flex gap-1">
            <span className="text-xs  min-w-fit">{label}</span>
            {required && "*"}
          </label>
        </div>
      )}
      {!!formContext ? (
        <Controller
          control={formContext.control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              {...field}
              required={required}
              options={data}
              placeholder={placeholder}
              isDisabled={isDisabled}
              classNames={{
                container: () => "w-full",
                control: (state) =>
                  `${
                    formContext.formState.errors[name] ? "border-error" : " "
                  } input !border-0  !rounded-none focus-wihtin:shadow-none w-full !border-black !border-b !bg-background-textfield  transition`,
                menu: () => "!z-10",
              }}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () =>
                  sortIcon ? (
                    <span className="px-1 ">
                      <BiSort size="22" color="#592AB2" />
                    </span>
                  ) : (
                    <span className="px-1">
                      <BsArrowDown size="16" color="gray" />
                    </span>
                  ),
              }}
            />
          )}
        />
      ) : (
        <Select
          name={name}
          options={data}
          onChange={onchange}
          defaultValue={defaultValue}
          classNames={{
            container: () => "w-48 xs:w-32 text-sm",
            control: (state) =>
              "px-2  !text-md uppercase font-medium border-gray-300 focus-wihtin:shadow-none w-full !border-b transition",
            menu: () => "!z-10 text-xs",
          }}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () =>
              sortIcon ? (
                <span className="px-1">
                  <BiSort size="22" color="#592AB2" />
                </span>
              ) : (
                <span className="px-1  ">
                  <MdKeyboardArrowDown size="16" color="gray" />
                </span>
              ),
          }}
          value={value}
        />
      )}
      {formContext && formContext.formState.errors[name] && (
        <label className=" label-text-alt text-error">
          {formContext.formState.errors[name]?.message?.toString()}
        </label>
      )}
    </div>
  );
};
export default GlobalSelect;
