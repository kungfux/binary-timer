import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BitButton from "../components/BitButton";
import React from "react";
import { Button, ButtonType } from "../components/Button";

const getInitialTime = (queryParamTime: string | null): number => {
  const time = queryParamTime;
  if (!time) {
    return 0;
  }

  return parseInt(time, 2);
};

function TimerCountdown() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [timeLeft, setTimeLeft] = useState(
    getInitialTime(searchParams.get("time"))
  );
  const refs = Array.from({ length: 12 }, () =>
    React.createRef<{
      isSelected: () => boolean;
      setAsSelected: (setAsSelected: boolean) => void;
    }>()
  );

  const maxTime = Math.pow(2, refs.length) - 1;

  const addTime = (seconds: number) => {
    setTimeLeft((prev) => {
      const next = prev + seconds;
      if (next > maxTime) {
        return maxTime;
      }
      return next;
    });
  };

  useEffect(() =>{
    if (timeLeft <= 0) {
      const addTimeBlock = document.getElementById(
        "add-time"
      ) as HTMLDivElement;
      addTimeBlock.classList.add("disabled");
      const audio = document.getElementById("doo") as HTMLAudioElement;
      audio.onended = () => {
        navigate("/");
      };
      audio.play();
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ textTransform: "uppercase" }}>Please stand by</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((value) => (
              <BitButton
                key={value}
                ref={refs[value - 1]}
                isClickable={false}
              />
            ))}
          </div>
          <Button
            style={{ marginTop: "2rem" }}
            type={ButtonType.Primary}
            text="🛑 Stop"
            onClick={() => navigate("/")}
          />
        </div>
        <div
          id="add-time"
          style={{
            marginTop: "2rem",
            borderRadius: "1rem",
          }}
        >
          <p style={{ marginBottom: "1rem" }}>Add time:</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[1, 2, 3, 5, 10, 15, 30, 60].map((value) => (
              <Button
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
