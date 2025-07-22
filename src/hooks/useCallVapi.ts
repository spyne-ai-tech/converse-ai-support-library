import { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";

interface UseCallVapiProps {
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
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
}: UseCallVapiProps): UseCallVapiReturn => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
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
  const startCall = () => {
    if (vapi) {
      setIsConnecting(true);
      vapi.start(assistantId);
    }
  };

  const endCall = () => {
    if (vapi) {
      setIsConnecting(false);
      vapi.stop();
    }
  };

  const toggleMute = () => {
    if (vapi) {
      setIsMuted(!isMuted);
      // Vapi mute functionality would go here
      // vapi.setMuted(!isMuted);
    }
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    // Speaker toggle functionality would go here
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
