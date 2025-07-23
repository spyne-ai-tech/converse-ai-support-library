export interface EmailProps {
  isOpen?: boolean;
  enterpriseId?: string;
  teamId?: string;
  showClose?: boolean;
  onClose?: () => void;
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