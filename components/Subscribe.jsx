"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/subscribe', { email });
            
            if (response.data.success) {
                toast.success('Successfully subscribed!');
                setEmail('');
            } else {
                toast.error('Subscription failed');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 py-16 px-4 border-t border-black-200">
            <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Get the latest blogs and updates delivered straight to your inbox.
                </p>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-black outline-none focus:ring-2 focus:ring-black"
                        disabled={loading}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
                
                <p className="text-xs text-gray-500 mt-4">
                    By subscribing, you agree to receive updates from our blog.
                </p>
            </div>
        </div>
    );
};

export default Subscribe;