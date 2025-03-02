import React, { useMemo, useState } from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, message, Table, Divider, Upload, Avatar } from 'antd';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { productService } from '~/services/product.service';
import { ModalButton } from './component/ModalButton';
import { ModalForm } from './component/ModalForm';
import { validImageTypes } from '~/utils/typeFile';
import { formatNumber } from '~/core';
import { adminService } from '~/services/admin.service';
import removeVietnameseTones from '~/core/utils/removeVietnameseTones';

const AdminProduct = () => {
    const [state, setState] = useState({
        type: 'product',
        modalConfig: { open: false, type: '', action: '' },
        idCheckbox: [],
        currentPage: 1,
        imageUrl: '',
    });
    const resetData = {
        name: '',
        image: '',
        categories: '',
        rating: '',
        price_old: '',
        price: '',
        countInstock: '',
        description: '',
    };
    const productForm = useForm({ mode: 'onChange' });
    const categoryForm = useForm({ mode: 'onChange' });

    // lấy danh sách danh mục
    const { data: dataCategory, refetch: refetchCategory } = useQuery({
        queryKey: ['category'],
        queryFn: async () => await productService.getCategory(),
        staleTime: 5 * 60 * 1000, // Cache trong 5 phút
    });

    // lấy danh sách sản phẩm
    const { data: dataProduct, refetch: refetchProduct } = useQuery({
        queryKey: ['products', state.currentPage],
        queryFn: async () => await productService.getAll(`?limit=8&page=${state.currentPage}`),
    });

    // set lại dataSource và chỉnh lại categories từ dạng id thành title
    const dataSource = useMemo(
        () =>
            dataProduct?.data?.map((item) => ({
                ...item,
                categories: dataCategory?.find((cate) => cate.id === item.categories)?.title || 'Không xác định',
            })),
        [dataProduct, dataCategory],
    );

    // set id sản phẩm dưới dạng query id=1&id=2
    const query = useMemo(() => state.idCheckbox.map((id) => `id=${id}`).join('&'), [state.idCheckbox]);
    const handleDelete = async () => {
        try {
            const service = state.type === 'product' ? adminService.deleteProduct : adminService.deleteCategory;
            const result = await service(query);
            if (result.success) {
                message.success(result.message);
                setState({ ...state, idCheckbox: [] });
                state.type === 'product' ? refetchProduct() : refetchCategory();
            }
        } catch (error) {
            console.log(error);
            message.error(error.response?.data?.message || 'Lỗi');
        }
    };

    const handleSubmit = async (form) => {
        const defaultValues = productForm.formState.defaultValues; // Lấy giá trị ban đầu
        const currentValues = productForm.getValues(); // Lấy giá trị hiện tại
        const result = JSON.stringify(defaultValues) === JSON.stringify(currentValues);

        if (state.modalConfig.action === 'update' && result) {
            return message.error('Không có gì thay đổi');
        }
        try {
            const service =
                state.modalConfig.type === 'product'
                    ? state.modalConfig.action === 'update'
                        ? adminService.updateProduct
                        : adminService.createProduct
                    : adminService.createCategory;
            const result = await service(form);
            if (result.success) {
                message.success(result.message);
                state.modalConfig.type === 'product' ? refetchProduct() : refetchCategory();
            }
            state.modalConfig.type === 'product' ? productForm.reset(resetData) : categoryForm.reset();
            setState({ ...state, modalConfig: { open: false, type: '', action: '' }, imageUrl: '' });
        } catch (error) {
            message.error(error.response?.data?.message || 'Lỗi');
        }
    };

    // set lại idCheckbox=[] để button xóa disable
    const handleShowTable = (type) => setState({ ...state, type, idCheckbox: [] });

    const onClickUpdate = (id) => {
        const item = dataProduct?.data?.find((item) => item._id === id);
        // lấy id ra để handleSubmit nhận được
        setState({
            ...state,
            idCheckbox: [item?._id],
            modalConfig: { open: true, type: 'product', action: 'update' },
            imageUrl: item?.image,
        });
        productForm.reset(item);
    };

    const handleCancel = () => {
        setState({ ...state, modalConfig: { open: false, type: '' }, imageUrl: '' });
        state.modalConfig.type === 'product' ? productForm.reset(resetData) : categoryForm.reset();
    };

    const handleUpload = (info) => {
        const file = info.file;
        // import validImageTypes
        if (!validImageTypes.includes(file.type)) {
            return message.error('Chỉ được upload file ảnh hợp lệ!');
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result;
            setState({ ...state, imageUrl });
            productForm.setValue('image', imageUrl);
        };
        reader.readAsDataURL(file);
    };

    const renderAction = (id) => <Button onClick={() => onClickUpdate(id)}>Update</Button>;
    const renderImage = (image) => {
        return (
            <>
                {image ? (
                    <img className="w-[50px] h-[50px] object-cover border rounded-[50%]" src={image || ''} alt="" />
                ) : (
                    <Avatar size={50} icon={<UserOutlined />} />
                )}
            </>
        );
    };
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

                <Avatar size={50} icon={!state.imageUrl ? <UserOutlined /> : undefined} src={state.imageUrl || ''} />
            </>
        );
    };
    const columns = {
        product: [
            { title: 'Tên', dataIndex: 'name', width: 100 },
            { title: 'Slug', dataIndex: 'slugName', width: 150 },
            { title: 'Hình', dataIndex: 'image', ellipsis: true, width: 200, render: renderImage },
            { title: 'Danh mục', dataIndex: 'categories', width: 150 },
            { title: 'Giá', dataIndex: 'price', width: 100, render: (price) => formatNumber(Number(price)) },
            { title: 'Tồn kho', dataIndex: 'countInstock', width: 100 },
            { title: 'Đánh giá', dataIndex: 'rating', width: 100 },
            { title: 'Mô tả', dataIndex: 'description', width: 200 },
            {
                title: 'Action',
                dataIndex: '_id',
                width: 200,
                render: renderAction,
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
                    onClick={() =>
                        setState({ ...state, modalConfig: { open: true, type: 'product', action: 'create' } })
                    }
                />
                <ModalButton
                    title="Danh mục sản phẩm"
                    onClick={() => setState({ ...state, modalConfig: { open: true, type: 'category' } })}
                />
            </div>

            <Divider />
            <Button disabled={!state.idCheckbox?.length} onClick={handleDelete} style={{ marginBottom: '10px' }}>
                Xóa
            </Button>
            <div className="space-x-3 my-3">
                <Button onClick={() => handleShowTable('product')}>Xem danh sách sản phẩm</Button>
                <Button onClick={() => handleShowTable('category')}>Xem danh mục sản phẩm</Button>
            </div>
            <Table
                rowKey="_id" // Đảm bảo mỗi hàng có ID duy nhất
                rowSelection={{
                    selectedRowKeys: state.idCheckbox,
                    onChange: (keys) => setState({ ...state, idCheckbox: keys }),
                }}
                columns={columns[state.type]}
                dataSource={state.type === 'product' ? dataSource : dataCategory}
                scroll={{ x: 800 }}
            />

            <ModalForm
                title={
                    state.modalConfig.type === 'product'
                        ? state.modalConfig.action === 'update'
                            ? 'Cập nhật sản phẩm'
                            : 'Tạo sản phẩm'
                        : 'Tạo danh mục'
                }
                isOpen={state.modalConfig.open}
                onCancel={handleCancel}
                methods={state.modalConfig.type === 'product' ? productForm : categoryForm}
                onSubmit={handleSubmit}
                fields={
                    state.modalConfig.type === 'product'
                        ? [
                              { name: 'name', label: 'Tên sản phẩm' },
                              {
                                  name: 'image',
                                  label: 'Hình',
                                  placeholder: 'Nhập URL hình ảnh...',
                                  render: renderUpload(),
                                  type: 'photo',
                              },
                              { name: 'categories', label: 'Danh mục', type: 'select', data: dataCategory },
                              { name: 'rating', label: 'Đánh giá', type: 'rating' },
                              { name: 'price_old', label: 'Giá cũ', placeholder: 'Vd: 30000' },
                              { name: 'price', label: 'Giá mới', placeholder: 'Vd: 20000' },
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
