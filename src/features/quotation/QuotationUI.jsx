import React, { Suspense, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Layout,
  Row,
  Col,
  Table,
  Typography,
  Space,
  Card,
  Spin,
  Modal,
} from "antd";

import FooterButtonGroup from "../../common/FooterButtonGroup/FooterButtonGroup.jsx";
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

import HotelsMap from "./hotelsMap/HotelsMap.jsx";
import {
  addSelectedCity,
  removeSelectedCity,
  openMap,
  closeMap,
  setSearchCity,
  setNights,
} from "../../store/slices/quotationSlice.js";
import QuotationFilters from "./../component/QuotationFilters.jsx";
// Lazy loaded components
const RequestedITI = React.lazy(() =>
  import("./../component/RequestedITI.jsx")
);
const EditService = React.lazy(() => import("../component/EditService.jsx"));
const SuggestedTours = React.lazy(() =>
  import("././../component/suggestedTours/SuggestedTours.jsx")
);
import mapData from "../../data/mapData.json";

const TourCostTable = React.lazy(() =>
  import("./../component/tourCostTable/TourCostTable.jsx")
);
const MyTrip = React.lazy(() => import("././../component/sheets/MyTrip.jsx"));
const QuoteSheet = React.lazy(() =>
  import("././../component/sheets/QuoteSheet.jsx")
);
const OfferSheet = React.lazy(() =>
  import("././../component/sheets/OfferSheet.jsx")
);
const Conditions = React.lazy(() => import("././../component/Conditions.jsx"));
const RevenueSheet = React.lazy(() =>
  import("././../component/sheets/RevenueSheet.jsx")
);
const SalesSheet = React.lazy(() =>
  import("././../component/sheets/SalesSheet.jsx")
);
const ITLSheet = React.lazy(() =>
  import("././../component/sheets/ITLSheet.jsx")
);
const OptionalTour = React.lazy(() =>
  import("././../component/sheets/OptionalTour.jsx")
);

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const QuotationUI = () => {
  const dispatch = useDispatch();
  const { activeTab: activeMainTab, setActiveTab: setActiveMainTab } =
    useTabState("Suggested Trip");
  const { activeTab: rightTab, setActiveTab: setRightTab } =
    useTabState("RequestedITI");
  const { htlsData, supplierData } = mapData;

  
  const { searchCity, nights, selectedCities, isModalOpen, mapProps } =
    useSelector((state) => state.quotation);

  const columns = useMemo(() => tableColumns.quotationColumns, []);
  const dataSource = useMemo(() => tableData.quotationData, []);
  const requestItems = useMemo(() => uiData.requestItems, []);
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

 
  const handleAddCity = () => {
    if (!searchCity) return;
    dispatch(addSelectedCity({ cityCode: searchCity, nights: Number(nights) }));
    dispatch(setSearchCity(""));
    dispatch(setNights(1));
  };

 
  const handleRemoveCity = (cityCode) => {
    dispatch(removeSelectedCity(cityCode));
  };

  
  const handleMapClick = (btn) => {
    switch (btn) {
      case "HTLS Map":
        dispatch(openMap({ type: "htls", data: htlsData }));
        break;
      case "Supp Map":
        dispatch(openMap({ type: "supplier", data: supplierData }));
        break;
      case "CityRoute":
        dispatch(openMap({ type: "route", data: null }));
        break;
      default:
        console.log("Other button clicked:", btn);
    }
  };

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

  const MAP_BUTTONS = ["HTLS Map", "Supp Map", "CityRoute"];

  const REQUEST_FIELDS = [
    "Request No",
    "Pax",
    "Free Pax",
    "Inquiry Date",
    "Dept Date",
  ];

  const EXTRA_FIELDS = ["Arrival Date", "Termination Date", "Tour Name"];

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
              <QuotationFilters
                cities={cities}
                searchCity={searchCity}
                nights={nights}
                selectedCities={selectedCities}
                REQUEST_FIELDS={REQUEST_FIELDS}
                EXTRA_FIELDS={EXTRA_FIELDS}
                MAP_BUTTONS={MAP_BUTTONS}
                onSearchCityChange={(value) => dispatch(setSearchCity(value))}
                onNightsChange={(value) => dispatch(setNights(value))}
                onAddCity={handleAddCity}
                onGo={handleGo}
                onMapClick={handleMapClick}
                onRemoveCity={handleRemoveCity}
              />

              
              <Card styles={{ body: { paddingBlock: 8, paddingInline: 16 } }}>
                <TabContainer
                  tabs={uiData.tabs.map((tab) => ({ key: tab, label: tab }))}
                  activeTab={activeMainTab}
                  onTabChange={setActiveMainTab}
                />
              </Card>

            
              <Row gutter={16}>
                <Col
                  xs={24}
                  lg={16}
                  style={{ backgroundColor: "white", borderRadius: 4 }}
                >
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

      <Modal
        title={`Common Map - ${mapProps?.type ?? ""}`}
        open={isModalOpen}
        onOk={() => dispatch(closeMap())}
        onCancel={() => dispatch(closeMap())}
        width={{
          xs: '90%',
          sm: '80%',
          md: '80%',
          lg: '80%',
          xl: '70%',
          xxl: '70%',
        }}
      >
        {mapProps?.data ? (
          <HotelsMap type={mapProps.type} data={mapProps.data} />
        ) : (
          <Spin tip="Loading map..." />
        )}
      </Modal>
    </Layout>
  );
};

export default QuotationUI;
