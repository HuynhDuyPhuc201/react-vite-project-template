import api from '~/config/api';

export const productService = {
    getDetail(id) {
        return api.get(`/product/get-detail/${id}`);
    },
    getAll(query) {
        return api.get(`/product/getAllProduct${query ? query : ''}`);
    },

    // cate
    getCategory() {
        return api.get(`/product/getCategory`);
    },
};
