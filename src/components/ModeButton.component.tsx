import { useEffect } from "react";
import { useOptionsContext } from "../hooks/useOptionsContext.hook";
import { IconButton } from "./IconButton.component";
import { faStopwatch, faStopwatch20 } from "@fortawesome/free-solid-svg-icons";

const ModeButton = () => {
    const IsStopwatchSettingKey = "stopwatch";
    const { isStopwatchMode, toggleStopwatchMode } = useOptionsContext();
  
    useEffect(() => {
      const isStopwatchSettingValue = localStorage.getItem(IsStopwatchSettingKey);
      if (isStopwatchSettingValue && isStopwatchSettingValue !== isStopwatchMode.toString()) {
        toggleStopwatchMode();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useEffect(() => {
      localStorage.setItem(IsStopwatchSettingKey, isStopwatchMode.toString());
    }, [isStopwatchMode]);
  
    return (
      <IconButton
        icon={isStopwatchMode ? faStopwatch : faStopwatch20}
        tooltip={isStopwatchMode ? "Switch to countdown mode" : "Switch to stopwatch mode"}
        onClick={() => toggleStopwatchMode()}
      />
    );
  };
  
  export { ModeButton };