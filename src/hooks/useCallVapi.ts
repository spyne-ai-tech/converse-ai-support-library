import { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import { sendCallReport } from "../helpers/api";

interface UseCallVapiProps {
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
  baseUrl: string;
}

interface UseCallVapiReturn {
  // State
  isConnected: boolean;
  isConnecting: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  isSpeakerOn: boolean;
  callDuration: number;
  transcript: Array<{ role: string; text: string }>;

  // Actions
  startCall: () => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleSpeaker: () => void;

  // Utilities
  formatTime: (seconds: number) => string;
}

export const useCallVapi = ({
  apiKey,
  assistantId,
  config = {},
  baseUrl,
}: UseCallVapiProps): UseCallVapiReturn => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callId, setCallId] = useState<string | null>(null);

  const [transcript, setTranscript] = useState<
    Array<{ role: string; text: string }>
  >([]);

  // Initialize Vapi instance and set up event listeners
  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on("call-start", () => {
      console.log("Call started");
      setIsConnected(true);
      setIsConnecting(false);
      setCallDuration(0);
    });

    vapiInstance.on("call-end", () => {
      console.log("Call ended");
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setCallDuration(0);
      // Reset audio controls to default state
      setIsMuted(false);
      setIsSpeakerOn(true);
    });

    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setIsSpeaking(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role,
            text: message.transcript,
          },
        ]);
      }
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
      setIsConnecting(false);
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  // Timer effect for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  // Call control functions
  const startCall = async () => {
    if (vapi) {
      setIsConnecting(true);
      if (config && Object.keys(config).length > 0) {
        const callData = await vapi.start(config);
        setCallId(callData?.id || null);
      } else {
        const callData = await vapi.start(assistantId);
        setCallId(callData?.id || null);
      }
    }
  };

  const endCall = async () => {
    if (vapi) {
      console.log(vapi);
      setIsConnecting(false);
      vapi.stop();
      await sendCallReport({
        baseUrl: baseUrl,
        callId: callId || "",
      });
    }
  };

  const toggleMute = () => {
    if (vapi) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);

      // Vapi mute functionality - this controls microphone input
      try {
        vapi.setMuted(newMuteState);
      } catch (error) {
        console.error("Error toggling mute:", error);
        // Revert state if Vapi call fails
        setIsMuted(!newMuteState);
      }
    }
  };

  const toggleSpeaker = () => {
    // Speaker toggle controls audio output volume
    const newSpeakerState = !isSpeakerOn;
    setIsSpeakerOn(newSpeakerState);

    try {
      // Get all audio elements and adjust volume
      const audioElements = document.querySelectorAll("audio");
      audioElements.forEach((audio) => {
        audio.volume = newSpeakerState ? 1.0 : 0.0;
      });

      // For Vapi, we can also try to control the volume through the Web Audio API
      if (vapi && (vapi as any).audioContext) {
        const audioContext = (vapi as any).audioContext;
        if (audioContext.destination.volume !== undefined) {
          audioContext.destination.volume.value = newSpeakerState ? 1.0 : 0.0;
        }
      }
    } catch (error) {
      console.error("Error toggling speaker:", error);
      // Revert state if speaker control fails
      setIsSpeakerOn(!newSpeakerState);
    }
  };

  // Utility functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    // State
    isConnected,
    isConnecting,
    isSpeaking,
    isMuted,
    isSpeakerOn,
    callDuration,
    transcript,

    // Actions
    startCall,
    endCall,
    toggleMute,
    toggleSpeaker,

    // Utilities
    formatTime,
  };
};
