import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '~/components/Layout/Footer';
import Header from '~/components/Layout/Header';
import Overlay from '~/components/Overlay';
import { useAppStore } from '~/store/useAppStore';

const DefaultLayout = () => {
    const { isOverlayVisible, setOverlayVisible } = useAppStore();
    const inputRef = useRef();
    const hanldeClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setOverlayVisible(false);
        }
    };
    return (
        <>
            <div className="relative">
                <div className="z-30 absolute w-full">
                    <Header ref={inputRef} />
                </div>
                <div className="pt-[50px] md:pt-[70px]" onClick={hanldeClickOutside}>
                    {isOverlayVisible && <Overlay />}
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
