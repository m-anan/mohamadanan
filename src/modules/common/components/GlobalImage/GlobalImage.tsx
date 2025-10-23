import { ComponentProps, Ref, forwardRef } from "react";
import Image from "next/image";
import staticBlur from "@/utils";

type ImageProps = ComponentProps<"img"> & {
  src: string;
  height?: number;
  width?: number;
  fill?: boolean;
  alt: string;
};

const GlobalImage = forwardRef<HTMLImageElement, ImageProps>(
  function GlobalImage(
    { alt, src, height, width, fill, placeholder = "blur", ...props },
    ref
  ) {
    return (
      <Image
        {...props}
        style={{ userSelect: "none" }}
        ref={ref}
        blurDataURL={staticBlur()}
        unoptimized={true}
        alt={alt}
        src={src}
        height={height}
        width={width}
        fill={fill}
      />
    );
  }
);

export default GlobalImage;
