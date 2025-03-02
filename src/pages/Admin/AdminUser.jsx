import React, { useEffect, useState } from 'react';
import { PlusOutlined, MailOutlined, SettingOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, message, Space, Tag, Upload } from 'antd';
import { Divider, Radio, Table } from 'antd';
import { Modal } from 'antd';
import { ModalButton } from './component/ModalButton';
import { useForm } from 'react-hook-form';
import { ModalForm } from './component/ModalForm';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '~/core/token';
import { adminService } from '~/services/admin.service';

const AdminUser = () => {
    const [type, setType] = useState('user');
    const [idCheckbox, setIdCheckbox] = useState([]);
    const [modalConfig, setModalConfig] = useState({ open: false, type: '', action: '' });
    const [isModalOpen, setIsModalOpen] = useState({ open: false, type: '' });
    const [imageUrl, setImageUrl] = useState();
    const user = getUser();
    const userForm = useForm({ mode: 'onChange' });

    const dataReset = {
        address: '',
        avatar: '',
        email: '',
        name: '',
        password: '',
        phone: '',
    };

    // lấy danh sách người dùng
    const { data: dataUser, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => await adminService.getAll(),
    });
    console.log('dataUser', dataUser);

    const handleOk = () => {
        setIsModalOpen({ open: false, type: 'ok' });
    };

    const handleCancel = () => {
        // dùng cho cancel modal admin vs cancel modal thường
        setIsModalOpen({ open: false, type: 'cancel' });
        setModalConfig({ open: false, type: '' });
        setImageUrl('');
        userForm.reset(dataReset);
    };

    const handleSubmit = async (form) => {
        const { confirmPassword, ...objForm } = form;
        const defaultValues = userForm?.formState.defaultValues; // Lấy giá trị ban đầu - không có confimpassword
        const currentValues = userForm?.getValues(); // Lấy giá trị hiện tại - có confimpassword

        const result = JSON.stringify(defaultValues) === JSON.stringify(currentValues);

        if (modalConfig.action === 'update' && result) {
            return message.error('Không có gì thay đổi');
        }
        console.log('currentValues', currentValues);
        try {
            const service = modalConfig.action === 'create' ? adminService.create : adminService.update;
            const result = await service(form);
            if (result.success) {
                message.success(result?.message);
                userForm.reset(dataReset);
                setImageUrl('');
                refetch();
                setModalConfig({ open: false, type: '' });
            }
        } catch (error) {
            message.error(error?.response?.data?.message || 'có lỗi');
        }
    };

    const query = idCheckbox?.map((item) => `id=${item}`).join('&');
    const handleDelete = async () => {
        try {
            const userAdmin = idCheckbox?.find((item) => item === user._id);
            if (userAdmin) {
                // Hiển thị Modal xác nhận nếu là tài khoản admin
                const confirm = await new Promise((resolve) => {
                    Modal.confirm({
                        title: 'Xác nhận',
                        content: 'Tài khoản này là admin. Bạn có chắc muốn xóa?',
                        onOk: () => resolve(true),
                        onCancel: () => resolve(false),
                    });
                });

                if (!confirm) {
                    return; // Nếu chọn Cancel thì dừng luôn
                }
            }
            const result = await adminService.delete(query);
            if (result.success) {
                message.success(result?.message);
                setIdCheckbox([]);
                refetch();
            }
        } catch (error) {
            message.error(error?.response?.data?.message);
        }
    };

    const handleUpload = (info) => {
        const file = info.file;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target?.result); // Lưu đường dẫn ảnh
                userForm.setValue('avatar', e.target?.result);
            };
            reader.readAsDataURL(file); // Đọc file dưới dạng URL base64
        }
    };

    const onClickUpdate = (id) => {
        const item = dataUser?.find((item) => item._id === id);
        // lấy id ra để handleSubmit nhận được
        setIdCheckbox([item?._id]);
        setImageUrl(item.avatar);
        setModalConfig({ open: true, type: 'user', action: 'update' });
        userForm.reset(item);
    };

    // render
    const renderUpload = () => {
        return (
            <>
                <div className="mr-5 inline-block">
                    <Upload
                        showUploadList={false}
                        beforeUpload={() => false} // Ngăn không gửi file lên server
                        onChange={handleUpload}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </div>
                <Avatar size={50} icon={!imageUrl ? <UserOutlined /> : undefined} src={imageUrl || ''} />
            </>
        );
    };

    const renderAvatar = (avatar) => {
        return (
            <>
                {avatar ? (
                    <img className="w-[50px] h-[50px] object-cover border rounded-[50%]" src={avatar || ''} alt="" />
                ) : (
                    <Avatar size={50} icon={<UserOutlined />} />
                )}
            </>
        );
    };

    const renderAction = (id) => <Button onClick={() => onClickUpdate(id)}>Update</Button>;

    const columns = {
        user: [
            {
                title: 'Tên tài khoản',
                responsive: ['xs', 'sm', 'md', 'lg'], // Hiện trên mọi màn hình
                dataIndex: 'name',
                width: 100,
            },
            {
                title: 'Quyền admin',
                responsive: ['xs', 'sm', 'md', 'lg'], // Hiện trên mọi màn hình
                dataIndex: 'isAdmin',
                width: 100,
                render: (a) => (a ? 'true' : 'false'),
            },
            {
                title: 'Tên đăng nhập',
                responsive: ['xs', 'sm', 'md', 'lg'], // Hiện trên mọi màn hình
                dataIndex: 'email',
                ellipsis: true,
                width: 120,
            },
            {
                title: 'Số điện thoại',
                responsive: ['xs', 'sm', 'md', 'lg'], // Hiện trên mọi màn hình
                dataIndex: 'phone',
                width: 120,
            },
            {
                title: 'Ảnh đại diện',
                responsive: ['md', 'lg'], // Hiện trên mọi màn hình
                dataIndex: 'avatar',
                render: (avatar) => renderAvatar(avatar),
                width: 100,
            },
            {
                title: 'Địa chỉ',
                responsive: ['xs', 'sm', 'md', 'lg'], // Hiện trên mọi màn hình
                dataIndex: 'address',
                width: 100,
            },
            { title: 'Action', dataIndex: '_id', width: 100, render: (id) => renderAction(id) },
        ],
    };

    return (
        <>
            <div className="wrap ml-10 mt-10 w-[80%]">
                <ModalButton
                    title="Quản lí người dùng"
                    onClick={() => setModalConfig({ open: true, type: 'user', action: 'create' })}
                />

                <div>
                    <div className="mt-10"></div>
                    <Divider />
                    <Button disabled={!idCheckbox?.length} onClick={handleDelete} style={{ marginBottom: '10px' }}>
                        Xóa
                    </Button>
                    <Table
                        rowKey="_id" // Đảm bảo mỗi hàng có ID duy nhất
                        rowSelection={{
                            idCheckbox,
                            onChange: setIdCheckbox, // Viết gọn
                        }}
                        columns={columns[type]}
                        dataSource={type === 'user' ? dataUser : ''}
                        scroll={{ x: 800 }}
                    />
                    <ModalForm
                        title={modalConfig.action === 'create' ? 'Tạo tài khoản user' : 'Cập nhật tài khoản'}
                        isOpen={modalConfig.open}
                        onCancel={handleCancel}
                        methods={userForm}
                        onSubmit={handleSubmit}
                        fields={[
                            { name: 'name', label: 'Tên tài khoản', placeholder: 'vd: abc' },
                            { name: 'email', label: 'Tên đăng nhập', placeholder: 'vd: abc@example.com' },
                            { name: 'avatar', label: 'Ảnh đại diện', render: renderUpload(), type: 'avatar' },
                            { name: 'phone', label: 'Điện thoại', placeholder: 'vd: 0123456789' },
                            {
                                name: 'password',
                                required: `${modalConfig.action === 'create' ? true : false}`,
                                label: `${modalConfig.action === 'create' ? 'Mật khẩu' : 'Mật khẩu cũ'}`,
                            },
                            {
                                name: `${modalConfig.action === 'create' ? 'confirmPassword' : 'newPassword'}`,
                                required: `${modalConfig.action === 'create' ? true : false}`,
                                label: `${modalConfig.action === 'create' ? 'Xác minh mật khẩu' : 'Mật khẩu mới'}`,
                            },
                            {
                                name: 'address',
                                required: `${modalConfig.action === 'create' ? true : false}`,
                                label: 'Địa chỉ',
                            },
                        ]}
                    />
                    <Modal open={isModalOpen.open} onOk={handleOk} onCancel={handleCancel}>
                        <p>Bạn muốn xóa tài khoản Admin?</p>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default AdminUser;
