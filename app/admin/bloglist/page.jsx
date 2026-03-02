"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog');
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`/api/blog?id=${id}`);
                toast.success("Blog deleted successfully");
                fetchBlogs();
            } catch (error) {
                toast.error("Failed to delete blog");
            }
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Blog List</h1>
                <Link 
                    href="/admin/addproduct" 
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    New Blog
                </Link>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="flex gap-8">
                    <Link href="/admin" className="pb-4 px-1 text-gray-500 hover:text-black transition">Dashboard</Link>
                    <Link href="/admin/addproduct" className="pb-4 px-1 text-gray-500 hover:text-black transition">Add Blog</Link>
                    <Link href="/admin/bloglist" className="pb-4 px-1 font-medium text-black border-b-2 border-black">Blog List</Link>
                    <Link href="/admin/subscriptions" className="pb-4 px-1 text-gray-500 hover:text-black transition">Subscriptions</Link>
                </nav>
            </div>

            {/* Blog Table */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black mx-auto"></div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Title</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Category</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Author</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                                <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium">{blog.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{blog.author}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => deleteBlog(blog.id)}
                                            className="text-red-500 hover:text-red-700 font-medium text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {blogs.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No blogs found. Create your first blog!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BlogList;