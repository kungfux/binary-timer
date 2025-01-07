import styles from "./Button.module.css";

const Button = ({
  type,
  text,
  disabled = false,
  style,
  onClick,
}: {
  type: ButtonType;
  text?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  return (
    <button
      style={style}
      className={[
        styles.button,
        type === ButtonType.Primary ? styles.primary : styles.secondary,
      ].join(" ")}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

enum ButtonType {
  Primary,
  Secondary,
}

export { Button, ButtonType };
