import React, { useEffect, useState } from "react";
import { useCallVapi } from "../../hooks/useCallVapi";
import type { CallProps } from "../../types/Call";
import type { Agent, RuntimeAgentResponse } from "../../types/agent";
import CallInterface from "./CallInterface";
import mute from "../../assets/mute.svg";
import micOff from "../../assets/mic_off.svg";
import speaker from "../../assets/speaker.svg";
import volumeOff from "../../assets/volume_off.svg";
import { fetchAgentData, fetchAgents } from "../../helpers/api";

import "../../index.css";

const Call: React.FC<CallProps> = ({
  apiKey,
  baseUrl,
  assistantId,
  enterpriseId,
  teamId,
  config = {},
  personName = "",
  personRole = "",
  personImage = "",
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
}) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentData, setAgentData] = useState<RuntimeAgentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Dynamic configuration based on fetched data
  const finalApiKey = apiKey;
  const finalAssistantId = selectedAgent?.id || assistantId;
  const finalConfig = agentData?.vapiAgentConfig
    ? (agentData.vapiAgentConfig as unknown as Record<string, unknown>)
    : config;
  const finalPersonName = selectedAgent?.name || personName;
  const finalPersonRole = selectedAgent?.description || personRole;
  const finalPersonImage = selectedAgent?.imageUrl || personImage;

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
  } = useCallVapi({
    apiKey: finalApiKey,
    assistantId: finalAssistantId || "",
    config: finalConfig,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch agents list
        const agentsList = await fetchAgents({
          enterpriseId,
          teamId: teamId || "",
          baseUrl,
        });

        if (agentsList.length > 0) {
          // Select first agent
          const firstAgent = agentsList[0];
          setSelectedAgent(firstAgent);

          // Fetch runtime agent data
          const runtimeAgentData = await fetchAgentData({
            enterpriseId,
            teamId: teamId || "",
            agentId: firstAgent.id,
            baseUrl,
          });
          setAgentData(runtimeAgentData);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      personName={finalPersonName}
      personRole={finalPersonRole}
      personImage={finalPersonImage}
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
      isLoading={loading}
    />
  );
};

export default Call;
