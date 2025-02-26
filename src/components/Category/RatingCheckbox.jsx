import { Checkbox, Col, Rate } from 'antd';
import { memo } from 'react';

export const RatingCheckbox = memo(({ value, checked, onChange }) => {
    return (
        <Col span={24}>
            <Checkbox value={value} onChange={onChange} checked={checked}>
                <Rate defaultValue={value} disabled style={{ fontSize: '12px' }} />
                <span className="pl-4">{value} sao</span>
            </Checkbox>
        </Col>
    );
});
