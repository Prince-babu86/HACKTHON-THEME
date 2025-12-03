import React, { createContext } from 'react'
import { useState } from 'react';
import instance from '../config/axios.config';
import { useEffect } from 'react';


export const DataProvider = createContext();

export const DataContext = ({children}) => {

  const [loggedUser, setloggedUser] = useState(null);

  const getUser = async () => {
    try {
    let response =  await instance.get('/profile');
      setloggedUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  })

console.log(loggedUser);
  return (
    <DataProvider.Provider value={{}}>
        {children}
    </DataProvider.Provider>
  )
}

export const useData = () => React.useContext(DataProvider);