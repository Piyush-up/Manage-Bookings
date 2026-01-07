import React from "react";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FooterDangerButton } from "../../common/FooterButton/FooterButton";

/* ================= MENU ITEMS ================= */

const HTLS_MAP_ITEMS = [
  {
    key: "htls-view",
    label: "View HTLS Map",
  },
  {
    key: "htls-export",
    label: "Export HTLS Map",
  },
];

const SUPP_MAP_ITEMS = [
  {
    key: "supp-view",
    label: "View Supplier Map",
  },
  {
    key: "supp-export",
    label: "Export Supplier Map",
    danger: true,
  },
];

/* ================= COMPONENT ================= */

const QuotationMapButtons = ({ onMapClick }) => {
  return (
    <>
      {/* HTLS MAP DROPDOWN */}
      <Dropdown
        menu={{
          items: HTLS_MAP_ITEMS,
          onClick: ({ key }) => onMapClick("HTLS Map", key),
        }}
      >
        <FooterDangerButton className="btn-map">
          HTLS Map <DownOutlined />
        </FooterDangerButton>
      </Dropdown>

      {/* SUPP MAP DROPDOWN */}
      <Dropdown
        menu={{
          items: SUPP_MAP_ITEMS,
          onClick: ({ key }) => onMapClick("Supp Map", key),
        }}
      >
        <FooterDangerButton className="btn-map">
          Supp Map <DownOutlined />
        </FooterDangerButton>
      </Dropdown>

      {/* CITY ROUTE NORMAL BUTTON */}
      <FooterDangerButton
        className="btn-map"
        onClick={() => onMapClick("CityRoute")}
      >
        CityRoute
      </FooterDangerButton>
    </>
  );
};

export default QuotationMapButtons;
