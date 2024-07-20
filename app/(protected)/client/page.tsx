"use client";

import { useEffect, useState } from "react";
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ClientPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await currentUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  return (
    <UserInfo 
      label="📱 Client component"
      user={user}  
    />
  );
};

export default ClientPage;