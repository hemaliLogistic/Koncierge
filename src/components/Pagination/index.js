import React from "react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = (currentPage, totalPages) => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 1) {
      start = 1;
      end = 5;
    }

    if (end > totalPages) {
      end = totalPages;
      start = totalPages - 4;
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className='flex space-x-2 items-center'>
      <button
        onClick={() => handleClick(currentPage - 1)}
        className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300'
        disabled={currentPage === 1}>
        <img src='images/ArrowLeft.png' className='w-2 h-2' />
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full font-Jost text-[14px] ${
            page === currentPage
              ? "bg-green00 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}>
          {page}
        </button>
      ))}
      <button
        onClick={() => handleClick(currentPage + 1)}
        className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300'
        disabled={currentPage === totalPages}>
        <img src='images/ArrowRight.png' className='w-2 h-2' />
      </button>
    </div>
  );
};

export default PaginationComponent;
