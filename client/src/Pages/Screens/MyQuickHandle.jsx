import React from 'react'
import { BiTransferAlt, FaUser, BiWalletAlt, FaUniversity, BsPhone, CgFileDocument } from 'react-icons/all'
import { NavLink } from 'reactstrap'

const MyQuickHandle = ({ cssprop }) => {
   return (
      <div>
         <section className={`${cssprop}`}>
            <div>
               <NavLink href="/my-quick-balance">
                  <div>
                     <CgFileDocument color="#0dcaf0" size={24} />
                  </div>
               </NavLink>
               <p className="text-capitalize">quick balance</p>
            </div>
            <div>
               <NavLink href="/my-quick-transfer">
                  <div>
                     <BiTransferAlt color="#0dcaf0" size={24} />
                  </div>
               </NavLink>
               <p className="text-capitalize">quick transfer</p>
            </div>
            <div>
               <NavLink href="/my-quick-airtime">
                  <div>
                     <BsPhone color="#0dcaf0" size={24} />
                  </div>
               </NavLink>
               <p className="text-capitalize">quick airtime</p>
            </div>
            <div>
               <NavLink href="/my-soft-token">
                  <div>
                     <BiWalletAlt color="#0dcaf0" size={24} />
                  </div>
               </NavLink>
               <p className="text-capitalize">soft token</p>
            </div>
            <div>
               <NavLink href="/my-account-manager">
                  <div>
                     <FaUser color="#0dcaf0" size={24} />
                  </div>
               </NavLink>
               <p className="text-capitalize">account manager</p>
            </div>
            <div>
               <NavLink href="/my-open-account">
                  <div>
                     <FaUniversity color="#0dcaf0" size={24} />
                  </div>
               </NavLink>
               <p className="text-capitalize">open account</p>
            </div>
         </section>
      </div>
   )
}

export default MyQuickHandle
