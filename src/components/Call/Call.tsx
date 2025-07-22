import React from "react";
import { useCallVapi } from "../../hooks/useCallVapi";
import type { CallProps } from "../../types/Call";
import StartCall from "./StartCall";
import OngoingCall from "./OngoingCall";
import agent1 from "../../assets/agent_1.png";

const Call: React.FC<CallProps> = ({
  apiKey,
  assistantId,
  config = {},
  personName = "James Doe",
  personRole = "SALES PERSON",
  personImage = agent1,
}) => {
  // Use the custom hook for all Vapi logic
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    isMuted,
    isSpeakerOn,
    callDuration,
    transcript,
    startCall,
    endCall,
    toggleMute,
    toggleSpeaker,
    formatTime,
  } = useCallVapi({ apiKey, assistantId, config });

  // Render StartCall component when not connecting or connected
  if (!isConnecting && !isConnected) {
    return (
      <StartCall
        personName={personName}
        personRole={personRole}
        personImage={personImage}
        onStartCall={startCall}
      />
    );
  }

  // Render OngoingCall component when connecting or connected
  return (
    <OngoingCall
      personName={personName}
      personRole={personRole}
      personImage={personImage}
      isConnected={isConnected}
      isConnecting={isConnecting}
      isSpeaking={isSpeaking}
      isMuted={isMuted}
      isSpeakerOn={isSpeakerOn}
      callDuration={callDuration}
      onEndCall={endCall}
      onToggleMute={toggleMute}
      onToggleSpeaker={toggleSpeaker}
      formatTime={formatTime}
    />
  );
};

export default Call;
