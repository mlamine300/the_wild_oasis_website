"use client";
import { createContext, useContext, useState } from "react";

const reservationContext = createContext();

export const ResevationProvider = function ({ children }) {
  const initials = { rang: null };
  const [range, setRange] = useState(initials);
  const resetRange = () => {
    setRange(initials);
  };

  return (
    <reservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </reservationContext.Provider>
  );
};
export const useReservation = () => {
  const context = useContext(reservationContext);
  if (context === undefined) throw new Error("context use outside of provider");
  return context;
};
