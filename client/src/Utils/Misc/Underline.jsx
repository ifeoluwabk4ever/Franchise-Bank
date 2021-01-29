import React from 'react'

const Underline = () => {
   return (
      <div className="d-flex justify-content-around align-items-center" style={{ width: '7rem' }}>
         <div style={{ width: '2rem', height: '2px' }} className="title-color1" />
         <div style={{ width: '2rem', height: '2px' }} className="bg-primary" />
         <div style={{ width: '2rem', height: '2px' }} className="title-color1" />
      </div>
   )
}

export const Underline1 = () => {
   return (
      <div className="d-flex justify-content-around align-items-center mx-auto" style={{ width: '7rem' }}>
         <div style={{ width: '2rem', height: '2px' }} className="title-color1" />
         <div style={{ width: '1rem', height: '1rem', borderRadius: '50%' }} className="bg-primary" />
         <div style={{ width: '2rem', height: '2px' }} className="title-color1" />
      </div>
   )
}

export default Underline
