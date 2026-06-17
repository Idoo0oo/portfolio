import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';

interface EmailFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface UseEmailJSReturn {
  sendEmail: (data: EmailFormData) => Promise<boolean>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  reset: () => void;
}

/**
 * EmailJS integration hook.
 * 
 * Setup steps:
 * 1. Sign up at https://emailjs.com (free tier = 200 emails/month)
 * 2. Create an Email Service (connect your Gmail)
 * 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 * 4. Copy Service ID, Template ID, and Public Key
 * 5. Add to .env:
 *    VITE_EMAILJS_SERVICE_ID=service_xxxxx
 *    VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
 *    VITE_EMAILJS_PUBLIC_KEY=xxxxx
 */
export function useEmailJS(): UseEmailJSReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  const sendEmail = useCallback(async (data: EmailFormData): Promise<boolean> => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Fallback to mailto if EmailJS not configured
    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS: Missing configuration, falling back to mailto');
      const subject = encodeURIComponent(data.subject || 'Portfolio Contact');
      const body = encodeURIComponent(`From: ${data.name} (${data.email})\n\n${data.message}`);
      window.open(`mailto:dittosanzz05@gmail.com?subject=${subject}&body=${body}`, '_blank');
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      return true;
    }

    setIsLoading(true);
    setError(null);

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      }, publicKey);

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send email';
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendEmail, isLoading, isSuccess, error, reset };
}
