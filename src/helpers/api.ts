import type { ConversationCreateRequest, SendEmailRequest } from "../types/api";
import type { EmailFormData } from "../types/Email";

const fetchAgents = async ({
  enterpriseId = "0d0f8887e",
  baseUrl,
}: {
  enterpriseId: string;
  baseUrl: string;
}) => {
  try {
    const agentListResponse = await fetch(
      `${baseUrl}/conversation/agents/fetch-agent-list?enterpriseId=${enterpriseId}`
    );

    return await agentListResponse.json();
  } catch (error) {
    throw error;
  }
};

const fetchAgentData = async ({
  enterpriseId,
  agentId,
  baseUrl,
}: {
  enterpriseId: string;
  agentId: string;
  baseUrl: string;
}) => {
  try {
    const agentDataResponse = await fetch(
      `${baseUrl}/conversation/agents/runtime-agent?enterpriseId=${enterpriseId}&agentId=${agentId}`
    );

    return await agentDataResponse.json();
  } catch (error) {
    throw error;
  }
};

async function sendEmail({
  formData,
  conversationId,
  baseUrl,
}: {
  formData: EmailFormData;
  conversationId: string;
  baseUrl: string;
}): Promise<void> {
  try {
    const requestBody: SendEmailRequest = {
      conversationId: conversationId,
      senderEmail: formData.user_email,
      receiverEmail: formData.dealerEmail,
      subject: `Contact from ${formData.user_email}`,
      body: formData.message,
      role: "dealer",
    };

    const response = await fetch(
      `${baseUrl}/conversation/dealer-conversation/add-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // const data: SendEmailResponse = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to send email. Please try again.");
  }
}

async function createConversation({
  baseUrl,
  enterpriseId,
  teamAgentMappingId,
}: {
  baseUrl: string;
  enterpriseId: string;
  teamAgentMappingId: string;
}): Promise<string> {
  try {
    const requestBody: ConversationCreateRequest = {
      enterpriseId: enterpriseId,
      teamAgentMappingId: teamAgentMappingId,
    };

    const response = await fetch(
      `${baseUrl}/conversation/dealer-conversation/create-from-mapping`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.conversationId;
  } catch (error) {
    throw new Error("Failed to create conversation");
  }
}

async function getDealerEmail({
  enterpriseId,
  baseUrl,
}: {
  enterpriseId: string;
  baseUrl: string;
}): Promise<string> {
  try {
    const url = `${baseUrl}/conversation/dealer-conversation/get-dealer-email?enterpriseId=${enterpriseId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data?.email || "";
  } catch (error) {
    throw new Error("Failed to retrieve dealer email");
  }
}

async function sendCallReport({
  baseUrl,
  callId,
}: {
  baseUrl: string;
  callId: string;
}): Promise<any> {
  try {
    const requestBody: any = {
      callId,
    };

    const response = await fetch(
      `${baseUrl}/conversation/vapi/detailed-end-call-report`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to send call report");
  }
}

class ChatService {
  static async createChat({
    baseUrl,
    input,
    conversationId,
  }: {
    baseUrl: string;
    input: string;
    conversationId: string;
  }): Promise<{ reply: string }> {
    try {
      const response = await fetch(`${baseUrl}/conversation/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input, conversationId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Prefer 'output' property, fallback to 'reply' or 'response'
      return { reply: data.output ?? data.reply ?? data.response ?? "" };
    } catch (error) {
      throw new Error("Failed to send chat message");
    }
  }

  static async endChat({
    baseUrl,
    conversationId,
  }: {
    baseUrl: string;
    conversationId: string;
  }): Promise<void> {
    try {
      const response = await fetch(`${baseUrl}/conversation/chat/end`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversationId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // No response body expected
      return;
    } catch (error) {
      throw new Error("Failed to end chat");
    }
  }
}

export {
  fetchAgents,
  fetchAgentData,
  sendEmail,
  createConversation,
  getDealerEmail,
  sendCallReport,
  ChatService,
};
