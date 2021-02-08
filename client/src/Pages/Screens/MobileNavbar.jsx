import React, { Fragment, useContext } from 'react'
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

import logo from '../../Images/Franchise.png'
import Logout from '../../Utils/Logout'
import { GlobalState } from '../../Data/Context'


const MobileNavbar = () => {

   const { timeOfDay, isUser, bankUser } = useContext(GlobalState)

   const authLinks = (
      <Fragment>
         <NavItem className="text-white-50 animate2 navList mr-3 text-capitalize">
            <NavLink href="#">{isUser && `${timeOfDay}, ${bankUser.firstName}`}</NavLink>
         </NavItem>
         <NavItem className="text-white-50 animate2 navList mr-3">
            <Logout />
         </NavItem>
         <NavItem className="text-white-50 animate2 navList">
            <NavLink href="/my-user-info">
               {isUser && <img src={`/Images/${bankUser.avatar}`} alt={bankUser.firstName} className="user-avatar" />}
            </NavLink>
         </NavItem>
      </Fragment>
   )
   return (
      <Navbar dark sticky="top" style={{ background: '#063251' }} expand="lg"
         className="shadow">
         <Container>
            <NavbarBrand href="/my-details">
               <img src={logo} alt="Franchise" className="main-logo" />
            </NavbarBrand>
            <Nav className="d-flex align-items-center flex-row" navbar>
               {isUser && authLinks}
            </Nav>
         </Container>
      </Navbar>
   )
}


export default MobileNavbar
