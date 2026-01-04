import { Card, Avatar, Tag, Button, Form, Input, Row, Col, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import mockUser from "../mock/user";

export default function ProfilePage() {
    const user = mockUser;

    const roleMap = {
        admin: { color: "red", label: "Administrator" },
        member: { color: "blue", label: "Member" },
    };

    const roleBadge = roleMap[user.role] || roleMap.member;

    const handleLoginChange = (values) => {
        message.success("Логин успешно обновлён (пока только mock)");
    };

    const handlePasswordChange = (values) => {
        message.success("Пароль успешно изменён (пока только mock)");
    };

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: 900 }}>

                <div
                    style={{
                        borderRadius: 12,
                        padding: 28,
                        color: "#fff",
                        marginBottom: 30,
                        background:
                            "linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(99,102,241,1) 100%)",
                        boxShadow: "0 10px 35px rgba(0,0,0,0.1)",
                    }}
                >
                    <Row align="middle" gutter={20}>
                        <Col>
                            <Avatar
                                size={100}
                                src={user.avatar}
                                icon={<UserOutlined />}
                                style={{
                                    border: "4px solid rgba(255,255,255,0.15)",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                }}
                            />
                        </Col>

                        <Col flex="auto">
                            <div style={{ fontSize: 28, fontWeight: 700 }}>
                                {user.fullName}
                            </div>

                            <div style={{ opacity: 0.9, marginTop: 6 }}>
                                @{user.login}
                            </div>

                            <Tag color={roleBadge.color} style={{ marginTop: 10 }}>
                                {roleBadge.label}
                            </Tag>
                        </Col>
                    </Row>
                </div>

                <Card
                    title="Информация профиля"
                    style={{ borderRadius: 12, marginBottom: 24 }}
                >
                    <div style={{ display: "grid", gap: 14 }}>
                        <div>
                            <strong>Логин:</strong> {user.login}
                        </div>

                        <div>
                            <strong>Роль:</strong>{" "}
                            <Tag color={roleBadge.color}>{roleBadge.label}</Tag>
                        </div>

                        <div>
                            <strong>Дата регистрации:</strong>{" "}
                            {new Date(user.createdAt).toLocaleDateString("ru-RU")}
                        </div>
                    </div>
                </Card>

                <Card
                    title="Изменить логин"
                    style={{ borderRadius: 12, marginBottom: 24 }}
                >
                    <Form layout="vertical" onFinish={handleLoginChange}>
                        <Form.Item
                            label="Новый логин"
                            name="login"
                            rules={[{ required: true, message: "Введите новый логин" }]}
                        >
                            <Input placeholder="Введите новый логин" />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Обновить логин
                        </Button>
                    </Form>
                </Card>

                <Card
                    title="Изменить пароль"
                    style={{ borderRadius: 12, marginBottom: 24 }}
                >
                    <Form layout="vertical" onFinish={handlePasswordChange}>
                        <Form.Item
                            label="Старый пароль"
                            name="oldPassword"
                            rules={[{ required: true, message: "Введите старый пароль" }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Новый пароль"
                            name="newPassword"
                            rules={[{ required: true, message: "Введите новый пароль" }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Обновить пароль
                        </Button>
                    </Form>
                </Card>

                {user.role === "admin" && (
                    <div style={{ marginBottom: 40 }}>
                        <Button
                            type="default"
                            size="large"
                            href="/admin"
                            style={{ borderRadius: 8 }}
                        >
                            Перейти в админ-панель Django
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
