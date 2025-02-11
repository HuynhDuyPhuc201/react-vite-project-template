import { Checkbox, Col, Row } from 'antd';

const CheckboxCategory = ({ options, onChange }) => (
    <div className="category bg-[#fff] rounded-[8px] p-10 w-full my-2">
        <p className="text-[20px] text-[#333] font-bold mb-5">Nơi bán</p>
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
            <Row>
                {options.map((item) => (
                    <Col span={24} key={item.id}>
                        <Checkbox value={item.value}>{item.name}</Checkbox>
                    </Col>
                ))}
            </Row>
        </Checkbox.Group>
    </div>
);

export default CheckboxCategory;
