import React from "react";
import CallIcon from "../../assets/call.svg";
import type { CallButtonProps } from "../../types/Button";

const CallButton: React.FC<CallButtonProps> = ({
  onClick,
  className,
  style,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        background: "linear-gradient(180deg, #2268E2 0%, #13397C 100%)",
        border: "none",
        borderRadius: "12px",
        padding: "9px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        ...style,
      }}
    >
      <img src={CallIcon} alt="Call" width="16" height="16" />
    </button>
  );
};

export default CallButton;
