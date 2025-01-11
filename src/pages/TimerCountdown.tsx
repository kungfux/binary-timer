import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BitButton from "../components/BitButton";
import React from "react";
import { Button, ButtonType } from "../components/Button";

const getInitialTime = (
  queryParamTime: string | null,
  maxTime: number
): number => {
  const queryTime = queryParamTime;
  if (!queryTime) {
    return 0;
  }

  const time = parseInt(queryTime, 2);

  if (time > maxTime) {
    return maxTime;
  }

  return isNaN(time) ? 0 : time;
};

function TimerCountdown() {
  const navigate = useNavigate();

  const refs = Array.from({ length: 12 }, () =>
    React.createRef<{
      isSelected: () => boolean;
      setAsSelected: (setAsSelected: boolean) => void;
    }>()
  );

  const maxTime = Math.pow(2, refs.length) - 1;

  const [searchParams] = useSearchParams();
  const [timeLeft, setTimeLeft] = useState(
    getInitialTime(searchParams.get("time"), maxTime)
  );

  const addTime = (seconds: number) => {
    setTimeLeft((prev) => {
      const next = prev + seconds;
      if (next > maxTime) {
        return maxTime;
      }
      return next;
    });
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      const addTimeBlock = document.getElementById(
        "add-time"
      ) as HTMLDivElement;
      addTimeBlock.classList.add("pointer-events-none", "opacity-50");
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
    }

    if (timeLeft > 0 && timeLeft < 3) {
      const audio = document.getElementById("bee") as HTMLAudioElement;
      audio.play();
    }

    const binaryTime = timeLeft
      .toString(2)
      .padStart(12, "0")
      .split("")
      .reverse();

    refs.map((ref, index) => {
      if (ref.current?.isSelected() !== (binaryTime[index] === "1")) {
        ref.current?.setAsSelected(binaryTime[index] === "1");
      }
    });

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, navigate, refs]);

  return (
    <>
      <audio id="bee" src="bee.mp3" preload="auto" />
      <audio id="doo" src="doo.mp3" preload="auto" />
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl uppercase mb-8">Please stand by</h1>
          <div className="flex flex-row justify-center align-center flex-wrap mt-8 mb-8">
            {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((value) => (
              <BitButton
                key={value}
                ref={refs[value - 1]}
                isClickable={false}
              />
            ))}
          </div>
          <Button
            className="mt-8"
            type={ButtonType.Primary}
            text="🛑 Stop"
            onClick={() => navigate("/")}
          />
        </div>
        <div id="add-time" className="mt-8 rounded-2xl">
          <p className="mb-4">Add time:</p>
          <div className="flex flex-row justify-center align-center flex-wrap">
            {[1, 2, 3, 5, 10, 15, 30, 60].map((value) => (
              <Button
                key={value}
                type={ButtonType.Secondary}
                text={`${value}m`}
                onClick={() => addTime(value * 60)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TimerCountdown;
