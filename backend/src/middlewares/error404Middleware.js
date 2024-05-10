const error404Middleware = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err); // Chuyển đối tượng lỗi đến middleware xử lý lỗi tiếp theo
}

// Xuất module để có thể sử dụng ở nơi khác
module.exports = error404Middleware;