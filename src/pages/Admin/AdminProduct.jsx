import React, { useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Radio, Table, Divider, Modal, Pagination } from 'antd';
import { FormProvider, set, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import InputForm from '~/components/InputForm';
import { productService } from '~/services/product.service';
import { ModalButton } from './component/ModalButton';
import { ModalForm } from './component/ModalForm';

const AdminProduct = () => {
    const [type, setType] = useState('product');
    const [modalConfig, setModalConfig] = useState({ open: false, type: '', action: '' });
    const [idCheckbox, setIdCheckbox] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productForm = useForm({ mode: 'onChange' });
    const categoryForm = useForm({ mode: 'onChange' });

    // pagination
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
    const query = useMemo(() => idCheckbox?.map((item) => `id=${item}`).join('&'), [idCheckbox]);

    const handleDelete = async () => {
        try {
            const service = type === 'product' ? productService.delete : productService.deleteCategory;
            const result = await service(query);
            if (result.success) {
                message.success(result?.message);
                setIdCheckbox([]);
                type === 'product' ? refetchProduct() : refetchCategory();
            }
        } catch (error) {
            message.error(error.response.data?.message);
        }
    };

    const handleSubmit = async (form) => {
        const defaultValues = productForm.formState.defaultValues; // Lấy giá trị ban đầu
        const currentValues = productForm.getValues(); // Lấy giá trị hiện tại
        const result = JSON.stringify(defaultValues) === JSON.stringify(currentValues);

        if (modalConfig.action === 'update' && result) {
            return message.error('Không có gì thay đổi');
        }
        try {
            const service =
                modalConfig.type === 'product'
                    ? modalConfig.action === 'update'
                        ? productService.update
                        : productService.create
                    : productService.createCategory;
            const result = await service(form);
            if (result.success) {
                message.success(result.message);

                modalConfig.type === 'product' ? refetchProduct() : refetchCategory();
            }
            modalConfig.type === 'product'
                ? productForm.reset(
                      {
                          name: '',
                          image: '',
                          categories: '',
                          rating: '',
                          price_old: '',
                          price: '',
                          countInstock: '',
                          description: '',
                      },
                      { keepDefaultValues: false, keepValues: false },
                  )
                : categoryForm.reset();
            setModalConfig({ open: false, type: '', action: '' });
        } catch (error) {
            message.error(error.response?.data?.message || 'Lỗi');
        }
    };

    const handleShowTable = (type) => {
        setType(type);
        setIdCheckbox([]); // set rỗng để khi click qua table khác thì button được set lại là false
    };

    const onClickUpdate = (id) => {
        const item = dataProduct?.data?.find((item) => item._id === id);
        // lấy id ra để handleSubmit nhận được
        setIdCheckbox([item?._id]);
        setModalConfig({ open: true, type: 'product', action: 'update' });
        productForm.reset(item);
    };

    const handleCancel = () => {
        setModalConfig({ open: false, type: '' });
        modalConfig.type === 'product'
            ? productForm.reset(
                  {
                      name: '',
                      image: '',
                      categories: '',
                      rating: '',
                      price_old: '',
                      price: '',
                      countInstock: '',
                      description: '',
                  },
                  { keepDefaultValues: false, keepValues: false },
              )
            : categoryForm.reset();
    };

    const renderAction = (id) => <Button onClick={() => onClickUpdate(id)}>Update</Button>;

    const columns = {
        product: [
            { title: 'Tên', dataIndex: 'name', width: 100 },
            { title: 'Hình', dataIndex: 'image', ellipsis: true, width: 200 },
            { title: 'Danh mục', dataIndex: 'categories', width: 150 },
            { title: 'Giá', dataIndex: 'price', width: 100 },
            { title: 'Tồn kho', dataIndex: 'countInstock', width: 100 },
            { title: 'Đánh giá', dataIndex: 'rating', width: 100 },
            { title: 'Mô tả', dataIndex: 'description', width: 200 },
            {
                title: 'Action',
                dataIndex: '_id',
                width: 200,
                render: (id) => renderAction(id),
            },
        ],
        category: [
            { title: 'Tên danh mục', dataIndex: 'title' },
            { title: 'ID', dataIndex: 'id' },
        ],
    };

    return (
        <div className="wrap ml-10 mt-10 w-[90%] ">
            <div className="flex">
                <ModalButton
                    title="Quản lí sản phẩm"
                    onClick={() => setModalConfig({ open: true, type: 'product', action: 'create' })}
                />
                <ModalButton
                    title="Danh mục sản phẩm"
                    onClick={() => setModalConfig({ open: true, type: 'category' })}
                />
            </div>

            <Divider />
            <Button disabled={!idCheckbox?.length} onClick={handleDelete} style={{ marginBottom: '10px' }}>
                Xóa
            </Button>
            <div className="">
                <Button onClick={() => handleShowTable('product')} style={{ marginBottom: '10px' }}>
                    Xem danh sách sản phẩm
                </Button>
                <Button onClick={() => handleShowTable('category')} style={{ marginBottom: '10px', marginLeft: 5 }}>
                    Xem danh mục sản phẩm
                </Button>
            </div>
            <Table
                rowKey="_id" // Đảm bảo mỗi hàng có ID duy nhất
                rowSelection={{
                    idCheckbox,
                    onChange: setIdCheckbox, // Viết gọn
                }}
                columns={columns[type]}
                dataSource={type === 'product' ? dataSource : dataCategory}
                pagination={{
                    current: currentPage,
                    pageSize: 8,
                    total: dataProduct?.total,
                    onChange: handleTableChange,
                }}
            />

            <ModalForm
                title={
                    modalConfig.type === 'product'
                        ? modalConfig.action === 'update'
                            ? 'Cập nhật sản phẩm'
                            : 'Tạo sản phẩm'
                        : 'Tạo danh mục'
                }
                isOpen={modalConfig.open}
                onCancel={handleCancel}
                methods={modalConfig.type === 'product' ? productForm : categoryForm}
                onSubmit={handleSubmit}
                fields={
                    modalConfig.type === 'product'
                        ? [
                              { name: 'name', label: 'Tên sản phẩm' },
                              { name: 'image', label: 'Hình', placeholder: 'Nhập URL hình ảnh...' },
                              { name: 'categories', label: 'Danh mục', type: 'select', data: dataCategory },
                              { name: 'rating', label: 'Đánh giá', type: 'rating' },
                              { name: 'price_old', label: 'Giá cũ', placeholder: 'Vd: 30.000' },
                              { name: 'price', label: 'Giá mới', placeholder: 'Vd: 20.000' },
                              { name: 'countInstock', label: 'Tồn kho' },
                              { name: 'description', label: 'Mô tả' },
                          ]
                        : [
                              { name: 'title', label: 'Tên danh mục' },
                              {
                                  name: 'id',
                                  label: 'ID',
                                  placeholder: 'Random ID danh mục...',
                                  button: (
                                      <Button
                                          onClick={() => categoryForm.setValue('id', Math.floor(Math.random() * 1000))}
                                      >
                                          Random
                                      </Button>
                                  ),
                              },
                          ]
                }
            />
        </div>
    );
};
export default AdminProduct;
