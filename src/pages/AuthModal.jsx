import { Modal, Button, Row, Col, Typography, Image } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import InputComponent from '~/components/InputComponent';

const AuthModal = ({ handler }) => {
    const { Title } = Typography;
    const { isModalOpen, handleCancel } = handler;

    const [showPass, setShowPass] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null} width={800}>
                <Row gutter={[12, 12]} justify="center" align="middle">
                    {!showSignUp ? (
                        <Col md={12}>
                            <Title style={{ fontSize: '16px', marginBottom: '30px', textAlign: 'center' }}>
                                Đăng nhập bằng Email
                            </Title>
                            <InputComponent
                                placeholder="Email..."
                                type="email"
                                id="email"
                                // value={email}
                                // onChange={handleEmailChange}
                                required
                                style={{ border: 'none', borderBottom: '1px solid #888', borderRadius: '0px' }}
                            />
                            <div className="relative mt-3">
                                <InputComponent
                                    placeholder="Password..."
                                    type={showPass ? 'text' : 'password'}
                                    id="password"
                                    // value={password}
                                    // onChange={handleEmailChange}
                                    required
                                    style={{
                                        border: 'none',
                                        borderBottom: '1px solid #888',
                                        borderRadius: '0px',
                                    }}
                                />
                                <div
                                    className="absolute top-[50%] right-2 transform -translate-y-1/2 cursor-pointer w-[20px] h-[20px]"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </div>
                            </div>

                            <Button key="back" style={{ width: '100%', marginTop: ' 30px' }}>
                                Đăng nhập
                            </Button>
                            <Title style={{ fontSize: '12px', paddingTop: '20px' }}>
                                Chưa tạo tài khoản?
                                <button onClick={() => setShowSignUp(true)} className="text-[#2640d4]">
                                    Tạo tài khoản
                                </button>
                            </Title>
                        </Col>
                    ) : (
                        <Col md={12}>
                            <Title
                                style={{
                                    fontSize: '16px',
                                    marginBottom: '30px',
                                    textAlign: 'center',
                                    position: 'relative',
                                }}
                            >
                                <LeftOutlined
                                    onClick={() => setShowSignUp(false)}
                                    style={{ position: 'absolute', left: 0 }}
                                />
                                Đăng ký
                            </Title>

                            <InputComponent
                                placeholder="Email..."
                                type="email"
                                id="email"
                                // value={email}
                                // onChange={handleEmailChange}
                                required
                                style={{ border: 'none', borderBottom: '1px solid #888', borderRadius: '0px' }}
                            />
                            <div className="relative mt-3">
                                <InputComponent
                                    placeholder="Password..."
                                    type={showPass ? 'text' : 'password'}
                                    id="password"
                                    // value={password}
                                    // onChange={handleEmailChange}
                                    required
                                    style={{
                                        border: 'none',
                                        borderBottom: '1px solid #888',
                                        borderRadius: '0px',
                                    }}
                                />
                                <div
                                    className="absolute top-[50%] right-2 transform -translate-y-1/2 cursor-pointer w-[20px] h-[20px]"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </div>
                            </div>
                            <div className="relative mt-3">
                                <InputComponent
                                    placeholder="Confirmpassword..."
                                    type={showPass ? 'text' : 'password'}
                                    id="confirmpassword"
                                    // value={confirmpassword}
                                    // onChange={handleEmailChange}
                                    required
                                    style={{
                                        border: 'none',
                                        borderBottom: '1px solid #888',
                                        borderRadius: '0px',
                                    }}
                                />
                                <div
                                    className="absolute top-[50%] right-2 transform -translate-y-1/2 cursor-pointer w-[20px] h-[20px]"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </div>
                            </div>
                            <Button key="back" style={{ width: '100%', marginTop: ' 30px' }}>
                                Đăng ký
                            </Button>
                            <Title style={{ fontSize: '12px', paddingTop: '20px' }}>
                                Đã có tài khoản?{' '}
                                <button onClick={() => setShowSignUp(false)} className="text-[#2640d4]">
                                    Đăng nhập
                                </button>
                            </Title>
                        </Col>
                    )}
                    <Col md={12}>
                        <Image src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png" />
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default AuthModal;
