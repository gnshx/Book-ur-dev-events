'use client'
import React from 'react'
import { useState } from 'react'
const Bookevent = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    }
  return (
    <div id="book-event">
        {submitted ? (
            <p className="text-lg font-semibold">Thank you for registering!</p>
        ) : ( 
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <button type="submit" className="button-submit">
                SUBMIT
                </button>
            </form>
        )}
    </div>
  )
}

export default Bookevent