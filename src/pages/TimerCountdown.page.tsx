import { createRef, useCallback, useMemo } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import routes from "../routes";
import BitButton from "../components/BitButton.component";
import BitCounter from "../BitCounter";
import { Button, ButtonType } from "../components/Button.component";
import { useMuteContext } from "../hooks/useMuteContext.hook";

function TimerCountdown() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMuted } = useMuteContext();
  const queryParams = new URLSearchParams(location.search);
  const timeParam = queryParams.get("time");
  const isMinimalistMode = queryParams.get("mode") === "minimalist";

  const bitCounter = useMemo(() => new BitCounter(), []);

  const [timeLeft, setTimeLeft] = useState(() => {
    bitCounter.setTime(parseInt(timeParam || "0"));
    return bitCounter.getTime();
  });

  const refs = useMemo(
    () =>
      Array.from({ length: bitCounter.getMaximumBits() }, () =>
        createRef<{
          isSelected: () => boolean;
          setAsSelected: (setAsSelected: boolean) => void;
        }>()
      ),
    [bitCounter]
  );

  const playCountdownSound = useCallback(() => {
    const audio = document.getElementById("bee") as HTMLAudioElement;
    audio.play();
  }, []);

  const playEndSound = useCallback(() => {
    const audio = document.getElementById("doo") as HTMLAudioElement;
    audio
      .play()
      .then(() => {
        audio.onended = () => {
          navigate(routes.root.path);
        };
      })
      .catch(() => {
        navigate(routes.root.path);
      });
  }, [navigate]);

  useEffect(() => {
    switch (timeLeft) {
      case 0:
        playEndSound();
        break;
      case 1:
      case 2:
        playCountdownSound();
        break;
      default:
        break;
    }

    const timer = setTimeout(() => {
      const bits = bitCounter.reduceTime(1);

      refs.forEach((ref, index) => {
        if (ref.current?.isSelected() !== (bits[index] === 1)) {
          ref.current?.setAsSelected(bits[index] === 1);
        }
      });

      setTimeLeft(bitCounter.getTime());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, navigate, refs, bitCounter, playCountdownSound, playEndSound]);

  const stopButton = useMemo(
    () => (
      <Button
        type={ButtonType.Primary}
        text="🛑 Stop"
        onClick={() => navigate(routes.root.path)}
      />
    ),
    [navigate]
  );

  const addTimeButtons = useMemo(() => {
    return [1, 2, 3, 5, 10, 15, 30, 60].map((value) => (
      <Button
        key={value}
        type={ButtonType.Secondary}
        text={`${value}m`}
        onClick={() => {
          bitCounter.addTime(value * 60);
          setTimeLeft(bitCounter.getTime());
        }}
      />
    ));
  }, [bitCounter]);

  return (
    <>
      <audio
        id="bee"
        src={`${routes.base}/bee.mp3`}
        preload="auto"
        muted={isMuted}
      />
      <audio
        id="doo"
        src={`${routes.base}/doo.mp3`}
        preload="auto"
        muted={isMuted}
      />
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl uppercase mb-8">Please stand by</h1>
          <div className="flex flex-row justify-center align-center flex-wrap mt-8">
            {refs.map((_, index) => (
              <BitButton
                key={refs.length - index - 1}
                ref={refs[refs.length - index - 1]}
                isClickable={false}
                isSelectedInitially={(() => {
                  return bitCounter.getBits()[refs.length - index - 1] === 1;
                })()}
              />
            ))}
          </div>
          <p className="my-4">{bitCounter.toString()}</p>
          {!isMinimalistMode && stopButton}
        </div>
        {!isMinimalistMode && (
          <div
            className={`mt-8 rounded-2xl ${
              timeLeft <= 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <p className="mb-4">Add time:</p>
            <div className="flex flex-row justify-center align-center flex-wrap">
              {addTimeButtons}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TimerCountdown;
