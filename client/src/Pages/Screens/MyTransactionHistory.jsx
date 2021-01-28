import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'


import { numberWithCommas } from '../../Utils/Misc/Format'
import Underline from '../../Utils/Misc/Underline'


const MyTransactionHistory = ({ bankUser }) => {

   const [modal, setModal] = useState(false);
   const [detail, setDetail] = useState([]);
   const [detailCheck, setDetailCheck] = useState(false);

   const toggle = () => {
      setModal(!modal)
   }

   const handleDisplayDetail = id => {
      let sorted = bankUser.history.filter(item => item._id === id)
      console.log(sorted);
      setDetail(sorted)
      setDetailCheck(true)
      toggle()
   }


   return (
      <div className="main-view pt-3">
         <main className="">
            <div className="px-5 py-2">
               <div className="mb-4">
                  <h4 className="text-capitalize">Transaction history</h4>
                  <Underline />
               </div>
               <ul className="list">
                  {bankUser.history.length === 0 ?
                     <h1 className="text-center text-capitalize">No history yet</h1>
                     : bankUser.history.slice(0, 5).map((item, index) => (
                        <li
                           className={`${item.transact_type === 'Cr' ? 'plus' : 'minus'}`}
                           key={index}
                           style={{ cursor: 'pointer' }}
                           onClick={() => handleDisplayDetail(item._id)}
                        >
                           <p>
                              <span>&#8358;{numberWithCommas(Math.abs(item.transact_type === 'Cr' ? item.transact_amount.substr(4) : item.totalDebit.substr(4)))}k--</span>
                              <span>{item.transact_type}</span>
                           </p>
                           <p>Aval: {item.available < 0 && '-'}&#8358;{numberWithCommas(Math.abs(item.available.substr(4)))}k</p>
                        </li>
                     ))
                  }
               </ul>
            </div>
            {detailCheck &&
               detail.map(item => (
                  <Modal isOpen={modal} key={item._id} toggle={toggle}>
                     <ModalHeader
                        className={`${item.transact_type === 'Cr' ? 'list-group-item-success' : 'list-group-item-danger'}`}
                        toggle={toggle}>
                        <h3> ID: {item.transactionID} </h3>
                     </ModalHeader>
                     <ModalBody>
                        <p>
                           <span>Amt: &#8358;{numberWithCommas(Math.abs(item.transact_type === 'Cr' ? item.transact_amount.substr(4) : item.totalDebit.substr(4)))}k--</span>
                           <span>{item.transact_type}</span>
                        </p>
                        <p>Desc: {item.desc}</p>
                        <p>Aval: {item.available < 0 && '-'}&#8358;{numberWithCommas(Math.abs(item.available.substr(4)))}k</p>
                     </ModalBody>
                  </Modal>
               ))
            }
         </main>
      </div>
   )
}

export default MyTransactionHistory