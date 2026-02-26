import mongoose from "mongoose";
import { type } from "os";
import { title } from "process";

const schema =new mongoose.schema({
    title:{
        type:string ,
        required:true

    },
    description:{
        type:string ,
        required:true
        
    },
    category:{
        type:string ,
        required:true
        
    },
    author:{
        type:string ,
        required:true
        
    },
    image:{
        type:string ,
        required:true
        
    },
    authorImg:{
        type:string ,
        required:true
        
    },
    Date:{
        type:Date,
        default:Date.now
        
    }
})


const bmodel =mongoose.model.blog || mongoose.model('blog',schema);


export default bmodel;