import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const ITLSheet = () => {
  return (
    <Card size="small">
      <Title level={5}>ITL Sheet</Title>
      <Text>ITL sheet details will be displayed here.</Text>
    </Card>
  );
};

export default ITLSheet;
