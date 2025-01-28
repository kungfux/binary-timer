import { useEffect } from "react";
import { useMuteContext } from "../hooks/useMuteContext.hook";
import { IconButton } from "./IconButton.component";

const MuteButton = () => {
  const IsMutedSettingKey = "mute";
  const { isMuted, toggleMute } = useMuteContext();

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
      text={isMuted ? "🔇" : "🔊"}
      tooltip={isMuted ? "Unmute" : "Mute"}
      onClick={() => toggleMute()}
    />
  );
};

export { MuteButton };
