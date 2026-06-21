import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplication";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";

function App() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Jobs />} />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/applications"
            element={
            <ProtectedRoute>
            <MyApplications />
            </ProtectedRoute>
            }
            />

            <Route
            path="/add-job"
            element={<AddJob />}
          />

          <Route
          path="/edit-job/:id"
          element={<EditJob />}
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;