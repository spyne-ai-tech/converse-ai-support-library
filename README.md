# Contact Buttons React

A simple React component library for floating contact buttons (email, chat, call).

## Installation

```bash
npm install contact-buttons-react
```

## Usage

```tsx
import { ContactButtons } from "contact-buttons-react";

function App() {
  return (
    <div>
      <h1>Your Website</h1>
      <ContactButtons
        onEmailClick={() => window.open("mailto:contact@example.com")}
        onChatClick={() => console.log("Opening chat...")}
        onCallClick={() => window.open("tel:+1234567890")}
      />
    </div>
  );
}
```

## Props

| Prop           | Type         | Description                                    |
| -------------- | ------------ | ---------------------------------------------- |
| `onEmailClick` | `() => void` | Callback function when email button is clicked |
| `onChatClick`  | `() => void` | Callback function when chat button is clicked  |
| `onCallClick`  | `() => void` | Callback function when call button is clicked  |

## Styling

This component uses Tailwind CSS classes. Make sure your project has Tailwind CSS configured, or the buttons will not be styled properly.

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build library: `npm run build:lib`

## License

MIT
