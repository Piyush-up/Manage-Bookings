import React, { Suspense, useMemo, useCallback } from "react";
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
  useLazyFetchGeoLocationsQuery,
  useLazyFetchSuppliersByGeoQuery,
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

import QuotationFilters from "../component/QuotationFilters.jsx";
import TripMap from "./hotelsMap/TripMap.jsx";

const RequestedITI = React.lazy(() => import("../component/RequestedITI.jsx"));
const EditService = React.lazy(() => import("../component/EditService.jsx"));
const SuggestedTours = React.lazy(() =>
  import("../component/suggestedTours/SuggestedTours.jsx")
);
const TourCostTable = React.lazy(() =>
  import("../component/tourCostTable/TourCostTable.jsx")
);
const MyTrip = React.lazy(() => import("../component/sheets/MyTrip.jsx"));
const QuoteSheet = React.lazy(() =>
  import("../component/sheets/QuoteSheet.jsx")
);
const OfferSheet = React.lazy(() =>
  import("../component/sheets/OfferSheet.jsx")
);
const Conditions = React.lazy(() => import("../component/Conditions.jsx"));
const RevenueSheet = React.lazy(() =>
  import("../component/sheets/RevenueSheet.jsx")
);
const SalesSheet = React.lazy(() =>
  import("../component/sheets/SalesSheet.jsx")
);
const ITLSheet = React.lazy(() => import("../component/sheets/ITLSheet.jsx"));
const OptionalTour = React.lazy(() =>
  import("../component/sheets/OptionalTour.jsx")
);

const MAP_BUTTONS = ["HTLS Map", "Supp Map", "CityRoute"];

