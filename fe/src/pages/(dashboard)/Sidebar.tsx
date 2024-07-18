import {
    AppstoreOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    ProductOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
    {
        key: "1",
        icon: <PieChartOutlined />,
        label: <Link to={"/admin"}>Thống kê</Link>,
    },
    {
        key: "sub1",
        label: "Sản phẩm",
        icon: <ProductOutlined />,
        children: [
            {
                key: "2",
                label: <Link to={"/admin/products/add"}>Thêm sản phẩm</Link>,
            },
            {
                key: "3",
                label: <Link to={"/admin/products/"}>Danh sách sản phẩm</Link>,
            },
        ],
    },
];
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div style={{ width: 256 }} className="w-full">
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{ marginBottom: 16 }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                className="h-full"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
};

export default Sidebar;
