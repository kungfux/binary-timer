import { forwardRef, useImperativeHandle, useState } from "react";

import "@fontsource/montserrat/400.css";
import styles from "./BitButton.module.css";

const BitButton = forwardRef(
  (
    props: {
      isClickable: boolean;
      onClick?: () => void;
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(false);

    const isSelected = (): boolean => {
      return selected;
    };

    const setAsSelected = (isSelected: boolean) => {
      setSelected(isSelected);
    };

    useImperativeHandle(ref, () => ({
      isSelected,
      setAsSelected,
    }));

    const getClassName = (): string => {
      if (hovered && selected) return `${styles.hovered} ${styles.selected}`;
      if (selected) return props.isClickable ? styles.selected : styles.hovered;
      if (hovered) return styles.hovered;
      return "";
    };

    const handleClick = () => {
      setSelected(!selected);
      if (props.onClick) {
        props.onClick();
      }
    };

    return (
      <button
        className={`${styles.bitbutton} ${getClassName()}`}
        onMouseEnter={() => props.isClickable && setHovered(true)}
        onMouseLeave={() => props.isClickable && setHovered(false)}
        onClick={() => props.isClickable && handleClick()}
      >
        {selected ? "1" : "0"}
      </button>
    );
  }
);

export default BitButton;
