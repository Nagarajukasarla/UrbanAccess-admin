import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import SideBar from "./SideBar";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
    return (
        <Layout>
            <Header className="header" style={{ backgroundColor: "#f2f2f2" }}>
                <AppHeader />
            </Header>
            <Layout>
                <Sider className="sider">
                    <SideBar />
                </Sider>
                <Content className="content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
