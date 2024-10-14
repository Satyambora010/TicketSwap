import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, ready } = useContext<any>(UserContext);
  const navigate = useNavigate();
  if (!ready) {
    useEffect(() => {
      navigate("/login");
    }, [ready]);
  }
  return (
    <div className="w-full items-center">
      <div className="w-full flex flex-col gap-2 mt-10 items-center">
        <div className="flex gap-2">
          <h1 className="text-2xl text-[#cb3737]">Name :</h1>
          <h1 className="text-2xl text-black">{user.userName}</h1>
        </div>
        <div className="flex gap-2">
          <h1 className="text-2xl text-[#cb3737]">Email :</h1>
          <h1 className="text-2xl text-black">{user.email}</h1>
        </div>
        <div className="flex gap-2">
          <h1 className="text-2xl text-[#cb3737]">Phone Number :</h1>
          <h1 className="text-2xl text-black">{user.phone}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
