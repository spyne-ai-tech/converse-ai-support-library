import type { ContactButtonsProps } from "../types/ContactButtons";

export default function ContactButtons({
  onEmailClick,
  onChatClick,
  onCallClick,
}: ContactButtonsProps) {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
      <button
        onClick={onEmailClick}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
      >
        Email
      </button>

      <button
        onClick={onChatClick}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
      >
        Chat
      </button>

      <button
        onClick={onCallClick}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
      >
        Call
      </button>
    </div>
  );
}
