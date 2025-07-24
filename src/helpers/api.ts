import type {
  ConversationCreateRequest,
  SendEmailRequest,
  SendEmailResponse,
} from "../types/api";
import type { EmailFormData } from "../types/Email";

const fetchAgents = async ({
  enterpriseId = "0d0f8887e",
  teamId = "51f00374d9",
  baseUrl,
}: {
  enterpriseId: string;
  teamId: string;
  baseUrl: string;
}) => {
  try {
    const agentListResponse = await fetch(
      `${baseUrl}/conversation/agents/fetch-agent-list?enterpriseId=${enterpriseId}&teamId=${teamId}`
    );

    return await agentListResponse.json();
  } catch (error) {
    throw error;
  }
};

const fetchAgentData = async ({
  enterpriseId,
  teamId,
  agentId,
  baseUrl,
}: {
  enterpriseId: string;
  teamId: string;
  agentId: string;
  baseUrl: string;
}) => {
  try {
    const agentDataResponse = await fetch(
      `${baseUrl}/conversation/agents/runtime-agent?enterpriseId=${enterpriseId}&teamId=${teamId}&agentId=${agentId}`
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

export {
  fetchAgents,
  fetchAgentData,
  sendEmail,
  createConversation,
  getDealerEmail,
};
