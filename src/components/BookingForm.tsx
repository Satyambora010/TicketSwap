import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BookingForm = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [ticketName, setTicketName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleBookTicket = () => {
    if (!token) {
      alert("Please login to book tickets");
      navigate("/login");
      return;
    }
    console.log(ticketName, quantity);
  };
  return (
    <div className="border-2 border-white rounded-lg p-2 shadow-md m-10">
      <h1 className="text-xl font-semibold text-center text-[#cb3737]">
        Ticket Details
      </h1>
      <form className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <label className="text-md text-gray-500">Ticket Name</label>
          <input
            type="text"
            className="border-2 border-gray bg-white rounded-md p-2"
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md text-gray-500">Quantity</label>
          <input
            type="number"
            className="border-2 border-gray bg-white rounded-md p-2"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <button
          type="button"
          className="bg-[#cb3737] text-white rounded-md p-2"
          onClick={handleBookTicket}
        >
          Book Ticket
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
