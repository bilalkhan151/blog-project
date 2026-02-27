import { NextResponse } from 'next/server';
import { query } from '@/lib/config/mysql2';

export async function POST(request) {
    try {
        const formData = await request.formData();
        
        const title = formData.get('title');
        const description = formData.get('description');
        const category = formData.get('category');
        const author = formData.get('author');
        const authorImg = formData.get('authorImg');
        
       
        const result = await query({
            query: 'INSERT INTO blogs (title, description, category, author, authorImg) VALUES (?, ?, ?, ?, ?)',
            values: [title, description, category, author, authorImg]
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

export async function GET() {
    try {
        const blogs = await query({
            query: 'SELECT * FROM blogs ORDER BY createdAt DESC',
            values: []
        });
        
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            msg: error.message 
        }, { status: 500 });
    }
}