import React, { createContext, useState, useEffect } from "react";
import instance from "../config/axios.config";

export const DataProvider = createContext();

export const DataContext = ({ children }) => {
  const [profile, setProfile] = useState(null); // null = not loaded yet
  const [loading, setLoading] = useState(true); // show loader initially
  const [contactUsers, setContactUsers] = useState([]);

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

  const getContactUsers = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/contact-users");
      setContactUsers(response.data.users);
      // console.log(response.data.users);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
    getContactUsers();
  }, []); // IMPORTANT → empty array so it runs only once

  return (
    <DataProvider.Provider
      value={{ profile, setProfile, loading, contactUsers }}
    >
      {children}
    </DataProvider.Provider>
  );
};

export const useData = () => React.useContext(DataProvider);
