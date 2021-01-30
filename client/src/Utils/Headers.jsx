import React, { Fragment, useState } from 'react'
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'


import BankingWorldSelect from './BankingWorldSelect'
import Logout from './Logout'
import logo from '../Images/Franchise.png'
const Headers = ({ isUser, isStaff }) => {

   const [isOpen, setIsOpen] = useState(false)


   const toggle = () => {
      setIsOpen(!isOpen)
   }

   const staffLinks = (
      <Fragment>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/full-user-register">user registration</NavLink>
         </NavItem>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/full-staff-register">staff registration</NavLink>
         </NavItem>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/check user">check user</NavLink>
         </NavItem>
      </Fragment>
   )

   const mainLinks = (
      <Fragment>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/">Home</NavLink>
         </NavItem>
         {!isStaff ?
            <Fragment>
               <NavItem className="text-white-50 text-capitalize animate2 navList">
                  <NavLink href="/about-us">about us</NavLink>
               </NavItem>
               <NavItem className="text-white-50 text-capitalize animate2 navList">
                  <NavLink href="/contact-us">contact us</NavLink>
               </NavItem>
            </Fragment>
            : (staffLinks)
         }
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <BankingWorldSelect />
         </NavItem>
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
            <div className="d-flex align-items-center">
               <NavbarBrand href="/">
                  <img src={logo} alt="Franchise" className="main-logo" />
               </NavbarBrand>
               <NavbarBrand href="/">
                  <h2 className="text-capitalize animate2" style={{ fontFamily: 'MV Boli,cursive' }}><span className="text-primary">Franchise</span>Bank</h2>
               </NavbarBrand>
            </div>
            <Collapse isOpen={isOpen} navbar>
               <Nav className="ml-auto d-flex align-items-center" navbar onClick={toggle}>
                  {mainLinks}{(isUser || isStaff) ? authLinks : null}
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
