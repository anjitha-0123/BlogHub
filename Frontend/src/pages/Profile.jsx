import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/users/me", { credentials: "include" })
      .then(res => res.json())
      .then(setUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <Navbar></Navbar>
      <h2 className="text-2xl font-bold mt-20 mb-4">Profile</h2>
      <div><b>Username:</b> {user.username}</div>
      <div><b>Email:</b> {user.email}</div>
      <div><b>Phone:</b> {user.phonenumber}</div>
    </div>
  );
}