import mongoose from "mongoose";
import { type } from "os";
import { title } from "process";

const schema =new mongoose.Schema({
    title:{
        type: String ,
        required:true

    },
    description:{
        type:String ,
        required:true
        
    },
    category:{
        type:String ,
        required:true
        
    },
    author:{
        type:String  ,
        required:true
        
    },
    image:{
        type:String  ,
        required:true
        
    },
    authorImg:{
        type:String  ,
        required:true
        
    },
    Date:{
        type:Date,
        default:Date.now
        
    }
})


const bmodel =mongoose.model.blog || mongoose.model('blog',schema);


export default bmodel;