import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BitButton from "../components/BitButton";
import React from "react";

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
  const refs = Array.from({ length: 10 }, () =>
    React.createRef<{ setAsSelected: (isSelected: boolean) => void }>()
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/");
      return;
    }

    const binaryTime = timeLeft
      .toString(2)
      .padStart(10, "0")
      .split("")
      .reverse();

    refs.map((ref, index) => {
      ref.current?.setAsSelected(binaryTime[index] === "1");
    });

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, navigate, refs]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>We'll be right back!</h1>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((value) => (
          <BitButton key={value} ref={refs[value - 1]} isClickable={false} />
        ))}
      </div>
    </div>
  );
}

export default TimerCountdown;
