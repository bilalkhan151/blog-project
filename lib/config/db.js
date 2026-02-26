import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        // ✅ CORRECT: mongodb+srv:// (not mongodb+sr\n://)
        await mongoose.connect('mongodb+srv://bloguser:blog200@cluster0.jc3ed33.mongodb.net/blog-app');
        console.log("✅ DB Connected Successfully");
    } catch (error) {
        console.error("❌ DB Connection Error:", error.message);
    }
}
// import mongoose from "mongoose";

// export const ConnectDB = async() =>{
//     await mongoose.connect('mongodb+srv://bloguser:blog200?@cluster0.jc3ed33.mongodb.net/blog-app')
//     console.log("DB Conneted");

// }
// export {ConnectDB};