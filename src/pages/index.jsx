import React, { useEffect, useState } from 'react';
import { slider_1, slider_2, slider_3 } from '~/constants/images';
import CartComponent from '~/components/CartComponent.jsx';
import Navbar from '~/components/Navbar.jsx';
import { Col, Pagination, Row } from 'antd';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { productService } from '~/services/product.service';
import { useQuery } from '@tanstack/react-query';
import SliderComponent from '~/components/SliderComponent ';
import { useAppStore } from '~/store/useAppStore';
import OverlayComponent from '~/components/OverlayComponent';

const Index = () => {
    const arr = ['TV', 'Tu lanh', 'Laptop', 'Dien thoai'];
    const arrImg = [slider_1, slider_2, slider_3];
    const [currentPage, setCurrentPage] = useState(1);
    const { id } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState(searchParams.get('sort') || 'asc');
    const rating = searchParams.get('rating') || '';
    const price = searchParams.get('price') || 0;

    const { isOverlayVisible } = useAppStore();

    const updateRating = (newRating) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            newRating ? params.set('rating', newRating) : params.delete('rating');
            return params;
        });
    };

    const updatePrice = (newPrice) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            newPrice ? params.set('price', newPrice) : params.delete('price');
            return params;
        });
    };

    useEffect(() => {
        const queryObject = {};
        if (rating) queryObject.rating = rating;
        if (price) queryObject.price = price;

        setSearchParams(queryObject);
    }, [sort, rating, price, id]);

    const query = `${`?limit=8&page=1`}${sort && `&sort=${sort}`}${id ? `&categories=${id}` : ''}${
        searchParams ? `&${searchParams.toString()}` : ''
    }`;
    const { data } = useQuery({
        queryKey: ['products', sort, rating, price, id, searchParams],
        queryFn: async () => await productService.getAll(query),
    });

    const handleSelectChange = (e) => {
        setSort(e.target.value);
    };
    const dataProduct = data?.data;

    console.log('dataProduct', data);
    const onShowSizeChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <div className="py-0 container">
                {/* <OverlayComponent /> */}
                <div className="wrap flex border-b-2 border-black border-solid mb-10">
                    {arr.map((item, i) => (
                        <Link to={`/type/${item}`} key={i} className="text-[#000] p-5 hover:text-[#f00]">
                            {item}
                        </Link>
                    ))}
                </div>

                <SliderComponent arrImg={arrImg} />

                <div className="p-4 flex items-center justify-end">
                    <label className="text-[16px] text-[#333] block pr-3" htmlFor="sort-select">
                        Sắp xếp giá theo:
                    </label>
                    <select
                        id="sort-select"
                        value={sort || ''}
                        onChange={handleSelectChange}
                        className="w-[50%]  md:w-[20%] p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="asc">Thấp đến cao</option>
                        <option value="desc">Cao đến thấp</option>
                    </select>
                </div>

                <Row gutter={[12, 12]} style={{ rowGap: '16px' }}>
                    <Col md={6}>
                        <Navbar ratingObj={{ updateRating, rating }} priceObj={{ price, updatePrice }} />
                    </Col>
                    <Col md={18}>
                        <Row gutter={[12, 12]} style={{ rowGap: '16px', marginTop: '20px' }}>
                            {dataProduct?.map((item, i) => (
                                <Col md={6} sm={12} key={i}>
                                    <CartComponent item={item} />
                                </Col>
                            ))}
                        </Row>
                        {dataProduct?.length === 0 && (
                            <div className="items-center justify-center text-center">
                                <p className="text-[17px] font-bold">Không có sản phẩm nào</p>
                            </div>
                        )}
                    </Col>
                </Row>

                <div className="btn flex items-center justify-center">
                    <button className="cursor-pointer inline-block w-[240px] mt-10 p-2 px-3 rounded-md border border-[#0a68ff] text-[#0a68ff] text-[16px] leading-[150%] text-center hover:bg-[#e6f7ff] transition duration-200">
                        Xem thêm
                    </button>
                </div>
                <Pagination
                    style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}
                    showSizeChanger
                    onChange={onShowSizeChange}
                    total={data?.total || 0}
                    pageSize={8}
                    current={currentPage}
                />
            </div>
        </>
    );
};

export default Index;
