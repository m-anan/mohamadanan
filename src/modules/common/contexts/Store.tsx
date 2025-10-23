"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";
import ProductModel from "../../products/models/ProductModel";

export interface CartItem extends ProductModel {
  quantity: number;
}

interface CartContextProps<T extends any = any> {
  data: CartItem[];
  setData: Dispatch<SetStateAction<T>>;
  totalPrice: number;
}

export const CartContext = createContext<CartContextProps>({
  data: [],
  setData: () => {},
  totalPrice: 0,
});

export const CartProvider = ({ children }: any) => {
  const [data, setData] = useState<CartItem[]>([]);
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
