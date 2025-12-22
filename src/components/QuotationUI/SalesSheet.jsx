import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const SalesSheet = () => {
  return (
    <Card size="small">
      <Title level={5}>Sales Sheet</Title>
      <Text>Sales sheet details will be displayed here.</Text>
    </Card>
  );
};

export default SalesSheet;
