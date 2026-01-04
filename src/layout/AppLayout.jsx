import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header, Footer, Content } = Layout;

export default function AppLayout({ children }) {
    const location = useLocation();

    const selectedKey = location.pathname.startsWith("/datasets")
        ? "datasets"
        : location.pathname.startsWith("/profile")
            ? "profile"
            : "search";

    const menuItems = [
        {
            key: "search",
            label: <Link to="/search">Поиск</Link>,
        },
        {
            key: "datasets",
            label: <Link to="/datasets">Каталог датасетов</Link>,
        },
        {
            key: "profile",
            label: <Link to="/profile">Профиль</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    background: "#fff",
                    borderBottom: "1px solid #eee",
                    paddingInline: 40,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        fontSize: 22,
                        fontWeight: 600,
                        marginRight: 40,
                    }}
                >
                    <Link to="/search" style={{ color: "black" }}>
                        DataCatalog
                    </Link>
                </div>

                <Menu
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                    style={{ borderBottom: "none", flex: 1 }}
                />
            </Header>

            <Content style={{ padding: "20px 40px" }}>
                {children}
            </Content>

            <Footer
                style={{
                    textAlign: "center",
                    background: "#f9f9f9",
                    padding: "40px 20px",
                    marginTop: 40,
                }}
            >
                <div style={{ marginBottom: 10 }}>
                    <img
                        src="https://www.mirea.ru/upload/medialibrary/205/yly02h0ioocdeega8ir1kbsstul6q9ws/new_logo.png"
                        alt="РТУ МИРЭА"
                        style={{ height: 80, objectFit: "contain" }}
                    />
                </div>

                <div style={{ fontSize: 14, color: "#555" }}>
                    Разработано студентами РТУ МИРЭА · КВМО-11-25 · 2025
                </div>
            </Footer>
        </Layout>
    );
}
