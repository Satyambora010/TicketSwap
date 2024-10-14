import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Event } from "./Listings";
import Header from "./Header";
import BookingForm from "./BookingForm";

const EventDisplay = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  useEffect(() => {
    axios
      .get(
        `https://l4dzifu3bj.execute-api.ap-south-1.amazonaws.com/dev/events/${id}`
      )
      .then((res) => {
        console.log(res.data);
        setEvent(res.data);
      });
  }, [id]);
  return (
    <div className="ml-20 mr-20 h-full">
      <Header />
      <div className="h-5/6">
        <div className="h-full bg-white opacity-90 w-full border-2 border-white rounded-lg shadow-2xl mt-10 overflow-auto">
          <div className="m-4 h-96 overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={event?.image}
              alt={event?.eventName}
            />
          </div>
          <div className="m-4 flex gap-2">
            <div className="flex flex-col gap-2 w-1/2">
              <h1 className="text-2xl text-[#cb3737] font-semibold">
                {event?.eventName}
              </h1>
              <h2 className="text-sm text-lg text-gray-500">
                {event?.category}
              </h2>
              <h2 className="text-sm text-lg text-gray-500">
                Venue: {event?.venue} , {event?.location}
              </h2>
              <h2 className="text-sm text-lg text-gray-500">
                Date: {event?.date}
              </h2>
              <h2 className="text-sm text-lg text-gray-500">
                Time: {event?.time}
              </h2>
              <h2 className="text-xl text-[#cb3737] font-semibold">Tickets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {event?.tickets.map((ticket) => (
                  <div
                    key={ticket.ticketName}
                    className="border-2 border-white rounded-lg p-2 shadow-md"
                  >
                    <h3 className="text-lg text-[#333333] font-semibold">
                      {ticket.ticketName}
                    </h3>
                    <h3 className="text-md text-gray-500">
                      Available: {ticket.quantity}
                    </h3>
                    <p className="text-md text-gray-500">
                      Price: Rs {ticket.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;
