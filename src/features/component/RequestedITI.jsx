import React from "react";
import { Card, Typography, Button } from "antd";
import "./RequestedITI.css";

const { Text, Title } = Typography;

const RequestedITI = ({ items = [] }) => {
  const renderItemList = (items) => {
    return (
      <div className="items-list-container">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`item-row ${idx % 2 === 0 ? "alternate-bg" : ""}`}
          >
            <Text>{item}</Text>
            
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card
      size="small"
      className="requested-iti-container"
      title={
        <Title level={5} className="requested-iti-title">
          Requested ITI
        </Title>
      }
    >
      <div className="requested-iti-content">
        {items.length === 0 ? (
          <Text style={{ color: "#999" }}>No items requested yet</Text>
        ) : (
          renderItemList(items)
        )}
      </div>
    </Card>
  );
};

export default RequestedITI;
