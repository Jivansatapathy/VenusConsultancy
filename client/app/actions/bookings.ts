'use server';

import { revalidatePath } from 'next/cache';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message: string;
  callType: string;
}

export async function submitBookingForm(formData: BookingFormData) {
  try {
    // Use Next.js API route (same origin)
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit booking');
    }

    const data = await response.json();
    revalidatePath('/book-call');
    return { success: true, data };
  } catch (error) {
    console.error('Booking form submission error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An error occurred' 
    };
  }
}

