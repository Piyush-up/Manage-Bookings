import React, { useMemo } from "react";
import {
  Row,
  Col,
  DatePicker,
  Select,
  Input,
  InputNumber,
  Dropdown,
} from "antd";
import { DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { FooterDangerButton } from "../../common/FooterButton/FooterButton.jsx";
import "../quotation/QuotationUI.css";

const QuotationFilters = ({
  cities = [],
  searchCity,
  nights,
  selectedCities = [],
  REQUEST_FIELDS = [],
  EXTRA_FIELDS = [],
  MAP_BUTTONS = [],
  onSearchCityChange,
  onNightsChange,
  onAddCity,
  onGo,
  onMapClick,
  onRemoveCity,
}) => {
  /* ----------------------------- Derived Data ----------------------------- */

  const hotelMapMenuItems = useMemo(() => {
    return cities
      .filter((city) =>
        selectedCities.some((selected) => selected.cityCode === city.code)
      )
      .map((city, index) => ({
        key: city.name,
        label: city.name,
      }));
  }, [cities, selectedCities]);

  const citySelectOptions = useMemo(() => {
    return cities.map((city) => ({
      value: city.code,
      label: city.name,
    }));
  }, [cities]);

  const renderMapButtons = () =>
    MAP_BUTTONS.map((mapType) => {
      if (mapType === "HTLS Map") {
        return (
          <Dropdown
            key={mapType}
            disabled={!hotelMapMenuItems.length}
            menu={{
              items: hotelMapMenuItems.length
                ? hotelMapMenuItems
                : [
                    {
                      key: "no-city",
                      label: "No cities selected",
                      disabled: true,
                    },
                  ],
              onClick: ({ key }) => onMapClick("HTLS Map", key),
            }}
          >
            <FooterDangerButton className="btn-map">
              HTLS Map <DownOutlined />
            </FooterDangerButton>
          </Dropdown>
        );
      }

      if (mapType === "Supp Map") {
        return (
          <Dropdown
            key={mapType}
            menu={{
              items: hotelMapMenuItems,
              onClick: ({ key }) => onMapClick("Supp Map", key),
            }}
            disabled={!hotelMapMenuItems.length}
          >
            <FooterDangerButton className="btn-map">
              Supp Map <DownOutlined />
            </FooterDangerButton>
          </Dropdown>
        );
      }

      return (
        <FooterDangerButton
          key={mapType}
          className="btn-map"
          onClick={() => onMapClick(mapType, "cityroute")}
        >
          {mapType}
        </FooterDangerButton>
      );
    });

  /* ------------------------------- UI ------------------------------- */

  return (
    <div className="filters-wrapper">
      {/* ---------- Top Filter Bar ---------- */}
      <div className="filters-top">
        <div className="filters-left">
          <DatePicker className="w-140" />

          <Select
            placeholder="Search cities"
            showSearch
            allowClear
            options={citySelectOptions}
            value={searchCity}
            onChange={onSearchCityChange}
            filterOption={(input, option) =>
              option?.label?.toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: "200px" }}
            className="w-90"
          />

          <InputNumber
            placeholder="Nights"
            min={1}
            value={nights}
            onChange={onNightsChange}
            className="w-80"
          />

          {/* ✅ Button spacing handled here */}
          <div className="filters-actions">
            <FooterDangerButton onClick={onAddCity}>Add</FooterDangerButton>
            <FooterDangerButton onClick={onGo}>Go</FooterDangerButton>
            {renderMapButtons()}
          </div>
        </div>
      </div>

      <div style={{ height: 10 }} />

      <Row gutter={[6, 6]}>
        {/* ---------- Selected Cities ---------- */}
        <Col md={6}>
          <div className="selected-cities">
            {selectedCities.length ? (
              selectedCities.map((selectedCity) => {
                const cityDetails = cities.find(
                  (city) => city.code === selectedCity.cityCode
                );

                return (
                  <div key={selectedCity.cityCode} className="selected-city">
                    <strong>
                      {cityDetails?.name || selectedCity.cityCode}
                    </strong>
                    <span> ({selectedCity.nights} nights)</span>

                    <DeleteOutlined
                      className="delete-icon"
                      onClick={() => onRemoveCity(selectedCity.cityCode)}
                    />
                  </div>
                );
              })
            ) : (
              <div className="no-selected-cities">No cities selected</div>
            )}
          </div>
        </Col>

        {/* ---------- Request Fields ---------- */}
        <Col md={18}>
          <Row className="request-box">
            {[...REQUEST_FIELDS, ...EXTRA_FIELDS].map((fieldLabel, index) => (
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
                  <div className="field-label">{fieldLabel}</div>

                  {fieldLabel.includes("Date") ? (
                    <DatePicker className="field-input" />
                  ) : (
                    <Input className="field-input" />
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(QuotationFilters);
