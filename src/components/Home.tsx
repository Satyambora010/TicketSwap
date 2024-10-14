import Header from "./Header";
import { useEffect, useState } from "react";
import { Event } from "./Listings";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventName, setEventName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const { user } = useContext<any>(UserContext);

  console.log(user);
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, "dd/MM/yyyy");
      setDate(formattedDate);
    }
  };

  useEffect(() => {
    axios
      .get(`https://7tyg2ordwd.execute-api.ap-south-1.amazonaws.com/dev/events`)
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <>
      <div className="ml-20 mr-20 h-full">
        <Header />
        <div className="h-5/6">
          <div className="h-full bg-white opacity-90 w-full border-2 border-white rounded-lg shadow-2xl mt-10 overflow-hidden">
            <div className="flex gap-2 m-4">
              <input
                className="border-2 border-gray-300 bg-white rounded-md px-4 py-2 w-1/2 outline-none"
                type="text"
                placeholder="Search Events"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <input
                className="border-2 border-gray-300 bg-white rounded-md px-4 py-2 w-1/4 outline-none"
                type="text"
                placeholder="Search by category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                className="border-2 border-gray-300 bg-white rounded-md px-4 py-2 w-1/4 outline-none"
                type="text"
                placeholder="Search by location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <DatePicker
                className="border-2 border-gray-300 bg-white rounded-md px-4 py-2 w-full outline-none"
                selected={date ? new Date(date) : null}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
              />
            </div>
            <h1 className="m-4 text-2xl font-bold text-[#cb3737]">
              Upcoming Events
            </h1>
            <div className="pb-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 h-5/6 overflow-y-auto">
              {events
                .filter((event) => {
                  return (
                    event.eventName
                      .toLowerCase()
                      .includes(eventName.toLowerCase()) &&
                    event.category
                      .toLowerCase()
                      .includes(category.toLowerCase()) &&
                    event.location
                      .toLowerCase()
                      .includes(location.toLowerCase()) &&
                    event.date.toLowerCase().includes(date.toLowerCase())
                  );
                })
                .map((event) => (
                  <button
                    onClick={() => navigate(`/event/${event.eventId}`)}
                    key={event.eventId}
                    className="bg-gray-100 rounded-lg p-4 shadow-md"
                  >
                    <img
                      src={event.image}
                      alt={event.eventName}
                      className="w-full h-56 mb-2 object-cover rounded-lg"
                    />
                    <h2 className="text-lg font-semibold text-[#cb3737]">
                      {event.eventName}
                    </h2>
                    <p className="text-gray-500">{event.category}</p>
                    <p className="text-gray-500">{event.location}</p>
                    <p className="text-gray-500">{event.venue}</p>
                    <p className="text-gray-500">{event.date}</p>
                    <p className="text-gray-500">{event.time}</p>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
