import React from "react";
import { Button } from "antd";

const buttonStyle = {
  fontSize: 12,
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: "#022471",
};

export const FooterButton = ({ children, ...props }) => (
  <Button type="primary" style={buttonStyle} {...props}>
    {children}
  </Button>
);

export const FooterDangerButton = ({ children, ...props }) => (
  <Button type="primary" danger style={buttonStyle} {...props}>
    {children}
  </Button>
);
