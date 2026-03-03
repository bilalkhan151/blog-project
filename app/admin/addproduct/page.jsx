"use client";

import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from "next/image";
import React, { useState } from "react";
import { toast } from 'react-toastify';

const Page = () => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennet",
        authorImg: "/author-img.png",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

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
            const response = await axios.post('/api/blog', formData);
            if (response.data.success) {
                toast.success("Blog added successfully!");
                setData({ title: "", description: "", category: "Startup", author: "Alex Bennet", authorImg: "/author-img.png" });
                setImage(null);
            }
        } catch (error) {
            toast.error("Error adding blog");
        }
    };

    return (
        <div className="max-w-4xl">
            {/* Header with navigation */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Add New Blog</h1>
                <Link 
                    href="/admin" 
                    className="text-gray-600 hover:text-black transition"
                >
                    ← Back to Dashboard
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
                    <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} required />
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Blog Title</label>
                        <input 
                            name="title" 
                            onChange={onChangeHandler} 
                            value={data.title} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter blog title"
                            required 
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Blog Description</label>
                        <textarea 
                            name="description" 
                            onChange={onChangeHandler} 
                            value={data.description} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            rows={8}
                            placeholder="Write your blog content here..."
                            required 
                        />
                    </div>

                    <div>
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

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                        >
                            Publish Blog
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
                toast.success(response.data.msg);
                // Reset form after successful submission
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: "Alex Bennet",
                    authorImg: "/author-img.png",
                });
                setImage(false);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Error submitting blog");
            console.error(error);
        }
    }

    return (
        <>
            <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
                <p className="text-xl ">Upload thumbnail</p>
                <label htmlFor="image" className="cursor-pointer">
                    <Image 
                        className='mt-4' 
                        src={!image ? assets.upload_area : URL.createObjectURL(image)} 
                        width={140}  
                        height={170} 
                        alt='upload thumbnail'
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </label>
                <input 
                    onChange={(e) => setImage(e.target.files[0])} 
                    type="file"  
                    id='image' 
                    hidden 
                    required 
                />
                
                <p className='text-xl mt-4'>Blog title</p>
                <input 
                    name='title' 
                    onChange={onChangeHandler} 
                    value={data.title} 
                    className='w-full sm:w-125 mt-4 px-4 py-3 border' 
                    type="text" 
                    placeholder='Type here' 
                    required
                />
                
                <p className='text-xl mt-4'>Blog description</p>
                <textarea 
                    name='description' 
                    onChange={onChangeHandler} 
                    value={data.description} 
                    className='w-full sm:w-125 mt-4 px-4 py-3 border' 
                    placeholder='Write content here' 
                    rows={7} 
                    required
                />
                
                <p className='text-xl mt-4'>Blog category</p>
                <select 
                    name="category"
                    onChange={onChangeHandler}
                    value={data.category} 
                    className='w-40 mt-4 px-4 py-3 border text-gray-500'
                >
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <br />
                <button 
                    type="submit" 
                    className='mt-8 w-40 bg-black text-white py-3 rounded hover:bg-gray-800'
                >
                    ADD
                </button>
            </form>
        </>
    );
};

export default Page;
