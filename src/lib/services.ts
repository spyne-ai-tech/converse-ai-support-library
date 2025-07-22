import type { VapiChatRequest, VapiChatResponse, VapiError, VapiMessage } from '../types/api';
import { VapiEndpoints } from '../types/enums';
import { VAPI_CONFIG } from './config';

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