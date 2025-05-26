import React, { ReactNode } from "react";
import { Button as BootstrapButton } from "react-bootstrap";

type BootstrapVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-light"
  | "outline-dark";

type ButtonProps = {
  variant?: BootstrapVariant;
  text?: string;
  fontColor?: string;
  icon?: ReactNode;
  onClick?: () => void;
  size?: "sm" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  backGroundColor?: string;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "success",
  text = "",
  fontColor,
  icon,
  onClick,
  size = "lg",
  type = "button",
  disabled = false,
  backGroundColor
}) => {

    const customStyle: React.CSSProperties = {
    ...(fontColor && { color: fontColor }),
    ...(backGroundColor && { backgroundColor: backGroundColor, borderColor: backGroundColor })
  };

  return (
    <BootstrapButton
      variant={variant}
      onClick={onClick}
      size={size}
      style={customStyle}
      type={type}
      disabled={disabled}
    >
      {icon && <span className="me-2">{icon}</span>}
      {text}
    </BootstrapButton>
  );
};
