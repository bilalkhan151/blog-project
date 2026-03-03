import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { assets } from '../Assets/assets';
const BlogItem = ({ id, image, title, description, category }) => {
    // Use image from props or fallback to upload_area from assets
    const imageSrc = image || assets.upload_area;
    
    return (
        <div className="border border-black rounded-lg overflow-hidden w-87.5 bg-white hover:shadow-lg transition-shadow">
            <Link href={`/blogs/${id}`}>
                <div className="relative w-full h-50 overflow-hidden">
                    <Image 
                        src={imageSrc}
                        alt={title || 'Blog image'}
                        width={350}
                        height={200}
                        className='w-full h-full object-cover border-b border-black hover:scale-105 transition-transform duration-300'
                        onError={(e) => {
                            e.target.src = assets.upload_area;
                        }}
                    />
                </div>
            </Link>
            <div className="p-4">
                <p className='inline-block bg-black text-white text-xs px-2 py-1 rounded mb-2'>
                    {category || 'Uncategorized'}
                </p>
                <Link href={`/blogs/${id}`}>
                    <h3 className='font-semibold text-lg mb-2 hover:text-blue-600 line-clamp-2'>{title}</h3>
                </Link>
                <p className='text-gray-600 text-sm line-clamp-3 mb-3'>{description}</p>
                <Link 
                    href={`/blogs/${id}`} 
                    className='text-blue-600 text-sm font-medium hover:underline'
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
};

export default BlogItem;