import React from "react";
import { Button } from "antd";
import "./FooterButton.css";

export const FooterPrimaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  ...props
}) => (
  <Button
    type={type}
    className={`common-btn ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </Button>
);

export const FooterDangerButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  ...props
}) => (
  <Button
    type={type}
    className={`common-btn-danger ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </Button>
);


