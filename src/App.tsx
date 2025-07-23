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

  useEffect(() => {
    // Get query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");
    setComponentType(type);
  }, []);

  // Render based on type parameter
  const renderComponent = () => {
    switch (componentType) {
      case "call":
        return (
          <Call
            apiKey="25b57b4d-1626-4a90-a160-fd033fcc3b83"
            assistantId="af93082d-f691-408f-add1-c204a4850f3d"
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
              Add a query parameter to test different components:
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p>
                <code>?type=call</code> - Shows Call component
              </p>
              <p>
                <code>?type=chat</code> - Shows Chatbot component
              </p>
              <p>
                <code>?type=email</code> - Shows Email component
              </p>
            </div>

            {/* Demo buttons */}
            <div className="flex gap-4 mt-8">
              <CallButton
                onClick={() => (window.location.href = "?type=call")}
              />
              <ChatButton
                onClick={() => (window.location.href = "?type=chat")}
              />
              <EmailButton
                onClick={() => (window.location.href = "?type=email")}
              />
            </div>
          </div>
        );
    }
  };

  return <div className="h-[100vh] w-[100vw]">{renderComponent()}</div>;
}

export default App;
