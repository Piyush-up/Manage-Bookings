import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const QuoteSheet = () => {
  return (
    <Card size="small">
      <Title level={5}>Quote Sheet</Title>
      <Text>Quote sheet details will be displayed here.</Text>
    </Card>
  );
};

export default QuoteSheet;
