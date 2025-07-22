import { useState, useEffect, useRef } from "react";
import "../index.css";
import type { Message, ChatbotProps } from '../types/Chatbot';
import { MessageRole, ChatStatus } from "../types/enums";
import { VapiChatService } from "../lib/services";
import { CHAT_CONFIG, QUICK_ACTIONS } from "../lib/config";
import SVG from "./svg/SVG";

const Chatbot: React.FC<ChatbotProps> = () => {
    // const [isWidgetOpen, setIsWidgetOpen] = useState(isOpen);
    const [chatStatus, setChatStatus] = useState<ChatStatus>(ChatStatus.IDLE);
    const [currentDate, setCurrentDate] = useState("");
    const [currentChatId, setCurrentChatId] = useState<string | undefined>(
        undefined
    );
    const [messages, setMessages] = useState<Message[]>([
        {
        id: "initial_message",
        role: MessageRole.ASSISTANT,
        content: "Hi, How may I help you?",
        timestamp: new Date().toLocaleTimeString(
            "en-US",
            CHAT_CONFIG.TIME_FORMAT_OPTIONS
        ),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Update widget state when prop changes
    // useEffect(() => {
    //     setIsWidgetOpen(isOpen);
    // }, [isOpen]);

    const isTyping = chatStatus === ChatStatus.TYPING;

    // Auto scroll to bottom when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
        behavior: CHAT_CONFIG.AUTO_SCROLL_BEHAVIOR,
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Update current time every second
    useEffect(() => {
        const updateDateTime = () => {
        const now = new Date();
        const date = now.toLocaleDateString(
            "en-US",
            CHAT_CONFIG.DATE_FORMAT_OPTIONS
        );
        setCurrentDate(date);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    // VAPI Chat API function for text-based conversations
    const sendChatMessage = async (message: string) => {
        setChatStatus(ChatStatus.TYPING);

        try {
        console.log("Sending message with previousChatId:", currentChatId);
        const response = await VapiChatService.sendMessage(
            message,
            currentChatId
        );
        console.log("VAPI Response with ID:", response.id, response);

        // Update current chat ID for next message
        setCurrentChatId(response.id);

        const content = VapiChatService.extractMessageContent(response);

        // Add AI response to chat
        const aiMessage: Message = {
            id: Date.now().toString() + "_ai",
            role: MessageRole.ASSISTANT,
            content: content,
            timestamp: new Date().toLocaleTimeString(
            "en-US",
            CHAT_CONFIG.TIME_FORMAT_OPTIONS
            ),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setChatStatus(ChatStatus.IDLE);
        } catch (error) {
        console.error("VAPI Chat API Error:", error);

        // Add error message
        const errorMessage: Message = {
            id: Date.now().toString() + "_error",
            role: MessageRole.ASSISTANT,
            content: "Sorry, I encountered an error. Please try again.",
            timestamp: new Date().toLocaleTimeString(
            "en-US",
            CHAT_CONFIG.TIME_FORMAT_OPTIONS
            ),
        };

        setMessages((prev) => [...prev, errorMessage]);
        setChatStatus(ChatStatus.ERROR);
        }
    };

    const sendMessage = async () => {
        if (inputValue.trim()) {
        // Add user message to chat
        const userMessage: Message = {
            id: Date.now().toString() + "_user",
            role: MessageRole.USER,
            content: inputValue,
            timestamp: new Date().toLocaleTimeString(
            "en-US",
            CHAT_CONFIG.TIME_FORMAT_OPTIONS
            ),
        };

        setMessages((prev) => [...prev, userMessage]);

        const messageToSend = inputValue;
        setInputValue("");

        // Send to VAPI Chat API for text-based conversation
        await sendChatMessage(messageToSend);
        }
    };

    const handleQuickMessage = async (message: string) => {
        // Add user message to chat
        const userMessage: Message = {
        id: Date.now().toString() + "_user_quick",
        role: MessageRole.USER,
        content: message,
        timestamp: new Date().toLocaleTimeString(
            "en-US",
            CHAT_CONFIG.TIME_FORMAT_OPTIONS
        ),
        };

        setMessages((prev) => [...prev, userMessage]);

        // Send to VAPI Chat API
        await sendChatMessage(message);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
        sendMessage();
        }
    };

    return (
        <div className="w-full h-screen">
            <div className="w-full h-full flex items-center justify-center">
                <div className="rounded-lg shadow-2xl w-full h-full flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-10 text-white p-3 rounded-t-lg flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <SVG iconName="chatbot" />
                            <h3 className="font-semibold text-sm">Chatting with Jarvis</h3>
                        </div>
                        <button
                            onClick={() => {
                                // setIsWidgetOpen(false);
                                // onToggle?.(false);
                            }}
                            className="text-white hover:text-blue-200 transition-colors"
                        >
                            <SVG iconName="close" />
                        </button>
                    </div>

                    {/* Sub Header with Agent Info */}
                    <div className="px-3 py-2 bg-gray-50">
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-xs font-medium text-black-80">Chatting with Agent Jarvis</p>
                            <div className="w-2 h-2 bg-gray-10 rounded-full"></div>
                            <p className="text-xs text-gray-500 font-semibold">{currentDate}</p>
                        </div>
                    </div>



                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto bg-gray-50">
                        <div className="p-3 space-y-3">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex items-start space-x-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        {message.role === 'assistant' && (
                                            <SVG iconName="chatbot" />
                                        )}
                                        {message.role === 'user' && (
                                            <SVG iconName="avatar" />
                                        )}
                                        <div className={`flex flex-col text-sm ${message.role === 'user'
                                            ? 'rounded-br-sm'
                                            : 'w-fit'
                                            }`}>
                                            <p className={`text-sm rounded-xl px-3 py-2 w-fit ${message.role === 'user'
                                                ? 'bg-blue-20 text-white'
                                                : 'bg-blue-15 text-black-90'
                                                } `}>{message.content}</p>
                                            <p className={`text-[10px] mt-1 text-gray-400 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
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
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                            {QUICK_ACTIONS.filter(action => !action.primary).map((action) => (
                                <button
                                    key={action.id}
                                    onClick={() => handleQuickMessage(action.label)}
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
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    disabled={isTyping}
                                    className="w-full px-3 py-3 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-solid disabled:bg-gray-100 text-sm"
                                />
                            </div>
                            <button
                                onClick={sendMessage}
                                disabled={isTyping || !inputValue.trim()}
                                className="bg-blue-5 text-white p-4 rounded-lg hover:bg-blue-5 transition-colors disabled:cursor-not-allowed"
                            >
                                <SVG iconName="send" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Open Chat Button */}
            {/* {!isWidgetOpen && (
                            <button
                    onClick={() => {
                        setIsWidgetOpen(true);
                        onToggle?.(true);
                    }}
                    className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    </button>
                )} */}
        </div>
    );
};

export default Chatbot;
