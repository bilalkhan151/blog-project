import { NextResponse } from 'next/server';
import { query } from '@/lib/config/mysql2';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';

// GET all blogs
export async function GET() {
    try {
        const blogs = await query({
            query: 'SELECT * FROM blogs ORDER BY createdAt DESC',
            values: []
        });
        
        return NextResponse.json(blogs);
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ 
            success: false, 
            msg: error.message 
        }, { status: 500 });
    }
}

// POST - Create new blog
export async function POST(request) {
    try {
        const formData = await request.formData();
        
        const title = formData.get('title');
        const description = formData.get('description');
        const category = formData.get('category');
        const author = formData.get('author');
        const authorImgFile = formData.get('authorImg');
        const imageFile = formData.get('image');
        
        // Default images
        let authorImgUrl = '/uploads/profile_icon.png'; // Default author image
        let imageUrl = '/default-blog.jpg'; // Default blog image
        
        // Create uploads folder if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        await mkdir(uploadDir, { recursive: true });

        // Save author image if uploaded
        if (authorImgFile && authorImgFile.size > 0) {
            const bytes = await authorImgFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            // Create unique filename
            const timestamp = Date.now();
            const filename = `author-${timestamp}-${authorImgFile.name}`;
            const filepath = path.join(uploadDir, filename);
            
            await writeFile(filepath, buffer);
            authorImgUrl = `/uploads/${filename}`;
        }

        // Save blog image if uploaded
        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const timestamp = Date.now();
            const filename = `blog-${timestamp}-${imageFile.name}`;
            const filepath = path.join(uploadDir, filename);
            
            await writeFile(filepath, buffer);
            imageUrl = `/uploads/${filename}`;
        }
        
        // Save to database
        const result = await query({
            query: 'INSERT INTO blogs (title, description, category, author, authorImg, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
            values: [title, description, category, author, authorImgUrl, imageUrl]
        });
        
        return NextResponse.json({ 
            success: true, 
            msg: "Blog created successfully",
            id: result.insertId
        });
        
    } catch (error) {
        console.error("Blog API Error:", error);
        return NextResponse.json({ 
            success: false, 
            msg: error.message 
        }, { status: 500 });
    }
}

// DELETE blog
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ 
                success: false, 
                msg: "Blog ID is required" 
            }, { status: 400 });
        }

        // Get blog info to delete images
        const blogs = await query({
            query: 'SELECT imageUrl, authorImg FROM blogs WHERE id = ?',
            values: [id]
        });

        if (blogs.length > 0) {
            const blog = blogs[0];
            
            // Delete blog image if not default
            if (blog.imageUrl && blog.imageUrl !== '/default-blog.jpg') {
                try {
                    const imagePath = path.join(process.cwd(), 'public', blog.imageUrl);
                    await unlink(imagePath);
                } catch (err) {
                    console.log('Image not found or already deleted');
                }
            }
            
            // Delete author image if not default
            if (blog.authorImg && !blog.authorImg.includes('profile_icon')) {
                try {
                    const authorPath = path.join(process.cwd(), 'public', blog.authorImg);
                    await unlink(authorPath);
                } catch (err) {
                    console.log('Author image not found or already deleted');
                }
            }
        }

        // Delete from database
        await query({
            query: 'DELETE FROM blogs WHERE id = ?',
            values: [id]
        });

        return NextResponse.json({ 
            success: true, 
            msg: "Blog deleted successfully" 
        });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ 
            success: false, 
            msg: error.message 
        }, { status: 500 });
    }
}