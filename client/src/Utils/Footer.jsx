import React from 'react'
import { Navbar } from 'reactstrap'


const Footer = () => {
   return (
      <Navbar className="text-white-50 text-capitalize d-flex justify-content-center" dark style={{ background: '#063251' }}>
         <p className="my-auto py-2">
            <span style={{ fontFamily: 'MV Boli,cursive' }} className="text-white"><span className="text-primary">Franchise</span>Bank </span>&copy; Copyright all reserved.
            <strong className="text-white text-italic"> 2021 - {new Date().getFullYear()}</strong>
         </p>
      </Navbar>
   )
}

export default Footer

