import React from 'react';
import { Drawer, Input, Avatar, Badge, Button, Menu } from 'antd';
import { CloseOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useAppStore } from '~/store/useAppStore';
import { getUser, removeToken, removeUser } from '~/core/token';
import { useNavigate } from 'react-router-dom';
import { path } from '~/config/path';
import useGetCart from '~/hooks/useGetCart';
import SearchBar from './SearchBar';

const { SubMenu } = Menu;

const Sidebar = () => {
    const { toggleSidebar, openSidebar, showSignUp, setShowSignUp, toggleModal } = useAppStore();

    const user = getUser();
    const navigate = useNavigate();
    const { data: dataCart } = useGetCart();
    const {} = useAppStore();

    const handleLogout = () => {
        removeToken();
        removeUser();
        navigate('/');
        window.location.reload();
        toggleSidebar(); // Đóng Drawer sau khi đăng xuất
    };

    const handleMenuClick = ({ key }) => {
        if (key === 'logout') {
            handleLogout();
        } else {
            navigate(key);
        }
        toggleSidebar(); // Đóng Drawer sau khi chọn menu
    };

    const handleLogin = () => {};

    return (
        <Drawer
            open={openSidebar}
            placement="left"
            closable={false}
            onClose={toggleSidebar}
            styles={{
                header: { display: 'none' },
                body: { padding: 0 },
            }}
        >
            {/* Header */}
            <div className="p-5 flex items-center justify-between bg-blue-500">
                <span className="text-white text-[20px] font-bold">My Shop</span>
                <CloseOutlined className="text-white text-[20px] cursor-pointer" onClick={toggleSidebar} />
            </div>

            <div className="m-5 border-b border-solid border-b-black">
                <SearchBar placeholder="Search" size="large" text="Tìm kiếm" />
            </div>

            <div className="p-5 flex items-center">
                {user?.avatar ? (
                    <Avatar src={user?.avatar} size={70} className="mr-3" />
                ) : (
                    <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
                )}

                {user?.name && <span className="text-[20px] font-medium">{user?.name}</span>}
            </div>

            {/* User Menu */}
            <Menu mode="inline" className="text-[20px]" onClick={handleMenuClick}>
                <SubMenu key="user" title="Tài khoản" className=" font-medium text-[20px]">
                    {user && (
                        <>
                            <Menu.Item className="text-[20px]" key={user?.isAdmin ? path.Admin : path.Account.Profile}>
                                {user?.isAdmin ? 'Quản lý hệ thống' : 'Thông tin người dùng'}
                            </Menu.Item>
                            {!user?.isAdmin && (
                                <Menu.Item key={path.Account.MyOrder} className="text-[20px]">
                                    Đơn hàng
                                </Menu.Item>
                            )}
                            <Menu.Item key="logout" className="text-[20px]">
                                Đăng xuất
                            </Menu.Item>
                        </>
                    )}

                    {!user?.isAdmin && (
                        <>
                            <Menu.Item className="text-[20px]" onClick={() => toggleModal()}>
                                Đăng nhập & Đăng ký
                            </Menu.Item>
                        </>
                    )}
                </SubMenu>
            </Menu>

            {/* Giỏ hàng */}
            <div
                className="p-10 flex items-center cursor-pointer text-xl font-medium mt-5"
                onClick={() => {
                    navigate(path.Cart);
                    toggleSidebar();
                }}
            >
                <Badge count={dataCart?.totalProduct > 0 ? dataCart?.totalProduct : 0}>
                    <ShoppingCartOutlined className="text-[20px] mr-3" styles={{ fontSize: '20px' }} />
                </Badge>
                <span className="text-[20px]">Giỏ hàng</span>
            </div>
        </Drawer>
    );
};

export default Sidebar;
