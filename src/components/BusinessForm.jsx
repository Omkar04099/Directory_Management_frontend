import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const API_URL = "http://localhost:5290/api/business";

const CATEGORIES = [
  "IT Services",
  "Restaurant",
  "Retail",
  "Automobile",
  "Healthcare",
  "Finance",
  "Education",
  "Real Estate",
];

const BusinessForm = ({ business, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    website: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (business) setFormData(business);
  }, [business]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (business) {
        response = await axios.put(`${API_URL}/${business.businessID}`, formData);
        toast.success("Business updated successfully!", { autoClose: 3000 });
      } else {
        response = await axios.post(API_URL, formData);
        toast.success("Business added successfully!", { autoClose: 3000 });
      }

      if (response.status === 200 || response.status === 201 || response.status === 204) {
        onUpdate();
        onClose();
      }
    } catch (error) {
      toast.error("Please enter valid data!", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md p-4">
      <ToastContainer />
      <div className="bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {business ? "Edit" : "Add"} Business
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Business Name"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <textarea
              name="address"
              placeholder="Street Address"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                placeholder="City"
                className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <input
                name="state"
                placeholder="State"
                className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="zipCode"
                placeholder="Zip Code"
                className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
              <input
                name="phoneNumber"
                placeholder="Phone Number"
                className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <input
              name="website"
              placeholder="Website (Optional)"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={formData.website}
              onChange={handleChange}
            />

            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
            />

            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BusinessForm;
