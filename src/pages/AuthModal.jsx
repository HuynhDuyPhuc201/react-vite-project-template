import { Modal, Row, Col, Typography, Image, message, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import InputForm from '~/components/InputForm';
import Button from '~/components/Button';
import { authService } from '~/services/auth.service';
import { setToken, setUser } from '~/core/token';
import { useAppStore } from '~/store/useAppStore';
import { useMutationHook } from '~/hooks/useMutation';
import { useMutation } from '@tanstack/react-query';

const AuthModal = () => {
    const { Title } = Typography;
    const { openModal, toggleModal } = useAppStore();

    const [showPass, setShowPass] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [loading, setLoading] = useState(false);

    // tạo useForm sử dụng cho nhiều component
    const methods1 = useForm({ mode: 'onChange' });
    const methods2 = useForm({ mode: 'onChange' });

    const loginUser = async (form) => {
        try {
            const data = await authService.login(form);
            toggleModal();
            setUser(data);
            setToken(data.access_token);
            setLoading(true);
            message.success(data.message);
        } catch (error) {
            message.error(error.response.data?.message);
        }
    };
    const mutationLogin = useMutation({
        mutationFn: loginUser,
    });

    const registerUser = async (form) => {
        try {
            const data = await authService.register(form);
            setShowSignUp(false);
            message.success(data.message);
        } catch (error) {
            message.error(error.response.data?.message);
        }

        return data;
    };
    const mutationRegister = useMutation({
        mutationFn: registerUser,
        onError: (err) => console.error(err),
    });

    const { isPending } = mutationLogin;
    const { isPending: isPendingRegister } = mutationRegister;

    const onSubmitLogin = async (data) => {
        mutationLogin.mutate(data);
    };
    const onSubmitRegister = async (data) => {
        mutationRegister.mutate(data);
    };

    return (
        <>
            <Modal open={openModal} onCancel={toggleModal} footer={null} width={800}>
                <Row gutter={[12, 12]} justify="center" align="middle">
                    {!showSignUp && (
                        <Col md={14}>
                            <FormProvider {...methods1}>
                                <form onSubmit={methods1.handleSubmit(onSubmitLogin)}>
                                    <Title style={{ fontSize: '16px', marginBottom: '30px', textAlign: 'center' }}>
                                        Đăng nhập bằng Email
                                    </Title>
                                    <InputForm
                                        error={methods1.formState.errors.email}
                                        placeholder="Email is required"
                                        name="email"
                                        type="text"
                                    />
                                    <div className="relative ">
                                        <InputForm
                                            error={methods1.formState.errors.password}
                                            placeholder="Password is required"
                                            name="password"
                                            type={showPass ? 'text' : 'password'}
                                        />
                                        <div
                                            className="absolute top-[50%] right-2 transform -translate-y-1/2 cursor-pointer w-[20px] h-[20px]"
                                            onClick={() => setShowPass(!showPass)}
                                        >
                                            {showPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </div>
                                    </div>

                                    <Button className="w-full mt-[30px]">Đăng nhập {isPending ? <Spin /> : ''}</Button>
                                    <Title style={{ fontSize: '12px', paddingTop: '20px' }}>
                                        Chưa tạo tài khoản?
                                        <button onClick={() => setShowSignUp(true)} className="text-[#2640d4]">
                                            Tạo tài khoản
                                        </button>
                                    </Title>
                                </form>
                            </FormProvider>
                        </Col>
                    )}
                    {showSignUp && (
                        <Col md={14}>
                            <FormProvider {...methods2}>
                                <form onSubmit={methods2.handleSubmit(onSubmitRegister)}>
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
                                    <Row gutter={[12, 12]}>
                                        <Col span={12}>
                                            <InputForm
                                                error={methods2.formState.errors.name}
                                                placeholder="Name..."
                                                name="name"
                                                type="text"
                                            />
                                            <InputForm
                                                error={methods2.formState.errors.phone}
                                                placeholder="Phone..."
                                                name="phone"
                                                type="text"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <InputForm
                                                error={methods2.formState.errors.email}
                                                placeholder="Email..."
                                                name="email"
                                                type="text"
                                            />
                                            <div className="relative">
                                                <InputForm
                                                    error={methods2.formState.errors.password}
                                                    placeholder="Password..."
                                                    name="password"
                                                    type={showPass ? 'text' : 'password'}
                                                />

                                                <div
                                                    className="absolute top-[50%] right-2 transform -translate-y-1/2 cursor-pointer w-[20px] h-[20px]"
                                                    onClick={() => setShowPass(!showPass)}
                                                >
                                                    {showPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <div className="relative">
                                                <InputForm
                                                    error={methods2.formState.errors.confirmPassword}
                                                    placeholder="confirmPassword..."
                                                    name="confirmPassword"
                                                    type={showPass ? 'text' : 'password'}
                                                />
                                                <div
                                                    className="absolute top-[50%] right-2 transform -translate-y-1/2 cursor-pointer w-[20px] h-[20px]"
                                                    onClick={() => setShowPass(!showPass)}
                                                >
                                                    {showPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Button className="w-full mt-[30px]" type="submit">
                                        Đăng ký {isPendingRegister ? <Spin /> : ''}
                                    </Button>
                                    <Title style={{ fontSize: '12px', paddingTop: '20px' }}>
                                        Đã có tài khoản?{' '}
                                        <button onClick={() => setShowSignUp(false)} className="text-[#2640d4]">
                                            Đăng nhập
                                        </button>
                                    </Title>
                                </form>
                            </FormProvider>
                        </Col>
                    )}

                    <Col md={10}>
                        <Image src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png" />
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default AuthModal;
