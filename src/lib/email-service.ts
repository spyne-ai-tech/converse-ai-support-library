import emailjs from '@emailjs/browser';
import type { EmailFormData } from '../types/Email';
import { EMAIL_CONFIG } from './email-config';

export class EmailService {
  private static isInitialized = false;

  static initialize(): void {
    if (!this.isInitialized) {
      emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
      this.isInitialized = true;
    }
  }

  static async sendEmail(formData: EmailFormData): Promise<void> {
    this.initialize();

    const templateParams: Record<string, unknown> = {
      name: "Website Visitor",
      email: formData.user_email,
      message: formData.message,
      to_email: EMAIL_CONFIG.DEFAULT_RECIPIENT,
      customer_email: formData.user_email,
      from_email: formData.user_email,
      subject: `Contact from ${formData.user_email}`,
      title: "New Contact Form Submission"
    };

    console.log('📧 Sending email with params:', templateParams);
    console.log('🎯 Recipient should be:', templateParams.to_email);

    try {
      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email. Please try again.');
    }
  }

  static openEmailClient(formData: EmailFormData): void {
    const subject = encodeURIComponent("Contact - Project Wave Follow-up");
    const body = encodeURIComponent(formData.message);
    const mailtoLink = `mailto:${EMAIL_CONFIG.DEFAULT_RECIPIENT}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink);
  }
} 