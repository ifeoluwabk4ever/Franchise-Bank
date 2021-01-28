import React, { Fragment, useState } from 'react'
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'


import BankingWorldSelect from './BankingWorldSelect'
import Logout from './Logout'

const Headers = ({ isUser, isStaff }) => {

   const [isOpen, setIsOpen] = useState(false)


   const toggle = () => {
      setIsOpen(!isOpen)
   }

   const mainLinks = (
      <Fragment>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/">Home</NavLink>
         </NavItem>
         {
            <Fragment>
               <NavItem className="text-white-50 text-capitalize animate2 navList">
                  <NavLink href="/about-us">about us</NavLink>
               </NavItem>
               <NavItem className="text-white-50 text-capitalize animate2 navList">
                  <NavLink href="/contact-us">contact us</NavLink>
               </NavItem>
               <NavItem className="text-white-50 text-capitalize animate2 navList">
                  <BankingWorldSelect />
               </NavItem>
            </Fragment>
         }
      </Fragment>
   )

   const authLinks = (
      <Fragment>
         <NavItem className="text-white-50 animate2 navList">
            <Logout />
         </NavItem>
      </Fragment>
   )

   return (
      <Navbar dark sticky="top" style={{ background: '#063251' }} expand="lg"
         className="shadow">
         <Container>
            <NavbarToggler onClick={toggle} />
            <NavbarBrand href="/">
               <h2 className="text-capitalize" style={{ fontFamily: 'MV Boli,cursive' }}><span className="text-info">Franchise</span>Bank</h2>
            </NavbarBrand>
            <Collapse isOpen={isOpen} navbar>
               <Nav className="ml-auto d-flex align-items-center" navbar onClick={toggle}>
                  {mainLinks}{(isUser || isStaff) && authLinks}
               </Nav>
            </Collapse>
         </Container>
      </Navbar>
   )
}

const mapStateToProps = state => ({
   isUser: state.users.isUser,
   isStaff: state.staff.isStaff
})


export default connect(mapStateToProps, null)(Headers)
