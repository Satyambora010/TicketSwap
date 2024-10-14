import axios from "axios";
import Header from "./Header";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSignup(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const tempUserId = uuidv4();
    try {
      await axios.post(
        "https://i62hlx2y08.execute-api.ap-south-1.amazonaws.com/dev/register",
        {
          userId: tempUserId,
          userName,
          email,
          password,
          phone,
        }
      );
      alert("Registration successful. Now you can log in");
      navigate("/login");
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="ml-20 mr-20 h-full">
      <Header />
      <div className="h-5/6">
        <div className="h-full bg-white opacity-90 flex flex-col items-center h-3/4 w-full border-2 border-white rounded-lg shadow-2xl mt-10 overflow-hidden">
          <h1 className="mt-10 text-center text-2xl text-[#cb3737]">
            Sign Up !
          </h1>
          <form
            className="flex flex-col items-center w-1/2"
            onSubmit={handleSignup}
          >
            <div className="flex flex-col w-full gap-2">
              <label className="text-xl mt-10 text-[#cb3737]">Name:</label>
              <input
                className="bg-white border-2 border-gray-300 rounded-md px-4 py-2 w-full outline-none"
                type="text"
                placeholder="Name here..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-xl mt-2 text-[#cb3737]">Email:</label>
              <input
                className="bg-white border-2 border-gray-300 rounded-md px-4 py-2 w-full outline-none"
                type="email"
                placeholder="Email here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-xl mt-2 text-[#cb3737]">Password:</label>
              <input
                className="bg-white border-2 border-gray-300 rounded-md px-4 py-2 w-full outline-none"
                type="password"
                placeholder="Password here..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-xl mt-2 text-[#cb3737]">
                Phone Number:
              </label>
              <input
                className="bg-white border-2 border-gray-300 rounded-md px-4 py-2 w-full outline-none"
                type="number"
                placeholder="Phone Number here..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <button
                type="submit"
                className="bg-[#cb3737] text-white px-4 py-2 rounded-md mt-4"
              >
                Sign Up
              </button>
              <p className="text-sm mt-2 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-[#cb3737]">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
