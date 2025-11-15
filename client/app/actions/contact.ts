'use server';

import { revalidatePath } from 'next/cache';

export interface ContactFormData {
  name: string;
  email: string;
  source: string;
  message: string;
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Use Next.js API route (same origin)
    const response = await fetch('/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit contact form');
    }

    const data = await response.json();
    revalidatePath('/contact');
    return { success: true, data };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An error occurred' 
    };
  }
}

