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
import './admin.scss';

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
    if (!user) return <Navigate to={path.Home} />;
    return (
        <>
            <Header />
            <div className="pt-[50px] md:pt-[70px]">
                <Row span={(24, 24)}>
                    <Col sm={24} xs={24} md={4}>
                        <Menu
                            onClick={onClick}
                            className="custom-menu"
                            defaultOpenKeys={['user']}
                            mode="inline"
                            items={items}
                        />
                    </Col>
                    <Col sm={24} md={20}>
                        <div className="">{renderComponent === 'user' ? <AdminUser /> : <AdminProduct />}</div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Admin;
