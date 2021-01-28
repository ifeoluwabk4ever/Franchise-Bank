import React, { createContext, useEffect, useState } from 'react'

export const GlobalState = createContext()

const DataProvider = ({ children }) => {
   const [total, setTotal] = useState(0);
   let totalSign = total > 0 ? '+' : '-'
   let transact = [500, -500, 300, -50, 3000, -1000, 6000, 8000, -2000]


   useEffect(() => {
      let getTotal = () => {
         let total = transact.reduce((r, a) => {
            return r += a
         }, 0)
         setTotal(total)
      }
      getTotal()
   }, [transact])
   const state = {
      total, transact, totalSign
   }
   return (
      <GlobalState.Provider value={state}>
         {children}
      </GlobalState.Provider>
   )
}

export default DataProvider
