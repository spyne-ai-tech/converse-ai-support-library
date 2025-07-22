# Converse AI Support Library

A React component library that provides Voice Call and Text Chat functionality using Vapi AI.

## 🚀 Features

- **Voice Call Component**: Full-featured voice calling with Vapi AI
- **Text Chat Component**: Interactive chatbot interface
- **TypeScript Support**: Full type safety and IntelliSense
- **Container Responsive**: Adapts to parent container size
- **Customizable Styling**: Support for custom styles and CSS classes

## 📦 Installation

```bash
npm install converse-ai-support-library
```

## 🎨 Import Styles

**Important**: Import the CSS file in your main application file to enable styling:

```jsx
// In your main App.js or index.js file
import "converse-ai-support-library/dist/index.css";
```

## 🔧 Usage

### Call Component

```jsx
import React from "react";
import { Call } from "converse-ai-support-library";
import "converse-ai-support-library/dist/index.css"; // Don't forget this!

function App() {
  return (
    <div style={{ height: "600px", width: "800px" }}>
      <Call
        apiKey="your-vapi-api-key"
        assistantId="your-vapi-assistant-id"
        personName="John Doe"
        personRole="Sales Agent"
        personImage="https://example.com/agent-photo.jpg"
      />
    </div>
  );
}

export default App;
```

#### Call Component Props

| Prop                 | Type                  | Required | Default        | Description                   |
| -------------------- | --------------------- | -------- | -------------- | ----------------------------- |
| `apiKey`             | `string`              | ✅       | -              | Your Vapi AI API key          |
| `assistantId`        | `string`              | ✅       | -              | Your Vapi AI assistant ID     |
| `personName`         | `string`              | ❌       | "James Doe"    | Name to display               |
| `personRole`         | `string`              | ❌       | "SALES PERSON" | Role/title to display         |
| `personImage`        | `string`              | ❌       | Default avatar | Image URL for the person      |
| `config`             | `object`              | ❌       | `{}`           | Additional Vapi configuration |
| `className`          | `string`              | ❌       | `""`           | CSS class for inner content   |
| `style`              | `React.CSSProperties` | ❌       | `{}`           | Inline styles for content     |
| `containerClassName` | `string`              | ❌       | `""`           | CSS class for container       |
| `containerStyle`     | `React.CSSProperties` | ❌       | `{}`           | Inline styles for container   |

### Chatbot Component

```jsx
import React from "react";
import { Chatbot } from "converse-ai-support-library";
import "converse-ai-support-library/dist/index.css"; // Don't forget this!

function App() {
  return (
    <div style={{ height: "500px", width: "400px" }}>
      <Chatbot />
    </div>
  );
}

export default App;
```

### Custom Styling Examples

```jsx
// Custom sizing and styling
<Call
  apiKey="your-api-key"
  assistantId="your-assistant-id"
  containerStyle={{
    height: "100vh",
    background: "linear-gradient(to bottom, #667eea 0%, #764ba2 100%)",
  }}
  className="custom-call-content"
  style={{ borderRadius: "20px", border: "2px solid white" }}
/>
```

## 📋 Requirements

- React 18+
- Vapi AI account and API keys

## 🔑 Getting Vapi AI Credentials

1. Sign up at [Vapi AI](https://vapi.ai)
2. Create an assistant
3. Get your API key and assistant ID from the dashboard

## 📄 License

MIT
