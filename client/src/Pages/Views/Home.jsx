import React, { Fragment, useContext } from 'react'
import HomeBanner from '../../Components/Home/HomeBanner'
import { GlobalState } from '../../Data/Context'
import MobileHome from './MobileHome'

const Home = () => {
   const { isMobileScreen } = useContext(GlobalState)
   return (
      <Fragment>
         <div className="home-panel desktop-home-div">
            {isMobileScreen ? <HomeBanner /> : <HomeBanner />}
         </div>
         <div className="mobile-home-div">
            <MobileHome />
         </div>
      </Fragment>
   )
}

export default Home
