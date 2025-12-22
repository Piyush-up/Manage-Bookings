import React, { Suspense, lazy } from "react";
import {
  Layout,
  Input,
  DatePicker,
  Row,
  Col,
  Table,
  Typography,
  Space,
  Card,
  Spin,
} from "antd";
import Button from "../../common/Button.jsx";
import FooterButtonGroup from "../../common/FooterButtonGroup";
import { useTabState, TabContainer } from "../../hooks/useTabState.jsx";
import tableColumns from "../../data/tableColumns.json";
import tableData from "../../data/tableData.json";
import uiData from "../../data/uiData.json";
import "./QuotationUI.css";

const RequestedITI = lazy(() => import("./RequestedITI"));
const EditService = lazy(() => import("./EditService"));
const SuggestedTours = lazy(() => import("./SuggestedTours"));
const TourCostTable = lazy(() => import("./TourCostTable"));
const MyTrip = lazy(() => import("./MyTrip"));
const QuoteSheet = lazy(() => import("./QuoteSheet"));
const OfferSheet = lazy(() => import("./OfferSheet"));
const Conditions = lazy(() => import("./Conditions"));
const RevenueSheet = lazy(() => import("./RevenueSheet"));
const SalesSheet = lazy(() => import("./SalesSheet"));
const ITLSheet = lazy(() => import("./ITLSheet"));
const OptionalTour = lazy(() => import("./OptionalTour"));

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const QuotationUI = () => {
  const { activeTab: activeMainTab, setActiveTab: setActiveMainTab } =
    useTabState("Suggested Trip");
  const { activeTab: rightTab, setActiveTab: setRightTab } =
    useTabState("RequestedITI");

  const columns = tableColumns.quotationColumns;
  const dataSource = tableData.quotationData;
  const requestItems = uiData.requestItems;

  return (
    <Layout >
      <Header
        style={{
          background:
            "#1b176e",
          display: "flex",
          alignItems: "center",
          paddingInline: 24,
        }}
      >
        <Title level={4} style={{ color: "#fff", margin: 0 }}>
          TUMLARE DESTINATION MANAGEMENT
        </Title>
      </Header>

      <Content style={{ padding: 16 }}>
        <Row gutter={64}>
          <Col xs={24} lg={18}>
            <Space
              orientation="vertical"
              size="middle"
              style={{ width: "100%" }}
            >
              <div className="filters-wrapper">
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "flex-end" }}
                  >
                    <div style={{ width: 140 }}>
                      <DatePicker style={{ width: "100%", height: 32 }} />
                    </div>

                    <div style={{ flex: 1, minWidth: 200 }}>
                      <Input
                        placeholder="Search cities"
                        style={{ height: 32 }}
                      />
                    </div>

                    <div style={{ width: 80 }}>
                      <Input
                        placeholder="Nights"
                        style={{ height: 32, textAlign: "center" }}
                      />
                    </div>
                    <Button className="btn-add">+</Button>
                    <Button className="btn-go">Go</Button>
                    {["HTLS Map", "Supp Map", "CityRoute"].map((btn) => (
                      <Button key={btn} className="btn-map">{btn}</Button>
                    ))}
                  </div>
                </div>

                <div style={{ height: 10 }} />

                <Row gutter={[6, 6]}>
                  <Col md={6}></Col>
                  <Col md={18}>
                    <Row style={{ border: "1px solid #e9e9e9" }}>
                      {[
                        "Request No",
                        "Pax",
                        "Free Pax",
                        "Inquiry Date",
                        "Dept Date",
                      ].map((label, index) => (
                        <Col
                          key={index}
                          xs={24}
                          sm={12}
                          md={10}
                          lg={8}
                          xl={6}
                          className="field-col"
                        >
                          <div className="field-row">
                            <div className="field-label">{label}</div>
                            {label.includes("Date") ? (
                              <DatePicker
                                style={{ width: "100%", height: 32 }}
                              />
                            ) : (
                              <Input style={{ width: "100%", height: 32 }} />
                            )}
                          </div>
                        </Col>
                      ))}

                      <Col
                        className="field-col"
                        xs={24}
                        sm={12}
                        md={10}
                        lg={8}
                        xl={6}
                      >
                        <div className="field-row">
                          <div className="field-label">Arrival Date</div>
                          <DatePicker style={{ width: "100%", height: 32 }} />
                        </div>
                      </Col>

                      <Col
                        className="field-col"
                        xs={24}
                        sm={12}
                        md={10}
                        lg={8}
                        xl={6}
                      >
                        <div className="field-row">
                          <div className="field-label">Termination Date</div>
                          <DatePicker style={{ width: "100%", height: 32 }} />
                        </div>
                      </Col>

                      <Col
                        className="field-col"
                        xs={24}
                        sm={12}
                        md={10}
                        lg={8}
                        xl={6}
                      >
                        <div className="field-row">
                          <div className="field-label">Tour Name</div>
                          <Input style={{ width: "100%", height: 32 }} />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row gutter={[6, 6]} style={{ marginTop: 6 }}></Row>
              </div>

              <Card styles={{ body: { paddingBlock: 8, paddingInline: 16 } }}>
                <TabContainer
                  tabs={uiData.tabs.map((tab) => ({ key: tab, label: tab }))}
                  activeTab={activeMainTab}
                  onTabChange={setActiveMainTab}
                />
              </Card>

              <Row gutter={16}>
                <Col xs={24} lg={16}>
                  <Suspense fallback={<Spin />}>
                    {activeMainTab === "My Trip" && <MyTrip />}
                    {activeMainTab === "Suggested Trip" && (
                      <Card>
                        <Table
                          size="small"
                          columns={columns}
                          dataSource={dataSource}
                          pagination={false}
                          scroll={{ x: 800 }}
                        />
                      </Card>
                    )}
                    {activeMainTab === "Quote Sheet" && <QuoteSheet />}
                    {activeMainTab === "Offer Sheet" && <OfferSheet />}
                    {activeMainTab === "Conditions" && <Conditions />}
                    {activeMainTab === "Revenue Sheet" && <RevenueSheet />}
                    {activeMainTab === "Sales Sheet" && <SalesSheet />}
                    {activeMainTab === "ITL Sheet" && <ITLSheet />}
                    {activeMainTab === "Optional Tour" && <OptionalTour />}
                  </Suspense>
                </Col>

                <Col xs={24} lg={8}>
                  <Suspense fallback={<Spin />}>
                    <Space
                      orientation="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <SuggestedTours />
                      <TourCostTable />
                    </Space>
                  </Suspense>
                </Col>
              </Row>
            </Space>
          </Col>

          <Col
            xs={24}
            lg={6}
            style={{ border: "1px solid #e9e9e9", padding: "10px" }}
          >
            <div size="small">
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                <TabContainer
                  tabs={uiData.rightTabs.map((tab) => ({
                    key: tab,
                    label:
                      tab === "RequestedITI" ? "RequestedITI" : "Edit Service",
                  }))}
                  activeTab={rightTab}
                  onTabChange={setRightTab}
                />
              </div>
              <div style={{ marginTop: 12 }}>
                <Suspense fallback={<Spin />}>
                  {rightTab === "RequestedITI" ? (
                    <RequestedITI items={requestItems} />
                  ) : rightTab === "EditService" ? (
                    <EditService />
                  ) : null}
                </Suspense>

                {!["RequestedITI", "EditService"].includes(rightTab) && (
                  <div
                    style={{
                      border: "1px solid #f0f0f0",
                      borderRadius: 4,
                      maxHeight: 260,
                      overflowY: "auto",
                    }}
                  >
                    {requestItems.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "8px 12px",
                          borderBottom:
                            idx < requestItems.length - 1
                              ? "1px solid #f0f0f0"
                              : "none",
                          cursor: "pointer",
                        }}
                      >
                        <Text>{item}</Text>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Content>

      <Footer className="quotation-footer">
        <FooterButtonGroup />
      </Footer>
    </Layout>
  );
};

export default QuotationUI;
