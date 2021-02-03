import React, { Fragment, useContext, useEffect } from 'react'
import { connect } from 'react-redux'


import { getMyManager } from '../../Data/Actions/BankUserAction'
import Loading from '../../Utils/Misc/Loading'
import { GlobalState } from '../../Data/Context'
import MobileNavbar from './MobileNavbar'
import { Button, Container } from 'reactstrap'
// import img1 from '../../Images/avatar3.png'


const MyAccountManager = ({ isLoading, getMyManager, isManager, manager, isUser }) => {

   const { isMobileScreen } = useContext(GlobalState)

   useEffect(() => {
      getMyManager()
   }, [])

   isLoading && <Loading />
   return (
      <Fragment>
         {isMobileScreen && <MobileNavbar />}
         <div className={`gen-bg main-view ${isMobileScreen ? 'mobile-height' : 'gen-height'}`}>
            <Container className="py-3">
               <div className="gen-bg my-info mx-auto">
                  {
                     isManager && isUser && <Fragment>
                        <div className="d-flex">
                           <img
                              src={`/Uploads/${manager.avatar}`}
                              alt="profile"
                              className="img-container mx-auto mb-3"
                              style={{ maxHeight: '15rem' }} />
                        </div>
                        <h3 className="d-flex justify-content-between align-content-center text-capitalize">
                           <span className="mr-3 text-muted">Name:</span>
                           <span>{manager.fullName}</span>
                        </h3>
                        <h6 className="d-flex justify-content-between align-content-center">
                           <span className="mr-3 text-muted">Email:</span>
                           <span><em>{manager.email}</em></span>
                        </h6>
                        <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                           <span className="mr-3 text-muted">Mobile Number:</span>
                           <span>{manager.telephone}</span>
                        </h6>
                        <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                           <span className="mr-3 text-muted">Gender:</span>
                           <span>{manager.gender}</span>
                        </h6>
                        <Button color="dark" className="text-capitalize">Chat with manager</Button>
                     </Fragment>
                  }
               </div>
            </Container>
         </div>
      </Fragment>
   )
}

const mapStateToProps = state => ({
   isLoading: state.users.isLoading,
   manager: state.users.manager,
   isManager: state.users.isManager,
   isUser: state.users.isUser,
})


export default connect(mapStateToProps, { getMyManager })(MyAccountManager)
