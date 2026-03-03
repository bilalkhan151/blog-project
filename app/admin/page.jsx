"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalBlogs: 0,
        totalSubscribers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const blogsRes = await axios.get('/api/blog');
            const subsRes = await axios.get('/api/subscribe');
            
            setStats({
                totalBlogs: blogsRes.data.length,
                totalSubscribers: subsRes.data.length
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
            
            {/* Navigation Links - Horizontal instead of sidebar */}
            <div className="flex gap-6 mb-8 border-b pb-4">
                <Link href="/admin" className="font-medium text-black border-b-2 border-black pb-2">
                    Dashboard
                </Link>
                <Link href="/admin/addproduct" className="text-gray-600 hover:text-black pb-2">
                    Add Blogs
                </Link>
                <Link href="/admin/bloglist" className="text-gray-600 hover:text-black pb-2">
                    Blog List
                </Link>
                <Link href="/admin/subscriptions" className="text-gray-600 hover:text-black pb-2">
                    Subscriptions
                </Link>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-8">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                    <p className="text-gray-500 text-sm mb-1">Total Blogs</p>
                    <p className="text-4xl font-bold text-blue-500">{stats.totalBlogs}</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                    <p className="text-gray-500 text-sm mb-1">Total Subscribers</p>
                    <p className="text-4xl font-bold text-green-500">{stats.totalSubscribers}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link 
                        href="/admin/addproduct" 
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                        + Add New Blog
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
