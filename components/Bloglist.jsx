"use client";
import React, { useEffect, useState } from "react";
import BlogItem from './Blogitem';
import axios from "axios";

const Bloglist = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog');
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter((item) => 
        menu === "All" ? true : item.category === menu
    );

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-center gap-4 my-10 flex-wrap">
                {["All", "Technology", "Startup", "Lifestyle"].map((item) => (
                    <button 
                        key={item}
                        onClick={() => setMenu(item)} 
                        className={`py-2 px-6 rounded transition-all ${
                            menu === item 
                            ? "bg-black text-white" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
                    <p className="mt-2 text-gray-600">Loading blogs...</p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((item) => (
                            <BlogItem 
                                key={item.id}
                                id={item.id}
                                image={item.imageUrl}
                                title={item.title}
                                description={item.description}
                                category={item.category}
                            />
                        ))
                    ) : (
                        <p className="text-center w-full text-gray-500 py-20">
                            No blogs found in {menu} category.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Bloglist;