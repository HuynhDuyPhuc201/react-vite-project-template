import { Avatar, Button, Col, message, Row, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUser, setUser } from '~/core/token';
import { EyeInvisibleOutlined, EyeOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { userService } from '~/services/user.service';
import { FormProvider } from 'antd/es/form/context';
import { useForm } from 'react-hook-form';
import { path } from '~/config/path';
const Profile = () => {
    const user = getUser();
    const [imageUrl, setImageUrl] = useState();
    const [showPass, setShowPass] = useState(false);

    const updateForm = useForm({ mode: 'onChange' });
    // truyền id lấy data user detail
    const { data, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => await userService.getDetail(user._id),
    });

    // set form mặc định là giá trị detail từ get
    useEffect(() => {
        updateForm.reset(data?.user);
    }, [data]);

    const onSubmit = async (form) => {
        const defaultValues = updateForm.formState.defaultValues; // Lấy giá trị ban đầu
        const currentValues = updateForm.getValues(); // Lấy giá trị hiện tại
        // const isChanged = !isEqual(defaultValues, currentValues);

        console.log(form, '');
        // if (!isChanged) {
        //     return message.error('Không có gì thay đổi');
        // }
        try {
            const data = await userService.update(form);
            if (data.success) {
                const { password, ...user } = data.user;
                setUser(user);
                message.success(data.message);
                refetch();
            }
        } catch (error) {
            message.error(error.response.data?.message);
        }
    };

    const handleUpload = (info) => {
        const file = info.file;
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImageUrl(e.target?.result); // Lưu đường dẫn ảnh
                updateForm.setValue('avatar', e.target?.result);
            };

            reader.readAsDataURL(file); // Đọc file dưới dạng URL base64
        }
    };
    if (!user && !user?.isAdmin) return <Navigate to={path.Home} />;
    return (
        <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Thông tin tài khoản</h2>
            <FormProvider {...updateForm}>
                <form onSubmit={updateForm.handleSubmit(onSubmit)}>
                    <Row gutter={[12, 12]}>
                        <Col md={24}>
                            <Row gutter={[18, 18]}>
                                <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md w-64">
                                    {/* Hiển thị avatar */}
                                    <Avatar
                                        size={100}
                                        icon={!imageUrl ? <UserOutlined /> : undefined}
                                        src={imageUrl || data?.user?.avatar}
                                    />

                                    {/* Nút tải ảnh lên */}
                                    <Upload
                                        showUploadList={false}
                                        beforeUpload={() => false} // Ngăn không gửi file lên server
                                        onChange={handleUpload}
                                    >
                                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                                    </Upload>
                                </div>
                                <Col md={12}>
                                    <label className="block text-gray-700">Họ & Tên </label>
                                    <input
                                        {...updateForm.register('name')}
                                        type="text"
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="Nhập họ & tên"
                                    />
                                </Col>
                                <Col md={12}>
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="text"
                                        disabled
                                        className="w-full p-2 border rounded-lg mb-4"
                                        placeholder="abc@example.com"
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[18, 18]}>
                                <Col md={12}>
                                    <label className="block text-gray-700">Số điện thoại</label>
                                    <input
                                        {...updateForm.register('phone')}
                                        type="text"
                                        className="w-full p-2 border rounded-lg mb-4"
                                        placeholder="abc@example.com"
                                    />
                                </Col>
                                <Col md={12}>
                                    <label className="block text-gray-700">Địa chỉ</label>
                                    <input
                                        {...updateForm.register('address')}
                                        type="text"
                                        className="w-full p-2 border rounded-lg mb-4"
                                        placeholder="abc@example.com"
                                    />
                                </Col>
                            </Row>

                            <Row gutter={[18, 18]}>
                                <Col md={12}>
                                    <label className="block text-gray-700">Mật khẩu cũ</label>
                                    <div className="relative">
                                        <input
                                            {...updateForm.register('password')}
                                            className="w-full p-2 border rounded-lg"
                                            placeholder="Nhập mật khẩu"
                                        />
                                        <div
                                            className="absolute top-[50%] right-2 transform -translate-y-1/2 cursor-pointer w-[20px] h-[20px]"
                                            onClick={() => setShowPass(!showPass)}
                                        >
                                            {showPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <label className="block text-gray-700">Mật khẩu mới</label>
                                    <div className="relative">
                                        <input
                                            {...updateForm.register('newPassword')}
                                            type={showPass ? 'password' : 'text'}
                                            className="w-full p-2 border rounded-lg mb-4"
                                            placeholder="Nhập mật khẩu mới"
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
                        </Col>
                    </Row>
                    <div className="flex items-center justify-center">
                        <button className="w-[1/2] mt-[30px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default Profile;
