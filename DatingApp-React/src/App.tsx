import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Members from "./pages/Members";
import MemberDetails from "./pages/MemberDetails";
import MemberEdit from "./pages/MemberEdit";
import Messages from "./pages/Messages";
import Likes from "./pages/Likes";

function App() {
  const { token } = useAuthStore();

  useEffect(() => {
    // Set axios default headers whenever token changes
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/members" />}
          />
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/members" />}
          />
          <Route
            path="/members"
            element={token ? <Members /> : <Navigate to="/login" />}
          />
          <Route
            path="/members/:id"
            element={token ? <MemberDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/members/edit"
            element={token ? <MemberEdit /> : <Navigate to="/login" />}
          />
          <Route
            path="/messages"
            element={token ? <Messages /> : <Navigate to="/login" />}
          />
          <Route
            path="/likes"
            element={token ? <Likes /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
