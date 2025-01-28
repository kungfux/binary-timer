import { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton } from "./IconButton.component";

import styles from "./EditableTitle.component.module.css";
import { faPenToSquare, faSquareCheck, faSquareXmark } from "@fortawesome/free-solid-svg-icons";

const EditableTitle = () => {
  const countdownTitleSettingKey = "title";
  const [displayText, setDisplayText] = useState("Please stand by");
  const [newText, setNewText] = useState("Please stand by");
  const [isEditVisible, setEditVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const accept = useCallback(() => {
    setDisplayText(newText);
    setEditMode(false);
    setEditVisible(false);
  }, [newText]);

  const discard = useCallback(() => {
    setEditMode(false);
    setEditVisible(false);
  }, []);

  const confirmDiscardButtons = useMemo(
    () => (
      <div>
        <IconButton tooltip="Accept" icon={faSquareCheck} color="#05df72" onClick={accept} />
        <IconButton tooltip="Discard" icon={faSquareXmark} color="#ff6467" onClick={discard} />
      </div>
    ),
    [accept, discard]
  );

  useEffect(() => {
    const titleSettingValue = localStorage.getItem(countdownTitleSettingKey);
    if (titleSettingValue) {
      setDisplayText(titleSettingValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(countdownTitleSettingKey, displayText);
  }, [displayText]);

  const editButton = useMemo(
    () => (
      <IconButton
        icon={faPenToSquare}
        color="#ffd43b"
        tooltip="Edit title"
        onClick={() => setEditMode(true)}
      />
    ),
    []
  );

  return (
    <div
      className="flex flex-row flex-wrap items-center justify-center mb-8 w-full min-h-12"
      onMouseOver={() => setEditVisible(true)}
      onMouseOut={() => setEditVisible(false)}
    >
      {!isEditMode && (
        <>
          <h1 className="text-5xl uppercase">{displayText}</h1>
          {isEditVisible && editButton}
        </>
      )}
      {isEditMode && (
        <>
          <input
            type="text"
            className={styles.input}
            defaultValue={newText}
            autoFocus
            onChange={(e) => {
              setNewText(e.target.value);
            }}
            onKeyDown={(e) => {
              switch (e.key) {
                case "Escape":
                  discard();
                  break;
                case "Enter":
                  accept();
                  break;
                default:
                  break;
              }
            }}
          />
          {confirmDiscardButtons}
        </>
      )}
    </div>
  );
};

export default EditableTitle;
