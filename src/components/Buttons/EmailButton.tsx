import React from "react";
import MailIcon from "../../assets/mail.svg";
import type { EmailButtonProps } from "../../types/Button";

const EmailButton: React.FC<EmailButtonProps> = ({
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
      <img src={MailIcon} alt="Email" width="18" height="14" />
    </button>
  );
};

export default EmailButton;
