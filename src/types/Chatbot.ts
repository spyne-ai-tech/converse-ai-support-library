import { MessageRole } from "./enums";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

export interface ChatbotProps {
  isOpen?: boolean;
  enterpriseId?: string;
  teamId?: string;
  showClose?: boolean;
  onClose?: () => void;
}

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  placeholder?: string;
}
