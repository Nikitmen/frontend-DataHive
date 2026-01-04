import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    Tag,
    Typography,
    Space,
    Button,
    Row,
    Col,
    Statistic,
    Divider,
    Spin,
} from "antd";
import { LinkOutlined, FrownOutlined } from "@ant-design/icons";

import { getDatasetById } from "../api/datasets";

const { Title, Text } = Typography;

function safeYear(date) {
    if (!date) return null;
    const d = new Date(date);
    return Number.isNaN(d.getTime()) ? null : d.getFullYear();
}

export default function DatasetPage() {
    const { id } = useParams();

    const [dataset, setDataset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);

        getDatasetById(id)
            .then((data) => {
                setDataset(data);
            })
            .catch(() => {
                setNotFound(true);
                setDataset(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);


    if (loading) {
        return (
            <div style={{ marginTop: 80, textAlign: "center" }}>
                <Spin size="large" tip="Загружаем датасет…" />
            </div>
        );
    }

    if (notFound || !dataset) {
        return (
            <div
                style={{
                    marginTop: 80,
                    textAlign: "center",
                    color: "#8c8c8c",
                }}
            >
                <FrownOutlined style={{ fontSize: 28, marginBottom: 12 }} />
                <div style={{ fontSize: 16 }}>
                    Упс… датасет не найден
                </div>
                <div style={{ fontSize: 14, marginTop: 6 }}>
                    Возможно, он был удалён или ссылка неверна
                </div>
            </div>
        );
    }

    const {
        title,
        description,
        tags,
        license,
        record_count,
        size,
        created_at,
        anatomical_area_name,
        modalities,
        ml_tasks,
        external_path,
        local_path,
    } = dataset;

    const year = safeYear(created_at);

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <Title level={2}>{title}</Title>

            <Space size={8} wrap>
                {tags?.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
                <Tag color="blue">{anatomical_area_name}</Tag>
                <Tag>ID: {id}</Tag>
            </Space>

            {description && (
                <p style={{ marginTop: 16, fontSize: 16, color: "#555" }}>
                    {description}
                </p>
            )}

            <Space style={{ marginTop: 16 }}>
                {external_path && (
                    <Button icon={<LinkOutlined />} href={external_path} target="_blank">
                        Открыть внешний источник
                    </Button>
                )}
                {local_path && <Button disabled>Скачать</Button>}
            </Space>

            <Card style={{ marginTop: 28 }}>
                <Row gutter={16}>
                    {record_count !== null && (
                        <Col xs={24} md={8}>
                            <Statistic title="Количество записей" value={record_count} />
                        </Col>
                    )}
                    {size !== null && (
                        <Col xs={24} md={8}>
                            <Statistic title="Размер датасета (MB)" value={size} />
                        </Col>
                    )}
                    {year && (
                        <Col xs={24} md={8}>
                            <Statistic title="Год добавления" value={year} />
                        </Col>
                    )}
                </Row>

                <Divider />

                <Space direction="vertical" size={14}>
                    <Space>
                        <Text strong>Лицензия:</Text>
                        <Tag>{license || "Не указана"}</Tag>
                    </Space>

                    {modalities?.length > 0 && (
                        <Space wrap>
                            <Text strong>Модальности:</Text>
                            {modalities.map((m) => (
                                <Tag color="geekblue" key={m}>{m}</Tag>
                            ))}
                        </Space>
                    )}

                    {ml_tasks?.length > 0 && (
                        <Space wrap>
                            <Text strong>ML-задачи:</Text>
                            {ml_tasks.map((task) => (
                                <Tag color="green" key={task}>{task}</Tag>
                            ))}
                        </Space>
                    )}
                </Space>
            </Card>
        </div>
    );
}
