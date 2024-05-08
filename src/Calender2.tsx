import React from "react";
import "./calendar.scss";

interface Appointment {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  doctorId: number;
  date: string;
  specialty: string;
}

interface Props {
  appointments: Appointment[];
  doctors: { id: number; name: string }[];
}
interface TimeParts {
  hour: number;
  minute: string;
  slot: string;
}
const Calendar2: React.FC<Props> = ({ appointments, doctors }) => {
  const todaysDate = "2024-05-08";
  const todaysAppointments = appointments.filter(
    (appointment) => appointment.date === todaysDate
  );

  const colors = [
    "#FFC0CB",
    "#ADD8E6",
    "#90EE90",
    "#FFD700",
    "#FFA07A",
    "#98FB98",
  ];

  const timeBlocks = [...Array(13).keys()].map((hour) => hour + 8);

  const currentHour = new Date().getHours();

  return (
    <div className="doctor-calendar">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {doctors.map((doctor) => (
              <th key={doctor.id}>{doctor.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeBlocks.map((hour) => {
            const time = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${
              hour < 12 ? "AM" : "PM"
            }`;

            const appointmentsAtHour = todaysAppointments.filter(
              (appointment) =>
                isBetweenHours(time, appointment.startTime, appointment.endTime)
            );

            const isCurrentHour = hour === currentHour;

            return (
              <tr key={hour}>
                <td className={isCurrentHour ? "current-hour" : ""}>{time}</td>
                {doctors.map((doctor) => {
                  const doctorAppointments = appointmentsAtHour.filter(
                    (appointment) => appointment.doctorId === doctor.id
                  );
                  console.log(doctorAppointments);
                  return (
                    <td key={doctor.id} className="appointment">
                      {doctorAppointments.map((appointment, index) => {
                        const color =
                          colors[appointment.doctorId % colors.length];
                        const durationInMinutes = calculateDurationInMinutes(
                          appointment.startTime,
                          appointment.endTime
                        );
                        const height =
                          durationInMinutes === 30 && index === 1
                            ? "50%"
                            : "100%";

                        return (
                          <div
                            key={appointment.id}
                            className="appointment-details"
                            style={{
                              backgroundColor: color,
                              height:
                                durationInMinutes === 30
                                  ? "50%"
                                  : durationInMinutes === 45
                                  ? "75%"
                                  : "100%",
                              width: "100%",
                            }}
                          >
                            {`${appointment.title} - (${appointment.startTime}-${appointment.endTime})`}
                          </div>
                        );
                      })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const getTimeParts = (timeString: string): TimeParts => {
  const [hourString, minuteString, slot] = timeString.split(/:| /);
  const hour = parseInt(hourString, 10);
  return { hour, minute: minuteString, slot };
};
const calculateDurationInMinutes = (
  startTime: string,
  endTime: string
): number => {
  const { hour: startHour, minute: startMinute } = getTimeParts(startTime);
  const { hour: endHour, minute: endMinute } = getTimeParts(endTime);

  const parsedStartHour = parseInt(startHour, 10);
  const parsedEndHour = parseInt(endHour, 10);
  const parsedStartMinute = parseInt(startMinute, 10);
  const parsedEndMinute = parseInt(endMinute, 10);

  const start = new Date(2022, 0, 1, parsedStartHour, parsedStartMinute);
  const end = new Date(2022, 0, 1, parsedEndHour, parsedEndMinute);

  const duration = (end.getTime() - start.getTime()) / (1000 * 60);

  return Math.abs(duration);
};

const isBetweenHours = (hour: string, startTime: string, endTime: string) => {
  const {
    hour: startHour,
    minute: startMinute,
    slot: startSlot,
  } = getTimeParts(startTime);
  const {
    hour: endHour,
    minute: endMinute,
    slot: endSlot,
  } = getTimeParts(endTime);
  const {
    hour: checkHour,
    minute: checkMinute,
    slot: checkSlot,
  } = getTimeParts(hour);

  if (
    (checkHour > startHour ||
      (checkHour === startHour &&
        checkMinute >= startMinute &&
        checkSlot === startSlot)) &&
    (checkHour < endHour ||
      (checkHour === endHour &&
        checkMinute < endMinute &&
        checkSlot === endSlot))
  ) {
    return true;
  }

  return false;
};

const isSameTime = (time1: string, time2: string) => {
  return time1 === time2;
};

export default Calendar2;
