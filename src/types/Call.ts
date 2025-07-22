export interface CallProps {
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
  personName?: string;
  personRole?: string;
  personImage?: string;
  className?: string;
}

export interface StartCallProps {
  personName: string;
  personRole: string;
  personImage: string;
  onStartCall: () => void;
  className?: string;
  muteIcon?: React.ReactNode;
  speakerIcon?: React.ReactNode;
}
