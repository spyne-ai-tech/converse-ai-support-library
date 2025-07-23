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

export { fetchAgents, fetchAgentData };
