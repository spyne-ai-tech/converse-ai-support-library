import type { VapiChatRequest, VapiChatResponse, VapiError, VapiMessage, ConversationCreateRequest, ConversationCreateResponse } from '../types/api';
import { VapiEndpoints } from '../types/enums';
import { VAPI_CONFIG, SPYNE_CONFIG } from './config';

export class VapiChatService {
  private static readonly apiKey = VAPI_CONFIG.API_KEY;

  static async sendMessage(message: string, previousChatId?: string): Promise<VapiChatResponse> {
    const requestBody: VapiChatRequest = {
      assistantId: VAPI_CONFIG.ASSISTANT_ID,
      input: message,
      ...(previousChatId && { previousChatId }),
    };

    try {      
      const response = await fetch(VapiEndpoints.CHAT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: VapiChatResponse = await response.json();
      console.log('VAPI Response:', data);
      
      return data;
    } catch (error) {
      console.error('VAPI Chat API Error:', error);
      throw this.handleError(error);
    }
  }

  static extractMessageContent(response: VapiChatResponse): string {
    // Extract content from VAPI response structure
    const outputMessage: VapiMessage | undefined = response.output?.[0];
    if (outputMessage?.content) {
      return outputMessage.content;
    }
    
    const inputMessage: VapiMessage | undefined = response.input?.[0];
    if (inputMessage?.content) {
      return inputMessage.content;
    }
    
    return 'Sorry, I could not understand that.';
  }

  private static handleError(error: unknown): VapiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        status: 500,
        code: 'VAPI_ERROR',
      };
    }
    
    return {
      message: 'An unknown error occurred',
      status: 500,
      code: 'UNKNOWN_ERROR',
    };
  }
}

export class ConversationService {
  private static readonly baseUrl = SPYNE_CONFIG.BASE_URL;

  static async createConversation(enterpriseId?: string): Promise<string> {
    const requestBody: ConversationCreateRequest = {
      enterpriseId: enterpriseId || SPYNE_CONFIG.ENTERPRISE_ID,
      teamAgentMappingId: SPYNE_CONFIG.TEAM_AGENT_MAPPING_ID, // Always use hardcoded value
    };

    try {
      const response = await fetch(`${this.baseUrl}/conversation/dealer-conversation/create-from-mapping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ConversationCreateResponse = await response.json();
      console.log('Conversation created:', data);
      
      return data.conversationId;
    } catch (error) {
      console.error('Conversation creation error:', error);
      throw new Error('Failed to create conversation');
    }
  }
} 