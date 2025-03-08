import { Card, Carousel } from 'antd';
import React from 'react';
import { StarFilled } from '@ant-design/icons';
import { generatePath, Link, useParams } from 'react-router-dom';
import { path } from '~/config/path';
import { formatNumber } from '~/core';

const ProductCard = ({ item }) => {
    const { id } = useParams();
    const discount = ((item?.price_old - item?.price) / item?.price_old) * 100;
    const pathURL = generatePath(path.ProductDetail, { idCate: item?.categories, id: item?._id });

    return (
        <Link to={pathURL}>
            <Card
                hoverable
                cover={
                    item.image?.length > 1 ? (
                        <Carousel>
                            {item.image?.map((img) => (
                                <img key={img.uid} alt="" src={img.thumbUrl} className="h-[200px] object-cover" />
                            ))}
                        </Carousel>
                    ) : (
                        <img alt="example" src={item.image[0].thumbUrl} className="h-[200px] object-cover" />
                    )
                }
            >
                <div className="block max-w-full break-words">
                    <p className="line-clamp-2 overflow-hidden" title={item?.name}>
                        {item?.name}
                    </p>
                    <div className="">
                        <span className="pr-2">{item?.rating}</span>
                        <StarFilled style={{ color: '#ffff19' }} />
                    </div>
                    <p className="text-[20px] text-[#fc3434] font-bold mt-3">{formatNumber(item?.price)}</p>
                    <div className="sale mt-2">
                        <span className="p-2 bg-slate-200 rounded-[10px] text-[10px]">-{discount.toFixed() || 0}%</span>
                        <span className="price-sale line-through pl-5 text-[gray] text-[10px]">
                            {formatNumber(item?.price_old)}
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default ProductCard;
