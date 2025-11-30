import React, { createContext } from 'react'


export const DataProvider = createContext();

export const DataContext = ({children}) => {
  return (
    <DataProvider.Provider value={{}}>
        {children}
    </DataProvider.Provider>
  )
}

export const useData = () => React.useContext(DataProvider);