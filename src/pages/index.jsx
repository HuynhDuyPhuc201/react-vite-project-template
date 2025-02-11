import React, { useEffect, useState } from 'react';
import SliderComponent from '~/components/SliderComponent .jsx';
import { slider_1, slider_2, slider_3 } from '~/constants/images';
import CartComponent from '~/components/CartComponent.jsx';
import Navbar from '~/components/Navbar.jsx';
import { Col, Layout, Pagination, Row } from 'antd';
import ButtonComponent from '~/components/ButtonComponent.jsx';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { max } from 'moment';

const Index = () => {
    const arr = ['TV', 'Tu lanh', 'Laptop', 'Dien thoai'];
    const arrImg = [slider_1, slider_2, slider_3];

    return (
        <>
            <div className="py-0 container">
                <div className="wrap flex border-b-2  border-black border-solid mb-10">
                    {arr.map((item, i) => (
                        <Link to={`/type/${item}`} key={i} className="text-[#000] p-5  hover:text-[#f00]">
                            {item}
                        </Link>
                    ))}
                </div>
                <SliderComponent arrImg={arrImg} />
                <Row gutter={[12, 12]} style={{ rowGap: '16px' }}>
                    <Col md={6}>
                        <Navbar />
                    </Col>
                    <Col md={18}>
                        <Row gutter={[12, 12]} style={{ rowGap: '16px' }}>
                            <Col md={8} sm={12}>
                                <CartComponent />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <div className="btn flex items-center justify-center">
                    <button className="cursor-pointer inline-block w-[240px] mt-10 p-2 px-3 rounded-md border border-[#0a68ff] text-[#0a68ff] text-[16px] leading-[150%] text-center hover:bg-[#e6f7ff] transition duration-200">
                        Xem thêm
                    </button>
                </div>
            </div>
        </>
    );
};

export default Index;
