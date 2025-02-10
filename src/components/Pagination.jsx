const Pagination = ({ totalRecords, recordsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <p className="mb-2 text-gray-300">
        Showing page {currentPage} of {totalPages}
      </p>

      <div className="flex space-x-2">
        <button
          className="px-4 py-2 border rounded-lg bg-gray-900 text-white hover:bg-gray-600 transition disabled:opacity-50"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            } transition`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 border rounded-lg bg-gray-900 text-white hover:bg-gray-600 transition disabled:opacity-50"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
