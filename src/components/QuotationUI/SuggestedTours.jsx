import React, { useState } from "react";
import { Card, Typography, Button } from "antd";

import suggestedToursConfig from "../../data/suggestedToursConfig.json";
import { TabContainer } from "../../hooks/useTabState.jsx";
import "./SuggestedTours.css";

const { Text } = Typography;

const SuggestedTours = () => {
  const [selectedMode, setSelectedMode] = useState("tour");
  const { modeButtons, suggestedToursData } = suggestedToursConfig;
  const { tours, suppliers, days } = suggestedToursData;

  const renderItemList = (items, mode) => {
    let displayItems = [];

    if (mode === "tour") {
      displayItems = items.map((item) => ({
        key: item.id,
        label: `${item.name} – ${item.description}`,
      }));
    } else if (mode === "supplier") {
      displayItems = items.map((item) => ({
        key: item.id,
        label: `${item.name} – ${item.status}`,
      }));
    } else if (mode === "days") {
      displayItems = items.map((item) => ({
        key: item.id,
        label: `${item.duration} Days – ${item.price} ${item.currency} per person`,
      }));
    }

    return (
      <div className="items-list-container">
        {displayItems.map((item, idx) => (
          <div
            key={item.key}
            className={`item-row ${idx % 2 === 0 ? "alternate-bg" : ""}`}
          >
            <Text>{item.label}</Text>
            {/* <Button type="text" size="small" className="item-select-btn">
              Select
            </Button> */}
          </div>
        ))}
      </div>
    );
  };

  const getItemsForMode = () => {
    switch (selectedMode) {
      case "supplier":
        return suppliers;
      case "days":
        return days;
      default:
        return tours;
    }
  };

  return (
    <Card styles={{ body: { padding: 12, paddingBottom: 0 } }} size="small">
      <div style={{ marginBottom: 12 }}>
      
        <TabContainer
          tabs={modeButtons.map((btn) => ({ key: btn.key, label: btn.label }))}
          activeTab={selectedMode}
          onTabChange={setSelectedMode}
          containerStyle={{ marginBottom: 0 }}
        />
      </div>
      <div>{renderItemList(getItemsForMode(), selectedMode)}</div>
    </Card>
  );
};

export default SuggestedTours;
