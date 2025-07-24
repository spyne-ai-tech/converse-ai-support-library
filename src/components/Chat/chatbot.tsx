import { useState, useEffect, useRef } from "react";
import type { Message, ChatbotProps } from "../../types/Chatbot";
import { MessageRole, ChatStatus } from "../../types/enums";
import {
  fetchAgents,
  createConversation,
  ChatService,
} from "../../helpers/api";
import ChatInterface from "./ChatInterface";
import { CHAT_CONFIG } from "../../lib/config";

const Chatbot: React.FC<ChatbotProps> = ({
  showClose = false,
  onClose,
  enterpriseId,
  baseUrl = "",
}) => {
  // --- State and refs ---
  const [chatStatus, setChatStatus] = useState<ChatStatus>(ChatStatus.IDLE);
  const [currentDate, setCurrentDate] = useState("");
  const [agentName, setAgentName] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
  const isTyping = chatStatus === ChatStatus.TYPING;

  // --- Effects ---

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    if (enterpriseId && baseUrl) {
      initializeConversation();
    }
    return () => {
      clearInterval(interval);
      if (conversationId) {
        ChatService.endChat({ baseUrl, conversationId }).catch(() => {});
      }
    };
  }, [enterpriseId, baseUrl]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: CHAT_CONFIG.AUTO_SCROLL_BEHAVIOR,
    });
  }, [messages]);

  // --- Functions ---

  const updateDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString(
      "en-US",
      CHAT_CONFIG.DATE_FORMAT_OPTIONS
    );
    setCurrentDate(date);
  };

  async function initializeConversation() {
    try {
      setLoading(true);
      // Fetch agents and select the first one
      const agentsList = await fetchAgents({
        enterpriseId: enterpriseId || "",
        baseUrl,
      });
      if (agentsList.length > 0) {
        const firstAgent = agentsList[0];
        setAgentName(firstAgent.name);
        const newConversationId = await createConversation({
          baseUrl,
          enterpriseId: enterpriseId || "",
          teamAgentMappingId: firstAgent.id,
        });
        setConversationId(newConversationId);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to create conversation:", error);
    }
  }

  const sendChatMessage = async (message: string) => {
    if (!conversationId) return;
    setChatStatus(ChatStatus.TYPING);
    try {
      const response = await ChatService.createChat({
        baseUrl,
        input: message,
        conversationId,
      });
      const aiMessage: Message = {
        id: Date.now().toString() + "_ai",
        role: MessageRole.ASSISTANT,
        content: response.reply || "Sorry, I could not understand that.",
        timestamp: new Date().toLocaleTimeString(
          "en-US",
          CHAT_CONFIG.TIME_FORMAT_OPTIONS
        ),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setChatStatus(ChatStatus.IDLE);
    } catch (error) {
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
    if (inputValue.trim() && conversationId) {
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
      await sendChatMessage(messageToSend);
    }
  };

  const handleQuickMessage = async (message: string) => {
    if (!conversationId) return;
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
    await sendChatMessage(message);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // --- Render ---

  return (
    <ChatInterface
      showClose={showClose}
      onClose={onClose}
      loading={loading}
      agentName={agentName}
      currentDate={currentDate}
      messages={messages}
      isTyping={isTyping}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onInputKeyPress={handleKeyPress}
      onSend={sendMessage}
      onQuickMessage={handleQuickMessage}
      messagesEndRef={messagesEndRef}
      isSendDisabled={isTyping || !inputValue.trim() || !conversationId}
    />
  );
};

export default Chatbot;
