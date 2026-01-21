'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    // Basic validation (mock)
    if (!email || !password) {
        return { error: 'Please enter both email and password' };
    }

    // Set mock token cookie
    (await cookies()).set('token', 'mock-token-value', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });

    // Redirect to admin
    redirect('/admin');
}


export async function logoutAction() {
    (await cookies()).delete('token');
    redirect('/login');
}
