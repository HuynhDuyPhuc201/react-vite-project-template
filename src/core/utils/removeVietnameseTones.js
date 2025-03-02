const removeVietnameseTones = (str) => {
    return str
        .trim()
        .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu '-'
        .replace(/[^a-zA-Z0-9-]/g, '') // Xóa ký tự đặc biệt
        .toLowerCase();
};

export default removeVietnameseTones;
