import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-md transition duration-300 hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={
              isActive
                ? 'rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(99,102,241,0.35)] transition duration-300'
                : 'rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-md transition duration-300 hover:bg-white/15 hover:text-white'
            }
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-md transition duration-300 hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;