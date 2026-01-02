import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const OfferSheet = () => {
  return (
    <Card size="small">
      <Title level={5}>Offer Sheet</Title>
      <Text>Offer sheet details will be displayed here.</Text>
    </Card>
  );
};

export default OfferSheet;
