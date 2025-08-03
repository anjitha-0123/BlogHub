import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then(async res => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then(setBlog)
      .catch(err => setError(err.message));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) return;
    const res = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
      credentials: "include"
    });
    if (res.ok) navigate("/");
    else alert("Delete failed");
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!blog) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <div className="text-gray-500 mb-4">by {blog.user?.username || "Unknown"}</div>
      <div className="text-gray-700">{blog.content}</div>
      <div className="text-xs text-gray-400 mt-4">{new Date(blog.time).toLocaleString()}</div>
      {userId === blog.user?._id && (
        <div className="mt-4 flex gap-2">
          <Link to={`/blogs/${blog._id}/edit`} className="bg-yellow-400 px-3 py-1 rounded">Edit</Link>
          <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>
      )}
    </div>
  );
}