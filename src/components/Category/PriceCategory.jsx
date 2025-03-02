import { Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatNumber } from '~/core';

const PriceCategory = ({ priceObj }) => {
    const { price, updatePrice } = priceObj;

    const [priceValue, setPriceValue] = useState(price || 0);

    const [searchParams] = useSearchParams();
    const priceParams = useMemo(() => searchParams.get('price'), [searchParams]);

    const handleSliderChange = (e) => {
        setPriceValue(e.target.value);
    };
    const handlePrice = (item) => (e) => {
        updatePrice(item);
    };
    useEffect(() => {
        if (priceParams === null) {
            setPriceValue(0);
            updatePrice('');
        }
    }, [priceParams]);

    return (
        <div className="category bg-[#fff] rounded-[8px] p-10 w-full my-2">
            <p className="text-[20px] text-[#333] font-bold mb-5">Giá</p>
            <Row>
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-between mb-4 align-center ">
                        <span className="p-2 bg-slate-200 rounded-[10px]">0</span>
                        <div>
                            <input
                                type="range"
                                min="0"
                                max="1000000"
                                value={priceValue}
                                onChange={handleSliderChange}
                                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                            />
                        </div>
                        <span className="p-2 bg-slate-200 rounded-[10px]">1.000.000</span>
                    </div>

                    <div
                        className="mt-4 text-center text-xl font-semibold text-gray-800 cursor-pointer"
                        onClick={handlePrice(priceValue)}
                    >
                        <span className="">Giá từ:</span>{' '}
                        <span className="p-2 bg-slate-200 rounded-[10px]">{formatNumber(Number(priceValue))} VND</span>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default PriceCategory;
