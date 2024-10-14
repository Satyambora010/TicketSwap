import { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext<any>(UserContext);
  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://jr1civm8aj.execute-api.ap-south-1.amazonaws.com/dev/login",
        { email, password }
      );
      localStorage.setItem("token", data.token);
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
      console.log(error);
    }
  }

  return (
    <div className="ml-20 mr-20 h-full">
      <Header />
      <div className="h-4/6">
        <div className="h-full bg-white opacity-90 flex flex-col items-center h-3/4 w-full border-2 border-white rounded-lg shadow-2xl mt-10 overflow-hidden">
          <h1 className="mt-10 text-center text-2xl text-[#cb3737]">
            Log In !
          </h1>
          <form
            className="flex flex-col items-center w-1/2"
            onSubmit={handleLogin}
          >
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
              <button
                type="submit"
                className="bg-[#cb3737] text-white px-4 py-2 rounded-md mt-4"
              >
                Log In
              </button>
              <p className="text-sm mt-2 text-center">
                Don't have an account?{" "}
                <a href="/signup" className="text-[#cb3737]">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
