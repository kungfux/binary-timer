import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BitButton from "../components/BitButton";
import React from "react";

function TimerSetup() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(Array(10).fill(0) as number[]);
  const refs = Array.from({ length: 10 }, () =>
    React.createRef<{ isSelected: () => boolean }>()
  );

  const handleStartClick = () => {
    navigate(`/timer?time=${selected.reverse().join("")}`);
  };

  const handleBitClick = (refIndex: number) => {
    setSelected(
      selected.map((x, index) =>
        index === refIndex ? (selected[index] === 1 ? 0 : 1) : x
      )
    );
  };

  const binaryToDecimal = (number: number[]) => {
    return number.reduce((acc, bit, index) => {
      return acc + bit * Math.pow(2, index);
    }, 0);
  };

  const secondsToMinutes = (seconds: number) => {
    return `${Math.floor(seconds / 60)} minute(s) ${seconds % 60} second(s)`;
  };

  // TODO: https://stackoverflow.com/questions/54719260/curved-header-with-pure-css
  // TODO: https://mui.com/toolpad/studio/reference/components/date-picker/

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1>{"Binary countdown".toUpperCase()}</h1>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((value) => (
          <BitButton
            key={value}
            ref={refs[value - 1]}
            isClickable={true}
            onClick={() => handleBitClick(value - 1)}
          />
        ))}
      </div>
      <p>
        {selected.some((x) => x === 1)
          ? `${secondsToMinutes(binaryToDecimal(selected))}`
          : "Select a square to start the timer"}
      </p>
      <button onClick={handleStartClick}>Start</button>
    </div>
  );
}

export default TimerSetup;
