"use client";
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from "next/image";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import Link from 'next/link';

const Page = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennet",
        authorImg: "/author-img.png",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        formData.append('image', image);

        try {
            const response = await axios.post('/api/blog', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (response.data.success) {
                toast.success("Blog added successfully!");
                // Reset form
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: "Alex Bennet",
                    authorImg: "/author-img.png",
                });
                setImage(null);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Error submitting blog");
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header with navigation */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Add New Blog</h1>
                <Link 
                    href="/admin" 
                    className="flex items-center gap-2 text-gray-600 hover:text-black transition group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Dashboard</span>
                </Link>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="flex gap-8">
                    <Link href="/admin" className="pb-4 px-1 text-gray-500 hover:text-black transition">Dashboard</Link>
                    <Link href="/admin/addproduct" className="pb-4 px-1 font-medium text-black border-b-2 border-black">Add Blog</Link>
                    <Link href="/admin/bloglist" className="pb-4 px-1 text-gray-500 hover:text-black transition">Blog List</Link>
                    <Link href="/admin/subscriptions" className="pb-4 px-1 text-gray-500 hover:text-black transition">Subscriptions</Link>
                </nav>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                {/* Thumbnail Upload */}
                <div className="mb-8">
                    <p className="text-sm font-medium text-gray-700 mb-3">Thumbnail Image</p>
                    <label htmlFor="image" className="cursor-pointer inline-block">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-black transition">
                            <Image 
                                src={!image ? assets.upload_area : URL.createObjectURL(image)} 
                                width={140} height={140} alt="upload"
                                className="rounded"
                            />
                        </div>
                    </label>
                    <input 
                        type="file" 
                        id="image" 
                        hidden 
                        onChange={(e) => setImage(e.target.files[0])} 
                        required 
                    />
                </div>

                {/* Blog Title */}
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Blog Title</label>
                    <input 
                        name="title" 
                        onChange={onChangeHandler} 
                        value={data.title} 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        type="text" 
                        placeholder="Enter blog title" 
                        required
                    />
                </div>

                {/* Blog Description */}
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Blog Description</label>
                    <textarea 
                        name="description" 
                        onChange={onChangeHandler} 
                        value={data.description} 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Write your blog content here" 
                        rows={7} 
                        required
                    />
                </div>

                {/* Category */}
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                    <select 
                        name="category"
                        onChange={onChangeHandler}
                        value={data.category} 
                        className="w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="Startup">Startup</option>
                        <option value="Technology">Technology</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button 
                        type="submit" 
                        className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        Publish Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;