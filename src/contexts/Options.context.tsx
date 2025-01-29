import { createContext, useState } from "react";

const Options = {
  isMuted: false,
  toggleMute: () => {},
  isHidden: false,
  toggleHide: () => {},
  isStopwatchMode: false,
  toggleStopwatchMode: () => {},
};

const OptionsContext = createContext(Options);

const OptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isStopwatchMode, setIsStopwatchMode] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleHide = () => {
    setIsHidden(!isHidden);
  };

  const toggleStopwatchMode = () => {
    setIsStopwatchMode(!isStopwatchMode);
  };

  return (
    <OptionsContext.Provider
      value={{
        isMuted,
        toggleMute,
        isHidden,
        toggleHide,
        isStopwatchMode,
        toggleStopwatchMode,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};

export { OptionsContext, OptionsProvider };
