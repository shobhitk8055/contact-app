import React, { useEffect, useState } from "react";
import { getUsers } from "../api/user";
import  User from "../types/User";

function useUserApi() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(res => {
      setLoading(false);
      setData(res)
    });
  }, []);

  return { data, loading };
}

export default useUserApi;
