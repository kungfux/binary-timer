import { createContext, useState } from "react";

const MuteContext = createContext({
  isMuted: false,
  toggleMute: () => {},
});

const MuteProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <MuteContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </MuteContext.Provider>
  );
};

export { MuteContext, MuteProvider };
