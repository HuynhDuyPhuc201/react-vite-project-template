import React, { useState } from 'react';
import { Card, Button, message, Row, Col, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { userService } from '~/services/user.service';
import { FormProvider, useForm } from 'react-hook-form';
import InputForm from '../InputForm';
import useGetUserDetail from '~/hooks/useGetUserDetail';

const AddressItem = () => {
    const [modalConfig, setModalConfig] = useState(false);
    const addressForm = useForm({ mode: 'onChange' });
    const [addressId, setAddressId] = useState();
    const { data, refetch } = useGetUserDetail();

    const handleRemove = async (id) => {
        try {
            const result = await userService.removeAddress(`?id=${id}`);
            if (result.success) {
                message.success(result.message);
                refetch();
            }
        } catch (error) {
            message.error(error);
        }
    };

    const handleUpdate = (id) => {
        setModalConfig(true);
        const itemAddress = data?.user.address.find((item) => item._id === id);
        setAddressId(id);
        addressForm.reset(itemAddress);
    };

    const onSubmit = async (form) => {
        const updateForm = { ...form, addressId };
        try {
            const result = await userService.updateAddress(updateForm);
            if (result.success) {
                message.success(result.message);
                refetch();
                addressForm.reset({});
                setModalConfig(false);
            }
        } catch (error) {
            message.error(error);
        }
    };

    const handleCancel = () => {
        setModalConfig(false);
    };

    return (
        <>
            {!data?.user.address?.length && <p className="text-[20px] text-center py-10">Chưa cập nhật địa chỉ</p>}
            <Row gutter={[24, 24]} justify="center">
                {data?.user.address?.map((item) => (
                    <Col xs={24} sm={12} md={24} lg={12} key={item?._id}>
                        <Card style={{ position: 'relative', padding: '10px' }}>
                            <p>Số nhà: {item?.houseNumber}</p>
                            <p>Đường: {item?.district}</p>
                            <p>Thành phố: {item?.city}</p>
                            <div className="flex justify-between">
                                <Button
                                    type="primary"
                                    style={{ marginRight: 10, marginTop: '10px' }}
                                    onClick={() => handleUpdate(item?._id)}
                                >
                                    Cập nhật
                                </Button>
                                {item?.defaultAddress && (
                                    <p style={{ marginRight: 10, marginTop: '10px', color: 'red' }}>Mặc định</p>
                                )}
                            </div>
                            <div
                                className="absolute top-3 right-5 cursor-pointer"
                                onClick={() => handleRemove(item?._id)}
                            >
                                <CloseOutlined />
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <FormProvider {...addressForm}>
                <Modal title="Cập nhật địa chỉ" open={modalConfig} onCancel={handleCancel} footer={null}>
                    <form onSubmit={addressForm.handleSubmit(onSubmit)}>
                        <Row gutter={[18, 18]}>
                            <Col md={12}>
                                <label className="block text-gray-700">Số nhà</label>
                                <InputForm
                                    error={addressForm.formState.errors['houseNumber']}
                                    placeholder=""
                                    name="houseNumber"
                                    required={false}
                                />
                            </Col>
                            <Col md={12}>
                                <label className="block text-gray-700">Quận / huyện</label>
                                <InputForm
                                    error={addressForm.formState.errors['district']}
                                    placeholder=""
                                    name="district"
                                    required={false}
                                />
                            </Col>
                            <Col md={24}>
                                <label className="block text-gray-700">Thành phố</label>
                                <InputForm
                                    error={addressForm.formState.errors['city']}
                                    placeholder="Nhập địa chỉ"
                                    name="city"
                                    required={false}
                                />
                            </Col>
                            <Col xs={24} md={24}>
                                <div className="flex items-center gap-3">
                                    <label className="block text-gray-700">Địa chỉ mặc định</label>
                                    <input
                                        {...addressForm.register('defaultAddress')}
                                        type="checkbox"
                                        className="p-2 border rounded-lg"
                                    />
                                </div>
                            </Col>
                            <div className="flex items-center justify-center w-full">
                                <button className="w-1/2 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Cập nhật địa chỉ
                                </button>
                            </div>
                        </Row>
                    </form>
                </Modal>
            </FormProvider>
        </>
    );
};

export default AddressItem;
