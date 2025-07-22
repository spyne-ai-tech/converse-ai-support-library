export const EMAIL_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id', 
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key',
  DEFAULT_RECIPIENT: 'maxauto@dealership.in',
  DEFAULT_MESSAGE: `Hi Byle!

I hope this email finds you well. I wanted to follow up on the status of the Project Wave discussed in our last meeting.

Best regards,
Carle`,
} as const; 