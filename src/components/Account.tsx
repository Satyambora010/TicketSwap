import Header from "./Header";
import Profile from "./Profile";
import Bookings from "./Bookings";
import Listings from "./Listings";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Account = () => {
  const [selectedPage, setSelectedPage] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
    }
  }, []);

  const showProfile = () => {
    setSelectedPage("profile");
  };
  const showBookings = () => {
    setSelectedPage("bookings");
  };
  const showListings = () => {
    setSelectedPage("listings");
  };

  const linkClasses = (type: string) => {
    let classes = "rounded-lg shadow-2xl w-1/5 p-2";
    if (type === selectedPage) {
      classes += " bg-[#cb3737] text-white border-2 border-white";
    } else {
      classes += " bg-white-200 text-[#cb3737] border-2 border-white";
    }
    return classes;
  };

  return (
    <div className="h-full ml-20 mr-20">
      <Header />
      <div className="h-5/6">
        <div className="h-full bg-white opacity-90 flex flex-col items-center h-3/4 w-full border-2 border-white rounded-lg shadow-2xl mt-10 overflow-hidden">
          <div className="flex items-center justify-center gap-10 w-full p-10">
            <button
              onClick={showProfile}
              className={linkClasses("profile" as string)}
            >
              Profile
            </button>
            <button
              onClick={showBookings}
              className={linkClasses("bookings" as string)}
            >
              Bookings
            </button>
            <button
              onClick={showListings}
              className={linkClasses("listings" as string)}
            >
              Listings
            </button>
            <button onClick={() => navigate("/eventform")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#cb3737"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-auto w-full h-full items-center">
            {selectedPage === "profile" && <Profile />}
            {selectedPage === "bookings" && <Bookings />}
            {selectedPage === "listings" && <Listings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
