import React, { useState, useEffect } from "react";
import type { EmailProps, EmailFormData } from "../../types/Email";
import EmailInterface from "./EmailInterface";
import {
  createConversation,
  fetchAgents,
  getDealerEmail,
  sendEmail,
} from "../../helpers/api";

const validateEmail = (email: string) => {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Email: React.FC<EmailProps> = ({
  isOpen = true,
  showClose = false,
  onClose,
  enterpriseId,
  baseUrl,
}) => {
  const [formData, setFormData] = useState<EmailFormData>({
    user_email: "",
    message: "",
    dealerEmail: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Create conversation when component mounts
  useEffect(() => {
    const initializeConversation = async () => {
      const agentsList = await fetchAgents({
        enterpriseId,
        baseUrl,
      });

      if (agentsList.length > 0) {
        // Select first agent
        const firstAgent = agentsList[0];
        const conversation = await createConversation({
          baseUrl,
          enterpriseId,
          teamAgentMappingId: firstAgent.id,
        });
        setConversationId(conversation);

        const dealerEmail = await getDealerEmail({
          enterpriseId,
          baseUrl,
        });

        setFormData((prev) => ({
          ...prev,
          dealerEmail,
        }));
      }
    };

    initializeConversation();
  }, [enterpriseId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendEmail = async () => {
    if (!formData.user_email.trim() || !conversationId) {
      return;
    }
    if (!validateEmail(formData.user_email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    try {
      await sendEmail({
        formData,
        conversationId,
        baseUrl,
      });
      setEmailSent(true);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAnother = () => {
    setEmailSent(false);
    setFormData({
      user_email: "",
      message: "",
      dealerEmail: formData.dealerEmail,
    });
  };

  return (
    <EmailInterface
      isOpen={isOpen}
      showClose={showClose}
      onClose={onClose}
      formData={formData}
      onInputChange={handleInputChange}
      isLoading={isLoading}
      emailSent={emailSent}
      onSendEmail={handleSendEmail}
      onSendAnother={handleSendAnother}
      conversationId={conversationId}
      dealerEmail={formData.dealerEmail}
    />
  );
};

export default Email;
