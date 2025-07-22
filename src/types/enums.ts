export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export enum ChatStatus {
  IDLE = 'idle',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  TYPING = 'typing',
  ERROR = 'error',
}

export enum VapiEndpoints {
  CHAT = 'https://api.vapi.ai/chat',
}

export enum ChatActionType {
  SEND_MESSAGE = 'SEND_MESSAGE',
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
  SET_TYPING = 'SET_TYPING',
  SET_STATUS = 'SET_STATUS',
} 