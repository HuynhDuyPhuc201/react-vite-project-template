import React, { useState, useEffect } from 'react';
import { WrapperTextHeader } from '../style';
import { Avatar, Badge, Col, List, Row } from 'antd';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import SearchComponent from '../SearchComponent';
import { useDispatch } from 'react-redux';
import Sidebar from '../Sidebar';
import { path } from '~/config/path';
import AuthModal from '~/pages/AuthModal';
import { useAppStore } from '~/store/useAppStore';
import { getUser, removeToken, removeUser } from '~/core/token';
import { admin } from '~/constants/images';
import { formatNumber } from '~/core';

const Header = () => {
    const { toggleSidebar, toggleModal, searchResults, setOverlayVisible, setSearchResults } = useAppStore();
    const dispatch = useDispatch();
    const user = getUser();
    const navigation = useNavigate();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerWidth]);

    const handleCloseSidebar = () => {
        dispatch(toggleSidebar());
    };
    const handleLogout = () => {
        removeToken();
        removeUser();
        navigation('/');
        window.location.reload();
    };

    const handleMenuClick = ({ key }) => {
        switch (key) {
            case '1':
                console.log('Xem thông tin cá nhân');
                break;
            case '2':
                console.log('Xem đơn hàng');
                break;
            case '3':
                handleLogout();
                break;
            default:
                break;
        }
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
        },
        {
            key: '3',
            label: 'Đăng xuất',
            onClick: handleLogout,
        },
    ].filter(Boolean);

    const hanldeShowSearch = () => {
        setOverlayVisible(false);
        setSearchResults([]);
        setSearchValue('');
    };

    return (
        <>
            <div className="bg-[#1A94FF] h-[50px] md:h-[70px]  flex items-center absolute z-11 w-full ">
                <Row className="w-full container justify-between">
                    <Col span={windowWidth >= 1000 ? 4 : 8}>
                        <Link to={path.Home}>
                            <WrapperTextHeader style={{ color: '#fff' }}>My Shop</WrapperTextHeader>
                        </Link>
                    </Col>
                    {/* {!user?.isAdmin && windowWidth >= 1000 && ( */}
                    <Col span={windowWidth >= 1000 ? 12 : 16}>
                        <SearchComponent placeholder="Search" size="large" text="Tìm kiếm" />
                        {searchResults && searchResults?.length > 0 && (
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
                                                src={item.image}
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
                                        <Avatar
                                            size={50}
                                            // icon={!imageUrl ? <UserOutlined /> : undefined}
                                            src={user?.avatar || undefined}
                                        />
                                    ) : (
                                        <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                    )}

                                    <div className="account__detail pl-[10px]">
                                        <Dropdown
                                            menu={{ items, onClick: handleMenuClick }}
                                            trigger={user ? ['hover'] : []}
                                        >
                                            <button onClick={toggleModal} disabled={user} className="cursor-pointer">
                                                <Space className="text-[#fff] text-[17px]">Tài khoản</Space>
                                            </button>
                                        </Dropdown>
                                    </div>
                                </div>
                                {!user?.isAdmin && (
                                    <div className="cart pl-[20px] flex item-center">
                                        <div className="icon relative">
                                            <Badge count={5}>
                                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                                            </Badge>
                                        </div>
                                        <span className="text-[#fff] text-[17px] pl-[10px]">Giỏ hàng</span>
                                        {searchResults && searchResults?.length > 0 && (
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
                                                                src={item.image}
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
                                                                <h4
                                                                    style={{
                                                                        margin: 0,
                                                                        fontSize: '16px',
                                                                        color: '#333',
                                                                    }}
                                                                >
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
                                    </div>
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
};

export default Header;
