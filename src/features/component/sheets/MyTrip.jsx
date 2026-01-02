import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const MyTrip = () => {
  return (
    <Card size="small">
      <Title level={5}>My Trip</Title>
      <Text>Trip details and information will be displayed here.</Text>
    </Card>
  );
};

export default MyTrip;
