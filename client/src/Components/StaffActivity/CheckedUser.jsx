import React, { useContext } from 'react'
import { Container } from 'reactstrap'

import Loading from '../../Utils/Misc/Loading'
import { GlobalState } from '../../Data/Context'
import { Underline1 } from '../../Utils/Misc/Underline'


const CheckedUser = () => {
   const { isLoadingStaff } = useContext(GlobalState)

   if (isLoadingStaff) return <Loading />

   return (
      <div className="d-flex align-content-center justify-content-center user-login main-view gen-height">
         <Container className="py-3">
            <div className="my-3">
               <h1 className="text-uppercase text-center title-color">Checked User</h1>
               <Underline1 />
            </div>

         </Container>
      </div>
   )
}

export default CheckedUser