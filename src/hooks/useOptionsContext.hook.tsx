import { useContext } from "react";
import { OptionsContext } from "../contexts/Options.context";

const useOptionsContext = () => {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("useOptionsContext must be used within a OptionsProvider");
  }
  return context;
};

export { useOptionsContext };
