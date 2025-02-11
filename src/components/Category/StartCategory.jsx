import { Col, Rate, Row } from 'antd';

const StartCategory = ({ options }) => (
    <div className="category bg-[#fff] rounded-[8px] p-10 w-full my-2">
        <p className="text-[20px] text-[#333] font-bold mb-5">Đánh giá</p>
        <Row>
            {options?.map((item, i) => (
                <Col span={24} key={i}>
                    <Rate defaultValue={item} disabled style={{ fontSize: '12px' }} />
                    <span className="pl-4">Từ {item} sao</span>
                </Col>
            ))}
        </Row>
    </div>
);

export default StartCategory;
