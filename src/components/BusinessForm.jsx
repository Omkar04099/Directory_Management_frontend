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

const BusinessForm = ({ business, onClose, refresh }) => {
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
        if (response.status === 200 || response.status === 204) {
          toast.success("Business updated successfully!", { autoClose: 3000 });
        }
      } else {
        response = await axios.post(API_URL, formData);
        if (response.status === 201) {
          toast.success("Business added successfully!", { autoClose: 3000 });
        }
      }
  
      onClose();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Please enter valid data!.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 transition-opacity p-4">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{business ? "Edit" : "Add"} Business</h2>

        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Business Name"
              className="border p-1 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              className="border p-1 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <textarea
              name="address"
              placeholder="Street Address"
              className="border p-1 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input name="city" placeholder="City" className="border p-1 w-full rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.city} onChange={handleChange} required />
            <input name="state" placeholder="State" className="border p-1 w-full rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.state} onChange={handleChange} required />
            <input name="zipCode" placeholder="Zip Code" className="border p-1 w-full rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.zipCode} onChange={handleChange} required />

            <input name="phoneNumber" placeholder="Phone Number" className="border p-1 w-full rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.phoneNumber} onChange={handleChange} required />

            <input name="website" placeholder="Website (Optional)" className="border p-1 w-full rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.website} onChange={handleChange} />

            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              className="border p-1 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
            />

            <div className="flex justify-end space-x-2">
              <button type="submit" className="bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-600 transition">Save</button>
              <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 p-1 rounded-lg hover:bg-gray-400 transition">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BusinessForm;
