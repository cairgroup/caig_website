"use client";

import Link from "next/link";
import { TypographyH1, TypographyH4 } from "../ui/typography";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import ScheduleMatrix from "./schedule_matrix";
import { useEffect, useState } from "react";

export type Event = {
  date: Date;
  duration: number;
  title: string;
  color: string;
  location?: string;
};

const getStartOfWeek = (given_date: Date, days: number): Date => {
  const date = new Date(given_date);
  const dayOfWeek = date.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)

  if (days === 7) {
    // Set the date to the previous Sunday if the given date is not a Sunday when
    // displaying the whole week
    date.setDate(date.getDate() - dayOfWeek);
  }

  return date;
};

const getPreviousTime = (given_date: Date, days: number): Date => {
  const date = new Date(given_date);
  date.setDate(date.getDate() - days);
  return date;
};

const getNextTime = (given_date: Date, days: number): Date => {
  const date = new Date(given_date);
  date.setDate(date.getDate() + days);
  return date;
};

const determineDaysToShow = (): number => {
  if (window.innerWidth > 1024) {
    return 7;
  } else if (window.innerWidth > 640) {
    return 3;
  } else {
    return 2;
  }
};

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [days, setDays] = useState<number>(7);
  const [closestSunday, setClosestSunday] = useState<Date>(getStartOfWeek(new Date(), 7));

  useEffect(() => {
    async function fetchEvents() {
      const data: { message: Event[], error: any, status: number } = await fetch('/api/google_calendar', {
        method: 'GET',
      }).then((response) => response.json());
      setEvents(data.message);
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newDays = determineDaysToShow();
      setDays(newDays);
      setClosestSunday(getStartOfWeek(new Date(), newDays));
    };

    // Set initial days based on the window size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className="animate-fade-up flex flex-col items-start justify-start w-full mt-12 bg-background_2 p-5 rounded-lg">
      <div className="flex flex-col mb-3 sm:mb-0 sm:flex-row justify-between w-full">
        <TypographyH1 className='lg:text-3xl md:text-3xl mb-3 text-primary align-middle'>
          Upcoming Events
        </TypographyH1>
        <Link
          target="_blank"
          href="https://calendar.google.com/calendar/u/0?cid=Y19iODJlN2Y2NDk5ZjQwNWQ2NDFhMmRkMTBhZmQzOTg2Njk0NzNlZTc3ZTRiOGYzZmU4NTFiZThkMWEyNTljZjliQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
          className="align-top"
        >
          <Button
            variant="default"
            size="default"
            className="text-lg md:text-xl border-primary border-2 bg-background hover:bg-primary text-primary hover:text-background group flex items-center"
          >
            Export Calendar
            <Icons.export className="ml-2" />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-between w-full text-primary m-2 pr-4">
        <div className="flex md:flex-row items-center justify-center align-middle gap-4">
          <Button onClick={() => {
            setClosestSunday(getPreviousTime(closestSunday, days));
          }} className="bg-transparent hover:bg-background">
            <Icons.chevronLeft />
          </Button>
          <TypographyH4 className="m-0 hidden sm:block">
            Week of {closestSunday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </TypographyH4>
          <Button onClick={() => {
            setClosestSunday(getNextTime(closestSunday, days));
          }} className="bg-transparent hover:bg-background">
            <Icons.chevronRight />
          </Button>
        </div>
        <Button onClick={() => {
          setClosestSunday(getStartOfWeek(new Date(), days));
        }} className="bg-transparent hover:bg-background w-full max-w-[250px]">
          <TypographyH4>Today</TypographyH4>
        </Button>
      </div>
      <ScheduleMatrix start_date={closestSunday} days={days} events={events} />
    </div>
  );
}
