import { ReactNode } from "react";
import React, { ButtonHTMLAttributes } from "react";

export interface MsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  showIcon?: boolean;
}
const GlobalButton: React.FC<MsButtonProps> = ({
  children,
  showIcon,
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={` flex flex-nowrap items-center justify-center gap-3  bg-background-primary text-white btn btn-ghost hover:text-text-primary hover:border-background-primary w-full  ${props.className}`}
    >
      {children}{" "}
      {loading && <span className="loading loading-spinner loading-sm"></span>}
    </button>
  );
};
export default GlobalButton;
