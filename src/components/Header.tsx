import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext, useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const { user, setUser } = useContext<any>(UserContext);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/");
  };
  return (
    <div className="flex">
      <div className="mt-4 flex gap-2 w-1/2">
        <button
          onClick={() => navigate("/")}
          className="flex gap-2 text-2xl text-[#cb3737] pt-0"
        >
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#cb3737"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-2xl font-bold text-[#cb3737] pt-0">
            TicketSwap
          </div>
        </button>
      </div>
      {token ? (
        <div className="mt-4 flex gap-4 w-1/2 justify-end">
          <button className="mt-1.5" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#cb3737"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>
          </button>
          <div className="flex gap-2 pt-1.5">
            <button className="flex gap-2" onClick={() => navigate("/account")}>
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
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <h1 className="text-xl text-[#cb3737] pt-0.5">
                {user && user.userName}
              </h1>
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex gap-2 w-1/2 justify-end">
          <button
            onClick={() => navigate("/eventform")}
            className="text-[#cb3737] text-xl w-1/5 pt-1.5"
          >
            List Events
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-[#cb3737] text-xl w-1/5 pt-1.5"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-[#cb3737] text-xl w-1/5 pt-1.5"
          >
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
