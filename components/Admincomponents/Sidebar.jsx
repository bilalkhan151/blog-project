import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="flex flex-col bg-slate-100 h-screen w-64 fixed left-0 top-0">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-black">
                <Image 
                    src={assets.logo} 
                    width={30} 
                    height={30} 
                    alt="logo"
                    priority
                />
                <span className="text-xl font-semibold">blogger</span>
            </div>

            <div className="flex-1 py-6 px-4">
                <div className="space-y-3">
                    <Link href='/admin/addproduct' className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-[-2px_2px_0px_#000000] transition-shadow">
                        <Image src={assets.add_icon} width={20} height={20} alt="add" />
                        <p>Add Blogs</p>
                    </Link>

                    <Link href='/admin/bloglist' className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-[-2px_2px_0px_#000000] transition-shadow">
                        <Image src={assets.blog_icon} width={20} height={20} alt="blog" />
                        <p>Blog lists</p>
                    </Link>

                    <Link href='/admin/subscriptions' className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-[-2px_2px_0px_#000000] transition-shadow">
                        <Image src={assets.email_icon} width={20} height={20} alt="email" />
                        <p>Subscriptions</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;