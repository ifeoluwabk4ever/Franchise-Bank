import React, { createContext } from 'react'

export const GlobalState = createContext()

const DataProvider = ({ children }) => {
   var isMobile = /iPhone| iPod| iPad| Andriod/i.test(navigator.userAgent)

   var isMobileWidth = window.innerWidth < 768

   let isMobileScreen = isMobileWidth || isMobile

   var timeOfDay

   let time = new Date().getHours()

   if (time >= 0 && time <= 11) {
      timeOfDay = "Good morning"
   } else if (time >= 12 && time <= 15) {
      timeOfDay = "Good afternoon"
   } else if (time >= 16 && time <= 18) {
      timeOfDay = "Good evening"
   } else {
      timeOfDay = "Good night"
   }

   const state = {
      isMobileScreen, timeOfDay
   }
   return (
      <GlobalState.Provider value={state}>
         {children}
      </GlobalState.Provider>
   )
}

export default DataProvider
