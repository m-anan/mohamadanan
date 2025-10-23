"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface CameraPositionProps {
  data?: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

export const CameraPositionContext = createContext<CameraPositionProps>({
  setData: () => {},
});

export const CameraPositionProvider = ({ children }: any) => {
  const [data, setData] = useState();
  return (
    <CameraPositionContext.Provider value={{ data: data, setData: setData }}>
      {children}
    </CameraPositionContext.Provider>
  );
};
