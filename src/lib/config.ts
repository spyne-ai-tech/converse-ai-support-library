export const VAPI_CONFIG = {
  API_KEY: 'a358e268-205b-49e3-be75-97d818b69b13', // Should be moved to env var
  ASSISTANT_ID: 'af93082d-f691-408f-add1-c204a4850f3d',
  PUBLIC_KEY: '25b57b4d-1626-4a90-a160-fd033fcc3b83',
  BASE_URL: 'https://api.vapi.ai',
} as const;

export const SPYNE_CONFIG = {
  BASE_URL: 'https://beta-api.spyne.xyz',
  ENTERPRISE_ID: '4a97d4272',
  TEAM_AGENT_MAPPING_ID: '9cea0eba-c65a-4c8a-bd6c-1637385e55d1',
} as const;

export const CHAT_CONFIG = {
  AUTO_SCROLL_BEHAVIOR: "smooth" as ScrollBehavior,
  DEFAULT_PLACEHOLDER: "Type your chat message here!",
  TYPING_INDICATOR_DELAY: 100,
  TIME_FORMAT_OPTIONS: {
    hour12: false,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
  },
  DATE_FORMAT_OPTIONS: {
    weekday: "long" as const,
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  },
} as const;

export const QUICK_ACTIONS = [
  {
    id: "test-drive",
    label: "Book a Test Drive for me asap",
    primary: true,
  },
  {
    id: "book-drive",
    label: "Book Test Drive",
    primary: false,
  },
  {
    id: "usp-features",
    label: "Tell me USP features",
    primary: false,
  },
  {
    id: "finance",
    label: "Finance options",
    primary: false,
  },
] as const;
