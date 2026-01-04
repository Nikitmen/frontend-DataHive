import { Card, Collapse, Checkbox } from "antd";

export default function FiltersPanel({ filters, setFilters }) {
  const allFilters = {
    type: [
      { label: "Изображения (MRI, CT)", value: "imaging" },
      { label: "Геномика", value: "genomics" },
      { label: "Клинические записи", value: "clinical" },
      { label: "Носимые устройства", value: "wearable" },
    ],
    pathology: [
      { label: "Онкология", value: "cancer" },
      { label: "Нейро", value: "neuro" },
      { label: "Кардиология", value: "cardio" },
      { label: "COVID-19", value: "covid" },
    ],
  };

  const clearFilters = () => setFilters([]);
  const handleChange = (checkedValues) => setFilters(checkedValues);

  const collapseItems = [
    {
      key: "type",
      label: "Тип данных",
      children: (
        <Checkbox.Group
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
          value={filters}
          onChange={handleChange}
        >
          {allFilters.type.map((f) => (
            <Checkbox key={f.value} value={f.value}>
              {f.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "pathology",
      label: "Патология",
      children: (
        <Checkbox.Group
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
          value={filters}
          onChange={handleChange}
        >
          {allFilters.pathology.map((f) => (
            <Checkbox key={f.value} value={f.value}>
              {f.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
  ];

  return (
    <Card
      title="Фильтры"
      extra={
        <a
          onClick={clearFilters}
          style={{ cursor: "pointer", fontSize: 13 }}
        >
          Очистить
        </a>
      }
      styles={{
        body: {
          maxHeight: 400,
          overflowY: "auto",
          padding: 12,
        },
      }}
    >
      <Collapse
        items={collapseItems}
        bordered={false}
      />
    </Card>
  );
}
