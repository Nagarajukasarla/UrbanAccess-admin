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
import { useNavigate } from "react-router-dom";
import "../../assets/css/sideBar.css";

const SideBar: React.FC = () => {
    const navigate = useNavigate();

    const navigateTo = (path: string): void => {
        navigate(path);
        console.log(`Navigating from ${window.location.pathname} to ${path}`);
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
        // {
        //     key: "/app/user-management",
        //     label: (
        //         <Typography.Text className="menu-item-text">
        //             User Management
        //         </Typography.Text>
        //     ),
        //     icon: <UserOutlined className="menu-item-icon" />,
        //     onClick: () => navigateTo("/app/user-management"),
        // },
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
            key: "app/divisions",
            label: (
                <Typography.Text className="menu-item-text">
                    Divisions
                </Typography.Text>
            ),
            icon: <DeploymentUnitOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/divisions"),
        },
        {
            key: "app/reports",
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
        {
            key: "/app/about",
            label: (
                <Typography.Text className="menu-item-text">
                    About
                </Typography.Text>
            ),
            icon: <InfoCircleOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/about"),
        },
    ];

    return (
        <Menu
            theme="light"
            mode="inline"
            items={items}
            defaultSelectedKeys={["/app/dashboard"]}
            className="side-menu"
        />
    );
};

export default SideBar;
