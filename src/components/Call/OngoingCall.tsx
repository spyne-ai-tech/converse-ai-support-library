import React from "react";
import agent1 from "../../assets/agent_1.png";
import callBg from "../../assets/call_bg.png";
import speaker from "../../assets/speaker.svg";
import mute from "../../assets/mute.svg";

interface OngoingCallProps {
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
}

const OngoingCall: React.FC<OngoingCallProps> = ({
  personName,
  personRole,
  personImage,
  isConnected,
  isConnecting,
  isSpeaking,
  isMuted,
  isSpeakerOn,
  callDuration,
  onEndCall,
  onToggleMute,
  onToggleSpeaker,
  formatTime,
}) => {
  // Audio visualization bars component
  const AudioVisualization = () => {
    const bars = Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 bg-white/70 rounded mx-1 transition-all duration-300 ease-in-out ${
          isSpeaking ? "animate-audioWave h-10" : "h-5"
        }`}
        style={{
          animationDelay: isSpeaking ? `${i * 0.1}s` : "0s",
        }}
      />
    ));
    return <div className="flex items-center justify-center">{bars}</div>;
  };

  return (
    <>
      <div className="bg-[#F3F3F3] w-[100vw] h-[100vh] overflow-hidden flex flex-col items-center justify-between p-3">
        {/* Background image */}
        <div className="relative w-[98%] flex-1 rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={callBg}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Close button */}
          <button
            onClick={onEndCall}
            className="absolute top-5 right-5 bg-transparent border-none text-white text-2xl cursor-pointer z-[10000] w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            ✕
          </button>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between h-full w-full">
            {/* Left side - Person image */}
            <div className="relative h-full w-[50%]">
              <img
                src={agent1}
                alt={personName}
                className="h-full object-contain absolute bottom-0 left-10"
              />
            </div>

            {/* Right side - Content */}
            <div className="text-center text-white flex-1 my-auto">
              {/* Person role */}
              <div className="text-sm font-medium tracking-widest text-white/90 mb-2">
                {personRole}
              </div>

              {/* Person name */}
              <div className="text-5xl font-semibold text-white mb-6">
                {personName}
              </div>

              {/* Connection status badge with glassy effect */}
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm font-medium text-white mb-6">
                {isConnecting && !isConnected ? (
                  <>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse" />
                    Connecting your call please wait
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Connected {formatTime(callDuration)}
                  </>
                )}
              </div>

              {/* Audio visualization - only show when connected and speaking */}
              {isConnected && (
                <div className="mb-8">
                  <AudioVisualization />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="p-8 flex items-center justify-center gap-6 z-10 h-[20%]">
          {/* Speaker button */}
          <button
            onClick={onToggleSpeaker}
            className={`w-16 h-16 rounded-full flex items-center justify-center border-[1px] border-black/10 transition-all duration-300 ${
              isSpeakerOn ? "bg-white text-black" : "bg-white/70 text-black"
            }`}
          >
            <img src={speaker} alt="speaker" className="w-6 h-6" />
          </button>

          {/* Microphone button */}
          <button
            onClick={onToggleMute}
            className={`w-16 h-16 rounded-full flex items-center justify-center border-[1px] border-black/10 transition-all duration-300 ${
              isMuted ? "bg-red-500 text-white" : "bg-white text-black"
            }`}
          >
            <img src={mute} alt="mute" className="w-6 h-6" />
          </button>

          {/* End call button */}
          <button
            onClick={onEndCall}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-12 rounded-full transition-colors duration-200 text-lg"
          >
            End Call
          </button>
        </div>
      </div>

      <style>{`
        @keyframes audioWave {
          0%, 100% { height: 1.25rem; }
          50% { height: 2.5rem; }
        }
        
        .animate-audioWave {
          animation: audioWave 1s infinite;
        }
      `}</style>
    </>
  );
};

export default OngoingCall;
