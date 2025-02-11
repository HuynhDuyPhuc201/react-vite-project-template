import { Button, Col, InputNumber, Row, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { detail_1, detail_2, detail_1_large, detail_2_large } from '~/constants/images';
import './style.scss';
import { ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import CartComponent from '~/components/CartComponent';

const { Title, Text } = Typography;
const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (value) => {
        setQuantity(value || 1);
    };
    const allImage = [detail_1, detail_2];
    const settings = {
        customPaging: function (i) {
            return (
                <Link className="w-[50px] h-[50px]" to="#">
                    <img src={allImage[i]} className="w-[50px]" />
                </Link>
            );
        },
        dots: true,
        dotsClass: 'slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const data = [
        { key: '1', label: 'Phiên bản sách', value: 'Phiên bản thường' },
        { key: '2', label: 'Công ty phát hành', value: 'Megabook' },
        { key: '3', label: 'Ngày xuất bản', value: '2021-10-01 00:00:00' },
        { key: '4', label: 'Kích thước', value: '19 × 27 cm' },
        { key: '5', label: 'Loại bìa', value: 'Bìa mềm' },
        { key: '6', label: 'Số trang', value: '36' },
        { key: '7', label: 'Nhà xuất bản', value: 'Nhà Xuất Bản Thanh Niên' },
    ];

    const columns = [
        {
            title: '',
            dataIndex: 'label',
            key: 'label',
            className: 'font-bold text-gray-600',
        },
        {
            title: '',
            dataIndex: 'value',
            key: 'value',
            className: 'text-gray-800',
        },
    ];

    return (
        <>
            <div className="container pt-10">
                <Row gutter={[10, 10]} style={{ alignItems: 'flex-start' }}>
                    <Col md={8} className="sticky top-0 pt-5">
                        <div className="slider-container bg-[#fff] rounded-[8px] p-4">
                            <Slider {...settings}>
                                <div>
                                    <img src={detail_1_large} />
                                </div>
                                <div>
                                    <img src={detail_2_large} />
                                </div>
                            </Slider>
                        </div>
                    </Col>
                    <Col md={10} className="pt-5">
                        <div className="des bg-[#fff] rounded-[8px] p-6 mb-4">
                            <div className="">
                                <span className="font-bold">
                                    Phiếu Luyện Viết Cùng Gấu Kiki 2. Luyện Viết Bảng Chữ Cái
                                </span>
                            </div>
                            <div className="pt-4">
                                <span className="pr-2">4.5</span>
                                <StarFilled style={{ color: '#ffff19' }} /> |{' '}
                                <span className="text-[10px] text-[#888]">đã bán 125</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-[20px] text-[#fc3434] font-bold mt-3 ">139.000</p>
                                <div className="sale mt-2">
                                    <span className="p-1 bg-slate-200 rounded-[10px] text-[10px]">-30%</span>
                                    <span className="price-sale line-through pl-5 text-[gray] text-[10px]">97.300</span>
                                </div>
                            </div>
                        </div>
                        <div className="des bg-[#fff] rounded-[8px] p-6 mb-4">
                            <div className="border-solid border-b-2 border-[#f0f0f0] pb-4 mb-4">
                                <span className="font-bold">Thông tin vận chuyển</span>
                                <div className="flex justify-between items-center pt-5">
                                    <span>Giao đến Q. 1, P. Bến Nghé, Hồ Chí Minh</span>
                                    <Link className="text-[#6274ff]">Đổi</Link>
                                </div>
                            </div>
                            <div className="border-solid border-b-2 border-[#f0f0f0] pb-4 mb-4">
                                <span className="">Giao siêu tốc 2h</span>
                                <div className="flex justify-between items-center ">
                                    <span>Trước 18h hôm nay: 25.000₫</span>
                                </div>
                            </div>
                        </div>
                        <div className="des bg-[#fff] rounded-[8px] p-6 mb-4">
                            <div className="border-solid border-b-2 border-[#f0f0f0] pb-4 mb-4">
                                <span className="font-bold">Sản phẩm tương tự</span>
                            </div>
                            <Row gutter={[10, 10]}>
                                <Col md={8} sm={12}>
                                    <CartComponent />
                                </Col>
                                <Col md={8} sm={12}>
                                    <CartComponent />
                                </Col>
                                <Col md={8} sm={12}>
                                    <CartComponent />
                                </Col>
                                <Col md={8} sm={12}>
                                    <CartComponent />
                                </Col>
                            </Row>
                        </div>
                        <div className="bg-[#fff] rounded-[8px] p-6 mb-4">
                            <span className="font-bold">Thông tin chi tiết</span>
                            <Table columns={columns} dataSource={data} pagination={false} showHeader={false} bordered />
                        </div>
                    </Col>
                    <Col md={6} className="sticky top-0 pt-5">
                        <div className="payment bg-[#fff] rounded-[8px] p-6 mb-4">
                            <Row>
                                <Col span={24}>
                                    <Text strong>Số Lượng</Text>
                                    <Row style={{ marginTop: '8px' }} align="middle">
                                        <InputNumber
                                            min={1}
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            style={{ width: '100px' }}
                                        />
                                    </Row>
                                </Col>

                                <Col span={24}>
                                    <Title level={5} style={{ margin: 0 }}>
                                        Tạm tính
                                    </Title>
                                    <Title level={4} style={{ color: '#fa541c', margin: 0 }}>
                                        21.000
                                    </Title>
                                </Col>

                                <Col span={24}>
                                    <Button
                                        type="primary"
                                        block
                                        style={{
                                            backgroundColor: '#ff4d4f',
                                            borderColor: '#ff4d4f',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Mua ngay
                                    </Button>
                                </Col>
                                <Col span={24}>
                                    <Button type="default" icon={<ShoppingCartOutlined />} block>
                                        Thêm vào giỏ
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default ProductDetail;
