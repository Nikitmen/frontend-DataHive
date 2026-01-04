import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFoundState({
    title = "Ничего не найдено",
    subTitle = "Возможно, ссылка неверна или объект был удалён",
}) {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title={title}
            subTitle={subTitle}
            extra={
                <Button type="primary" onClick={() => navigate("/datasets")}>
                    К списку датасетов
                </Button>
            }
        />
    );
}
