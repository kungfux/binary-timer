import styles from "./Button.module.css";

const Button = ({
  type,
  text,
  disabled = false,
  className,
  onClick,
}: {
  type: ButtonType;
  text?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      key={crypto.randomUUID()}
      className={[
        styles.button,
        type === ButtonType.Primary ? styles.primary : styles.secondary,
        className,
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
