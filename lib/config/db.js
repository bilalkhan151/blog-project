
import mongoose from "mongoose";

export const ConnectDB = async() =>{
    await mongoose.connect('mongodb+srv://bloguser:blog200?@cluster0.jc3ed33.mongodb.net/blog-app')
    console.log("DB Conneted");

}
