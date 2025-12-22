import { useState } from "react";

export const useTabState = (initialTab = "") => {
  const [activeTab, setActiveTab] = useState(initialTab);
  return { activeTab, setActiveTab };
};

export const TabButton = ({
  label,
  isActive = false,
  onClick,
  variant = "primary",
}) => {
  const buttonStyle = {
    background: isActive ? "rgb(156 165 186)" : "#9d1d26",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    lineHeight: 1.2,
    height: "auto",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: 500,
    borderRadius: "8px 8px 0px 0px",
       fontSize: 12,
 
  };

  const secondaryStyle = {
    background: isActive ? "#a4abb5" : "#e8e8e8",
    color: isActive ? "#fff" : "#333",
    border: "1px solid #d0d0d0",
    padding: "6px 12px",
    lineHeight: 1.1,
    height: "auto",
    borderRadius: 2,
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: 11,
  };

  return (
    <button
      onClick={onClick}
      style={variant === "secondary" ? secondaryStyle : buttonStyle}
    >
      {label}
    </button>
  );
};

export const TabContainer = ({
  tabs,
  activeTab,
  onTabChange,
  variant = "primary",
  containerStyle = {},
}) => {
  return (
    <div
      style={{ display: "flex", gap: 4, flexWrap: "wrap", ...containerStyle }}
    >
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          label={tab.label}
          isActive={activeTab === tab.key}
          onClick={() => onTabChange(tab.key)}
          variant={variant}
        />
      ))}
    </div>
  );
};
