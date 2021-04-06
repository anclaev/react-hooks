import { createContext } from "react";

export const AlertContext = createContext();

export const AlertState = ({ children }) => {
  return <AlertContext.Provider>{children}</AlertContext.Provider>;
};
