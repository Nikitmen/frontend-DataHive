import { Layout } from "antd";

const { Content } = Layout;

export default function AuthLayout({ children }) {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </Content>
        </Layout>
    );
}