import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { ticketType } from "./Eventform";

export interface Event {
  eventId: string;
  sellerId: string;
  eventName: string;
  category: string;
  location: string;
  venue: string;
  date: string;
  time: string;
  tickets: ticketType[];
  organizer: string;
  eventStatus: string;
  image: string;
}

const Listings = () => {
  const { user } = useContext<any>(UserContext);
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    axios
      .get(
        `https://yc85hha8q7.execute-api.ap-south-1.amazonaws.com/dev/getEventsBySellerId?sellerId=${user.userId}`
      )
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [user.id]);
  return (
    <div className="flex flex-col w-full items-center">
      {events.map((event) => (
        <div
          key={event.eventId}
          className="w-2/3 flex gap-2 mt-8 mb-4 border-2 border-white rounded-lg shadow-[0px_4px_8px_rgba(0,0,0,0.25)] p-4 overflow-hidden"
        >
          <div className="rounded-lg">
            <img
              className="rounded-xl w-96 h-56 object-cover p-2"
              src={event.image}
              alt={event.eventName}
            />
          </div>
          <div>
            <h1 className="text-2xl text-[#cb3737] mb-4">{event.eventName}</h1>
            <p className="text-lg text-gray-500">Category: {event.category}</p>
            <p className="text-lg text-gray-500">Location: {event.location}</p>
            <p className="text-lg text-gray-500">Venue: {event.venue}</p>
            <p className="text-lg text-gray-500">Date: {event.date}</p>
            <p className="text-lg text-gray-500">Time: {event.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listings;
