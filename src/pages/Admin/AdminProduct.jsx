import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Radio, Table, Divider, Modal, Pagination } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import InputForm from '~/components/InputForm';
import { productService } from '~/services/product.service';
import { ModalButton } from './component/ModalButton';
import { ModalForm } from './component/ModalForm';

const columns = [
    { title: 'Tên', dataIndex: 'name', render: (text) => <a>{text}</a>, width: 150 },
    { title: 'Hình', dataIndex: 'image', ellipsis: true, width: 200 },
    { title: 'Danh mục', dataIndex: 'categories', width: 150 },
    { title: 'Giá', dataIndex: 'price', width: 100 },
    { title: 'Tồn kho', dataIndex: 'countInstock', width: 100 },
    { title: 'Đánh giá', dataIndex: 'rating', width: 100 },
    { title: 'Mô tả', dataIndex: 'description', width: 200 },
];

const AdminProduct = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [modalConfig, setModalConfig] = useState({ open: false, type: '' });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // pagination

    const [currentPage, setCurrentPage] = useState(1);

    const handleTableChange = (page) => {
        console.log(page, 'page');
        setCurrentPage(page);
    };

    let id = selectedRowKeys[0];

    const { data: dataProduct, refresh } = useQuery({
        queryKey: ['products', currentPage, id],
        queryFn: async () => await productService.getAll(`?limit=8&page=${currentPage}`),
    });

    const handleDelete = async () => {
        try {
            const result = await productService.delete(id);
            console.log('result', result);
            if (result.success) {
                message.success(result?.message);
                refresh();
            }
        } catch (error) {
            message.error(error);
        }
    };
    const productForm = useForm({ mode: 'onChange' });
    const categoryForm = useForm({ mode: 'onChange' });

    const handleSubmit = async (form, type) => {
        try {
            const service = type === 'product' ? productService.create : productService.getCategory;
            const result = await service(form);
            message.success(result.message);
            setModalConfig({ open: false, type: '' });
            setSelectedRowKeys([]); // Reset trạng thái chọn hàng sau khi tạo thành công
            type === 'product' ? productForm.reset() : categoryForm.reset();
        } catch (error) {
            message.error(error.response?.data?.message);
        }
    };

    return (
        <div className="wrap ml-10 mt-10 w-[90%]">
            <div className="flex">
                <ModalButton title="Quản lí sản phẩm" onClick={() => setModalConfig({ open: true, type: 'product' })} />
                <ModalButton
                    title="Danh mục sản phẩm"
                    onClick={() => setModalConfig({ open: true, type: 'category' })}
                />
            </div>

            <Divider />
            <Button style={{ marginBottom: '10px' }} disabled={id.length ? false : true} onClick={handleDelete}>
                Xóa
            </Button>
            <Table
                rowKey={(record) => record._id} // Đảm bảo mỗi hàng có ID duy nhất
                rowSelection={{
                    selectedRowKeys,
                    onChange: setSelectedRowKeys, // Viết gọn
                }}
                columns={columns}
                dataSource={dataProduct?.data || []} // Đảm bảo data luôn là mảng
                pagination={{
                    current: currentPage,
                    pageSize: dataProduct?.length,
                    total: dataProduct?.total,
                    onChange: handleTableChange,
                }}
            />
            {/* Modal Tạo Sản Phẩm */}
            <ModalForm
                title="Tạo sản phẩm"
                isOpen={modalConfig.open && modalConfig.type === 'product'}
                onCancel={() => setModalConfig({ open: false, type: '' })}
                methods={productForm}
                onSubmit={(form) => handleSubmit(form, 'product')}
                fields={[
                    { name: 'name', label: 'Tên sản phẩm', placeholder: 'Nhập tên sản phẩm...' },
                    { name: 'image', label: 'Hình', placeholder: 'Nhập URL hình ảnh...' },
                    { name: 'categories', label: 'Danh mục', placeholder: 'Nhập danh mục...' },
                    { name: 'countInstock', label: 'Tồn kho', placeholder: 'Nhập số lượng tồn kho...' },
                    { name: 'rating', label: 'Đánh giá', placeholder: 'Nhập đánh giá...' },
                    { name: 'price_old', label: 'Giá cũ', placeholder: 'Vd: 35.000' },
                    { name: 'description', label: 'Mô tả', placeholder: 'Nhập mô tả sản phẩm...' },
                    { name: 'price', label: 'Giá', placeholder: 'Vd: 20.000' },
                ]}
            />

            {/* Modal Tạo Danh Mục */}
            <ModalForm
                title="Tạo danh mục"
                isOpen={modalConfig.open && modalConfig.type === 'category'}
                onCancel={() => setModalConfig({ open: false, type: '' })}
                methods={categoryForm}
                onSubmit={(form) => handleSubmit(form, 'category')}
                fields={[
                    { name: 'title', label: 'Tên danh mục', placeholder: 'Nhập tên danh mục...' },
                    { name: 'id', label: 'ID', placeholder: 'Nhập ID danh mục...' },
                    { name: 'description', label: 'Mô tả (không bắt buộc)', placeholder: '' },
                ]}
            />
        </div>
    );
};

export default AdminProduct;
