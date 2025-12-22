import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const RevenueSheet = () => {
  return (
    <Card size="small">
      <Title level={5}>Revenue Sheet</Title>
      <Text>Revenue sheet details will be displayed here.</Text>
    </Card>
  );
};

export default RevenueSheet;
