import {
    AppstoreAddOutlined,
    ContainerOutlined,
    DeploymentUnitOutlined,
    InfoCircleOutlined,
    SettingOutlined,
    SlidersOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/sideBar.css";

const SideBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current path

    const navigateTo = (path: string): void => {
        navigate(path);
        console.log(`Navigating from ${location.pathname} to ${path}`);
    };

    const items = [
        {
            key: "/app/dashboard",
            label: (
                <Typography.Text className="menu-item-text">
                    Dashboard
                </Typography.Text>
            ),
            icon: <AppstoreAddOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/dashboard"),
        },
        {
            key: "/app/applications",
            label: (
                <Typography.Text className="menu-item-text">
                    Applications
                </Typography.Text>
            ),
            icon: <ContainerOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/applications"),
        },
        {
            key: "/app/divisions",
            label: (
                <Typography.Text className="menu-item-text">
                    Divisions
                </Typography.Text>
            ),
            icon: <DeploymentUnitOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/divisions"),
        },
        {
            key: "/app/reports",
            label: (
                <Typography.Text className="menu-item-text">
                    Reports
                </Typography.Text>
            ),
            icon: <SlidersOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/reports"),
        },
        {
            key: "/app/settings",
            label: (
                <Typography.Text className="menu-item-text">
                    Settings
                </Typography.Text>
            ),
            icon: <SettingOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/settings"),
        },
    ];

    return (
        <Menu
            theme="light"
            mode="inline"
            items={items}
            selectedKeys={[location.pathname]} // Dynamically updates active item
            className="side-menu"
        />
    );
};

export default SideBar;
