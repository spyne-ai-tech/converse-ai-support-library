import React from "react";
import callBg from "../../assets/call_bg.png";
import type { CallInterfaceProps } from "../../types/Call";
import SVG from "../svg/SVG";

const CallInterface: React.FC<CallInterfaceProps> = ({
  personName,
  personRole,
  personImage,
  showClose = false,
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
  onClose,
  onToggleMute,
  onToggleSpeaker,
  personRoleTextClassName = "",
  personNameTextClassName = "",
  controlsContainerClassName = "",
  callNowButtonClassName = "",
  endCallButtonClassName = "",
  muteButtonClassName = "",
  speakerButtonClassName = "",
  isLoading = false,
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
          {showClose && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 bg-transparent border-none text-white text-2xl cursor-pointer z-[10000] w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <SVG iconName="close" />
            </button>
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between h-full w-full">
            {/* Content section - top on mobile, right on desktop */}
            <div className="text-center text-white flex-1 my-auto order-1 sm:order-2 pt-8 sm:pt-0">
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
              {!isLoading && (
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
              )}

              {/* Audio visualization - always reserve space to prevent layout shift */}
              <div className="mb-8 h-10 flex items-center justify-center">
                {isConnected && <AudioVisualization />}
              </div>
            </div>

            {/* Person image - bottom on mobile, left on desktop */}
            <div className="relative flex-1 h-[60%] sm:h-full sm:w-[50%] order-2 sm:order-1 flex justify-center sm:justify-start items-end pb-4 sm:pb-0">
              <img
                src={personImage}
                alt={personName}
                className="h-full object-contain sm:absolute sm:bottom-0 sm:left-10"
              />
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div
          className={`p-4 sm:p-8 flex items-center justify-center gap-4 sm:gap-6 z-10 h-[15%] sm:h-[20%] ${controlsContainerClassName}`}
        >
          {speakerIcon}
          {muteIcon}
          {isInCall ? (
            <button
              onClick={onEndCall}
              disabled={isLoading}
              className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-20 rounded-full transition-colors duration-200 text-md whitespace-nowrap ${endCallButtonClassName} ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              End Call
            </button>
          ) : (
            <button
              onClick={onStartCall}
              disabled={isLoading}
              className={`bg-[#4600F2] hover:bg-[#3d00d1] whitespace-nowrap text-white font-semibold py-2 px-10 sm:px-20 rounded-full transition-colors duration-200 text-md ${callNowButtonClassName} ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
