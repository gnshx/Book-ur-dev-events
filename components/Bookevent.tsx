'use client'
import React from 'react'
import posthog from 'posthog-js';
import { useState } from 'react'
import { createBooking } from '@/lib/actions/booking.action'
const Bookevent = ({ eventid, slug }: { eventid: string, slug: string }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { success, message } = await createBooking({ eventid, slug, email });
        if (success) {
            setSubmitted(true);
            posthog.capture('Booking Created', {
                eventid: eventid,
                slug: slug,
                email: email,
            });
        } else {
            console.log(message);
            posthog.captureException('Booking Failed');
        }

        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    }
    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-lg font-semibold">Thank you for registering.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email address"
                        />
                    </div>
                    <button type="submit" className="button-submit">
                        Register
                    </button>
                </form>
            )}
        </div>
    )
}

export default Bookevent
