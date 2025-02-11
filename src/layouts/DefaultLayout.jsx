import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '~/components/Layout/Footer';
import Header from '~/components/Layout/Header';

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default DefaultLayout;
