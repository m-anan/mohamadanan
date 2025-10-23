import React, { ReactNode, useEffect, useState } from "react";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import GlobalImage from "../GlobalImage/GlobalImage";

interface GlobalHorizontalSliderProps {
  list?: any[];
  pictures?: { large: string; width: string; height: string }[];
  options?: EmblaOptionsType;
  hasButtons?: boolean;
  scrollHorizontally?: boolean;
  slides?: "2" | "3" | "4";
  mobileSlides?: "2" | "3" | "4";
  slideGap?: string;
  children?: ReactNode;
}

const GlobalHorizontalSlider = ({
  list,
  pictures,
  hasButtons,
  slides,
  mobileSlides,
  slideGap,
  scrollHorizontally,
  options,
  children,
}: GlobalHorizontalSliderProps) => {
  const defaultOptions: EmblaOptionsType = {
    axis: "x",
    direction: "rtl",
    dragFree: false,
    containScroll: "trimSnaps",
    startIndex: 0,
    inViewThreshold: 0,
    loop: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    options != null ? options : defaultOptions,
    [
      WheelGesturesPlugin({
        forceWheelAxis: `${scrollHorizontally ? "y" : "x"}`,
      }),
    ]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    function handleArrowKeys(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        return emblaApi?.scrollNext();
      }
      if (e.key === "ArrowRight") {
        return emblaApi?.scrollPrev();
      }
    }
    document.addEventListener("keydown", handleArrowKeys);
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", handleSelect);
    handleSelect(); // initial selection
  }, [emblaApi]);
  return (
    <div>
      <div className=" overflow-hidden relative" ref={emblaRef}>
        <div
          style={{ gap: `${slideGap ?? "0"}px` }}
          className={`backface-visible flex touch-pan-y  rounded-lg max-h-[80vh]`}
        >
          {children}
        </div>
        <Dots emblaApi={emblaApi} selectedIndex={selectedIndex} />

        {/* Next / Back buttons section */}
      </div>
      <div
        className={`${hasButtons ? "absolute" : "hidden"}   w-full px-4  z-50 
                top-1/2 left-0 -translate-y-1/2   flex justify-between`}
      >
        <div className="flex  p-1 justify-center items-start">
          <AiOutlineLeft
            onClick={() => emblaApi?.scrollPrev()}
            color="rgba(0,0,0.5)"
            className="cursor-pointer"
            size={"36px"}
          />
        </div>
        <div className="flex p-1 justify-center items-start">
          <AiOutlineRight
            color="rgba(0,0,0.5)"
            className={`cursor-pointer ${
              emblaApi?.canScrollNext() ? " " : "hidden"
            }`}
            onClick={() => emblaApi?.scrollNext()}
            size={"36px"}
          />
        </div>
      </div>
    </div>
  );
};

const Dots = ({
  emblaApi,
  selectedIndex,
}: {
  emblaApi: any;
  selectedIndex: number;
}) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    setDotCount(emblaApi.scrollSnapList().length);
  }, [emblaApi]);

  return (
    <div className="flex justify-center gap-2 mt-4 absolute bottom-5 left-1/2 -translate-x-1/2">
      {Array.from({ length: dotCount }, (_, index) => (
        <button
          key={index}
          onClick={() => emblaApi.scrollTo(index)}
          className={`w-2 h-2 rounded-full ${
            selectedIndex === index ? "bg-gray-500" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};
export default GlobalHorizontalSlider;
