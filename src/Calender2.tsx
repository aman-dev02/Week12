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

const Calendar2: React.FC<Props> = ({ appointments, doctors }) => {
  // const doctorNames = doctors.reduce((map, doctor) => {
  //   map[doctor.id] = doctor.name;
  //   return map;
  // }, {} as Record<number, string>);
  const todaysDate = "2024-05-08";
  const todaysAppointment = appointments.filter(
    (appointment) => appointment.date === todaysDate
  );
  // console.log(todaysAppointment);
  const colors = [
    "#FFC0CB",
    "#ADD8E6",
    "#90EE90",
    "#FFD700",
    "#FFA07A",
    "#98FB98",
  ];

  const timeBlocks = [...Array(13).keys()].map((hour) => hour + 8);
  // console.log(timeBlocks);
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
            // console.log(time);
            const appointmentsAtHour = todaysAppointment.filter((appointment) =>
              isBetweenHours(time, appointment.startTime, appointment.endTime)
            );

            const isCurrentHour = hour === currentHour;
            // console.log(isCurrentHour, hour, currentHour);
            return (
              <tr key={hour}>
                <td className={isCurrentHour ? "current-hour" : ""}>{time}</td>
                {doctors.map((doctor) => {
                  const appointment = appointmentsAtHour.find(
                    (appointment) =>
                      appointment.doctorId === doctor.id &&
                      isSameTime(time, appointment.startTime)
                  );

                  const color = appointment
                    ? colors[appointment.doctorId % colors.length]
                    : "";
                  const durationInMinutes = appointment
                    ? calculateDurationInMinutes(
                        appointment.startTime,
                        appointment.endTime
                      )
                    : 0;

                  return (
                    <td
                      key={doctor.id}
                      style={{
                        backgroundColor: color,
                        height: durationInMinutes > 30 ? "50%" : "100%",
                      }}
                    >
                      {appointment && (
                        <div className="appointment-details">
                          {`${appointment.title} -  (${appointment.startTime}-${appointment.endTime})`}
                        </div>
                      )}
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
const getTimeParts = (timeString: string) => {
  const [hourString, minuteString, slot] = timeString.split(/:| /);
  const hour = parseInt(hourString, 10);
  return { hour, minute: minuteString, slot };
};
const calculateDurationInMinutes = (startTime: string, endTime: string) => {
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

  const start = new Date(`2022-01-01T${startHour}:${startMinute} ${startSlot}`);
  const end = new Date(`2022-01-01T${endHour}:${endMinute} ${endSlot}`);

  return (end.getTime() - start.getTime()) / (1000 * 60);
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
