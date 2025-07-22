import CallComponent from "../components/Call/Call";
import ChatbotComponent from "../components/chatbot";
import EmailComponent from "../components/email";

// Export types
export type { CallProps } from "../types/Call";

// Export hooks
export { useCallVapi } from "../hooks/useCallVapi";

// Named exports
export { CallComponent as Call };
export { ChatbotComponent as Chatbot };
export { EmailComponent as Email };

// Default export (Call component as primary)
export default CallComponent;
