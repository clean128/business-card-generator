import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppNavbar } from "./components/navbar";
import CreateCardPage from "./pages/create-card";
import EditCardPage from "./pages/edit-card";
import ViewCardPage from "./pages/view-card";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

export default function App() {
  return (
    <Router>
      <div
        className="min-h-screen flex flex-col bg-[#4299e11f]"
        id="app-container"
      >
        <AppNavbar />
        <main className="flex-grow">
          <Routes>
            {/* <Route path="/" element={<Navigate to="/create" replace />} /> */}
            <Route path="/" element={<CreateCardPage />} />
            <Route path="/edit/:id" element={<EditCardPage />} />
            <Route path="/card/:id" element={<ViewCardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
        <footer className="py-4 px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Business Card Generator. All rights
          reserved.
        </footer>
      </div>
    </Router>
  );
}
