import React from "react";
import type { StartCallProps } from "../../types/Call";
import agent1 from "../../assets/agent_1.png";
import callBg from "../../assets/call_bg.png";
import speaker from "../../assets/speaker.svg";
import mute from "../../assets/mute.svg";

const StartCall: React.FC<StartCallProps> = ({
  personName,
  personRole,
  personImage,
  onStartCall,
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
  className = "",
}) => {
  return (
    <div
      className={`bg-[#F3F3F3] w-[100vw] h-[100vh] overflow-hidden flex flex-col items-center justify-between p-3 ${className}`}
    >
      {/* Background image */}
      <div className="relative w-[98%] flex-1 rounded-2xl overflow-hidden">
        <div className=""> </div>
        <div className="absolute inset-0">
          <img
            src={callBg}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

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

            {/* Assistant badge with glassy effect */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm font-medium text-white mb-8">
              Your 24x7 assistant
            </div>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="p-8 flex items-center justify-center gap-6 z-10 h-[20%]">
        {/* Speaker icon */}
        {speakerIcon}
        {/* Microphone icon */}
        {muteIcon}

        {/* Call Now button */}
        <button
          onClick={onStartCall}
          className="bg-[#4600F2] hover:bg-[#3d00d1] text-white font-semibold py-4 px-12 rounded-full transition-colors duration-200 text-lg"
        >
          Call Now
        </button>
      </div>
    </div>
  );
};

export default StartCall;
