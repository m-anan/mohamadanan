"use client";
import { useEffect, useRef, useState } from "react";
import GlobalImage from "@/modules/common/components/GlobalImage/GlobalImage";

const MovingCharacter = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [direction, setDirection] = useState<"right" | "left">("right");

  const [frame, setFrame] = useState(1);
  const [isMoving, setIsMoving] = useState(false);

  const pressedKeys = useRef<Set<string>>(new Set());
  const images = ["/me-1.png", "/me-2.png", "/me-3.png", "/me-4.png"];

  useEffect(() => {
    const step = 20;

    const handleKeyDown = (e: KeyboardEvent) => {
      pressedKeys.current.add(e.key.toLowerCase());
      setIsMoving(true);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.current.delete(e.key.toLowerCase());
      if (pressedKeys.current.size === 0) setIsMoving(false);
    };

    const moveInterval = setInterval(() => {
      if (pressedKeys.current.size === 0) return;

      setFrame((prev) => (prev + 1) % images.length || 1);

      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        const keys = pressedKeys.current;

        if (keys.has("arrowup") || keys.has("w")) {
          newY -= step;
        }
        if (keys.has("arrowdown") || keys.has("s")) {
          newY += step;
        }
        if (keys.has("arrowleft") || keys.has("a")) {
          newX -= step;
          setDirection("left");
        }
        if (keys.has("arrowright") || keys.has("d")) {
          newX += step;
          setDirection("right");
        }

        // keep inside window bounds
        newX = Math.max(0, Math.min(window.innerWidth - 60, newX));
        newY = Math.max(0, Math.min(window.innerHeight - 80, newY));

        return { x: newX, y: newY };
      });
    }, 50);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(moveInterval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  // --- Mobile joystick handlers ---
  const handleTouchStart = (directionKey: string) => {
    pressedKeys.current.add(directionKey);
    setIsMoving(true);
  };

  const handleTouchEnd = (directionKey: string) => {
    pressedKeys.current.delete(directionKey);
    if (pressedKeys.current.size === 0) setIsMoving(false);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          transition: "left 0.05s linear, top 0.05s linear z-10",
        }}
        className={``}
      >
        <GlobalImage
          width={80}
          height={80}
          alt="me"
          src={images[frame - 1]}
          className={`trnasition-all duration-300 ${
            direction === "left" ? "-scale-x-100" : "scale-x-100"
          } `}
          style={{
            transition: "transform 0.1s",
          }}
        />
      </div>
      {/* Mobile controls */}
      <div className="fixed bottom-10 left-8 flex flex-col items-center space-y-2  md:hidden select-none">
        {/* Up */}
        <button
          className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl shadow-md active:bg-gray-300"
          onTouchStart={() => handleTouchStart("w")}
          onTouchEnd={() => handleTouchEnd("w")}
        >
          ⬆️
        </button>

        {/* Middle row */}
        <div className="flex space-x-2">
          <button
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl shadow-md active:bg-gray-300"
            onTouchStart={() => handleTouchStart("a")}
            onTouchEnd={() => handleTouchEnd("a")}
          >
            ⬅️
          </button>

          <button
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl shadow-md active:bg-gray-300"
            onTouchStart={() => handleTouchStart("s")}
            onTouchEnd={() => handleTouchEnd("s")}
          >
            ⬇️
          </button>

          <button
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl shadow-md active:bg-gray-300"
            onTouchStart={() => handleTouchStart("d")}
            onTouchEnd={() => handleTouchEnd("d")}
          >
            ➡️
          </button>
        </div>
      </div>
    </>
  );
};

export default MovingCharacter;
