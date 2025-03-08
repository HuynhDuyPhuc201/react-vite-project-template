import { Button, Card, Col, Modal, Row } from 'antd';
import { Link } from 'react-router-dom';
import { path } from '~/config/path';

const AddressModal = ({ open, onClose, addresses, onSelect }) => {
    return (
        <Modal title="Cập nhật địa chỉ" open={open} onCancel={onClose} footer={null}>
            <Row gutter={[24, 24]} justify="center">
                {addresses?.map((item) => (
                    <Col xs={24} sm={12} md={24} lg={12} key={item?._id}>
                        <Card style={{ position: 'relative', padding: '10px' }}>
                            <p>Số nhà: {item?.houseNumber}</p>
                            <p>Đường: {item?.district}</p>
                            <p>Thành phố: {item?.city}</p>
                            <Button className="text-[#6274ff] absolute bottom-0 right-0" onClick={() => onSelect(item)}>
                                Chọn
                            </Button>
                            {item?.defaultAddress && <p className="text-[#f22] absolute top-2 left-4">Mặc định</p>}
                        </Card>
                    </Col>
                ))}
                {addresses?.length === 0 && (
                    <span className="text-[15px]">
                        Vui lòng cập nhật địa chỉ{' '}
                        <Link style={{ textDecoration: 'underline' }} to={path.Account.Address}>
                            tại đây
                        </Link>
                    </span>
                )}
            </Row>
        </Modal>
    );
};

export default AddressModal;
