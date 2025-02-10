import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BusinessList from "./components/BusinessList";
import BusinessForm from "./components/BusinessForm";

function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const handleUpdate = () => {
    setRefreshList((prev) => !prev);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Business Directory</h1>
          <button 
            onClick={() => { setSelectedBusiness(null); setShowForm(true); }} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            + Add Business
          </button>
        </div>
        <BusinessList onEdit={(biz) => { setSelectedBusiness(biz); setShowForm(true); }} refresh={refreshList} />
        
        <AnimatePresence>
          {showForm && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BusinessForm 
                  business={selectedBusiness} 
                  onClose={() => setShowForm(false)} 
                  onUpdate={handleUpdate} 
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
