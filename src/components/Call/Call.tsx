import React from "react";
import "../../index.css";
import { useCallVapi } from "../../hooks/useCallVapi";
import type { CallProps } from "../../types/Call";
import StartCall from "./StartCall";
import OngoingCall from "./OngoingCall";
import agent1 from "../../assets/agent_1.png";
import mute from "../../assets/mute.svg";
import speaker from "../../assets/speaker.svg";

const Call: React.FC<CallProps> = ({
  apiKey,
  assistantId,
  config = {},
  personName = "James Doe",
  personRole = "SALES PERSON",
  personImage = agent1,
  className = "",
  style = {},
  containerClassName = "",
  containerStyle = {},
  muteIcon = (
    <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-white border-[1px] border-black/10">
      <img src={mute} alt="mute" className="w-6 h-6" />
    </button>
  ),
  speakerIcon = (
    <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-white border-[1px] border-black/10">
      <img src={speaker} alt="speaker" className="w-6 h-6" />
    </button>
  ),
}) => {
  // Use the custom hook for all Vapi logic
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    isMuted,
    isSpeakerOn,
    callDuration,
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
        className={className}
        style={style}
        containerClassName={containerClassName}
        containerStyle={containerStyle}
        muteIcon={muteIcon}
        speakerIcon={speakerIcon}
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
      className={className}
      style={style}
      containerClassName={containerClassName}
      containerStyle={containerStyle}
      muteIcon={muteIcon}
      speakerIcon={speakerIcon}
    />
  );
};

export default Call;
