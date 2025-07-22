export interface VapiChatRequest {
  assistantId: string;
  input: string;
  previousChatId?: string;
}

import { MessageRole } from './enums';

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