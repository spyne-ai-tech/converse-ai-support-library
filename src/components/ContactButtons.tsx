import type { ContactButtonsProps } from "../types/ContactButtons";

export default function ContactButtons({
  onEmailClick,
  onChatClick,
  onCallClick,
}: ContactButtonsProps) {
  return (
    <div className="">
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
