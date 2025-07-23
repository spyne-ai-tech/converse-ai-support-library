import React from "react";

export interface CallProps {
  apiKey: string;
  baseUrl: string;
  assistantId?: string;
  enterpriseId: string;
  teamId?: string;
  showClose?: boolean;
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
  // Control className props
  controlsContainerClassName?: string;
  callNowButtonClassName?: string;
  endCallButtonClassName?: string;
  muteButtonClassName?: string;
  speakerButtonClassName?: string;
  // Text className props
  personRoleTextClassName?: string;
  personNameTextClassName?: string;
  onClose?: () => void;
}

export interface CallInterfaceProps {
  personName: string;
  personRole: string;
  personImage: string;
  showClose?: boolean;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  muteIcon?: React.ReactNode;
  speakerIcon?: React.ReactNode;
  personRoleTextClassName?: string;
  personNameTextClassName?: string;
  isConnected?: boolean;
  isConnecting?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  isSpeakerOn?: boolean;
  callDuration?: number;
  onStartCall?: () => void;
  onEndCall?: () => void;
  onToggleMute?: () => void;
  onToggleSpeaker?: () => void;
  formatTime?: (duration: number) => string;
  // Control className props
  controlsContainerClassName?: string;
  callNowButtonClassName?: string;
  endCallButtonClassName?: string;
  muteButtonClassName?: string;
  speakerButtonClassName?: string;
  // Loading state
  isLoading?: boolean;
  onClose?: () => void;
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
