import { CallButton, ChatButton, EmailButton } from "./components/Buttons";

function App() {
  return (
    <div className="bg-gray-50 h-[100vh]">
      {/* <Call
        apiKey="25b57b4d-1626-4a90-a160-fd033fcc3b83"
        assistantId="af93082d-f691-408f-add1-c204a4850f3d"
      /> */}
      <CallButton />
      <ChatButton />
      <EmailButton />
    </div>
  );
}

export default App;
