import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Layout/Header';

const HeaderLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default HeaderLayout;
