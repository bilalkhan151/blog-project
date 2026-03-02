"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Page = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmails = async () => {
        try {
            const response = await axios.get('/api/subscribe');
            setEmails(response.data);
        } catch (error) {
            console.error("Error fetching emails:", error);
            toast.error("Failed to fetch subscriptions");
        } finally {
            setLoading(false);
        }
    };

    const unsubscribeEmail = async (id) => {
        if (window.confirm('Are you sure you want to unsubscribe this email?')) {
            try {
                const response = await axios.delete(`/api/subscribe?id=${id}`);
                if (response.data.success) {
                    toast.success("Unsubscribed successfully");
                    fetchEmails();
                }
            } catch (error) {
                console.error("Error unsubscribing:", error);
                toast.error("Failed to unsubscribe");
            }
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    return (
        <div className="max-w-6xl">
            {/* Header with Back Button */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin" 
                        className="flex items-center gap-2 text-gray-600 hover:text-black transition group"
                    >
                        <svg 
                            className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Dashboard</span>
                    </Link>
                </div>
                <h1 className="text-3xl font-bold">Subscriptions</h1>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="flex gap-8">
                    <Link href="/admin" className="pb-4 px-1 text-gray-500 hover:text-black transition">Dashboard</Link>
                    <Link href="/admin/addproduct" className="pb-4 px-1 text-gray-500 hover:text-black transition">Add Blog</Link>
                    <Link href="/admin/bloglist" className="pb-4 px-1 text-gray-500 hover:text-black transition">Blog List</Link>
                    <Link href="/admin/subscriptions" className="pb-4 px-1 font-medium text-black border-b-2 border-black">Subscriptions</Link>
                </nav>
            </div>

            {/* Summary Card */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800">Summary</h3>
                <p className="text-blue-600">Total Subscribers: {emails.length}</p>
            </div>

            {/* Subscriptions Table */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black mx-auto"></div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">#</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Subscribed Date</th>
                                <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {emails.length > 0 ? (
                                emails.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.email}</td>
                                        <td className="px-6 py-4 text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => unsubscribeEmail(item.id)}
                                                className="text-red-500 hover:text-red-700 font-medium text-sm"
                                            >
                                                Unsubscribe
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-12 text-gray-500">
                                        No subscriptions yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Page;