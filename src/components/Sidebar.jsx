import { Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import SearchComponent from './SearchComponent';
import { useAppStore } from '~/store/useAppStore';

const Sidebar = () => {
    const { toggleSidebar, openSidebar } = useAppStore();

    const dispatch = useDispatch();
    return (
        <>
            <Drawer
                title="Basic Drawer"
                open={openSidebar}
                styles={{
                    header: { display: 'none' },
                    body: { padding: 0 },
                }}
            >
                <div className="header p-10 flex items-center justify-between border-b-2 mx-4 border-black border-solid">
                    <span className="text-[25px]">My Shop</span>
                    <CloseOutlined className="text-[25px]" onClick={() => dispatch(toggleSidebar())} />
                </div>
                <SearchComponent placeholder="Search" size="large" text="Tìm kiếm" />
            </Drawer>
        </>
    );
};

export default Sidebar;
