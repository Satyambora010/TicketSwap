import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export interface UserData {
  userId: string;
  userName: string;
  email: string;
  phone: string;
}

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!user && token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "https://upbze40xif.execute-api.ap-south-1.amazonaws.com/dev/getUser",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const { userName, email, phone, userId } = response.data;
          setUser({ userId, userName, email, phone });
          console.log(user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
