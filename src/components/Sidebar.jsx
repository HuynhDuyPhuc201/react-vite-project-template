import { Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '~/store/pageReducer';
import { CloseOutlined } from '@ant-design/icons';
import SearchComponent from './SearchComponent';

const Sidebar = () => {
    const { openSidebar } = useSelector((state) => state.page);
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
