import React from "react";
import { useCallVapi } from "../../hooks/useCallVapi";
import type { CallProps } from "../../types/Call";
import CallInterface from "./CallInterface";
import agent1 from "../../assets/agent_1.png";
import mute from "../../assets/mute.svg";
import micOff from "../../assets/mic_off.svg";
import speaker from "../../assets/speaker.svg";
import volumeOff from "../../assets/volume_off.svg";

import "../../index.css";

const Call: React.FC<CallProps> = ({
  apiKey,
  assistantId,
  showClose = false,
  config = {},
  personName = "James Doe",
  personRole = "SALES PERSON",
  personImage = agent1,
  className = "",
  style = {},
  containerClassName = "",
  containerStyle = {},
  controlsContainerClassName = "",
  callNowButtonClassName = "",
  endCallButtonClassName = "",
  muteButtonClassName = "",
  speakerButtonClassName = "",
  personRoleTextClassName = "",
  personNameTextClassName = "",
  onClose,
}) => {
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

  // Create dynamic icons based on state with customizable classes
  const muteIcon = (
    <button
      onClick={toggleMute}
      className={`w-11 h-11 rounded-full bg-white flex items-center justify-center text-white border-[1px] border-black/10 cursor-pointer hover:bg-gray-50 transition-colors ${muteButtonClassName}`}
    >
      <img
        src={isMuted ? micOff : mute}
        alt={isMuted ? "mic off" : "mute"}
        className="w-4 h-4"
      />
    </button>
  );

  const speakerIcon = (
    <button
      onClick={toggleSpeaker}
      className={`w-11 h-11 rounded-full bg-white flex items-center justify-center text-white border-[1px] border-black/10 cursor-pointer hover:bg-gray-50 transition-colors ${speakerButtonClassName}`}
    >
      <img
        src={isSpeakerOn ? speaker : volumeOff}
        alt={isSpeakerOn ? "speaker on" : "volume off"}
        className="w-4 h-4"
      />
    </button>
  );

  return (
    <CallInterface
      personName={personName}
      personRole={personRole}
      personImage={personImage}
      showClose={showClose}
      className={className}
      style={style}
      containerClassName={containerClassName}
      containerStyle={containerStyle}
      muteIcon={muteIcon}
      speakerIcon={speakerIcon}
      isConnected={isConnected}
      isConnecting={isConnecting}
      isSpeaking={isSpeaking}
      isMuted={isMuted}
      isSpeakerOn={isSpeakerOn}
      callDuration={callDuration}
      onStartCall={startCall}
      onEndCall={endCall}
      onClose={onClose}
      onToggleMute={toggleMute}
      onToggleSpeaker={toggleSpeaker}
      formatTime={formatTime}
      personRoleTextClassName={personRoleTextClassName}
      personNameTextClassName={personNameTextClassName}
      controlsContainerClassName={controlsContainerClassName}
      callNowButtonClassName={callNowButtonClassName}
      endCallButtonClassName={endCallButtonClassName}
      muteButtonClassName={muteButtonClassName}
      speakerButtonClassName={speakerButtonClassName}
    />
  );
};

export default Call;
