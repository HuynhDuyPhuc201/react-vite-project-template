import { Col, Row } from 'antd';

const PriceCategory = ({ options }) => (
    <div className="category bg-[#fff] rounded-[8px] p-10 w-full my-2">
        <p className="text-[20px] text-[#333] font-bold mb-5">Giá</p>
        <Row>
            {options.map((item, i) => (
                <Col span={24} key={i} style={{ cursor: 'pointer', marginBottom: '15px' }}>
                    <span className="p-2 bg-slate-200 rounded-[10px]">{item}</span>
                </Col>
            ))}
        </Row>
    </div>
);

export default PriceCategory;
