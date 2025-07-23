import type { EmailFormData } from '../types/Email';
import type { DealerEmailResponse, SendEmailRequest, SendEmailResponse } from '../types/api';
import { SPYNE_CONFIG } from './config';

export class EmailService {
  private static readonly baseUrl = SPYNE_CONFIG.BASE_URL;

  static async getDealerEmail(enterpriseId?: string): Promise<string> {
    try {
      const url = `${this.baseUrl}/conversation/dealer-conversation/get-dealer-email?enterpriseId=${enterpriseId || SPYNE_CONFIG.ENTERPRISE_ID}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: DealerEmailResponse = await response.json();
      console.log('Dealer email retrieved:', data);
      
      return data.dealerEmail;
    } catch (error) {
      console.error('Failed to get dealer email:', error);
      throw new Error('Failed to retrieve dealer email');
    }
  }

  static async sendEmail(formData: EmailFormData, conversationId: string): Promise<void> {
    try {
      // First get the dealer email
      const dealerEmail = await this.getDealerEmail();
      
      const requestBody: SendEmailRequest = {
        conversationId: conversationId,
        senderEmail: formData.user_email,
        receiverEmail: dealerEmail,
        subject: `Contact from ${formData.user_email}`,
        body: formData.message,
        role: 'dealer'
      };

      console.log('📧 Sending email with params:', requestBody);

      const response = await fetch(`${this.baseUrl}/conversation/dealer-conversation/add-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SendEmailResponse = await response.json();
      console.log('Email sent successfully:', data);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email. Please try again.');
    }
  }
} 