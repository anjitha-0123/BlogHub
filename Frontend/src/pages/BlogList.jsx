import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch blogs");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    const res = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
      credentials: "include"
    });
    if (res.ok) setBlogs(blogs.filter(b => b._id !== id));
    else alert("Delete failed");
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.content.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <Navbar></Navbar>
      <h2 className="text-2xl font-bold mt-20 mb-4">All Blogs</h2>
      <input
        className="mb-4 p-2 border rounded w-full"
        placeholder="Search blogs..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="space-y-4">
        {filteredBlogs.length === 0 && <div>No blogs found.</div>}
        {filteredBlogs.map(blog => (
          <div key={blog._id} className="p-4 border rounded bg-white">
            <Link to={`/blogs/${blog._id}`} className="text-xl font-semibold text-blue-700">{blog.title}</Link>
            <div className="text-gray-500 text-sm">by {blog.user?.username || "Unknown"}</div>
            <div className="mt-2 text-gray-700">{blog.content.slice(0, 100)}...</div>
            {userId === blog.user?._id && (
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-yellow-400 px-3 py-1 rounded"
                  onClick={() => navigate(`/blogs/${blog._id}/edit`)}
                >Edit</button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(blog._id)}
                >Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}