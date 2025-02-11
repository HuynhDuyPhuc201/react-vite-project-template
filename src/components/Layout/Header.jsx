import React, { useState, useEffect } from 'react';
import { WrapperTextHeader } from '../style';
import { Badge, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined, ShoppingCartOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import SearchComponent from '../SearchComponent';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import { toggleSidebar } from '~/store/pageReducer';
import { path } from '~/config/path';
import AuthModal from '~/pages/AuthModal';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { openSidebar } = useSelector((state) => state.page);

    const dispatch = useDispatch();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCloseSidebar = () => {
        dispatch(toggleSidebar());
    };

    const items = [
        {
            key: '1',
            type: 'group',
            children: [
                {
                    key: '1-1',
                    label: '1st menu item',
                },
                {
                    key: '1-2',
                    label: '2nd menu item',
                },
            ],
        },
        {
            key: '2',
            label: 'sub menu',
            children: [
                {
                    key: '2-1',
                    label: '3rd menu item',
                },
                {
                    key: '2-2',
                    label: '4th menu item',
                },
            ],
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="bg-[#1A94FF] h-[50px] md:h-[70px]   flex items-center">
                <Row className="w-full container justify-between">
                    <Col span={windowWidth >= 1000 ? 4 : 8}>
                        <Link to={path.Home}>
                            <WrapperTextHeader style={{ color: '#fff' }}>My Shop</WrapperTextHeader>
                        </Link>
                    </Col>
                    {windowWidth >= 1000 && (
                        <Col span={windowWidth >= 1000 ? 12 : 16}>
                            <SearchComponent placeholder="Search" size="large" text="Tìm kiếm" />
                        </Col>
                    )}

                    <Col span={windowWidth <= 1000 ? 4 : 8} className="flex justify-center items-center">
                        {windowWidth >= 1000 ? (
                            <>
                                <div className="account flex pl-[20px]">
                                    <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                    <div className="account__detail pl-[10px]">
                                        <div className="cursor-pointer mb-2" onClick={showModal}>
                                            <span className="text-[#fff]">Đăng nhập</span>{' '}
                                            <span className="text-[#fff]">/</span>{' '}
                                            <span className="text-[#fff]">Đăng Ký</span>
                                        </div>
                                        <Dropdown menu={{ items }}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space className="text-[#fff]">
                                                    Tài khoản
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="cart pl-[20px] flex item-center">
                                    <div className="icon relative">
                                        <Badge count={5}>
                                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                        </Badge>
                                    </div>
                                    <span className="text-[#fff]  pl-[10px]">Giỏ hàng</span>
                                </div>
                            </>
                        ) : (
                            <button onClick={handleCloseSidebar}>
                                <MenuOutlined style={{ fontSize: '30px', color: '#fff', cursor: 'pointer' }} />
                            </button>
                        )}
                    </Col>
                    <Sidebar />
                </Row>
                <AuthModal handler={{ isModalOpen, handleCancel }} />
            </div>
        </>
    );
};

export default Header;
