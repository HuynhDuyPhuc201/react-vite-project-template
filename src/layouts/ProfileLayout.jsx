import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { path } from '../config/path';
import { Row, Col } from 'antd';

function ProfileLayout() {
    return (
        <section className="pt-7 pb-12">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold">Tài khoản của tôi</h3>
                </div>

                <Row gutter={[24, 24]}>
                    {/* Sidebar */}
                    <Col xs={24} md={6}>
                        <nav>
                            <div className="border rounded-lg overflow-hidden bg-[#fff]">
                                <NavLink className="block px-4 py-3 hover:bg-gray-100 transition" to="/account/orders">
                                    Orders
                                </NavLink>
                            </div>
                        </nav>
                    </Col>

                    {/* Content */}
                    <Col xs={24} md={18}>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default ProfileLayout;
