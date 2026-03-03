import { NextResponse } from 'next/server';
import { query } from '@/lib/config/mysql2';

// POST - Subscribe email
export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ 
                success: false, 
                msg: "Email is required" 
            }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ 
                success: false, 
                msg: "Please enter a valid email address" 
            }, { status: 400 });
        }

        const existing = await query({
            query: 'SELECT * FROM subscriptions WHERE email = ?',
            values: [email]
        });

        if (existing.length > 0) {
            return NextResponse.json({ 
                success: false, 
                msg: "This email is already subscribed!" 
            }, { status: 400 });
        }

        const result = await query({
            query: 'INSERT INTO subscriptions (email) VALUES (?)',
            values: [email]
        });

        return NextResponse.json({ 
            success: true, 
            msg: "✅ Successfully subscribed! Thank you for joining our newsletter.",
            id: result.insertId
        });

    } catch (error) {
        console.error("Subscribe API Error:", error);
        return NextResponse.json({ 
            success: false, 
            msg: "Server error. Please try again later." 
        }, { status: 500 });
    }
}


export async function GET() {
    try {
        const subscriptions = await query({
            query: 'SELECT * FROM subscriptions ORDER BY createdAt DESC',
            values: []
        });

        return NextResponse.json(subscriptions);
    } catch (error) {
        console.error("GET Subscriptions Error:", error);
        return NextResponse.json({ 
            success: false, 
            msg: error.message 
        }, { status: 500 });
    }
}

// DELETE - Unsubscribe email
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ 
                success: false, 
                msg: "ID is required" 
            }, { status: 400 });
        }

        await query({
            query: 'DELETE FROM subscriptions WHERE id = ?',
            values: [id]
        });

        return NextResponse.json({ 
            success: true, 
            msg: "Successfully unsubscribed" 
        });

    } catch (error) {
        console.error("DELETE Subscription Error:", error);
        return NextResponse.json({ 
            success: false, 
            msg: error.message 
        }, { status: 500 });
    }
}