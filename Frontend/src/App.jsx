import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import BlogView from "./pages/BlogView";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import FrontPage from "./pages/FrontPage";

function App() {
  const isLoggedIn = !!localStorage.getItem("userId");

  return (
    <BrowserRouter>
      
      <div className="max-w-2xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/blogs" element={isLoggedIn ? <BlogList /> : <Navigate to="/login" />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/blogs/:id/edit" element={isLoggedIn ? <EditBlog /> : <Navigate to="/login" />} />
          <Route path="/create" element={isLoggedIn ? <CreateBlog /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;