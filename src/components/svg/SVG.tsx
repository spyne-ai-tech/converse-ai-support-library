/**@format */

import Avatar from "./AvatarIcon.tsx";
import Chatbot from "./ChatbotIcon.tsx";
import Send from "./SendIcon.tsx";
import type { SVGComponentProps } from '../../types/SVG';
import Email from "./EmailIcon.tsx";
import Close from "./CloseIcon.tsx";

interface SVGProps
  extends Pick<SVGComponentProps, "className" | "height" | "width"> {
  iconName: keyof typeof Icons;
}

const Icons = {
  avatar: Avatar,
  chatbot: Chatbot,
  send: Send,
  email: Email,
  close: Close,
} as const;

export default function SVG({ iconName, className, height, width }: SVGProps) {
  const Icon = Icons[iconName];

  return Icon ? (
    <Icon className={className} height={height} width={width} />
  ) : null;
}
