import styles from "./IconButton.component.module.css";

const IconButton = ({
  text,
  tooltip,
  disabled = false,
  className,
  onClick,
}: {
  text?: string;
  tooltip?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      key={crypto.randomUUID()}
      type="button"
      aria-label={text}
      title={tooltip}
      className={[styles.button, className].join(" ")}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { IconButton };
