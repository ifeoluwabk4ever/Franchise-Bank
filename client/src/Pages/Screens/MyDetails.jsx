import React, { Fragment, useContext } from 'react'


import { numberWithCommas } from '../../Utils/Misc/Format'
import MyQuickHandle from './MyQuickHandle'
import MyTransactionHistory from './MyTransactionHistory'
import { GlobalState } from '../../Data/Context'
import MobileNavbar from './MobileNavbar'
import Loading from '../../Utils/Misc/Loading'


const MyDetails = () => {

   const { isMobileScreen, bankUser, nairaSign, isLoading } = useContext(GlobalState)

   if (isLoading) return <Loading />

   return (
      <Fragment>
         {isMobileScreen && <MobileNavbar />}
         <div style={{ overflowY: 'auto' }} className={`gen-bg ${isMobileScreen ? 'mobile-height' : 'gen-height'}`}>
            <div className={`py-3 ${isMobileScreen ? 'px-5' : 'container'} main-view`}>
               <div className="d-flex justify-content-end align-content-center mb-3">
                  <div>
                     <h5 className="d-flex justify-content-between align-content-center text-capitalize">
                        <span className="mr-3">Account Name:</span> <span className="text-primary">{bankUser.fullName}</span>
                     </h5>
                     <h5 className="d-flex justify-content-between align-content-center text-capitalize">
                        <span className="mr-3">Account Number:</span> <span className="text-primary">{bankUser.account_number}</span>
                     </h5>
                     <h5 className="d-flex justify-content-between align-content-center text-capitalize">
                        <span className="mr-3">Account type:</span> <span className="text-primary text-uppercase">{bankUser.account_type_name} Account</span>
                     </h5>
                     <h5 className="d-flex justify-content-between align-content-center text-capitalize">
                        <span className="mr-3">Balance:</span> <span className={`money ${bankUser.account_balance > 0 ? 'plus' : bankUser.account_balance < 0 ? 'minus' : ''}`}>{bankUser.account_balance > 0 ? '+' : bankUser.account_balance < 0 ? '-' : ''}{nairaSign}{numberWithCommas(bankUser.account_balance)}k</span>
                     </h5>
                  </div>
               </div>
               <div className={`${isMobileScreen ? 'w-100' : 'w-75'} mx-auto`}>
                  <hr />
                  <MyQuickHandle cssprop="main-view" />
               </div>
               <div className={`${isMobileScreen ? 'w-100' : 'w-75'} mx-auto`}>
                  <hr />
                  <MyTransactionHistory bankUser={bankUser} nairaSign={nairaSign} />
               </div>
            </div>
         </div>
      </Fragment>
   )
}

export default MyDetails
