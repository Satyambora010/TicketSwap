import { useState, useEffect } from "react";
import Header from "./Header";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ObjectCannedACL } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface ticketType {
  ticketName: string;
  quantity: number;
  price: number;
}

const Eventform = () => {
  const navigate = useNavigate();
  const { user } = useContext<any>(UserContext);
  const { ready } = useContext<any>(UserContext);
  const [eventName, setEventName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [organizer, setOrganizer] = useState<string>("");
  const [eventStatus, setEventStatus] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [tickets, setTickets] = useState<ticketType[]>([]);
  const [ticketName, setTicketName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (!token) {
    useEffect(() => {
      navigate("/login");
    }, [ready]);
  }

  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventId = uuidv4();
    try {
      const response = await axios.post(
        "https://i2iwdna6uc.execute-api.ap-south-1.amazonaws.com/dev/createEvent",
        {
          eventId,
          sellerId: user.userId,
          eventName,
          category,
          location,
          venue,
          date,
          time,
          tickets,
          organizer,
          eventStatus,
          image,
        }
      );
      alert("Event created successfully");
      navigate("/account");
      console.log(response.data);
    } catch (error) {
      alert("Error creating event");
      console.log(error);
    }
  };

  const s3Client = new S3Client({
    region: "ap-south-1", // Replace with your AWS region
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY as string, // Replace with your AWS Access Key
      secretAccessKey: process.env.S3_SECRET_KEY as string, // Replace with your AWS Secret Key
    },
  });

  const uploadFile = async (file: File) => {
    const params = {
      Bucket: "grabtickets", // Replace with your S3 bucket name
      Key: `${Date.now()}-${file.name}`, // Unique file name
      Body: file,
      ContentType: file.type,
      ACL: ObjectCannedACL.public_read,
    };

    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      // Generate the URL to access the file in the S3 bucket
      const imageUrl = `https://${
        params.Bucket
      }.s3.${"ap-south-1"}.amazonaws.com/${params.Key}`;
      setImage(imageUrl as any); // Store the image URL in the state
      console.log("Image URL:", imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      uploadFile(file); // Upload the selected image to S3
    }
  };

  const addTicket = () => {
    setTickets([...tickets, { ticketName, quantity, price }]);
    setTicketName("");
    setQuantity(0);
    setPrice(0);
  };

  const deleteTicket = (index: number) => {
    // Create a new array excluding the ticket at the specified index
    const updatedTickets = tickets.filter((_, i) => i !== index);
    setTickets(updatedTickets);
  };

  return (
    <div className="h-full ml-20 mr-20">
      <Header />
      <div className="h-5/6">
        <div className="h-full bg-white opacity-90 flex flex-col items-center h-3/4 w-full border-2 border-white rounded-lg shadow-2xl mt-10 overflow-hidden">
          <h1 className="text-2xl text-[#cb3737] mt-4">
            Fill in the details of your event here !
          </h1>
          <div className="flex flex-col gap-2 mt-4 h-full overflow-auto w-full p-4">
            <form className="flex flex-col gap-2" onSubmit={handleEventSubmit}>
              <div className="w-full">
                <label className="text-xl text-[#cb3737]">Event Name</label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="text"
                  placeholder="Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="mt-2 text-xl text-[#cb3737]">
                  Event Category
                </label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="text"
                  placeholder="Event Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="mt-2 text-xl text-[#cb3737]">
                  Event Location
                </label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="text"
                  placeholder="Event Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="mt-2 text-xl text-[#cb3737]">
                  Event Venue
                </label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="text"
                  placeholder="Event Venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="mt-2 text-xl text-[#cb3737]">
                  Event Date
                </label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="text"
                  placeholder="dd/mm/yyyy ..format"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="mt-2 text-xl text-[#cb3737]">
                  Event Time
                </label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="text"
                  placeholder="for eg: 7 pm"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="mt-2 text-xl text-[#cb3737]">
                  Organiser Name
                </label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="text"
                  placeholder="organiser name"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="mt-2 text-xl text-[#cb3737]">
                  Event Status
                </label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="text"
                  placeholder="eg: confirmed, pending, cancelled"
                  value={eventStatus}
                  onChange={(e) => setEventStatus(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="mt-2 text-xl text-[#cb3737]">
                  Ticket Name
                </label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="text"
                  placeholder="Ticket Name"
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="mt-2 text-xl text-[#cb3737]">Quantity</label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="w-full">
                <label className="mt-2 text-xl text-[#cb3737]">Price</label>
                <input
                  className="bg-white mt-2 p-2 rounded-lg border-2 border-gray-300 w-full outline-none"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <button
                type="button"
                onClick={addTicket}
                className="w-1/3 mt-4 p-2 bg-[#cb3737] text-white rounded-lg"
              >
                Add Ticket
              </button>
              <div className="mt-4">
                <h2 className="text-xl text-[#cb3737]">Tickets</h2>
                <ul>
                  {tickets.map((ticket, index) => (
                    <li key={index} className="flex justify-between">
                      {ticket.ticketName} - {ticket.quantity} - ${ticket.price}
                      <button
                        onClick={() => deleteTicket(index)}
                        className="ml-4 text-red-500"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {!image && (
                <div className="w-full flex flex-col">
                  <label className="mt-2 text-xl text-[#cb3737]">
                    Event Image
                  </label>
                  <label className="mt-2 h-32 w-32 cursor-pointer flex gap-1 items-center justify-center border bg-transparent rounded-2xl text-xl text-gray-400">
                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </label>
                </div>
              )}

              {image && (
                <div className="w-full flex flex-col">
                  <label className="mt-2 text-xl text-[#cb3737]">
                    Event Image
                  </label>
                  <img
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt="Event Preview"
                    className="mt-2 rounded-2xl h-56 w-full object-cover"
                  />
                </div>
              )}
              <button
                type="submit"
                className="mt-4 p-2 bg-[#cb3737] text-white rounded-lg"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventform;
