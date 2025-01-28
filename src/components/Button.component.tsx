import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.css";

const Button = ({
  type,
  text,
  icon,
  iconColor,
  disabled = false,
  className,
  onClick,
}: {
  type: ButtonType;
  text?: string;
  icon?: IconDefinition;
  iconColor?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      key={crypto.randomUUID()}
      type="button"
      aria-label={text}
      title={text}
      className={[
        styles.button,
        type === ButtonType.Primary ? styles.primary : styles.secondary,
        className,
      ].join(" ")}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} style={{ color: iconColor }} className="mr-2" />}
      {text}
    </button>
  );
};

enum ButtonType {
  Primary,
  Secondary,
}

export { Button, ButtonType };
