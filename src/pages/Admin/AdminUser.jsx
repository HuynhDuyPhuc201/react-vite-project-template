import React, { useState } from 'react';
import { PlusOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, message, Space, Tag } from 'antd';
import { Divider, Radio, Table } from 'antd';
import { Modal } from 'antd';
import { ModalButton } from './component/ModalButton';
import { useForm } from 'react-hook-form';
import { ModalForm } from './component/ModalForm';
import { userService } from '~/services/user.service';
import { useQuery } from '@tanstack/react-query';
import { authService } from '~/services/auth.service';
import { getUser } from '~/core/token';

const columns = {
    user: [
        { title: 'Tên tài khoản', dataIndex: 'name', width: 150 },
        { title: 'Tên đăng nhập', dataIndex: 'email', ellipsis: true, width: 200 },
        { title: 'Số điện thoại', dataIndex: 'phone', width: 150 },
        { title: 'Ảnh đại diện', dataIndex: 'avatar', width: 100 },
        { title: 'Địa chỉ', dataIndex: 'address' },
    ],
};

const AdminUser = () => {
    const [type, setType] = useState('user');
    const [idCheckbox, setIdCheckbox] = useState([]);
    const [modalConfig, setModalConfig] = useState({ open: false, type: '' });
    const [isModalOpen, setIsModalOpen] = useState({ open: false, type: '' });
    const user = getUser();
    const userForm = useForm({ mode: 'onChange' });
    // lấy danh sách người dùng
    const { data: dataUser, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => await userService.getAll(),
    });

    const handleOk = () => {
        setIsModalOpen({ open: false, type: 'ok' });
    };

    const handleCancel = () => {
        setIsModalOpen({ open: false, type: 'cancel' });
    };

    const handleSubmit = async (form) => {
        try {
            const result = await authService.register(form);
            if (result.success) {
                message.success(result?.message);
                setModalConfig({ open: false, type: '' });
                userForm.reset({
                    address: '',
                    avatar: '',
                    confirmPassword: '',
                    email: '',
                    name: '',
                    password: '',
                    phone: '',
                });
                refetch();
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
            const result = await userService.delete(query);
            if (result.success) {
                message.success(result?.message);
                setIdCheckbox([]);
                refetch();
            }
        } catch (error) {
            message.error(error?.response?.data?.message);
        }
    };

    return (
        <>
            <div className="wrap ml-10 mt-10 w-[80%]">
                <ModalButton title="Quản lí người dùng" onClick={() => setModalConfig({ open: true, type: 'user' })} />

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
                    />
                    <ModalForm
                        title="Tạo tài khoản user"
                        isOpen={modalConfig.open}
                        onCancel={() => setModalConfig({ open: false, type: '' })}
                        methods={userForm}
                        onSubmit={handleSubmit}
                        fields={[
                            { name: 'name', label: 'Tên tài khoản', placeholder: 'vd: abc' },
                            { name: 'email', label: 'Tên đăng nhập', placeholder: 'vd: abc@example.com' },
                            { name: 'avatar', label: 'Ảnh đại diện' },
                            { name: 'phone', label: 'Điện thoại', placeholder: 'vd: 0123456789' },
                            { name: 'password', label: 'Mật khẩu' },
                            { name: 'confirmPassword', label: 'Xác minh mật khẩu' },
                            { name: 'address', label: 'Địa chỉ' },
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
