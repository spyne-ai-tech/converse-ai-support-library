export interface Agent {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  colorTheme: string;
  available: boolean;
  order: number;
  squadId: string;
  faqs: any[];
}

export interface VapiAgentConfig {
  voice: {
    model: string;
    voiceId: string;
    provider: string;
    stability: number;
    similarityBoost: number;
  };
  model: {
    model: string;
    toolIds: string[];
    messages: Array<{
      role: string;
      content: string;
    }>;
    provider: string;
    temperature: number;
  };
  firstMessage: string;
  voicemailMessage: string;
  endCallMessage: string;
  transcriber: {
    model: string;
    provider: string;
    language: string;
  };
  backgroundSound: string;
  analysisPlan: any;
  startSpeakingPlan: any;
  stopSpeakingPlan: any;
  metadata: any;
}

export interface RuntimeAgentResponse {
  agentId: string;
  vapiAgentConfig: VapiAgentConfig;
}
