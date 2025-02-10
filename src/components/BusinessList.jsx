import { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Pagination from "./Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const API_URL = "http://localhost:5290/api/business";

const BusinessList = ({ onEdit }) => {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((response) => {
        setBusinesses(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching businesses", { autoClose: 3000 });
        setLoading(false);
      });
  }, []);

  // ✅ Filter businesses based on search
  const filteredBusinesses = businesses.filter((biz) =>
    ["name", "city", "category"].some((key) =>
      biz[key]?.toLowerCase().includes(search.toLowerCase())
    )
  );

  // ✅ Pagination Logic
  const totalRecords = filteredBusinesses.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredBusinesses.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this business?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setBusinesses(businesses.filter((biz) => biz.businessID !== id));
        toast.success("Business deleted successfully!", { autoClose: 3000 });
      } catch (error) {
        toast.error("Error deleting business. Please try again.", { autoClose: 3000 });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ToastContainer />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Name, City, or Category"
        className="p-3 rounded-lg w-full mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full shadow-md bg-white">
            <thead>
              <tr className="bg-blue-500 text-white text-sm sm:text-base">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left hidden sm:table-cell">Address</th>
                <th className="p-3 text-left">City</th>
                <th className="p-3 text-left hidden md:table-cell">State</th>
                <th className="p-3 text-left hidden lg:table-cell">Zip</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left hidden xl:table-cell">Website</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((biz) => (
                <tr key={biz.businessID} className="hover:bg-gray-100 transition">
                  <td className="p-3">{biz.name}</td>
                  <td className="p-3">{biz.category}</td>
                  <td className="p-3 hidden sm:table-cell">{biz.address}</td>
                  <td className="p-3">{biz.city}</td>
                  <td className="p-3 hidden md:table-cell">{biz.state}</td>
                  <td className="p-3 hidden lg:table-cell">{biz.zipCode}</td>
                  <td className="p-3">{biz.phoneNumber}</td>
                  <td className="p-3 hidden xl:table-cell">
                    <a href={biz.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {biz.website ? "Visit" : "N/A"}
                    </a>
                  </td>
                  <td className="p-3">{biz.rating || "N/A"}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button onClick={() => onEdit(biz)} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onClick={() => handleDelete(biz.businessID)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                      <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Updated Pagination Component */}
      <Pagination
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BusinessList;
