import React from 'react'


import { numberWithCommas } from '../../Utils/Misc/Format'
import Underline from '../../Utils/Misc/Underline'


const MyTransactionHistory = ({ bankUser }) => {


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
                        <li className={`${item.transact_type === 'Cr' ? 'plus' : 'minus'}`} key={index}>
                           <p>
                              <span>&#8358;{numberWithCommas(Math.abs(item.transact_type === 'Cr' ? item.transact_amount.substr(4) : item.totalDebit.substr(4)))}k--</span>
                              <span>{item.transact_type}</span>
                           </p>
                           <p>{item.available < 0 && '-'}&#8358;{numberWithCommas(Math.abs(item.available.substr(4)))}k</p>
                        </li>
                     ))
                  }
               </ul>
            </div>
         </main>
      </div>
   )
}

export default MyTransactionHistory
