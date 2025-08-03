import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import logo from '../assets/images/logo.jpeg'


export default function Register() {
  const [Username, setUsername] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Username, PhoneNumber, Email, password }),
    });
    if (res.ok) {
      navigate("/login");
    } else {
      const data = await res.text();
      setMsg(data);
    }
  };

  return (
    <div>
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {msg && <div className="mb-2 text-red-500">{msg}</div>}
      <input className="block w-full mb-2 p-2 border rounded"
        placeholder="Username" value={Username} onChange={e => setUsername(e.target.value)} required />
      <input className="block w-full mb-2 p-2 border rounded"
        placeholder="Phone Number" value={PhoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
      <input className="block w-full mb-2 p-2 border rounded"
        placeholder="Email" value={Email} onChange={e => setEmail(e.target.value)} required />
      <input className="block w-full mb-2 p-2 border rounded"
        type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
    </form>
    </div>
  );
}