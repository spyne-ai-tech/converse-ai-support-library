import React from "react";
import SVG from "../svg/SVG";
import type { Message } from "../../types/Chatbot";
import { CHAT_CONFIG, QUICK_ACTIONS } from "../../lib/config";

interface ChatInterfaceProps {
  showClose?: boolean;
  onClose?: () => void;
  currentDate: string;
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputKeyPress: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  onQuickMessage: (message: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isSendDisabled: boolean;
  agentName: string;
  loading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  showClose = false,
  onClose,
  currentDate,
  messages,
  isTyping,
  inputValue,
  onInputChange,
  onInputKeyPress,
  onSend,
  onQuickMessage,
  messagesEndRef,
  isSendDisabled,
  agentName,
  loading,
}) => (
  <div className="w-full h-screen">
    <div className="w-full h-full flex items-center justify-center">
      <div className="rounded-lg shadow-2xl w-full h-full flex flex-col">
        {/* Header */}
        <div className="bg-blue-10 text-white p-3 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SVG iconName="chatbot" />
            <h3 className="font-semibold text-sm">
              Chatting with {loading ? "..." : agentName}
            </h3>
          </div>
          {showClose && (
            <button
              onClick={onClose}
              className="text-white hover:bg-white/10 rounded-full transition-colors duration-200 p-1"
            >
              <SVG iconName="close" />
            </button>
          )}
        </div>

        {/* Sub Header with Agent Info */}
        <div className="px-3 py-2 bg-gray-50">
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs font-medium text-black-80">
              Chatting with Agent {loading ? "..." : agentName}
            </p>
            <div className="w-2 h-2 bg-gray-10 rounded-full"></div>
            <p className="text-xs text-gray-500 font-semibold">{currentDate}</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[85%] ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  {message.role === "assistant" && <SVG iconName="chatbot" />}
                  {message.role === "user" && <SVG iconName="avatar" />}
                  <div
                    className={`flex flex-col text-sm ${
                      message.role === "user" ? "rounded-br-sm" : "w-fit"
                    }`}
                  >
                    <p
                      className={`text-sm rounded-xl px-3 py-2 w-fit ${
                        message.role === "user"
                          ? "bg-blue-20 text-white"
                          : "bg-blue-15 text-black-90"
                      } `}
                    >
                      {message.content}
                    </p>
                    <p
                      className={`text-[10px] mt-1 text-gray-400 ${
                        message.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <SVG iconName="chatbot" />
                  <div className="bg-blue-15 text-gray-800 rounded-xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-3 bg-white border-t space-y-2">
          <div className="flex space-x-2">
            {QUICK_ACTIONS.filter((action) => !action.primary).map((action) => (
              <button
                key={action.id}
                onClick={() => onQuickMessage(action.label)}
                className="w-fit flex items-center justify-center text-blue-20 py-1 px-3 text-xs font-medium hover:bg-gray-200 transition-colors border rounded-full border-blue-20"
                disabled={isTyping}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="px-3 pb-3 bg-white rounded-b-lg">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={CHAT_CONFIG.DEFAULT_PLACEHOLDER}
                value={inputValue}
                onChange={onInputChange}
                onKeyPress={onInputKeyPress}
                disabled={isTyping}
                className="w-full px-3 py-3 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-solid disabled:bg-gray-100 text-sm"
              />
            </div>
            <button
              onClick={onSend}
              disabled={isSendDisabled}
              className="bg-blue-5 text-white p-4 rounded-lg hover:bg-blue-5 transition-colors disabled:cursor-not-allowed"
            >
              <SVG iconName="send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ChatInterface;
