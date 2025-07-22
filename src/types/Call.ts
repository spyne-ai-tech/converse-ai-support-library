import React from "react";

export interface CallProps {
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
  personName?: string;
  personRole?: string;
  personImage?: string;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  muteIcon?: React.ReactNode;
  speakerIcon?: React.ReactNode;
}

export interface CallInterfaceProps {
  personName: string;
  personRole: string;
  personImage: string;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  muteIcon?: React.ReactNode;
  speakerIcon?: React.ReactNode;

  // Call state props (optional for start call state)
  isConnected?: boolean;
  isConnecting?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  isSpeakerOn?: boolean;
  callDuration?: number;

  // Event handlers
  onStartCall?: () => void;
  onEndCall?: () => void;
  onToggleMute?: () => void;
  onToggleSpeaker?: () => void;
  formatTime?: (duration: number) => string;
}

export interface StartCallProps {
  personName: string;
  personRole: string;
  personImage: string;
  onStartCall: () => void;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  muteIcon?: React.ReactNode;
  speakerIcon?: React.ReactNode;
}

export interface OngoingCallProps {
  personName: string;
  personRole: string;
  personImage: string;
  isConnected: boolean;
  isConnecting: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  isSpeakerOn: boolean;
  callDuration: number;
  onEndCall: () => void;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  formatTime: (duration: number) => string;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  speakerIcon?: React.ReactNode;
  muteIcon?: React.ReactNode;
}
