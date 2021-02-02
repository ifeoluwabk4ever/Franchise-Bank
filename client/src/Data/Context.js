import React, { createContext } from 'react'

export const GlobalState = createContext()

const DataProvider = ({ children }) => {
   var isMobile = /iPhone| iPod| iPad| Andriod/i.test(navigator.userAgent)

   var isMobileWidth = window.innerWidth <= 800

   let isMobileScreen = isMobileWidth || isMobile

   const state = {
      isMobileScreen
   }
   return (
      <GlobalState.Provider value={state}>
         {children}
      </GlobalState.Provider>
   )
}

export default DataProvider
