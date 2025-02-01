import {
    AppstoreAddOutlined,
    CreditCardOutlined,
    InfoCircleOutlined,
    LayoutOutlined,
    SettingOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Menu, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import '../../assets/css/sideBar.css';

const SideBar = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
        console.log(`Navigating from ${window.location.pathname} to ${path}`);
    };

    const items = [
        {
            key: "/app/dashboard",
            label: <Typography.Text className="menu-item-text">Dashboard</Typography.Text>,
            icon: <AppstoreAddOutlined className="menu-item-icon" />, 
            onClick: () => navigateTo("/app/dashboard"),
        },
        {
            key: "/app/user-management",
            label: <Typography.Text className="menu-item-text">Invoice</Typography.Text>,
            icon: <LayoutOutlined className="menu-item-icon" />, 
            onClick: () => navigateTo("/app/user-management"),
        },
        {
            key: "/app/applications",
            label: <Typography.Text className="menu-item-text">Customers</Typography.Text>,
            icon: <UserOutlined className="menu-item-icon" />, 
            onClick: () => navigateTo("/app/applications"),
        },
        {
            key: "/app/reports",
            label: <Typography.Text className="menu-item-text">Stocks</Typography.Text>,
            icon: <CreditCardOutlined className="menu-item-icon" />, 
            onClick: () => navigateTo("/app/reports"),
        },
        {
            key: "/app/settings",
            label: <Typography.Text className="menu-item-text">Settings</Typography.Text>,
            icon: <SettingOutlined className="menu-item-icon" />, 
            onClick: () => navigateTo("/app/settings"),
        },
        {
            key: "/app/feedback",
            label: <Typography.Text className="menu-item-text">About</Typography.Text>,
            icon: <InfoCircleOutlined className="menu-item-icon" />, 
            onClick: () => navigateTo("/app/feedback"),
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
}

export default SideBar;
