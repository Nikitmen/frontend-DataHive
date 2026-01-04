import { Card, Form, Input, Button, Typography, Alert } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onFinish = (values) => {
        setLoading(true);
        setError(null);

        // TODO: replace with real API
        setTimeout(() => {
            setLoading(false);
            setError("Пользователь с таким email уже существует");
        }, 1000);
    };

    return (
        <Card style={{ width: 380 }}>
            <Title level={3} style={{ textAlign: "center" }}>
                Регистрация
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
                    rules={[{ required: true, type: "email" }]}
                >
                    <Input prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Введите пароль",
                        },
                        {
                            min: 6,
                            message: "Пароль должен содержать минимум 6 символов",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    label="Повторите пароль"
                    name="passwordConfirm"
                    dependencies={["password"]}
                    rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Пароли не совпадают")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                >
                    Создать аккаунт
                </Button>

                <Text
                    type="secondary"
                    style={{ display: "block", marginTop: 16, textAlign: "center" }}
                >
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </Text>
            </Form>
        </Card>
    );
}
