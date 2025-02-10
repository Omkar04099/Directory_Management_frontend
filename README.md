# 🏢 Business Directory - Frontend (React)

A sleek and modern **Business Directory** web application built with **React**, **TailwindCSS**, and **Framer Motion** for smooth animations. This project allows users to **view, add, edit, and delete businesses** in a well-structured, user-friendly interface.

![Business Directory Screenshot](https://via.placeholder.com/1200x600?text=Business+Directory+App) <!-- Replace with actual screenshot -->

---

## 🚀 Features
✔ **Add, Edit, and Delete Businesses**  
✔ **Search Functionality** (by name, city, category)  
✔ **Pagination for Large Data**  
✔ **Animated Modals & Transitions** using Framer Motion  
✔ **Beautiful, Responsive UI** with TailwindCSS  
✔ **Real-time Form Validation**  
✔ **REST API Integration** with .NET Core Backend  

---

## 🛠️ **Tech Stack**
- **Frontend**: React.js, TailwindCSS, Framer Motion  
- **State Management**: React Hooks (`useState`, `useEffect`)  
- **Animations**: Framer Motion  
- **Notifications**: React Toastify  
- **API Calls**: Axios  
- **Routing**: React Router  
- **Backend**: .NET Core API (separate repository)  

---

## 📥 Installation & Setup

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/your-username/business-directory-frontend.git
cd business-directory-frontend


2️⃣ Install Dependencies
npm install


3️⃣ Configure API Endpoint
Make sure the backend is running at http://localhost:5290/api/business. If your API is on a different port, update the API URL in src/components/BusinessList.jsx and BusinessForm.jsx:

const API_URL = "http://localhost:5290/api/business";

4️⃣ Run the Development Server
npm run dev
The app will be available at http://localhost:5173 (or another port as specified in the terminal).

🔧 How I Built This
1️⃣ Set Up React with Vite

npm create vite@latest business-directory --template react
cd business-directory
npm install


2️⃣ Installed Dependencies

npm install axios react-toastify framer-motion react-router-dom


3️⃣ Designed UI with TailwindCSS
Used TailwindCSS for styling:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Configured tailwind.config.js:


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};


4️⃣ Built Core Components
BusinessList.jsx → Fetches & displays businesses with search, pagination, and actions.
BusinessForm.jsx → Handles adding/editing businesses with real-time validation.
Pagination.jsx → Custom pagination component for better data handling.


5️⃣ Integrated API with Axios
Connected the frontend to a .NET Core API using Axios for GET, POST, PUT, DELETE requests.

6️⃣ Added Animations & UX Enhancements
Used Framer Motion for modals and transitions:

<motion.div 
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
>
  <BusinessForm />
</motion.div>


7️⃣ Final Enhancements & Testing
Refined UI (button styles, input validations).
Optimized performance (pagination, debounced search).
Tested across devices (responsive layout).
📡 API Endpoints
The app interacts with a .NET Core API. Below are the main endpoints:

Method	Endpoint	Description
GET	/api/business	Fetch all businesses
GET	/api/business/{id}	Fetch a single business
POST	/api/business	Add a new business
PUT	/api/business/{id}	Update an existing business
DELETE	/api/business/{id}	Remove a business
📂 Project Structure
css
Copy
Edit
📦 business-directory-frontend
├── 📂 src
│   ├── 📂 components
│   │   ├── BusinessList.jsx
│   │   ├── BusinessForm.jsx
│   │   ├── Pagination.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
├── 📜 tailwind.config.js
├── 📜 package.json
├── 📜 README.md
📷 Screenshots
Home Page	Add Business	Edit Business
🚀 Deployment
You can deploy this React app using:

Vercel:
bash
Copy
Edit
npm run build
vercel deploy
Netlify:
bash
Copy
Edit
npm run build
netlify deploy
For production, ensure that the API URL in src/config.js is updated to the deployed backend.

🔗 Backend API
The API is built with .NET Core and SQL Server. You can find the backend repository here:
👉 Business Directory Backend

💡 Troubleshooting
🔹 API Not Working?
Ensure your .NET Core API is running (dotnet run).
Verify the correct API URL in src/config.js.
Check browser console (F12 > Console) for errors.
🔹 Styles Not Loading?
Restart the dev server:
bash
Copy
Edit
npm run dev
Ensure TailwindCSS is correctly installed.
🔹 "Module Not Found" Errors?
Run:
bash
Copy
Edit
npm install
📜 License
This project is licensed under the MIT License.

⭐ Support & Contributions
🔹 Found an issue? Report it.
🔹 Want to contribute? Fork & submit a PR!

💙 Star this repository if you find it useful!