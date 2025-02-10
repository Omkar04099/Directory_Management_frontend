const Pagination = ({ totalRecords, recordsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <p className="mb-2 text-gray-600">
        Showing page {currentPage} of {totalPages}
      </p>

      <div className="flex space-x-2">
        <button
          className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
            } transition`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
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
