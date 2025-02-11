import { Card, Col } from 'antd';
import React from 'react';
import { StarFilled } from '@ant-design/icons';
import styled from 'styled-components';

const CartComponent = () => {
    // const Text = styled.p`
    //     overflow: hidden;
    //     display: -webkit-inline-box;
    //     -webkit-line-clamp: 2;
    //     -webkit-box-orient: vertical;
    // `;

    return (
        <Card
            style={{ marginTop: '20px' }}
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <div className="block max-w-full break-words">
                <p className="">Title</p>
                <div className="">
                    <span className="pr-2">4.5</span>
                    <StarFilled style={{ color: '#ffff19' }} />
                </div>
                <p className="text-[20px] text-[#fc3434] font-bold mt-3">139.000</p>
                <div className="sale mt-2">
                    <span className="p-2 bg-slate-200 rounded-[10px] text-[10px]">-30%</span>
                    <span className="price-sale line-through pl-5 text-[gray] text-[10px]">97.300</span>
                </div>
            </div>
        </Card>
    );
};

export default CartComponent;
