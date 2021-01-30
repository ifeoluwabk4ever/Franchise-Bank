import React from 'react'
import { ButtonGroup, Button, Navbar, Container } from 'reactstrap'
import { connect } from 'react-redux'


import { numberWithCommas, getAge, dateFormat } from '../../Utils/Misc/Format'
import img1 from '../../Images/avatar3.png'


const MyInfo = ({ bankUser }) => {
   return (
      <div style={{ height: '89vh', overflowY: 'auto' }} className="gen-bg">
         <Container className="py-3 main-view">
            <div className="gen-bg my-info mx-auto">
               <div className="d-flex">
                  <img
                     src={img1}
                     alt="profile"
                     className="img-container mx-auto mb-3"
                     style={{ maxHeight: '15rem' }} />
               </div>
               <h3 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Name:</span>
                  <span>{bankUser.fullName}</span>
               </h3>
               <h6 className="d-flex justify-content-between align-content-center">
                  <span className="mr-3 text-muted">Email:</span>
                  <span><em>{bankUser.email}</em></span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">BVN Number:</span>
                  <span>{bankUser.bvn_number}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Account Number:</span>
                  <span>{bankUser.account_number}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Account balance:</span>
                  <span>&#8358;{numberWithCommas(bankUser.account_balance)}k</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Mobile Number:</span>
                  <span>{bankUser.telephone}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Occupation:</span>
                  <span>{bankUser.occupation}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Gender:</span>
                  <span>{bankUser.gender}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Date of birth:</span>
                  <span>{dateFormat(bankUser.dob)}, ({getAge(bankUser.dob)})</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">mother's maiden name:</span>
                  <span>{bankUser.mothers_fullName}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">account type:</span>
                  <span>{bankUser.account_type_name}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">account category:</span>
                  <span>{bankUser.account_category_name}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">opened account on:</span>
                  <span>{dateFormat(bankUser.createdAt)}</span>
               </h6>
               <Navbar sticky="bottom" className="p-0 pt-3 d-flex">
                  <ButtonGroup className="w-75 mx-auto">
                     <Button className="text-capitalize mr-2" color="primary">
                        edit account detail
                     </Button>
                     <Button className="text-capitalize ml-2" color="primary">
                        update account
                     </Button>
                  </ButtonGroup>
               </Navbar>
            </div>
         </Container>
      </div>
   )
}

const mapStateToProps = state => ({
   bankUser: state.users.users
})

export default connect(mapStateToProps, null)(MyInfo)