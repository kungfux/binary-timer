import { useEffect } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useOptionsContext } from "../hooks/useOptionsContext.hook";
import { IconButton } from "./IconButton.component";

const HideButton = () => {
  const IsHiddenSettingKey = "hide";
  const { isHidden, toggleHide } = useOptionsContext();

  useEffect(() => {
    const isHiddenSettingValue = localStorage.getItem(IsHiddenSettingKey);
    if (isHiddenSettingValue && isHiddenSettingValue !== isHidden.toString()) {
      toggleHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(IsHiddenSettingKey, isHidden.toString());
  }, [isHidden]);

  return (
    <IconButton
      icon={isHidden ? faEyeSlash : faEye}
      tooltip={isHidden ? "Show optional controls" : "Hide optional controls"}
      onClick={() => toggleHide()}
    />
  );
};

export { HideButton };
