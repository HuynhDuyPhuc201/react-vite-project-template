import api from '~/config/api';

// demo
export const userService = {
    update(form) {
        return api.put(`/user/update-user`, form);
    },
    delete(id) {
        return api.delete(`/user/delete-user/${id}`);
    },
    getDetail(id) {
        return api.get(`/user/get-detail/${id}`);
    },
    uploadAvatar() {
        return api.post(`/user/upload-avatar`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};
