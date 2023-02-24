import { useState } from "react";
import { context } from './context';



export const Provider = ({ children }) => {
   const [page, setPage] = useState(1);
   const [totalUsers, setTotalUsers] = useState(null);

   const getPage = () => {
      setPage(prevState => prevState + 1);
   };

   const pageNull = () => {
      setPage(1);
   };

   const getTotalUsers = value => {
      setTotalUsers(value)
   };

   const providerValue = { page, getPage, pageNull, totalUsers, getTotalUsers };

   return (
      <context.Provider value={providerValue}>
         {children}
      </context.Provider>
   );
};