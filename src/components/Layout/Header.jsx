import React, { useState, useEffect, forwardRef } from 'react';
import { Avatar, Badge, Col, List, Row, Typography } from 'antd';
import { generatePath, Link, Navigate, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import SearchBar from '../SearchBar';
import Sidebar from '../Sidebar';
import { path } from '~/config/path';
import AuthModal from '~/pages/AuthModal';
import { useAppStore } from '~/store/useAppStore';
import { getUser, removeToken, removeUser } from '~/core/token';
import { formatNumber } from '~/core';
import useGetCart from '~/hooks/useGetCart';

const Header = forwardRef((props, ref) => {
    const user = getUser();

    const navigation = useNavigate();
    const { data: dataCart } = useGetCart();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { toggleSidebar, toggleModal, searchResults, setOverlayVisible, setSearchResults, isOverlayVisible } =
        useAppStore();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerWidth]);

    const handleCloseSidebar = () => {
        toggleSidebar();
    };

    const handleLogout = () => {
        removeToken();
        removeUser();
        navigation('/');
        window.location.reload();
    };

    const hanldeShowSearch = () => {
        setOverlayVisible(false);
        setSearchResults([]);
        setSearchValue('');
    };

    const items = [
        {
            key: '1',
            label: `${user?.isAdmin ? 'Quản lý hệ thống' : 'Thông tin người dùng'}`,
            onClick: () => navigation(`${user?.isAdmin ? path.Admin : path.Account.Profile}`),
        },
        !user?.isAdmin && {
            key: '2',
            label: 'Đơn hàng',
            onClick: () => navigation(path.Account.MyOrder),
        },
        {
            key: '3',
            label: 'Đăng xuất',
            onClick: handleLogout,
        },
    ].filter(Boolean);

    return (
        <>
            <div className="bg-[#1A94FF]  h-[50px] md:h-[70px]  flex items-center absolute z-11 w-full ">
                <Row className="w-full container justify-between" style={{ alignItems: 'center' }}>
                    <Col span={windowWidth >= 1000 ? 4 : 8}>
                        <Link to={path.Home}>
                            <Typography style={{ color: '#fff', fontSize: '20px', fontFamily: 'sans-serif' }}>
                                My Shop
                            </Typography>
                        </Link>
                    </Col>
                    {/* {!user?.isAdmin && windowWidth >= 1000 && ( */}
                    <Col span={windowWidth >= 1000 ? 12 : 0}>
                        <SearchBar ref={ref} placeholder="Search" size="large" text="Tìm kiếm" />
                        {isOverlayVisible && searchResults && searchResults?.length > 0 && (
                            <List
                                bordered
                                dataSource={searchResults || []}
                                renderItem={(item) => (
                                    <Link
                                        to={generatePath(path.ProductDetail, {
                                            idCate: item?.categories,
                                            id: item?._id,
                                        })}
                                        onClick={hanldeShowSearch}
                                    >
                                        <List.Item
                                            style={{
                                                margin: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {/* Ảnh sản phẩm */}
                                            <img
                                                src={item.image[0].thumbUrl}
                                                alt={item.name}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    objectFit: 'cover',
                                                    borderRadius: 8,
                                                    marginRight: 15,
                                                }}
                                            />

                                            {/* Thông tin sản phẩm */}
                                            <div style={{ flex: 1, cursor: 'pointer' }}>
                                                <h4 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
                                                    {item.name}
                                                </h4>
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: '14px',
                                                        color: '#888',
                                                        display: '-webkit-box',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 2, // Giới hạn 2 dòng
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    Mô tả: {item.description}
                                                </p>
                                            </div>

                                            {/* Giá sản phẩm */}
                                            <div>
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        color: '#ff4d4f',
                                                    }}
                                                >
                                                    {formatNumber(item.price)} đ
                                                </p>
                                            </div>
                                        </List.Item>
                                    </Link>
                                )}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    background: 'white',
                                    zIndex: 1000,
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                    borderRadius: '5px',
                                }}
                            />
                        )}
                    </Col>
                    {/* )} */}

                    <Col span={windowWidth <= 1000 ? 4 : 8} className="flex justify-center items-center">
                        {windowWidth >= 1000 ? (
                            <>
                                <div className="account flex pl-[20px] items-center ">
                                    {user && user?.avatar ? (
                                        <Avatar size={50} src={user?.avatar || undefined} />
                                    ) : (
                                        <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                    )}

                                    <div className="account__detail pl-[10px]">
                                        <Dropdown menu={{ items }} trigger={user ? ['hover'] : []}>
                                            <button onClick={toggleModal} disabled={user} className="cursor-pointer">
                                                <Space className="text-[#fff] text-[17px]">
                                                    {user ? user.name : 'Tài khoản'}
                                                </Space>
                                            </button>
                                        </Dropdown>
                                    </div>
                                </div>
                                {!user?.isAdmin && (
                                    <Link className="cart pl-[20px] flex item-center cursor-pointer" to={path.Cart}>
                                        <div className="icon relative">
                                            <Badge count={dataCart?.totalProduct > 0 ? dataCart?.totalProduct : 0}>
                                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                            </Badge>
                                        </div>
                                        <span className="text-[#fff] text-[17px] pl-[10px]">Giỏ hàng</span>
                                    </Link>
                                )}
                            </>
                        ) : (
                            <button onClick={handleCloseSidebar}>
                                <MenuOutlined style={{ fontSize: '30px', color: '#fff', cursor: 'pointer' }} />
                            </button>
                        )}
                    </Col>
                    <Sidebar />
                </Row>
                <AuthModal />
            </div>
        </>
    );
});

export default Header;
