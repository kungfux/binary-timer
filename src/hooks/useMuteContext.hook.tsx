import { useContext } from "react";
import { MuteContext } from "../contexts/Mute.context";

const useMuteContext = () => {
  const context = useContext(MuteContext);
  if (!context) {
    throw new Error("useMuteContext must be used within a MuteProvider");
  }
  return context;
};

export { useMuteContext };
