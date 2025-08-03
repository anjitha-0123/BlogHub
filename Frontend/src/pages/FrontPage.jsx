import { Link } from "react-router-dom";
import logo from '../assets/images/logo.jpeg'

export default function FrontPage() {
  return (
    <div>
      {/* Simple Navbar */}
      <nav className=" h-14 w-full flex   ">
        <div className="flex items-center gap-2">
          <img
            src={logo} // <-- Replace with your logo path
            alt="BlogHub Logo"
            className="h-8 w-8  rounded-full object-cover"
          />
          <span className="text-blue font-bold text-xl tracking-wide">BlogHub</span>
        </div>
        <div className="flex gap-4 ml-180">
          <Link
            to="/login"
            className="text-blue hover:bg-blue-700 px-4 py-2 rounded transition font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-800 hover:bg-blue-100 px-4 py-2 rounded transition font-semibold"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow-lg p-8 mt-6">
        {/* Left: Hero Text */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 drop-shadow-lg">
            Welcome to <span className="text-blue-600">BlogHub</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-900 max-w-xl">
            Discover, create, and share amazing stories with the world. Join our community of passionate writers and readers!
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
          <img
            src={logo} // <-- Replace with your image path
            alt="Blogging illustration"
            className="w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white"
          />
        </div>
      </div>
    </div>
  );
}