import React from "react";
import callBg from "../../assets/call_bg.png";
import type { CallInterfaceProps } from "../../types/Call";

const CallInterface: React.FC<CallInterfaceProps> = ({
  personName,
  personRole,
  personImage,
  className = "",
  style = {},
  containerClassName = "",
  containerStyle = {},
  muteIcon,
  speakerIcon,
  isConnected = false,
  isConnecting = false,
  isSpeaking = false,
  isMuted = false,
  isSpeakerOn = false,
  callDuration = 0,
  onStartCall,
  onEndCall,
  onToggleMute,
  onToggleSpeaker,
  personRoleTextClassName = "",
  personNameTextClassName = "",
  formatTime = (duration: number) =>
    `${Math.floor(duration / 60)}:${(duration % 60)
      .toString()
      .padStart(2, "0")}`,
}) => {
  // Determine if we're in an active call state
  const isInCall = isConnecting || isConnected;

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
      <div
        className={`bg-[#F3F3F3] w-full h-full overflow-hidden flex flex-col items-center justify-between p-3 ${containerClassName}`}
        style={{ ...containerStyle }}
      >
        {/* Background image */}
        <div
          className={`relative w-[98%] flex-1 rounded-2xl overflow-hidden ${className}`}
          style={{ ...style }}
        >
          <div className="absolute inset-0">
            <img
              src={callBg}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%)",
              }}
            />
          </div>

          {/* Close button - only show during call */}
          {isInCall && onEndCall && (
            <button
              onClick={onEndCall}
              className="absolute top-5 right-5 bg-transparent border-none text-white text-2xl cursor-pointer z-[10000] w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              ✕
            </button>
          )}

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between h-full w-full">
            {/* Left side - Person image */}
            <div className="relative h-full w-[50%]">
              <img
                src={personImage}
                alt={personName}
                className="h-full object-contain absolute bottom-0 left-10"
              />
            </div>

            {/* Right side - Content */}
            <div className="text-center text-white flex-1 my-auto">
              {/* Person role */}
              <div
                className={`text-sm font-medium tracking-widest text-white/90 mb-2 ${personRoleTextClassName}`}
              >
                {personRole}
              </div>

              {/* Person name */}
              <div
                className={`text-5xl font-semibold text-white mb-6 ${personNameTextClassName}`}
              >
                {personName}
              </div>

              {/* Status badge with glassy effect */}
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-white mb-6">
                {isInCall ? (
                  <>
                    {isConnecting && !isConnected ? (
                      <>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse" />
                        Please wait while we connect you ...
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Connected{" "}
                        <span className="min-w-[3rem] inline-block">
                          {formatTime(callDuration)}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  "Your 24x7 assistant"
                )}
              </div>

              {/* Audio visualization - always reserve space to prevent layout shift */}
              <div className="mb-8 h-10 flex items-center justify-center">
                {isConnected && <AudioVisualization />}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="p-8 flex items-center justify-center gap-6 z-10 h-[20%]">
          {speakerIcon}
          {muteIcon}
          {isInCall ? (
            <button
              onClick={onEndCall}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-20 rounded-full transition-colors duration-200 text-md whitespace-nowrap"
            >
              End Call
            </button>
          ) : (
            <button
              onClick={onStartCall}
              className="bg-[#4600F2] hover:bg-[#3d00d1] whitespace-nowrap text-white font-semibold py-2 px-20 rounded-full transition-colors duration-200 text-md"
            >
              Call Now
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CallInterface;
