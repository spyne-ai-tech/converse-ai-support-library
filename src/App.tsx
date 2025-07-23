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
  const [teamId, setTeamId] = useState<string>("");

  useEffect(() => {
    // Get query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");
    const enterprise = urlParams.get("enterpriseId");
    const team = urlParams.get("teamId");

    setComponentType(type);
    setEnterpriseId(enterprise || "");
    setTeamId(team || "");
  }, []);

  // Get VAPI API key from environment variables
  const vapiApiKey = import.meta.env.VITE_VAPI_API_KEY || "";
  const vapiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

  // Render based on type parameter
  const renderComponent = () => {
    // Check if required parameters are present for any component type
    if (componentType && (!enterpriseId || !teamId)) {
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
            teamId={teamId}
          />
        );

      case "chat":
        return <Chatbot />;

      case "email":
        return <Email />;

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
                  ?type=call&enterpriseId={enterpriseId}&teamId={teamId}
                </code>{" "}
                - Shows Call component
              </p>
              <p>
                <code>
                  ?type=chat&enterpriseId={enterpriseId}&teamId={teamId}
                </code>{" "}
                - Shows Chatbot component
              </p>
              <p>
                <code>
                  ?type=email&enterpriseId={enterpriseId}&teamId={teamId}
                </code>{" "}
                - Shows Email component
              </p>
            </div>

            {/* Demo buttons */}
            <div className="flex gap-4 mt-8">
              <CallButton
                onClick={() =>
                  (window.location.href = `?type=call&enterpriseId=${enterpriseId}&teamId=${teamId}`)
                }
              />
              <ChatButton
                onClick={() =>
                  (window.location.href = `?type=chat&enterpriseId=${enterpriseId}&teamId=${teamId}`)
                }
              />
              <EmailButton
                onClick={() =>
                  (window.location.href = `?type=email&enterpriseId=${enterpriseId}&teamId=${teamId}`)
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
