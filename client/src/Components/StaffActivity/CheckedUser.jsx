import React from 'react'
import { Container } from 'reactstrap'

import { Underline1 } from '../../Utils/Misc/Underline'

const CheckedUser = () => {
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
