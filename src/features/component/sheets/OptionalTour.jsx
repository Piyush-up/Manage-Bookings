import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const OptionalTour = () => {
  return (
    <Card size="small">
      <Title level={5}>Optional Tour</Title>
      <Text>Optional tour details will be displayed here.</Text>
    </Card>
  );
};

export default OptionalTour;
