import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { studentId } = await request.json();

    console.log('🔍 BOOKING TEST: Direct booking test for student:', studentId);

    // 1. Check if student exists
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id, student_name, roll_number')
      .eq('id', studentId)
      .single();

    console.log('🔍 BOOKING TEST: Student exists:', !!student, student);

    // 2. Get ALL bookings for this student (any status)
    const { data: allBookings, error: allBookingsError } = await supabase
      .from('bookings')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    console.log('🔍 BOOKING TEST: All bookings:', allBookings?.length || 0, allBookings);

    // 3. Get confirmed bookings only
    const { data: confirmedBookings, error: confirmedError } = await supabase
      .from('bookings')
      .select('*')
      .eq('student_id', studentId)
      .eq('status', 'confirmed')
      .order('created_at', { ascending: false });

    console.log('🔍 BOOKING TEST: Confirmed bookings:', confirmedBookings?.length || 0, confirmedBookings);

    // 4. Get schedules for the route
    const routeId = '72d9ca02-7131-40c5-a23d-21cdb3653bea';
    const { data: schedules, error: schedulesError } = await supabase
      .from('schedules')
      .select('*')
      .eq('route_id', routeId)
      .gte('schedule_date', '2025-07-05')
      .lte('schedule_date', '2025-08-05')
      .order('schedule_date', { ascending: true });

    console.log('🔍 BOOKING TEST: Schedules for route:', schedules?.length || 0, schedules);

    // 5. Test the matching logic
    const matchResults = [];
    if (confirmedBookings && schedules) {
      confirmedBookings.forEach(booking => {
        schedules.forEach(schedule => {
          const idMatch = booking.schedule_id === schedule.id;
          const dateRouteMatch = booking.trip_date === schedule.schedule_date && booking.route_id === schedule.route_id;
          
          if (idMatch || dateRouteMatch) {
            matchResults.push({
              bookingId: booking.id,
              scheduleId: schedule.id,
              date: schedule.schedule_date,
              matchType: idMatch ? 'ID Match' : 'Date+Route Match',
              booking: booking,
              schedule: schedule
            });
          }
        });
      });
    }

    console.log('🔍 BOOKING TEST: Match results:', matchResults.length, matchResults);

    return NextResponse.json({
      success: true,
      student,
      allBookings: allBookings || [],
      confirmedBookings: confirmedBookings || [],
      schedules: schedules || [],
      matchResults,
      summary: {
        studentExists: !!student,
        totalBookings: allBookings?.length || 0,
        confirmedBookings: confirmedBookings?.length || 0,
        totalSchedules: schedules?.length || 0,
        matches: matchResults.length
      }
    }, { status: 200 });

  } catch (error) {
    console.error('🔍 BOOKING TEST: Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 