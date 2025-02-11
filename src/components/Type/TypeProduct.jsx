import React from 'react';
import Navbar from '../Navbar';
import CartComponent from '../CartComponent';
import { Col, Pagination, Row } from 'antd';

const TypeProduct = () => {
    const onShowSizeChange = (current, pageSize) => {
        console.log('change');
    };
    return (
        <>
            <div className="container">
                <Row>
                    <Col md={4}>
                        <Navbar />
                    </Col>
                    <Col md={20} style={{ padding: '16px' }}>
                        <Row gutter={[10, 10]}>
                            <Col md={6}>
                                <CartComponent />
                            </Col>
                            <Col md={6}>
                                <CartComponent />
                            </Col>
                            <Col md={6}>
                                <CartComponent />
                            </Col>
                            <Col md={6}>
                                <CartComponent />
                            </Col>
                            <Col md={6}>
                                <CartComponent />
                            </Col>
                            <Col md={6}>
                                <CartComponent />
                            </Col>
                            <Col md={6}>
                                <CartComponent />
                            </Col>
                        </Row>
                        <Pagination
                            style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}
                            showSizeChanger
                            onChange={onShowSizeChange}
                            defaultCurrent={3}
                            total={500}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default TypeProduct;
