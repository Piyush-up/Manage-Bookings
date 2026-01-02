import React, { useState, Suspense, lazy, useMemo, useCallback } from "react";
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
  Select,
} from "antd";
import { FooterDangerButton } from "../../common/FooterButton.jsx";
import FooterButtonGroup from "../../common/FooterButtonGroup";
import { useTabState, TabContainer } from "../../hooks/useTabState.jsx";
import tableColumns from "../../data/tableColumns.json";
import tableData from "../../data/tableData.json";
import uiData from "../../data/uiData.json";
import "./QuotationUI.css";
import {
  useFetchCitiesQuery,
  useLazyFetchSuppliersByCityQuery,
  useLazyFetchSuggestedOptionalTourResultQuery,
  useLazyFetchTourPackagesQuery,
} from "../../api/quotationApi.js";

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

  const columns = useMemo(() => tableColumns.quotationColumns, []);
  const dataSource = useMemo(() => tableData.quotationData, []);
  const requestItems = useMemo(() => uiData.requestItems, []);
  const [city, setCity] = useState("");
  const [nights, setNights] = useState(1);
  const [selectedCities, setSelectedCities] = useState([]);
  const { data: cities = [] } = useFetchCitiesQuery();

  const [triggerFetchTourPackages, { data: tourPackages = [] }] =
    useLazyFetchTourPackagesQuery();
  const [triggerFetchSuppliersByCity, { data: suppliers = [] }] =
    useLazyFetchSuppliersByCityQuery();
  const [
    triggerFetchSuggestedOptionalTourResult,
    { data: suggestedOptionalTourResult = [] },
  ] = useLazyFetchSuggestedOptionalTourResultQuery();

  const handleGo = async () => {
    if (!selectedCities.length) return;

    const cityCodes = Array.from(
      new Set(selectedCities.map((c) => c.cityCode))
    );
    try {
      await Promise.all([
        triggerFetchTourPackages().unwrap(),
        triggerFetchSuppliersByCity(cityCodes).unwrap(),
        triggerFetchSuggestedOptionalTourResult(cityCodes).unwrap(),
      ]);
    } catch (err) {
      console.error("Go action failed", err);
    }
  };

  const handleSelectCities = useCallback(() => {
    if (!city) return;

    setSelectedCities((prev) => [
      ...prev,
      { cityCode: city, nights: Number(nights) },
    ]);

    setCity("");
    setNights(1);
  }, [city, nights]);

  const renderMainTab = () => {
    switch (activeMainTab) {
      case "My Trip":
        return <MyTrip />;
      case "Suggested Trip":
        return (
          <Card>
            <Table
              size="small"
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              scroll={{ x: 800 }}
            />
          </Card>
        );
      case "Quote Sheet":
        return <QuoteSheet />;
      case "Offer Sheet":
        return <OfferSheet />;
      case "Conditions":
        return <Conditions />;
      case "Revenue Sheet":
        return <RevenueSheet />;
      case "Sales Sheet":
        return <SalesSheet />;
      case "ITL Sheet":
        return <ITLSheet />;
      case "Optional Tour":
        return <OptionalTour />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Header className="quotation-header">
        <Title
          level={4}
          className="quotation-header-title"
          style={{ color: "white" }}
        >
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
                      <Select
                        placeholder="Search cities"
                        style={{ width: "100%", height: 32 }}
                        options={cities.map((city) => ({
                          value: city.code,
                          label: city.name,
                        }))}
                        onChange={(value) => {
                          setCity(value);
                          console.log(value);
                        }}
                        value={city}
                        allowClear
                      />
                    </div>

                    <div style={{ width: 80 }}>
                      <Input
                        placeholder="Nights"
                        style={{ height: 32, textAlign: "center" }}
                        value={nights}
                        onChange={(e) => setNights(e.target.value)}
                      />
                    </div>
                    <FooterDangerButton onClick={handleSelectCities}>
                      +
                    </FooterDangerButton>
                    <FooterDangerButton onClick={handleGo}>
                      Go
                    </FooterDangerButton>
                    {["HTLS Map", "Supp Map", "CityRoute"].map((btn) => (
                      <FooterDangerButton key={btn} className="btn-map">
                        {btn}
                      </FooterDangerButton>
                    ))}
                  </div>
                </div>

                <div style={{ height: 10 }} />

                <Row gutter={[6, 6]}>
                  <Col md={6}>
                    <div className="selected-cities">
                      {selectedCities.length > 0 ? (
                        selectedCities.map((item, index) => {
                          const cityObj = cities.find(
                            (c) => c.code === item.cityCode
                          );

                          return (
                            <div key={index} className="selected-city">
                              <strong>{cityObj?.name}</strong>
                              <span style={{ marginLeft: 8 }}>
                                ({item.nights} nights)
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <div className="no-selected-cities">
                          No cities selected
                        </div>
                      )}
                    </div>
                  </Col>
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
                <Col xs={24} lg={16} style={{ backgroundColor: "white" }}>
                  <Suspense fallback={<Spin />}>{renderMainTab()}</Suspense>
                </Col>

                <Col xs={24} lg={8}>
                  <Suspense fallback={<Spin />}>
                    <Space
                      orientation="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <SuggestedTours
                        tours={tourPackages}
                        suppliers={suppliers}
                        days={suggestedOptionalTourResult}
                      />
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
