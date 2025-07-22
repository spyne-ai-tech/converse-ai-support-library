import CallComponent from "../components/Call/Call";
import ChatbotComponent from "../components/chatbot";

// Export types
export type { CallProps } from "../types/Call";

// Export hooks
export { useCallVapi } from "../hooks/useCallVapi";

// Named exports
export { CallComponent as Call };
export { ChatbotComponent as Chatbot };

// Default export (Call component as primary)
export default CallComponent;
