import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    if (res.ok) {
      navigate("/");
    } else {
      setMsg(data.error || "Failed to create blog");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl font-bold mt-20 mb-4">Create Blog</h2>
      {msg && <div className="mb-2 text-red-500">{msg}</div>}
      <input className="block w-full mb-2 p-2 border rounded"
        placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea className="block w-full mb-2 p-2 border rounded"
        placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required rows={6} />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Create</button>
    </form>
    </div>
  );
}