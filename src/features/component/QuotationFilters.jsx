import React from "react";
import {
  Row,
  Col,
  DatePicker,
  Select,
  Input,
  InputNumber,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FooterDangerButton } from "../../common/FooterButton/FooterButton.jsx";
import "../quotation/QuotationUI.css";
const QuotationFilters = ({
  cities,
  searchCity,
  nights,
  selectedCities,
  REQUEST_FIELDS,
  EXTRA_FIELDS,
  MAP_BUTTONS,

  onSearchCityChange,
  onNightsChange,
  onAddCity,
  onGo,
  onMapClick,
  onRemoveCity,
}) => {
  return (
    <div className="filters-wrapper">
      {/* Top Filters */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <div style={{ width: 140 }}>
            <DatePicker style={{ width: "100%", height: 32 }} />
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <Select
              placeholder="Search cities"
              showSearch
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: "100%", height: 32 }}
              options={cities.map((city) => ({
                value: city.code,
                label: city.name,
              }))}
              value={searchCity}
              onChange={onSearchCityChange}
              allowClear
            />
          </div>

          <div style={{ width: 80 }}>
            <InputNumber
              placeholder="Nights"
              style={{ width: "100%", height: 32 }}
              value={nights}
              min={1}
              onChange={onNightsChange}
            />
          </div>

          <FooterDangerButton onClick={onAddCity}>+</FooterDangerButton>
          <FooterDangerButton onClick={onGo}>Go</FooterDangerButton>

          {MAP_BUTTONS.map((btn) => (
            <FooterDangerButton
              key={btn}
              className="btn-map"
              onClick={() => onMapClick(btn)}
            >
              {btn}
            </FooterDangerButton>
          ))}
        </div>
      </div>

      {/* Selected Cities + Request Fields */}
      <div style={{ height: 10 }} />

      <Row gutter={[6, 6]}>
        {/* Selected Cities */}
        <Col md={6}>
          <div className="selected-cities">
            {selectedCities.length ? (
              selectedCities.map((item) => {
                const cityObj = cities.find(
                  (c) => c.code === item.cityCode
                );
                return (
                  <div key={item.cityCode} className="selected-city">
                    <strong>{cityObj?.name}</strong>
                    <span style={{ marginLeft: 8 }}>
                      ({item.nights} nights)
                    </span>
                    <DeleteOutlined
                      style={{
                        marginLeft: 8,
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => onRemoveCity(item.cityCode)}
                    />
                  </div>
                );
              })
            ) : (
              <div className="no-selected-cities">No cities selected</div>
            )}
          </div>
        </Col>

        {/* Request Fields */}
        <Col md={18}>
          <Row style={{ border: "1px solid #e9e9e9" }}>
            {[...REQUEST_FIELDS, ...EXTRA_FIELDS].map((label, index) => (
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
                    <DatePicker style={{ width: "100%", height: 32 }} />
                  ) : (
                    <Input style={{ width: "100%", height: 32 }} />
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

export default QuotationFilters;
