import React, { useState } from 'react';
// import { Checkbox, Col, Rate, Row } from 'antd';
import StartCategory from './Category/StartCategory';
import PriceCategory from './Category/PriceCategory';
import CheckboxCategory from './Category/CheckboxCategory';
import TextCategory from './Category/TextCategory';
import { Col } from 'antd';

const Navbar = () => {
    const [checked, setChecked] = useState(false);
    const onChangeChecked = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <>
            <div className="flex items-center flex-col mt-5 w-full">
                <TextCategory options={['Tất cả', 'Mới nhất', 'Bán chạy', 'Giảm giá']} />
                <CheckboxCategory
                    onChange={onChangeChecked}
                    options={[
                        {
                            name: 'TPHCM',
                            value: 'TPHCM',
                        },
                        {
                            name: 'Hà Nội',
                            value: 'Hà Nội',
                        },
                    ]}
                />
                <StartCategory options={[5, 4, 3]} />
                <PriceCategory options={['Dưới 40.000', '40.000 -> 120.000', '120.000 -> 400.000', 'Trên 400.000']} />
            </div>
        </>
    );
};

export default Navbar;
