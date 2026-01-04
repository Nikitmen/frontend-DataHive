import { useEffect, useState } from "react";
import { Row, Col, Spin, Typography } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import DatasetCard from "../components/DatasetCard";
import { getDatasets } from "../api/datasets";

const { Title, Text } = Typography;

export default function DatasetsPage() {
    const navigate = useNavigate();

    const [datasets, setDatasets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getDatasets()
            .then((data) => {
                setDatasets(Array.isArray(data) ? data : []);
                setError(false);
            })
            .catch(() => {
                setError(true);
                setDatasets([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <Title level={1} style={{ marginBottom: 20 }}>
                Все датасеты
            </Title>

            {loading && (
                <div style={{ textAlign: "center", marginTop: 60 }}>
                    <Spin size="large" tip="Загружаем датасеты…" />
                </div>
            )}

            {!loading && error && (
                <div
                    style={{
                        marginTop: 60,
                        textAlign: "center",
                        color: "#8c8c8c",
                    }}
                >
                    <FrownOutlined style={{ fontSize: 24, marginBottom: 8 }} />
                    <div style={{ fontSize: 15 }}>
                        Упс… не удалось загрузить данные
                    </div>
                </div>
            )}

            {!loading && !error && datasets.length === 0 && (
                <div
                    style={{
                        marginTop: 60,
                        textAlign: "center",
                        color: "#8c8c8c",
                    }}
                >
                    <Spin size="small" />
                    <div style={{ fontSize: 15, marginTop: 12 }}>
                        Упс… пока здесь пусто
                    </div>
                </div>
            )}

            {!loading && datasets.length > 0 && (
                <Row gutter={[16, 16]}>
                    {datasets.map((ds) => (
                        <Col
                            key={ds.id}
                            xs={24}
                            sm={12}
                            md={12}
                            lg={8}
                            xl={8}
                        >
                            <DatasetCard
                                data={ds}
                                onMore={() => navigate(`/datasets/${ds.id}`)}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