const REQUEST_FIELDS = [
  "Request No",
  "Pax",
  "Free Pax",
  "Inquiry Date",
  "Dept Date",
];
const EXTRA_FIELDS = ["Arrival Date", "Termination Date", "Tour Name"];

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const QuotationUI = () => {
  const dispatch = useDispatch();

  const { searchCity, nights, selectedCities, isModalOpen, mapProps } =
    useSelector((state) => state.quotation);

  const { activeTab: activeMainTab, setActiveTab: setActiveMainTab } =
    useTabState("Suggested Trip");

  const { activeTab: activeRightTab, setActiveTab: setActiveRightTab } =
    useTabState("RequestedITI");

  const { data: cities = [] } = useFetchCitiesQuery();

  const [fetchTourPackages, { data: tourPackages = [] }] =
    useLazyFetchTourPackagesQuery();

  const [fetchSuppliersByCity, { data: suppliers = [] }] =
    useLazyFetchSuppliersByCityQuery();

  const [fetchSuggestedOptionalTours, { data: suggestedOptionalTours = [] }] =
    useLazyFetchSuggestedOptionalTourResultQuery();
  const [triggerFetchGeoLocations] = useLazyFetchGeoLocationsQuery();

  const [triggerFetchSuppliersByGeo] = useLazyFetchSuppliersByGeoQuery();

  const tableConfig = useMemo(
    () => ({
      columns: tableColumns.quotationColumns,
      dataSource: tableData.quotationData,
    }),
    []
  );

  const requestItems = useMemo(() => uiData.requestItems, []);

  const handleGo = useCallback(async () => {
    if (!selectedCities.length) return;

    const uniqueCityCodes = [...new Set(selectedCities.map((c) => c.cityCode))];

    try {
      await Promise.all([
        fetchTourPackages().unwrap(),
        fetchSuppliersByCity(uniqueCityCodes).unwrap(),
        fetchSuggestedOptionalTours(uniqueCityCodes).unwrap(),
      ]);
    } catch (error) {
      console.error("Quotation fetch failed:", error);
    }
  }, [
    selectedCities,
    fetchTourPackages,
    fetchSuppliersByCity,
    fetchSuggestedOptionalTours,
  ]);

  const handleAddCity = useCallback(() => {
    if (!searchCity) return;

    dispatch(addSelectedCity({ cityCode: searchCity, nights: Number(nights) }));
    dispatch(setSearchCity(""));
    dispatch(setNights(1));
  }, [dispatch, searchCity, nights]);

  const handleRemoveCity = useCallback(
    (cityCode) => {
      dispatch(removeSelectedCity(cityCode));
    },
    [dispatch]
  );

  const handleMapClick = useCallback(
    async (mapType, cityName) => {
      if (!cityName) {
        console.warn("No city provided for map");
        return;
      }

      try {
        switch (mapType) {
          case "HTLS Map": {
            const htlsData = await triggerFetchGeoLocations(cityName).unwrap();
            dispatch(openMap({ type: "htls", data: htlsData }));
            break;
          }

          case "Supp Map": {
            const mapData = await triggerFetchSuppliersByGeo(cityName).unwrap();
            dispatch(openMap({ type: "supplier", data: mapData }));
            break;
          }

          case "CityRoute":
            dispatch(openMap({ type: "route", data: null }));
            break;

          default:
            console.warn(`Unhandled map type: ${mapType}`);
        }
      } catch (error) {
        console.error("Map API failed:", error);
      }
    },
    [dispatch, triggerFetchGeoLocations, triggerFetchSuppliersByGeo]
  );

  const handleCloseMap = useCallback(() => {
    dispatch(closeMap());
  }, [dispatch]);

  /* ---------------- Renderers ---------------- */

  const renderMainTab = () => {
    switch (activeMainTab) {
      case "My Trip":
        return <MyTrip />;
      case "Suggested Trip":
        return (
          <Card>
            <Table
              size="small"
              pagination={false}
              scroll={{ x: 800 }}
              columns={tableConfig.columns}
              dataSource={tableConfig.dataSource}
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

  const hotelMapMenuItems = useMemo(() => {
    return cities
      .filter((city) =>
        selectedCities.some((selected) => selected.cityCode === city.code)
      )
      .map((city) => city.name);
  }, [cities, selectedCities]);

  return (
    <Layout>
      <Header className="quotation-header">
        <Title level={4} className="quotation-header-title">
          TUMLARE DESTINATION MANAGEMENT
        </Title>
      </Header>

      <Content style={{ padding: 16 }}>
        <Row gutter={64}>
          <Col xs={24} lg={18}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
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
                <Col xs={24} lg={16} className="white-box">
                  <Suspense fallback={<Spin />}>{renderMainTab()}</Suspense>
                </Col>

                <Col xs={24} lg={8}>
                  <Suspense fallback={<Spin />}>
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <SuggestedTours
                        tours={tourPackages}
                        suppliers={suppliers}
                        days={suggestedOptionalTours}
                      />
                      <TourCostTable />
                    </Space>
                  </Suspense>
                </Col>
              </Row>
            </Space>
          </Col>

          <Col xs={24} lg={6} className="quotation-right-panel">
            <TabContainer
              tabs={uiData.rightTabs.map((tab) => ({
                key: tab,
                label:
                  tab === "RequestedITI" ? "Requested ITI" : "Edit Service",
              }))}
              activeTab={activeRightTab}
              onTabChange={setActiveRightTab}
            />

            <div className="right-panel-body">
              <Suspense fallback={<Spin />}>
                {activeRightTab === "RequestedITI" && (
                  <RequestedITI items={requestItems} />
                )}
                {activeRightTab === "EditService" && <EditService />}
              </Suspense>

              {!["RequestedITI", "EditService"].includes(activeRightTab) && (
                <div className="right-scroll-box">
                  {requestItems.map((item, index) => (
                    <div key={index} className="right-scroll-item">
                      <Text>{item}</Text>
                    </div>
                  ))}
                </div>
              )}
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
        onOk={handleCloseMap}
        onCancel={handleCloseMap}
        width={{
          xs: "90%",
          sm: "80%",
          md: "80%",
          lg: "80%",
          xl: "70%",
          xxl: "70%",
        }}
      >
        {mapProps?.type === "htls" || mapProps?.type === "supplier" ? (
          <HotelsMap data={mapProps?.data} type={mapProps?.type} />
        ) : mapProps?.type === "route" ? (
          <TripMap selectedCities={hotelMapMenuItems} />
        ) : (
          <Spin tip="Loading map..." />
        )}
      </Modal>
    </Layout>
  );
};

export default QuotationUI;
