import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./IconButton.component.module.css";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

const IconButton = ({
  icon,
  tooltip,
  disabled = false,
  className,
  color,
  onClick,
}: {
  icon: IconDefinition;
  tooltip?: string;
  disabled?: boolean;
  className?: string;
  color?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      key={crypto.randomUUID()}
      type="button"
      aria-label={tooltip}
      title={tooltip}
      className={[styles.icon, className].join(" ")}
      disabled={disabled}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} style={{ color: color }} />
    </button>
  );
};

export { IconButton };
