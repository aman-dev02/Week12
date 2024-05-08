import Calender2 from "./Calender2";
import Date from "./Date";
import MainMenuCalendar from "./MainMenuCalendar";
import "./App.scss";
const doctors = [
  { id: 1, name: "Dr. John Doe" },
  { id: 2, name: "Dr. Jane Smith" },
  { id: 3, name: "Dr. Joe Bloggs" },
  { id: 4, name: "Dr. Alice Johnson" },
  { id: 5, name: "Dr. Michael Brown" },
  { id: 6, name: "Dr. Sarah Williams" },
  { id: 7, name: "Dr. Kane" },
];
interface Appointment {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  doctorId: number;
  date: string;
  specialty: string;
}
const appointments: Appointment[] = [
  {
    id: 1,
    doctorId: 1,
    startTime: "12:00 AM",
    endTime: "1:00 AM",
    title: "Appointment 1",
    date: "2024-05-07",
    specialty: "skin",
  },
  {
    id: 2,
    doctorId: 2,
    startTime: "11:00 AM",
    endTime: "11:30 AM",
    title: "Appointment 2",
    date: "2024-05-08",
    specialty: "dental",
  },
  {
    id: 10,
    doctorId: 2,
    startTime: "11:30 AM",
    endTime: "12:00 PM",
    title: "Appointment 3",
    date: "2024-05-08",
    specialty: "dental",
  },
  {
    id: 9,
    doctorId: 2,
    startTime: "12:00 PM",
    endTime: "12:30 PM",
    title: "Appointment 9",
    date: "2024-05-08",
    specialty: "dental",
  },
  {
    id: 3,
    doctorId: 1,
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    title: "Appointment 3",
    date: "2024-05-08",
    specialty: "skin",
  },
  {
    id: 4,
    doctorId: 6,
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    title: "General",
    date: "2024-05-08",
    specialty: "dental",
  },
  {
    id: 5,
    doctorId: 7,
    startTime: "1:00 PM",
    endTime: "1:30 PM",
    title: "General",
    date: "2024-05-08",
    specialty: "skin",
  },
];

const App = () => {
  return (
    <div className="App">
      <MainMenuCalendar />
      <div className="container">
        <Date />
        <Calender2 appointments={appointments} doctors={doctors} />
      </div>
    </div>
  );
};

export default App;
