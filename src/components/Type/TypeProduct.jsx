import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Radio, Table, Divider, Modal, Pagination } from 'antd';
import { FormProvider, set, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import InputForm from '~/components/InputForm';
import { productService } from '~/services/product.service';
import { ModalButton } from './component/ModalButton';
import { ModalForm } from './component/ModalForm';

const columnsProduct = [
    { title: 'Tên', dataIndex: 'name', width: 150 },
    { title: 'Hình', dataIndex: 'image', ellipsis: true, width: 200 },
    { title: 'Danh mục', dataIndex: 'categories', width: 150 },
    { title: 'Giá', dataIndex: 'price', width: 100 },
    { title: 'Tồn kho', dataIndex: 'countInstock', width: 100 },
    { title: 'Đánh giá', dataIndex: 'rating', width: 100 },
    { title: 'Mô tả', dataIndex: 'description', width: 200 },
];
const columnsCategory = [
    { title: 'Tên danh mục', dataIndex: 'title' },
    { title: 'ID', dataIndex: 'id' },
];

const AdminProduct = () => {
    const [modalConfig, setModalConfig] = useState({ open: false, type: '' });
    const [idCheckbox, setIdCheckbox] = useState([]);
    const [idCategory, setIdCategory] = useState();
    const [typeDataTable, setTypeDataTable] = useState('product');
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const handleTableChange = (page) => {
        setCurrentPage(page);
    };

    // lấy danh sách danh mục
    const { data: dataCategory, refetch: refetchCategory } = useQuery({
        queryKey: ['category'],
        queryFn: async () => await productService.getCategory(),
        staleTime: 5 * 60 * 1000, // Cache trong 5 phút
    });

    // lấy danh sách sản phẩm
    const { data: dataProduct, refetch: refetchProduct } = useQuery({
        queryKey: ['products', currentPage],
        queryFn: async () => await productService.getAll(`?limit=8&page=${currentPage}`),
    });

    // set lại dataSource và chỉnh lại categories từ dạng id thành title
    const dataSource = dataProduct?.data.map((item) => ({
        ...item,
        categories: dataCategory?.find((cate) => cate.id === item.categories)?.title || 'Không xác định',
    }));

    // set id sản phẩm dưới dạng query id=1&id=2
    const query = idCheckbox?.map((item) => `id=${item}`).join('&');

    const handleDelete = async (typeDataTable) => {
        try {
            const service = typeDataTable === 'product' ? productService.delete : productService.deleteCategory;
            console.log(service);
            const result = await service(query);
            if (result.success) {
                message.success(result?.message);
                typeDataTable === 'product' ? refetchProduct() : refetchCategory();
            }
        } catch (error) {
            message.error(error.response.data?.message);
        }
    };
    const productForm = useForm({
        mode: 'onChange',
        defaultValues: {
            category: '',
        },
    });
    const categoryForm = useForm({ mode: 'onChange' });

    const handleSubmit = async (form, type) => {
        try {
            const service = type === 'product' ? productService.create : productService.createCategory;
            const result = await service(form);
            console.log('result', result);
            if (result.success) {
                message.success(result.message);
                setModalConfig({ open: false, type: '' });
                type === 'product' ? productForm.reset() : categoryForm.reset();
                type === 'product' ? refetchProduct() : refetchCategory();
            }
        } catch (error) {
            console.log(error);
            message.error(error.response?.data?.message || 'Lỗi');
        }
    };

    const handleRandom = () => {
        const id = Math.floor(Math.random() * 1000);
        const result = dataCategory.find((item) => id === item.id);
        if (result) {
            message.error('ID đã tồn tại');
            return;
        }
        setIdCategory(id);
        categoryForm.setValue('id', id); // Cập nhật ID vào form
    };

    const handleShowTable = (type) => {
        // setTypeDataTable(type);
        setIdCheckbox([]); // set rỗng để khi click qua table khác thì button được set lại là false
    };

    return (
        <div className="wrap ml-10 mt-10 w-[90%] ">
            <div className="flex">
                <ModalButton title="Quản lí sản phẩm" onClick={() => setModalConfig({ open: true, type: 'product' })} />
                <ModalButton
                    title="Danh mục sản phẩm"
                    onClick={() => setModalConfig({ open: true, type: 'category' })}
                />
            </div>

            <Divider />
            <Button
                style={{ marginBottom: '10px' }}
                disabled={idCheckbox?.length > 0 ? false : true}
                onClick={() => handleDelete(typeDataTable === 'product' ? 'product' : 'category')}
            >
                Xóa
            </Button>
            <div className="">
                <Button style={{ marginBottom: '10px' }} onClick={() => handleShowTable('product')}>
                    Xem danh sách sản phẩm
                </Button>
                <Button style={{ marginBottom: '10px', marginLeft: 5 }} onClick={() => handleShowTable('category')}>
                    Xem danh mục sản phẩm
                </Button>
            </div>
            <Table
                rowKey={(record) => record._id} // Đảm bảo mỗi hàng có ID duy nhất
                rowSelection={{
                    idCheckbox,
                    onChange: setIdCheckbox, // Viết gọn
                }}
                columns={typeDataTable === 'product' ? columnsProduct : columnsCategory}
                dataSource={typeDataTable === 'product' ? dataSource : dataCategory}
                pagination={{
                    current: currentPage,
                    pageSize: 8,
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
                    { name: 'name', label: 'Tên sản phẩm', placeholder: '' },
                    { name: 'image', label: 'Hình', placeholder: 'Nhập URL hình ảnh...' },
                    {
                        name: 'categories',
                        label: 'Danh mục',
                        placeholder: 'Nhập danh mục...',
                        type: 'select',
                        data: dataCategory,
                    },
                    {
                        name: 'rating',
                        label: 'Đánh giá (sao)',
                        placeholder: 'Nhập đánh giá...',
                        type: 'rating',
                    },
                    { name: 'price_old', label: 'Giá cũ', placeholder: 'Vd: 35.000' },
                    { name: 'price', label: 'Giá mới', placeholder: 'Vd: 20.000' },
                    { name: 'countInstock', label: 'Tồn kho', placeholder: 'Nhập số lượng tồn kho...' },
                    { name: 'description', label: 'Mô tả', placeholder: 'Nhập mô tả sản phẩm...' },
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
                    {
                        name: 'id',
                        label: 'ID',
                        placeholder: 'Nhập ID danh mục...',
                        button: <Button onClick={handleRandom}>Random</Button>,
                        defaultValue: idCategory,
                    },
                    // { name: 'description', label: 'Mô tả (không bắt buộc)', placeholder: '' },
                ]}
            />
        </div>
    );
};

export default AdminProduct;
