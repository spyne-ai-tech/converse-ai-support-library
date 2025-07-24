import CallComponent from "../components/Call/Call";
import ChatbotComponent from "../components/Chat/chatbot";
import EmailComponent from "../components/Email/email";
import CallButtonComponent from "../components/Buttons/CallButton";
import ChatButtonComponent from "../components/Buttons/ChatButton";
import EmailButtonComponent from "../components/Buttons/EmailButton";

// Export types
export type { CallProps } from "../types/Call";
export type {
  ButtonProps,
  CallButtonProps,
  ChatButtonProps,
  EmailButtonProps,
  ContactButtonsProps,
} from "../types";

// Named exports
export { CallComponent as Call };
export { ChatbotComponent as Chatbot };
export { EmailComponent as Email };

// Button exports
export { CallButtonComponent as CallButton };
export { ChatButtonComponent as ChatButton };
export { EmailButtonComponent as EmailButton };
