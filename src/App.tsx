import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Account from "./components/Account";
import Eventform from "./components/Eventform";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./components/UserContext";
import EventDisplay from "./components/EventDisplay";

function App() {
  return (
    <UserContextProvider>
      <div className="bg-white bg-cover bg-no-repeat bg-center h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/eventform" element={<Eventform />} />
          <Route path="/event/:id" element={<EventDisplay />} />
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
