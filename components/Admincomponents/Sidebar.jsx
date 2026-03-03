import { assets } from "../Assets/assets";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100'>
      <div className="flex items-center gap-2 px-6 py-4 border-b border-black">
        <Image src={assets.logo} width={120} alt='logo' />
      </div>

      <div className="w-28 sm:w-80 relative py-12">
        <div className="w-[50%] sm:w-[80%] absolute right-0 space-y-3">
          
          <Link href="/admin/addproduct" className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
            <Image src={assets.add_icon} alt='add' width={28} height={28} />
            <p>Add blogs</p>
          </Link>

          <Link href="/admin/bloglist" className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
            <Image src={assets.blog_icon} alt='add' width={28} height={28} />
            <p>Blog list</p>
          </Link>

          <Link href="/admin/subscribtions" className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
            <Image src={assets.email_icon} alt='add' width={28} height={28} />
            <p>Subscribtion</p>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;