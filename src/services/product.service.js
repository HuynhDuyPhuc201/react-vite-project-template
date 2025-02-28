import api from '~/config/api';

export const productService = {
    getDetail(id) {
        return api.get(`/product/get-detail/${id}`);
    },
    getAll(query) {
        return api.get(`/product/getAllProduct${query ? query : ''}`);
    },

    // cần xác thực
    create(form) {
        return api.post(`/product/create-product`, form);
    },
    update(form) {
        return api.put(`/product/update-product`, form);
    },
    delete(ids) {
        return api.delete(`/product/delete-product?${ids}`);
    },
    deleteAll() {
        return api.delete(`/product/delete-all-product`);
    },
    // category
    getCategory() {
        return api.get(`/product/getCategory`);
    },
    createCategory(body) {
        return api.post(`/product/create-category`, body);
    },
    deleteCategory(ids) {
        return api.delete(`/product/delete-cateogry?${ids}`);
    },
    deleteAllCategory() {
        return api.delete(`/product/delete-all-cateogry`);
    },
};
