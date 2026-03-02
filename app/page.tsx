'use client' 

import Header from "@/components/header";
import Bloglist from "@/components/Bloglist";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";




export default function Home() {
  return (
    <main>

    <Header />
    <Subscribe />
    <Bloglist/> 
    <Footer/>
    </main>
    
  );
}
