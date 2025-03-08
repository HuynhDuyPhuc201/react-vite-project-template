import { NavLink, Outlet } from 'react-router-dom';
import { Row, Col } from 'antd';

function ProfileLayout() {
    return (
        <section className="pt-12 pb-12">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold font-sans">Tài khoản của tôi</h3>
                </div>

                <Row gutter={[24, 24]}>
                    {/* Sidebar */}
                    <Col xs={24} md={6}>
                        <nav>
                            <div className="border rounded-lg overflow-hidden bg-[#fff] p-3">
                                <NavLink
                                    className={({ isActive }) =>
                                        `block px-4 py-3 mb-3 transition ${
                                            isActive ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-100'
                                        }`
                                    }
                                    to="/account"
                                    end
                                >
                                    Thông tin cá nhân
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        `block px-4 py-3 mb-3 transition ${
                                            isActive ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-100'
                                        }`
                                    }
                                    to="/account/orders"
                                >
                                    Đơn hàng
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        `block px-4 py-3 transition ${
                                            isActive ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-100'
                                        }`
                                    }
                                    to="/account/address"
                                >
                                    Địa chỉ
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
