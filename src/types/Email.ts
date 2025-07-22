export interface EmailProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  recipientEmail?: string;
}

export interface EmailFormData {
  user_email: string;
  message: string;
}

export interface EmailTemplateParams {
  name: string;
  email: string;
  message: string;
  to_email: string;
  customer_email: string;
  from_email: string;
  subject: string;
  title: string;
} 