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