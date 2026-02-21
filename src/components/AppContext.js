// AppContext.js
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedTeam, setSelectedTeam] = useState("");

  const onSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  return (
    <AppContext.Provider value={{ selectedTeam, onSelectTeam }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
