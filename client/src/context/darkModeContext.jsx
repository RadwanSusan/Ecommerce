// import { createContext, useReducer } from "react";
// import DarkModeReducer from "./darkModeReducer";

// const INITIAL_STATE = {
//   darkMode: false,
// };

// export const DarkModeContext = createContext(INITIAL_STATE);

// export const DarkModeContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

//   return (
//     <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
