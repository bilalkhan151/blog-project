import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link href="/">
          <Image 
            src={assets.logo} 
            width={180} 
            height={40} 
            alt='blogger' 
            className='w-32 sm:w-auto'
            priority
          />
        </Link>
        <Link 
          href="/" 
          className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-3px_3px_0px_#000000] transition-shadow'
        >
          Get started 
          <Image src={assets.arrow} alt='arrow' width={16} height={16}/> 
        </Link>
      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-2xl mx-auto text-xs sm:text-base text-gray-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>
    </div>
  )
}

export default Header