import React from 'react';
import { Event } from './upcoming_events';
import { TypographyH2, TypographyP } from '../ui/typography';

type ScheduleMatrixProps = {
  start_date: Date;
  days: number;
  events: Event[];
};

const getTimeSlot = (time: string) => {
  const [hour, period] = time.split(/(AM|PM)/);
  const [hourNum, minuteNum] = hour.split(':').map(Number);
  return (hourNum % 12 + (period === 'PM' ? 12 : 0)) * 60 + (minuteNum || 0);
};

/**
 * ScheduleMatrix component
 * @param start_date - The starting date of the schedule (should always be a Sunday)
 * @param days - The number of days to display on the schedule
 * @param events - An array of all of the public events to display on the schedule
*/
const ScheduleMatrix: React.FC<ScheduleMatrixProps> = ({ start_date, days, events }) => {
  // Configs
  const starting_hour = 990; // Minutes since midnight - 5pm is 990 minutes
  const hours = [
    '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'
  ];

  if (!events || events.length === 0) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <TypographyH2>
          Loading...
        </TypographyH2>
      </div>
    );
  }

  return (
    <div className="flex flex-row max-w-full max-h-full border overflow-clip rounded-lg text-primary bg-background">
      {/* Hours */}
      <table className="h-full table-fixed bg-background rounded-lg">
        <thead>
          <tr className="bg-primary">
            <th className="py-1 font-medium text-sm border-b-primary">&nbsp;</th>
          </tr>
          <tr className="bg-primary">
            <th className="py-1 font-medium text-sm border-b-primary">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <tr className="h-12 divide-primary divide-x">
                <td className="pl-4 pr-2 py-2 font-light text-xs text-end text-primary">{hour}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Days */}
      <table className="w-full h-full table-fixed bg-background rounded-lg border-l border-l-primary overflow-x-scroll">
        <thead>
          <tr className="bg-primary">
            {Array.from({ length: days }, (_, i) => {
              const counting_date = new Date(start_date);
              counting_date.setDate(counting_date.getDate() + i);

              return (
                <th key={i} className="py-2 font-medium text-sm text-background_2" style={{ minWidth: '4.5rem' }}>
                  <div className="text-center m-0">{counting_date.toLocaleDateString('en-US')}</div>
                  {counting_date.toLocaleDateString('en-US') === new Date().toLocaleDateString('en-US') ? (
                    <div className="text-center w-full flex justify-center items-center">
                      <TypographyP className='bg-background text-primary leading-0 rounded-full px-3'>
                        {counting_date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </TypographyP>
                    </div>
                  ) : (
                    <div className="text-center text-background_2">{counting_date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary">
          {Array.from({ length: hours.length * 2 }).map((_, slotIndex) => (
            <tr key={slotIndex} className="h-6 divide-x divide-primary">
              {Array.from({ length: days }, (_, i) => {
                const counting_date = new Date(start_date);
                counting_date.setDate(counting_date.getDate() + i);

                return (
                  <td key={i} className="relative w-12 py-2 font-medium text-sm h-6">
                    <div className="absolute top-0 w-full">
                      {events
                        .filter((event) => new Date(event.date).toLocaleDateString() === counting_date.toLocaleDateString())
                        .filter((event) => {
                          const startSlot = getTimeSlot(new Date(event.date).toLocaleTimeString('en-US'));
                          const time = slotIndex * 30 + starting_hour; // Assuming the day starts at 1PM (780 minutes)
                          return time === startSlot;
                        })
                        .map((event, index) => {
                          const eventHeight = (event.duration / 30) * 1.5;
                          return (
                            <div
                              key={`${index}`}
                              className={`absolute text-md break-words font-semibold rounded-sm overflow-y-auto no-scrollbar z-10 hover:cursor-pointer border text-background ${event.color} p-1`}
                              style={{
                                fontSize: '0.7rem',
                                lineHeight: '1rem',
                                height: `${eventHeight}rem`,
                                left: '0px',
                                width: 'calc(100% - 4px)', // Adjust width to fit within the cell
                              }}
                            >
                              <div className="flex flex-col">
                                <TypographyP className='leading-2 m-0 p-0'>{event.title}</TypographyP>
                                <div className="font-normal">
                                  {new Date(event.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })} - {event.duration} min
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleMatrix;
