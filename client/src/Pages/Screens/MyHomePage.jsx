import React from 'react'
import { ButtonGroup, Button, Navbar } from 'reactstrap'
import MyQuickHandle from './MyQuickHandle'

const MyHomePage = () => {
   return (
      <div>
         <MyQuickHandle />
         <Navbar fixed="bottom" className="p-0">
            <ButtonGroup className="w-100">
               <Button className="text-capitalize mr-2" color="primary">
                  sign in
            </Button>
               <Button className="text-capitalize ml-2" color="primary">
                  log in
            </Button>
            </ButtonGroup>
         </Navbar>
      </div>
   )
}

export default MyHomePage
