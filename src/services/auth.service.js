import api from '~/config/api';

// demo
export const authService = {
    login(form) {
        return api.post('/authentication/v2/login', form);
    },
    register(form) {
        return api.post('', form);
    },
    refreshToken(form) {
        return api.post('', form);
    },
};
