import { useQuery } from '@tanstack/react-query';
import { Checkbox, Col, Rate, Row } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RatingCheckbox } from './RatingCheckbox';
import { startArr } from '~/constants/dummyData';
import { useSearchParams } from 'react-router-dom';

const StartCategory = ({ ratingObj }) => {
    const { updateRating } = ratingObj;
    const [selectRating, setSelectRating] = useState(null);

    const [searchParams] = useSearchParams();
    const ratingParams = useMemo(() => searchParams.get('rating'), [searchParams]);

    const handleRatingChange = useCallback(
        (e) => {
            const value = e.target?.value;
            setSelectRating((prev) => {
                const newRating = prev === value ? null : value;
                updateRating(newRating);
                return newRating;
            });
        },
        [updateRating, selectRating],
    );
    useEffect(() => {
        if (ratingParams === null) {
            setSelectRating(null);
            updateRating('');
        }
    }, [ratingParams]);

    return (
        <>
            <div className="category bg-[#fff] rounded-[8px] p-10 w-full my-2">
                <p className="text-[20px] text-[#333] font-bold mb-5">Đánh giá</p>
                <Row>
                    {startArr.map((item) => (
                        <RatingCheckbox
                            key={item.value}
                            value={item.value}
                            onChange={handleRatingChange}
                            checked={selectRating === item.value}
                        />
                    ))}
                </Row>
            </div>
        </>
    );
};

export default StartCategory;
