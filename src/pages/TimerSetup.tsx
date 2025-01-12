import { createRef, useMemo } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, ButtonType } from "../components/Button";
import BitButton from "../components/BitButton";
import BitCounter from "../BitCounter";

function TimerSetup() {
  const navigate = useNavigate();
  const bitCounter = useMemo(() => new BitCounter(), []);
  const [selectedBits, setSelectedBits] = useState(bitCounter.getBits());

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

  const handleStartClick = () => {
    navigate(`?start=${bitCounter.getTime()}`);
  };

  const handleBitClick = (index: number) => {
    setSelectedBits(bitCounter.reverseBit(index));
  };

  const handlePresetClick = (seconds: number) => {
    setSelectedBits(bitCounter.setTime(seconds));
  };

  useEffect(() => {
    refs.map((ref, index) => {
      if (ref.current?.isSelected() !== (selectedBits[index] === 1)) {
        ref.current?.setAsSelected(selectedBits[index] === 1);
      }
    });
  }, [refs, selectedBits]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl uppercase mb-8">12-bit Binary timer</h1>
      <div className="flex flex-row justify-center align-center flex-wrap mt-8">
        {selectedBits.map((_, index) => (
          <BitButton
            key={selectedBits.length - index - 1}
            ref={refs[selectedBits.length - index - 1]}
            isClickable={true}
            isSelectedInitially={(() => {
              return bitCounter.getBits()[selectedBits.length - index - 1] === 1;
            })()}
            onClick={() => handleBitClick(selectedBits.length - index - 1)}
          />
        ))}
      </div>
      <p className="my-4">
        {selectedBits.some((x) => x === 1)
          ? `${bitCounter.toString()}`
          : "Select bits and click Start"}
      </p>
      <Button
        type={ButtonType.Primary}
        text="🚀 Start"
        onClick={handleStartClick}
        disabled={!selectedBits.some((x) => x === 1)}
      />
      <div className="mt-8">
        <p className="mb-4">Presets:</p>
        <div className="flex flex-row justify-center align-center flex-wrap">
          {[1, 2, 3, 5, 10, 15, 30, 60].map((value) => (
            <Button
              key={value}
              type={ButtonType.Secondary}
              text={`${value}m`}
              onClick={() => handlePresetClick(value * 60)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimerSetup;
