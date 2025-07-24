import { useEffect, useState } from "react";
import {
  Call,
  Chatbot,
  Email,
  CallButton,
  ChatButton,
  EmailButton,
} from "./lib";

function App() {
  const [componentType, setComponentType] = useState<string | null>(null);
  const [enterpriseId, setEnterpriseId] = useState<string>("");

  const vapiApiKey = import.meta.env.VITE_VAPI_API_KEY || "";
  const vapiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

  useEffect(() => {
    // Get query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");
    const enterprise = urlParams.get("enterpriseId");

    setComponentType(type);
    setEnterpriseId(enterprise || "");
  }, []);

  // Render based on type parameter
  const renderComponent = () => {
    // Check if required parameters are present for any component type
    if (componentType && !enterpriseId) {
      return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
          <span>No data available</span>
        </div>
      );
    }

    switch (componentType) {
      case "call":
        return (
          <Call
            apiKey={vapiApiKey}
            baseUrl={vapiBaseUrl}
            enterpriseId={enterpriseId}
            showClose={true}
          />
        );

      case "chat":
        return (
          <Chatbot
            showClose={true}
            enterpriseId={enterpriseId}
            baseUrl={vapiBaseUrl}
          />
        );

      case "email":
        return (
          <Email
            showClose={true}
            enterpriseId={enterpriseId}
            baseUrl={vapiBaseUrl}
          />
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Converse AI Support Library Demo
            </h1>
            <p className="text-gray-600 mb-8">
              Add query parameters to test different components:
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p>
                <code>
                  ?type=call&enterpriseId={enterpriseId}
                </code>{" "}
                - Shows Call component
              </p>
              <p>
                <code>
                  ?type=chat&enterpriseId={enterpriseId}
                </code>{" "}
                - Shows Chatbot component
              </p>
              <p>
                <code>
                  ?type=email&enterpriseId={enterpriseId}
                </code>{" "}
                - Shows Email component
              </p>
            </div>

            {/* Demo buttons */}
            <div className="flex gap-4 mt-8">
              <CallButton
                onClick={() =>
                  (window.location.href = `?type=call&enterpriseId=${enterpriseId}`)
                }
              />
              <ChatButton
                onClick={() =>
                  (window.location.href = `?type=chat&enterpriseId=${enterpriseId}`)
                }
              />
              <EmailButton
                onClick={() =>
                  (window.location.href = `?type=email&enterpriseId=${enterpriseId}`)
                }
              />
            </div>
          </div>
        );
    }
  };

  return <div className="h-[100vh] w-[100vw]">{renderComponent()}</div>;
}

export default App;
