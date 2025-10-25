"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";

export const CartContext = createContext<any>({
  data: [],
  setData: () => {},
  totalPrice: 0,
});

export const CartProvider = ({ children }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotal = data.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotal);
  }, [data]);

  return (
    <CartContext.Provider value={{ data, setData, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
