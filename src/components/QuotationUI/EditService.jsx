import React, { useState } from "react";
import { Card, Typography, Button } from "antd";
import "./EditService.css";

const { Title } = Typography;

const EditService = ({ onAdd = () => {}, onSave = () => {} }) => {
  const [formData, setFormData] = useState({
    twb: "value",
    ss: "value",
    driverRoom: "value",
    dRoomPrice: "value",
    bathTubAvailable: "Yes",
    manualServiceName: "value",
    serviceText: "value",
    priceText: "value",
    editedPriceText: "value",
    breakfast: "value",
    breakfastPrice: "value",
    lunch: "value",
    lunchPrice: "value",
    dinner: "value",
    dinnerPrice: "value",
    luggage: "value",
    luggagePrice: "value",
    tsu: "value",
    thirdRed: "value",
    guideRooms: "value",
    gRoomPrice: "value",
  });

  return (
    <Card
      size="small"
      title={
        <div className="edit-service-header">
          <Title level={5} style={{ margin: 0 }}>
            PriceRequest
          </Title>
          <Button
            danger
            size="small"
            style={{
              background: "#d9534f",
              color: "#fff",
              border: "none",
              height: 28,
            }}
          >
            ↓
          </Button>
        </div>
      }
    >
      <div className="edit-service-form">
        <table className="price-request-table">
          <tbody>
            <tr>
              <td className="label">TWB</td>
              <td className="value">_____________</td>
              <td className="label">TSU</td>
              <td className="value">_____________</td>
              <td className="label"></td>
            </tr>
            <tr>
              <td className="label">SS</td>
              <td className="value">_____________</td>
              <td className="label">3rd Red</td>
              <td className="value">_____________</td>
              <td className="label"></td>
            </tr>
            <tr>
              <td className="label">Driver Room</td>
              <td className="value">_____________</td>
              <td className="label">
                Guide
                <br />
                Rooms
              </td>
              <td className="value">_____________</td>
              <td className="label"></td>
            </tr>
            <tr>
              <td className="label">D Room Price</td>
              <td className="value">_____________</td>
              <td className="label">
                G Room
                <br />
                Price
              </td>
              <td className="value">_____________</td>
              <td className="label"></td>
            </tr>
          </tbody>
        </table>

        <div className="form-section">
          <div className="section-item">
            <span className="label">Bath tub available in hotel</span>
          </div>
          <div className="section-item">
            <span className="label">
              Manual service
              <br />
              name
            </span>
            <span className="value">_____________</span>
          </div>
          <div className="section-item">
            <span className="label">Service Text</span>
          </div>
        </div>

        <div className="form-section">
          <div className="section-item">
            <span className="label">Price text</span>
          </div>
          <div className="section-item price-input">
            <span className="value">_____________</span>
          </div>
        </div>

        <div className="form-section">
          <div className="section-item">
            <span className="label">Editted Price Text</span>
            <span className="value">_____________</span>
          </div>
        </div>
        <table className="price-request-table">
          <tbody>
            <tr>
              <td className="label">Breakfast</td>
              <td className="value">_____________</td>
              <td className="label">Price</td>
              <td className="value">_____________</td>
              <td className="label"></td>
            </tr>
            <tr>
              <td className="label">Lunch</td>
              <td className="value">_____________</td>
              <td className="label">Price</td>
              <td className="value">_____________</td>
              <td className="label"></td>
            </tr>
            <tr>
              <td className="label">Dinner</td>
              <td className="value">_____________</td>
              <td className="label">Price</td>
              <td className="value">_____________</td>
              <td className="label"></td>
            </tr>
            <tr>
              <td className="label">Luggage</td>
              <td className="value">_____________</td>
              <td className="label">Price</td>
              <td className="value">_____________</td>
              <td className="label"></td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: 16 }}>
          <Button
            size="small"
            onClick={onAdd}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Add
          </Button>
          <Button size="small" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EditService;
