import React, { useState, useCallback, useMemo } from "react";
import { Card, Typography, Collapse, Checkbox, Spin } from "antd";
import { TabContainer } from "../../hooks/useTabState.jsx";
import suggestedToursConfig from "../../data/suggestedToursConfig.json";
import { useLazyFetchDaysDataQuery } from "../../api/quotationApi.js";
import "./SuggestedTours.css";

const { Text } = Typography;
const { Panel } = Collapse;

const SuggestedTours = ({ tours = [], suppliers = [], days = [] }) => {
  const [selectedMode, setSelectedMode] = useState("tour");
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const { modeButtons } = suggestedToursConfig;

  const [triggerFetchDays, { data: daysApiData = [], isFetching }] =
    useLazyFetchDaysDataQuery();

  /* ---------------- SIMPLE LIST ---------------- */
  const renderSimpleList = useCallback((items, mode) => {
    if (!items?.length) return <Text>No data available</Text>;

    return (
      <div className="items-list-container">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`item-row ${idx % 2 === 0 ? "alternate-bg" : ""}`}
          >
            <Text>
              {mode === "supplier"
                ? `${item.cityCode} – ${item.suppType} – ${item.suppShortName}`
                : `${item.tourRequestNo} – ${item.tourName}`}
            </Text>
          </div>
        ))}
      </div>
    );
  }, []);

  /* ---------------- DAY CHANGE HANDLER ---------------- */
  const handleDayChange = useCallback(
    (key) => {
      const dayIndex = Number(key);
      const cityCode = days?.[dayIndex]?.subitems?.[0]?.cityCode;

      setSelectedDayIndex(dayIndex);

      if (cityCode) {
        triggerFetchDays({ cityCode, day: dayIndex + 1 });
      }
    },
    [days, triggerFetchDays]
  );

  /* ---------------- DAYS VIEW ---------------- */
  const renderDaysView = useCallback(() => {
    if (!days?.length) return <Text>No days available</Text>;

    return (
      <>
        <TabContainer
          variant="secondary"
          tabs={days.map((_, idx) => ({
            key: idx,
            label: `Day-${idx + 1}`,
          }))}
          activeTab={selectedDayIndex}
          onTabChange={handleDayChange}
          containerStyle={{ marginBottom: 12 }}
        />

        {!selectedDayIndex && selectedDayIndex !== 0 ? (
          <Text type="secondary">Please select a day</Text>
        ) : isFetching ? (
          <Spin />
        ) : daysApiData?.length ? (
          <Collapse accordion>
            {daysApiData.map((optionItem, optionIdx) => (
              <Panel
                key={optionIdx}
                header={`${optionItem.option} (Day ${optionItem.day})`}
              >
                {optionItem.subitems?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`item-row ${
                      idx % 2 === 0 ? "alternate-bg" : ""
                    } day-row`}
                  >
                    <div className="col-checkbox">
                      <Checkbox checked={item.checkBoxSelected} />
                    </div>

                    <div className="col-type">
                      <Text>{item.suppType}</Text>
                    </div>

                    <div className="col-city">
                      <Text>{item.cityName}</Text>
                    </div>

                    <div className="col-supplier">
                      <Text>{item.suppShortName}</Text>
                    </div>
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Text>No services available</Text>
        )}
      </>
    );
  }, [days, selectedDayIndex, daysApiData, isFetching, handleDayChange]);

  /* ---------------- MODE RENDER MAP ---------------- */
  const renderByMode = useMemo(
    () => ({
      tour: () => renderSimpleList(tours, "tour"),
      supplier: () => renderSimpleList(suppliers, "supplier"),
      days: renderDaysView,
    }),
    [renderSimpleList, renderDaysView, tours, suppliers]
  );

  /* ---------------- RENDER ---------------- */
  return (
    <Card size="small" style={{ padding: 12 }}>
      <TabContainer
        tabs={modeButtons}
        activeTab={selectedMode}
        onTabChange={setSelectedMode}
      />

      <div className="content-container">{renderByMode[selectedMode]?.()}</div>
    </Card>
  );
};

export default SuggestedTours;
