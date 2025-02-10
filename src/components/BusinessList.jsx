import { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Pagination from "./Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const API_URL = "http://localhost:5290/api/business";

const BusinessList = ({ onEdit, refresh }) => {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetchBusinesses();
  }, [refresh]);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setBusinesses(response.data);
    } catch (error) {
      toast.error("Error fetching businesses", { autoClose: 3000 });
    }
    setLoading(false);
  };

  const filteredBusinesses = businesses.filter((biz) =>
    ["name", "city", "category"].some((key) =>
      biz[key]?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalRecords = filteredBusinesses.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredBusinesses.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this business?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchBusinesses();
        toast.success("Business deleted successfully!", { autoClose: 3000 });
      } catch (error) {
        toast.error("Error deleting business. Please try again.", {
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ToastContainer />

      <input
        type="text"
        placeholder="Search by Name, City, or Category"
        className="p-3 rounded-lg w-full mb-4 shadow-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full shadow-lg bg-gray-800 text-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm sm:text-base">
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
              {currentRecords.map((biz, index) => (
                <tr
                  key={biz.businessID}
                  className={`hover:bg-gray-600 transition bg-gray-700`}
                >
                  <td className="p-3">{biz.name}</td>
                  <td className="p-3">{biz.category}</td>
                  <td className="p-3 hidden sm:table-cell">{biz.address}</td>
                  <td className="p-3">{biz.city}</td>
                  <td className="p-3 hidden md:table-cell">{biz.state}</td>
                  <td className="p-3 hidden lg:table-cell">{biz.zipCode}</td>
                  <td className="p-3">{biz.phoneNumber}</td>
                  <td className="p-3 hidden xl:table-cell">
                    <a
                      href={biz.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:underline"
                    >
                      {biz.website ? "Visit" : "N/A"}
                    </a>
                  </td>
                  <td className="p-3">{biz.rating || "N/A"}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(biz)}
                      className="p-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-800 transition duration-300 shadow-md"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(biz.businessID)}
                      className="p-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-800 transition duration-300 shadow-md"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
