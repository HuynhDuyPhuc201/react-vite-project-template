import React, { useState } from 'react';

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5; // Tổng số trang, bạn có thể điều chỉnh

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
                Prev
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
