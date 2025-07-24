export interface VapiChatRequest {
  assistantId: string;
  input: string;
  previousChatId?: string;
}

import { MessageRole } from "./enums";

export interface VapiMessage {
  role: MessageRole;
  content: string;
}

export interface VapiCostItem {
  type: string;
  amount: number;
  currency: string;
  details?: string;
}

export interface VapiChatResponse {
  id: string;
  orgId: string;
  assistantId: string;
  cost: number;
  costs: VapiCostItem[];
  createdAt: string;
  updatedAt: string;
  input: VapiMessage[];
  output: VapiMessage[];
  messages: VapiMessage[];
}

export interface VapiError {
  message: string;
  status?: number;
  code?: string;
}

// New conversation API types
export interface ConversationCreateRequest {
  enterpriseId: string;
  teamAgentMappingId: string;
}

export interface ConversationCreateResponse {
  conversationId: string;
}

// Email API types
export interface DealerEmailResponse {
  dealerEmail: string;
}

export interface SendEmailRequest {
  conversationId: string;
  senderEmail: string;
  receiverEmail: string;
  subject: string;
  body: string;
  role: string;
}

export interface SendEmailResponse {
  success: boolean;
  message?: string;
}
