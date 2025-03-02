import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '~/components/Layout/Footer';
import Header from '~/components/Layout/Header';
import OverlayComponent from '~/components/OverlayComponent';
import { useAppStore } from '~/store/useAppStore';

const DefaultLayout = () => {
    const { isOverlayVisible } = useAppStore();
    return (
        <>
            <div className="relative">
                <div className="z-30 absolute w-full">
                    <Header />
                </div>
                <div className="pt-[50px] md:pt-[70px]">
                    {isOverlayVisible && <OverlayComponent />}
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
