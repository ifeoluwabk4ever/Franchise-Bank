import React, { Fragment, useContext } from 'react'
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'

import logo from '../../Images/Franchise.png'
import Logout from '../../Utils/Logout'
import { GlobalState } from '../../Data/Context'


const MobileNavbar = ({ isUser, bankUser }) => {

   const { timeOfDay } = useContext(GlobalState)

   const authLinks = (
      <Fragment>
         <NavItem className="text-white-50 animate2 navList mr-3 text-capitalize">
            <NavLink href="#">{isUser && `${timeOfDay}, ${bankUser.firstName}`}</NavLink>
         </NavItem>
         <NavItem className="text-white-50 animate2 navList">
            <Logout />
         </NavItem>
      </Fragment>
   )
   return (
      <Navbar dark sticky="top" style={{ background: '#063251' }} expand="lg"
         className="shadow">
         <Container>
            <NavbarBrand href="/">
               <img src={logo} alt="Franchise" className="main-logo" />
            </NavbarBrand>
            <Nav className="d-flex align-items-center flex-row" navbar>
               {isUser && authLinks}
            </Nav>
         </Container>
      </Navbar>
   )
}

const mapStateToProps = state => ({
   bankUser: state.users.users,
   isUser: state.users.isUser
})


export default connect(mapStateToProps, null)(MobileNavbar)
