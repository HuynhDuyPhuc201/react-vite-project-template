import { Col, Menu, Row } from 'antd';
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Header from '~/components/Layout/Header';
import AdminUser from './AdminUser';
import AdminProduct from './AdminProduct';
import Category from './Category';
import { Navigate } from 'react-router-dom';
import { path } from '~/config/path';
import { getUser } from '~/core/token';

const Admin = () => {
    const [renderComponent, setRenderComponent] = useState('user');
    const user = getUser();
    const items = [
        {
            key: 'user',
            label: 'Người dùng',
            icon: <UserOutlined />,
        },
        {
            key: 'product',
            label: 'Sản Phẩm',
            icon: <AppstoreOutlined />,
        },
    ];
    const onClick = ({ key }) => {
        console.log(key);
        setRenderComponent(key);
    };
    console.log(renderComponent);
    if (!user) return <Navigate to={path.Home} />;
    return (
        <>
            <Header />
            <div className="flex">
                <Menu
                    onClick={onClick}
                    style={{ width: 256, height: '100vh' }}
                    defaultOpenKeys={['user']}
                    mode="inline"
                    items={items}
                />
                <div className="w-full">{renderComponent === 'user' ? <AdminUser /> : <AdminProduct />}</div>
            </div>
        </>
    );
};

export default Admin;
