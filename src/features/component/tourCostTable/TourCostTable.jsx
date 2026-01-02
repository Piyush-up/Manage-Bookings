import React from "react";
import { Card, Table, Typography } from "antd";

const { Text } = Typography;

const TourCostTable = () => {
  const tourCostColumns = [
    { title: "Type", dataIndex: "type", width: 80 },
    { title: "Currency", dataIndex: "currency", width: 80 },
    { title: "Avg(P)", dataIndex: "avgP", align: "right", width: 80 },
    { title: "Avg(C)", dataIndex: "avgC", align: "right", width: 80 },
  ];

  const tourCostData = [
    {
      key: 1,
      type: "RST",
      currency: "DKK",
      avgP: 8,
      avgC: 0,
    },
  ];

  return (
    <Card
      size="small"
      title={<Text strong>Tour Cost PP</Text>}
      styles={{ body: { padding: 12 } }}
    >
      <Table
        size="small"
        columns={tourCostColumns}
        dataSource={tourCostData}
        pagination={false}
      />
    </Card>
  );
};

export default TourCostTable;
