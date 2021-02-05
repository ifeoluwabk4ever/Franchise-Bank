import React from 'react'
import { BiTransferAlt, FaUser, GiBanknote, BsInfoCircleFill } from 'react-icons/all'
import { NavLink } from 'reactstrap'


import MySoftToken from './MySoftToken'
import MyQuickAirtime from './MyQuickAirtime'


const MyQuickHandle = ({ cssprop }) => {
   return (
      <div>
         <section className={`home-option ${cssprop}`}>
            <div>
               <NavLink href="/my-quick-transfer">
                  <div>
                     <BiTransferAlt color="#0d6efd" size={24} />
                  </div>
               </NavLink>
               <p className="text-capitalize">inter bank transfer</p>
            </div>
            <div>
               <NavLink href="/my-other-bank-transfer">
                  <div>
                     <GiBanknote color="#0d6efd" size={24} />
                  </div>
               </NavLink>
               <p className="text-capitalize">other bank transfer</p>
            </div>
            <div>
               <MyQuickAirtime />
               <p className="text-capitalize">quick airtime</p>
            </div>
            <div>
               <MySoftToken />
               <p className="text-capitalize">soft token</p>
            </div>
            <div>
               <NavLink href="/my-account-manager">
                  <div>
                     <FaUser color="#0d6efd" size={24} />
                  </div>
               </NavLink>
               <p className="text-capitalize">account manager</p>
            </div>
            <div>
               <NavLink href="/my-user-info">
                  <div>
                     <BsInfoCircleFill color="#0d6efd" size={24} />
                  </div>
               </NavLink>
               <p className="text-capitalize">my info</p>
            </div>
         </section>
      </div>
   )
}

export default MyQuickHandle
