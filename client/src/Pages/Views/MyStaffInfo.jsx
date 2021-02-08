import React, { useContext } from 'react'
import { Container } from 'reactstrap'

import { GlobalState } from '../../Data/Context'
import { dateFormat, getAge, numberWithCommas } from '../../Utils/Misc/Format'
import Loading from '../../Utils/Misc/Loading'


const MyStaffInfo = () => {

   const { bankStaff, nairaSign, isLoadingStaff } = useContext(GlobalState)

   if (isLoadingStaff) return <Loading />


   return (
      <div className="gen-bg main-view gen-height">
         <h1 className="text-uppercase text-center my-3 text-decoration-underline">staff bio-data</h1>
         <Container className="py-3">
            <div className="gen-bg my-info mx-auto">
               <div className="d-flex">
                  <img
                     src={`Uploads/${bankStaff.avatar}`}
                     alt="profile"
                     className="img-container mx-auto mb-3"
                     style={{ maxHeight: '15rem' }} />
               </div>
               <h3 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Name:</span>
                  <span>{bankStaff.fullName}</span>
               </h3>
               <h6 className="d-flex justify-content-between align-content-center">
                  <span className="mr-3 text-muted">StaffID:</span>
                  <span><em>{bankStaff.staffID}</em></span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center">
                  <span className="mr-3 text-muted">Email:</span>
                  <span><em>{bankStaff.email}</em></span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Account Number:</span>
                  <span>{bankStaff.account_number}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Salary:</span>
                  <span>{nairaSign}{numberWithCommas(bankStaff.salary)}k</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Mobile Number:</span>
                  <span>{bankStaff.telephone}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Level:</span>
                  <span>{bankStaff.level}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Gender:</span>
                  <span>{bankStaff.gender}</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Date of birth:</span>
                  <span>{dateFormat(bankStaff.dob)}, ({getAge(bankStaff.dob)})</span>
               </h6>
               <h6 className="d-flex justify-content-between align-content-center text-capitalize">
                  <span className="mr-3 text-muted">Enrolled on:</span>
                  <span>{dateFormat(bankStaff.createdAt)}</span>
               </h6>
            </div>
         </Container>
      </div>
   )
}

export default MyStaffInfo
