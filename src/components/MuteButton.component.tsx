import { useEffect } from "react";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useOptionsContext } from "../hooks/useOptionsContext.hook";
import { IconButton } from "./IconButton.component";

const MuteButton = () => {
  const IsMutedSettingKey = "mute";
  const { isMuted, toggleMute } = useOptionsContext();

  useEffect(() => {
    const isMutedSettingValue = localStorage.getItem(IsMutedSettingKey);
    if (isMutedSettingValue && isMutedSettingValue !== isMuted.toString()) {
      toggleMute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(IsMutedSettingKey, isMuted.toString());
  }, [isMuted]);

  return (
    <IconButton
      icon={isMuted ? faVolumeXmark : faVolumeHigh}
      tooltip={isMuted ? "Unmute" : "Mute"}
      onClick={() => toggleMute()}
    />
  );
};

export { MuteButton };
