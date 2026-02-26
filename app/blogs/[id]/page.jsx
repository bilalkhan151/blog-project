'use client'
import { blog_data, assets } from '@/Assets/assets';
import React, { useEffect, useState } from 'react'; // Ensure these are imported
import Image from 'next/image';
import Link from 'next/link';

const Page = ({ params }) => {
    const [data, setData] = useState(null);

    const fetchBlogData = async () => {
        
        const resolvedParams = await params; 
        const blogId = resolvedParams.id;

        for (let i = 0; i < blog_data.length; i++) {
            if (Number(blogId) === blog_data[i].id) {
                setData(blog_data[i]);
                // console.log(blog_data[i]);
                break;
            }
        }
    }

    useEffect(() => {
        fetchBlogData();
    }, [params]);

    return data ? (
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href='/'>
                    <Image src={assets.logo} width={180} alt='' className='w- 32.5 sm:w-auto'/>
                </Link>
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
                    Get started <Image src={assets.arrow} alt='' />
                </button>
            </div>
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-175 mx-auto'>{data.title}</h1>
                <Image className='mx-auto mt-6 border border-white rounded-full' src={data.author_img} width={60} height={60} alt='' />
                <p className='mt-1 pb-2 text-lg max-w-185 mx-auto'>{data.author}</p>
            </div>
            <div className='mx-5 max-w-200 md:mx-auto mt-25 mb-10'>
                <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='' />
                <p className='mt-10'>{data.description}</p>
            </div>
        </div>
    ) : (
        <div className='h-screen flex justify-center items-center'>Loading...</div>
    );
}

export default Page;