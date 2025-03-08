import api from '~/config/api';

export const orderService = {
    getOrder() {
        return api.get(`/order/get`);
    },
    getOrderAdmin(id) {
        return api.get(`/order/getOrderAdmin?id=${id}`);
    },
    createOrder(orders) {
        return api.post(`/order/create`, orders);
    },
};
