"use client"
import { assets } from '../Assets/assets';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const Page = ({ params }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBlogData = async () => {
        try {
            const resolvedParams = await params;
            const blogId = resolvedParams.id;
            
            const response = await axios.get('/api/blog');
            const blog = response.data.find(b => b.id == blogId);
            setData(blog);
        } catch (error) {
            console.error("Error fetching blog:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, [params]);

    if (loading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
                    <p className="mt-2">Loading...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500">Blog Not Found</h1>
                    <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-gray-50 py-5 px-5 md:px-12 lg:px-28 min-h-screen'>
            <div className='flex justify-between items-center mb-8'>
                <Link href='/'>
                    <Image src={assets.logo} width={150} alt='logo' className='cursor-pointer'/>
                </Link>
                <Link 
                    href='/'
                    className='flex items-center gap-2 font-medium py-2 px-4 border border-black shadow-[-5px_5px_0px_#000000] hover:shadow-[-2px_2px_0px_#000000] transition-shadow'
                >
                    ← Back
                </Link>
            </div>

            <div className='text-center mb-12'>
                <h1 className='text-3xl sm:text-5xl font-bold max-w-3xl mx-auto mb-6'>{data.title}</h1>
                
                <div className='flex items-center justify-center gap-3 mb-4'>
                    <img 
                        src={data.authorImg || assets.profile_icon} 
                        className='w-12 h-12 rounded-full border-2 border-white object-cover'
                        alt={data.author}
                    />
                    <div className='text-left'>
                        <p className='font-semibold'>{data.author}</p>
                        <p className='text-sm text-gray-500'>{new Date(data.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                
                <span className='inline-block bg-black text-white text-sm px-3 py-1 rounded'>
                    {data.category}
                </span>
            </div>

            <div className='max-w-4xl mx-auto'>
                <div className='mb-8 rounded-lg overflow-hidden border-4 border-white shadow-lg'>
                    <img 
                        src={data.imageUrl || '/default-blog.jpg'} 
                        alt={data.title}
                        className='w-full h-100 object-cover'
                        onError={(e) => {
                            e.target.src = '/default-blog.jpg';
                        }}
                    />
                </div>
                
                <div className='prose prose-lg max-w-none'>
                    <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
                        {data.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;