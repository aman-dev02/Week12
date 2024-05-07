import React from "react";
import "./calendar.scss";

interface Doctor {
  id: number;
  name: string;
}

interface Appointment {
  id: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  patientName: string;
}

interface Props {
  doctors: Doctor[];
  timeSlots: string[];
  appointments: Appointment[];
}

const DoctorCalendar: React.FC<Props> = ({
  doctors,
  timeSlots,
  appointments,
}) => {
  const convertTimeTo24HourFormat = (
    time: string
  ): [number, number, string] => {
    const [hour, minute, period] = time.split(/:| /).map(Number);
    return [
      hour + (period === 12 ? 0 : 12 * (period === 0 ? 1 : 0)),
      minute,
      period === 0 ? "AM" : "PM",
    ];
  };

  const isTimeSlotFilled = (doctorId: number, timeSlot: string) => {
    const [slotHour, slotMinute, slotPeriod] =
      convertTimeTo24HourFormat(timeSlot);

    return appointments.some((appointment) => {
      const [startHour, startMinute, startPeriod] = convertTimeTo24HourFormat(
        appointment.startTime
      );
      const [endHour, endMinute, endPeriod] = convertTimeTo24HourFormat(
        appointment.endTime
      );

      return (
        appointment.doctorId === doctorId &&
        slotHour === startHour &&
        slotMinute >= startMinute &&
        slotPeriod === startPeriod &&
        slotHour === endHour &&
        slotMinute < endMinute &&
        slotPeriod === endPeriod
      );
    });
  };

  return (
    <table className="doctor-calendar">
      <thead>
        <tr>
          <th></th>
          {doctors.map((doctor) => (
            <th key={doctor.id}>{doctor.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeSlot) => (
          <tr key={timeSlot}>
            <td>{timeSlot}</td>
            {doctors.map((doctor) => {
              const isFilled = isTimeSlotFilled(doctor.id, timeSlot);
              console.log(`the values is: ${isFilled}`);

              return (
                <td
                  key={`${doctor.id}-${timeSlot}`}
                  className={isFilled ? "appointment-filled" : ""}
                >
                  {appointments
                    .filter(
                      (appointment) =>
                        appointment.doctorId === doctor.id &&
                        timeSlot >= appointment.startTime &&
                        timeSlot < appointment.endTime
                    )
                    .map((appointment) => (
                      // console.log(
                      //   `Appointment ${appointment.id} - Doctor ${appointment.doctorId} - Time Slot ${timeSlot} - Filled: ${isFilled}`
                      // ),
                      <div key={appointment.id}>{appointment.patientName}</div>
                    ))}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DoctorCalendar;
