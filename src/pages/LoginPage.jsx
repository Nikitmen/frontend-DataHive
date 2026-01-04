import { Card, Form, Input, Button, Typography, Alert } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onFinish = (values) => {
        setLoading(true);
        setError(null);

        // TODO: replace with real API
        setTimeout(() => {
            setLoading(false);
            setError("Неверный логин или пароль");
        }, 1000);
    };

    return (
        <Card style={{ width: 380 }}>
            <Title level={3} style={{ textAlign: "center" }}>
                Вход
            </Title>

            <Form layout="vertical" onFinish={onFinish}>
                {error && (
                    <Alert
                        type="error"
                        message={error}
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                )}

                <Form.Item
                    label="Ваш логин"
                    name="email"
                    rules={[{ required: true, message: "Введите email" }]}
                >
                    <Input prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: "Введите пароль" }]}
                >
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                >
                    Войти
                </Button>

                <Text
                    type="secondary"
                    style={{ display: "block", marginTop: 16, textAlign: "center" }}
                >
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </Text>
            </Form>
        </Card>
    );
}
