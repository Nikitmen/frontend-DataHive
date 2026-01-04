import { useState } from "react";
import { Row, Col, Spin, Typography } from "antd";
import {
    SearchOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";

import DatasetCard from "../components/DatasetCard";
import FiltersPanel from "../components/FiltersPanel";
import SearchSection from "../components/SearchSection";

import { searchDatasets } from "../api/datasets";

const { Text } = Typography;

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState([]);

    const [results, setResults] = useState([]);
    const [status, setStatus] = useState("idle");
    // idle | loading | success | empty | timeout | error

    const handleSearch = async () => {
 
        if (!query.trim()) return;

        setStatus("loading");
        setResults([]);

        const controller = new AbortController();

        const timeoutId = setTimeout(() => {
            controller.abort();
            setStatus("timeout");
        }, 15000);

        try {
            const response = await searchDatasets(query, controller.signal);
            const data = response?.results ?? [];

            if (data.length === 0) {
                setStatus("empty");
            } else {
                setResults(data);
                setStatus("success");
            }
        } catch (err) {
            if (err.name !== "AbortError") {
                setStatus("error");
            }
        } finally {
            clearTimeout(timeoutId);
        }
    };

    return (
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <Row gutter={20} align="start">
                <Col xs={24} lg={16}>
                    <SearchSection
                        query={query}
                        setQuery={setQuery}
                        onSearch={handleSearch}
                        loading={status === "loading"}
                    />

                    <div style={{ marginTop: 40 }}>
                        {status === "idle" && (
                            <div
                                style={{
                                    textAlign: "center",
                                    color: "#8c8c8c",
                                    marginTop: 24,
                                }}
                            >
                                <SearchOutlined style={{ fontSize: 20, marginBottom: 6 }} />
                                <div style={{ fontSize: 14 }}>
                                    Начните поиск по датасетам
                                </div>
                            </div>
                        )}

                        {status === "loading" && (
                            <div style={{ textAlign: "center", marginTop: 40 }}>
                                <Spin size="large" tip="Поиск датасетов…" />
                            </div>
                        )}

                        {status === "timeout" && (
                            <div
                                style={{
                                    textAlign: "center",
                                    marginTop: 32,
                                    color: "#8c8c8c",
                                }}
                            >
                                <ClockCircleOutlined style={{ fontSize: 22, marginBottom: 8 }} />
                                <div style={{ fontSize: 15 }}>
                                    Упс… сервер не ответил вовремя
                                </div>
                                <div style={{ fontSize: 13, marginTop: 4 }}>
                                    Попробуйте повторить запрос
                                </div>
                            </div>
                        )}

                        {status === "empty" && (
                            <div
                                style={{
                                    textAlign: "center",
                                    marginTop: 32,
                                    color: "#8c8c8c",
                                }}
                            >
                                <SearchOutlined
                                    style={{
                                        fontSize: 22,
                                        marginBottom: 8,
                                        color: "#bfbfbf",
                                    }}
                                />
                                <div style={{ fontSize: 15 }}>
                                    Ничего не найдено
                                </div>
                                <div style={{ fontSize: 13, marginTop: 4 }}>
                                    Попробуйте изменить запрос или фильтры
                                </div>
                            </div>
                        )}

                        {status === "error" && (
                            <div
                                style={{
                                    textAlign: "center",
                                    marginTop: 32,
                                    color: "#8c8c8c",
                                }}
                            >
                                <div style={{ fontSize: 15 }}>
                                    Ошибка при выполнении поиска
                                </div>
                            </div>
                        )}
                    </div>

                    {status === "success" && (
                        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                            {results.map((ds) => (
                                <Col xs={24} md={12} key={ds.id}>
                                    <DatasetCard data={ds} />
                                </Col>
                            ))}
                        </Row>
                    )}
                </Col>

                <Col xs={24} lg={8}>
                    <div style={{ position: "sticky", top: 20 }}>
                        <FiltersPanel
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
