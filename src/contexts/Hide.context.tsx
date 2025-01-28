import { createContext, useState } from "react";

const HideContext = createContext({
  isHidden: false,
  toggleHide: () => {},
});

const HideProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleHide = () => {
    setIsHidden(!isHidden);
  };

  return (
    <HideContext.Provider value={{ isHidden, toggleHide }}>
      {children}
    </HideContext.Provider>
  );
};

export { HideContext, HideProvider };
