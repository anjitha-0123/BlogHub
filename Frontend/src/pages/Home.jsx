import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/myblogs", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="text-center mt-10">
      <Navbar></Navbar>
      <h1 className="text-4xl font-bold mt-20">Welcome to BlogHub!</h1>
      <p className="text-lg text-gray-600 mb-8">Share your thoughts, read others, and connect.</p>
      <h2 className="text-2xl font-semibold mb-4">Your Blogs</h2>
      {loading ? (
        <div>Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-gray-500">You haven't posted any blogs yet.</div>
      ) : (
        <div className="space-y-4 max-w-xl mx-auto">
          {blogs.map(blog => (
            <div key={blog._id} className="p-4 border rounded bg-white text-left">
              <Link to={`/blogs/${blog._id}`} className="text-xl font-semibold text-blue-700">{blog.title}</Link>
              <div className="mt-2 text-gray-700">{blog.content.slice(0, 100)}...</div>
              <div className="text-xs text-gray-400 mt-2">{new Date(blog.time).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}