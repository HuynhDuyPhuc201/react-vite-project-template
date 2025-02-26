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
    update(id) {
        return api.put(`/product/update-product/${id?.lengthh === 1 && id}`, { id });
    },
    delete(id) {
        console.log('id', id);
        return api.delete(`/product/delete-product/${id}`);
    },
    deleteAll(formPassword) {
        return api.delete(`/product/delete-all-product`, formPassword);
    },
    // category
    getCategory(form) {
        return api.get(`/product/getCategory`, form);
    },
};
