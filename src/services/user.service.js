import api from '~/config/api';

// demo
export const userService = {
    update(form) {
        return api.put(`/user/update-user`, form);
    },
    getDetail(id) {
        return api.get(`/user/get-detail/${id}`);
    },
    uploadAvatar() {
        return api.post(`/user/upload-avatar`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    getAll() {
        return api.get(`/auth/getall`);
    },
    delete(queryId) {
        return api.delete(`/auth/delete-user?${queryId}`);
    },
};
