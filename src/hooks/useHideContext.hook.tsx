import { useContext } from "react";
import { HideContext } from "../contexts/Hide.context";

const useHideContext = () => {
  const context = useContext(HideContext);
  if (!context) {
    throw new Error("useHideContext must be used within a MuteProvider");
  }
  return context;
};

export { useHideContext };
