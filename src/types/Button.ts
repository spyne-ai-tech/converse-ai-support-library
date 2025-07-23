import type { CSSProperties } from "react";

export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export interface CallButtonProps extends ButtonProps {}

export interface ChatButtonProps extends ButtonProps {}

export interface EmailButtonProps extends ButtonProps {}
