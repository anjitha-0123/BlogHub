// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../pages/AuthContext";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn, setIsLoggedIn } = useAuth();

//   const handleLogout = async () => {
//     await fetch("/api/logout", { method: "GET", credentials: "include" });
//     localStorage.removeItem("userId");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   // Helper to highlight active link
//   const navLink = (to, label) => (
//     <Link
//       to={to}
//       className={`px-3 py-1 rounded hover:bg-blue-700 transition ${
//         location.pathname === to ? "bg-blue-800" : ""
//       }`}
//     >
//       {label}
//     </Link>
//   );

//   return (
//     <nav className="flex justify-between  p-4 bg-blue-600 text-white mb-4 rounded shadow">
//       <div className="flex items-center gap-4">
//         <Link to="/" className="font-bold text-xl tracking-wide">BlogHub</Link>
//         {navLink("/Home", "Home")}
//         {isLoggedIn && (
//           <>
//             {navLink("/blogs", "All Blogs")}
//             {navLink("/create", "Create")}
//           </>
//         )}
//       </div>
//       <div className="flex items-center gap-2">
//         {isLoggedIn ? (
//           <>
//             {navLink("/profile", "Profile")}
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             {navLink("/login", "Login")}
//             {navLink("/register", "Register")}
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "GET", credentials: "include" });
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Helper to highlight active link
  const navLink = (to, label) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded hover:bg-blue-700 transition ${
        location.pathname === to ? "bg-blue-800" : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-3 bg-blue-600 text-white shadow-lg">
      <div className="flex items-center gap-6">
        {/* Optional: Add a logo image */}
        {/* <img src="/your-logo.png" alt="Logo" className="h-8 w-8 mr-2 rounded-full" /> */}
        <Link to="/" className="font-bold text-2xl tracking-wide">BlogHub</Link>
        <div className="flex gap-4">
          {navLink("/Home", "Home")}
          {isLoggedIn && (
            <>
              {navLink("/blogs", "All Blogs")}
              {navLink("/create", "Create")}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            {navLink("/profile", "Profile")}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {navLink("/login", "Login")}
            {navLink("/register", "Register")}
          </>
        )}
      </div>
    </nav>
  );
}