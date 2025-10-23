import { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div
        {...props}
        className={`${props.className} w-full max-w-6xl  p-7 py-2`}
      >
        {children}
      </div>
    </div>
  );
};
export default Container;
