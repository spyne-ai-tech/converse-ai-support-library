import React from "react";
import ChatIcon from "../../assets/chat.svg";
import type { ChatButtonProps } from "../../types/Button";

const ChatButton: React.FC<ChatButtonProps> = ({
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
      <img src={ChatIcon} alt="Chat" width="18" height="16" />
    </button>
  );
};

export default ChatButton;
