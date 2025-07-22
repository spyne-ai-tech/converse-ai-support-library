/**@format */

import React from "react";
import type { SVGComponentProps } from "../../types/components";
import Avatar from "./Avatar";
import Chatbot from "./Chatbot";
import Send from "./Send";

interface SVGProps
  extends Pick<SVGComponentProps, "className" | "height" | "width"> {
  iconName: keyof typeof Icons;
}

const Icons = {
  avatar: Avatar,
  chatbot: Chatbot,
  send: Send,
} as const;

export default function SVG({ iconName, className, height, width }: SVGProps) {
  const Icon = Icons[iconName];

  return Icon ? (
    <Icon className={className} height={height} width={width} />
  ) : null;
}
