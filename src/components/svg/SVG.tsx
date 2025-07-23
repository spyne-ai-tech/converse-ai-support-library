/**@format */

import Avatar from "./AvatarIcon";
import Chatbot from "./ChatbotIcon";
import Send from "./SendIcon";
import type { SVGComponentProps } from "../../types/SVG";
import Email from "./EmailIcon";
import Close from "./CloseIcon";

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
