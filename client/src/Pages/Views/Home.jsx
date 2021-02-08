import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import HomeBanner from '../../Components/Home/HomeBanner'
import { GlobalState } from '../../Data/Context'

const Home = () => {
   const { isMobileScreen } = useContext(GlobalState)

   if (isMobileScreen) return <Redirect to="/home/mobile" />
   else return <Redirect to="/home/default" />
}

export const MainHome = () => {
   const { isMobileScreen } = useContext(GlobalState)

   if (isMobileScreen) return <Redirect to="/home/mobile" />

   return (
      <div className="home-panel">
         <HomeBanner />
      </div>
   )
}

export default Home
