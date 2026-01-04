import { Input, Button, Space, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchSection({
  query,
  setQuery,
  onSearch,
  loading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            size="large"
            placeholder="Например: кардиология, MRI, онкология..."
            prefix={<SearchOutlined />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            type="primary"
            block
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Найти датасеты
          </Button>
        </Space>
      </form>
    </Card>
  );
}
