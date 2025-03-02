import api from '~/config/api';

// demo
export const userService = {
    update(form) {
        return api.put(`/user/update-user`, form);
    },
    getDetail(id) {
        return api.get(`/user/get-detail/${id}`);
    },

    // auth
    login(form) {
        return api.post('/user/sign-in', form);
    },
    register(form) {
        return api.post('/user/sign-up', form);
    },
    refreshToken() {
        return api.post('/user/refresh-token', {}, { withCredentials: true });
    },
};
