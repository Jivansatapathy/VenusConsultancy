// client/app/api/bookings/route.js
import { NextResponse } from 'next/server';
import Booking from '../../../../lib/models/Booking.js';
import { authAndRole, createErrorResponse } from '../../../../lib/middleware/authMiddleware.js';
import connectDB from '../../../../lib/config/db.js';

// Create a new booking request (public endpoint)
export async function POST(request) {
  try {
    await connectDB();
    
    const {
      name,
      email,
      phone,
      company,
      callType,
      preferredDate,
      preferredTime,
      timezone,
      message
    } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !callType || !preferredDate || !preferredTime || !timezone) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format'
      }, { status: 400 });
    }

    // Validate date is not in the past
    const selectedDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return NextResponse.json({
        success: false,
        message: 'Preferred date cannot be in the past'
      }, { status: 400 });
    }

    // Create new booking
    const booking = new Booking({
      name,
      email,
      phone,
      company,
      callType,
      preferredDate: selectedDate,
      preferredTime,
      timezone,
      message,
      status: 'pending'
    });

    await booking.save();

    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully',
      data: {
        id: booking._id,
        name: booking.name,
        email: booking.email,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
        callType: booking.callType
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

// Get all bookings (admin only)
export async function GET(request) {
  try {
    await connectDB();
    
    // Check authentication
    let user;
    try {
      user = authAndRole(request, 'admin');
    } catch (err) {
      return createErrorResponse(err.message, err.message.includes('Forbidden') ? 403 : 401);
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Build filter object
    const filter = {};
    if (status) {
      filter.status = status;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const bookings = await Booking.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Booking.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: {
        bookings,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

