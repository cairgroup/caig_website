import { Event } from '@/components/calendar/upcoming_events';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

async function listEvents(): Promise<Event[] | undefined> {
  const calendar = google.calendar({ version: 'v3', auth: process.env.GOOGLE_API_KEY });
  const res = await calendar.events.list({
    calendarId: process.env.CALENDAR_ID,
    timeMin: new Date().toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  const fetchedEvents = res.data.items;
  if (!fetchedEvents || fetchedEvents.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');

  let events: Event[] = [];

  fetchedEvents.forEach((event) => {
    const start = event.start?.dateTime || event.start?.date;
    const date = start ? new Date(start) : new Date();
    const duration = event.end?.dateTime ?
      (new Date(event.end.dateTime).getTime() - date.getTime()) / 60000 : // 60,000 is milliseconds to minutes conversion
      0;
    const title = event.summary || 'No Title';
    const color = 'bg-primary';

    events.push({ date, duration, title, color });
  });

  return events;
}

export async function GET() {
  const events = await listEvents();

  if (!events) {
    return NextResponse.json({message: 'No events found', error: null, status: 404});
  }

  return NextResponse.json({message: events, error: null, status: 200});
}
