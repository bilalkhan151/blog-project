import {ConnectDB} from "@/lib/config/db"
import { writeFile } from "fs/promises";
import bmodel from "@/lib/models/bmodel";
import {NextResponse }  from "next/server";


const LoadDB = async ()=>{
    await ConnectDB();
    
}

LoadDB();

export async function GET(request) {
    
    return NextResponse.json({ msg: "Api is working"})
    
}


export async function POST(request) {
    
    const formData = await request.formData();
    const timestamp = Date.now();


    const image=formData.get('image');

    const imagbyteData = await image.arrayBuffer()

    const buffer= Buffer.from(imagbyteData);
    const path =`./public/${timestamp}_${image.name}`;

    await writeFile(path,buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
//     console.log(imgUrl);
//     return  NextResponse.json({imgUrl})
// }
    const blogData ={
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category:`${formData.get('category')}`,
        author:`${formData.get('author')}`,
        image:`${imgUrl}`,
        authorImg:`${formData.get('authorImg')}`


    }

    await bmodel.create(blogData);
    console.log("Blog  saved")
    return NextResponse.json({success:true,msg:"Blog Added"})
    
 }
