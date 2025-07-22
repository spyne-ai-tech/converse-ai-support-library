import Call from "./components/Call/Call";

function App() {
  return (
    <div className="h-[100vh] w-[100vw]">
      <Call
        apiKey="25b57b4d-1626-4a90-a160-fd033fcc3b83"
        assistantId="af93082d-f691-408f-add1-c204a4850f3d"
        personName="James Doe"
        personRole="SALES PERSON"
      />
    </div>
  );
}

export default App;
