import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'


import { numberWithCommas } from '../../Utils/Misc/Format'
import MyQuickHandle from './MyQuickHandle'
import MyTransactionHistory from './MyTransactionHistory'
import { GlobalState } from '../../Data/Context'

const MyDetails = ({ bankUser }) => {

   const { isMobileScreen } = useContext(GlobalState)


   return (
      <div style={{ overflowY: 'auto' }} className={`gen-bg ${isMobileScreen ? 'mobile-height' : 'gen-height'}`}>
         <Container className="py-3 main-view">
            <div className="d-flex justify-content-end align-content-center mb-3">
               <div>
                  <h5 className="d-flex justify-content-between align-content-center">
                     <span className="mr-3">Account Name:</span> <span className="text-primary">{bankUser.fullName}</span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-content-center">
                     <span className="mr-3">Account Number:</span> <span className="text-primary">{bankUser.account_number}</span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-content-center">
                     <span className="mr-3">Balance:</span> <span className={`money ${bankUser.account_balance > 0 ? 'plus' : bankUser.account_balance < 0 ? 'minus' : ''}`}>{bankUser.account_balance > 0 ? '+' : bankUser.account_balance < 0 ? '-' : ''}&#8358;{numberWithCommas(bankUser.account_balance)}k</span>
                  </h5>
               </div>
            </div>
            <div className="w-75 mx-auto">
               <hr />
               <MyQuickHandle cssprop="main-view" />
            </div>
            <div className="w-75 mx-auto">
               <hr />
               <MyTransactionHistory bankUser={bankUser} />
            </div>
         </Container>
      </div>
   )
}

const mapStateToProps = state => ({
   bankUser: state.users.users
})

export default connect(mapStateToProps, null)(MyDetails)
