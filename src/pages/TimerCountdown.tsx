import { createRef, useCallback, useMemo } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, ButtonType } from "../components/Button";
import BitButton from "../components/BitButton";
import BitCounter from "../BitCounter";

function TimerCountdown() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const startParam = queryParams.get("start");

  const bitCounter = useMemo(() => new BitCounter(), []);

  const [timeLeft, setTimeLeft] = useState(() => {
    bitCounter.setTime(parseInt(startParam || "0"));
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

  const handleAddTimeClick = (seconds: number) => {
    bitCounter.addTime(seconds);
    setTimeLeft(bitCounter.getTime());
  };

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
          navigate("/");
        };
      })
      .catch(() => {
        navigate("/");
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

  return (
    <>
      <audio id="bee" src="bee.mp3" preload="auto" />
      <audio id="doo" src="doo.mp3" preload="auto" />
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
          <Button
            type={ButtonType.Primary}
            text="🛑 Stop"
            onClick={() => navigate("/")}
          />
        </div>
        <div
          className={`mt-8 rounded-2xl ${
            timeLeft <= 0 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <p className="mb-4">Add time:</p>
          <div className="flex flex-row justify-center align-center flex-wrap">
            {[1, 2, 3, 5, 10, 15, 30, 60].map((value) => (
              <Button
                key={value}
                type={ButtonType.Secondary}
                text={`${value}m`}
                onClick={() => handleAddTimeClick(value * 60)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TimerCountdown;
