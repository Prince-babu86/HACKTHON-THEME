import React, { createContext, useState, useEffect } from "react";
import instance from "../config/axios.config";

export const DataProvider = createContext();

export const DataContext = ({ children }) => {
  const [profile, setProfile] = useState(null); // null = not loaded yet
  const [loading, setLoading] = useState(true); // show loader initially

  const getUser = async () => {
    try {
      setLoading(true);

      const response = await instance.get("/profile");
      setProfile(response.data.user);
    } catch (error) {
      console.log(error);
      setProfile(null); // keep null if error
    }

    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []); // IMPORTANT → empty array so it runs only once

  return (
    <DataProvider.Provider value={{ profile, setProfile, loading }}>
      {children}
    </DataProvider.Provider>
  );
};

export const useData = () => React.useContext(DataProvider);
