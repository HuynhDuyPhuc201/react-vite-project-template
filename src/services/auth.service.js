import api from '~/config/api';

export const authService = {
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
