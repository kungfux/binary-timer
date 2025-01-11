import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BitButton from "../components/BitButton";
import React from "react";
import { Button, ButtonType } from "../components/Button";

function TimerSetup() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(Array(12).fill(0) as number[]);
  const refs = Array.from({ length: 12 }, () =>
    React.createRef<{
      isSelected: () => boolean;
      setAsSelected: (setAsSelected: boolean) => void;
    }>()
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
    return `${Math.floor(seconds / 60)} minute(s) and ${
      seconds % 60
    } second(s)`;
  };

  const secondsToArray = (seconds: number) => {
    return seconds
      .toString(2)
      .padStart(12, "0")
      .split("")
      .map(Number)
      .reverse();
  };

  useEffect(() => {
    refs.map((ref, index) => {
      if (ref.current?.isSelected() !== (selected[index] === 1)) {
        ref.current?.setAsSelected(selected[index] === 1);
      }
    });
  }, [refs, selected]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl uppercase mb-8">12-bit Binary timer</h1>
      <div className="flex flex-row justify-center align-center flex-wrap mt-8">
        {selected.map((_value, index) => (
          <BitButton
            key={selected.length - index - 1}
            ref={refs[selected.length - index - 1]}
            isClickable={true}
            onClick={() => handleBitClick(selected.length - index - 1)}
          />
        ))}
      </div>
      <p className="my-4">
        {selected.some((x) => x === 1)
          ? `${secondsToMinutes(binaryToDecimal(selected))}`
          : "Select bits and click Start"}
      </p>
      <Button
        type={ButtonType.Primary}
        text="🚀 Start"
        onClick={handleStartClick}
        disabled={!selected.some((x) => x === 1)}
      />
      <div className="mt-8">
        <p className="mb-4">Presets:</p>
        <div className="flex flex-row justify-center align-center flex-wrap">
          {[1, 2, 3, 5, 10, 15, 30, 60].map((value) => (
            <Button
              key={value}
              type={ButtonType.Secondary}
              text={`${value}m`}
              onClick={() => setSelected(secondsToArray(value * 60))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimerSetup;