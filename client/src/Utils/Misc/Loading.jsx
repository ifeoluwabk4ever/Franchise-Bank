import React from 'react'
import { BounceLoader, DotLoader, PropagateLoader, RingLoader, ScaleLoader } from 'react-spinners'

const Loading = () => {
   return (
      <div className="d-flex justify-content-center flex-column loaders">
         <h1 className="text-center">Loading...</h1>
         <div className="d-flex mx-auto my-5">
            <PropagateLoader color="#0d6efd" />
         </div>
      </div>
   )
}

export const Loader1 = () => {
   return (
      <div className="d-flex justify-content-center flex-column loaders">
         <h5 className="text-center">Loading...</h5>
         <div className="d-flex mx-auto my-5">
            <RingLoader color="#0d6efd" />
         </div>
      </div>
   )
}

export const Loader2 = () => {
   return (
      <div className="d-flex justify-content-center flex-column loaders">
         <h3 className="text-center">Loading...</h3>
         <div className="d-flex mx-auto my-5">
            <BounceLoader color="#0d6efd" />
         </div>
      </div>
   )
}


export const Loader3 = () => {
   return (
      <div className="d-flex justify-content-center flex-column loaders">
         <h3 className="text-center">Loading...</h3>
         <div className="d-flex mx-auto my-5">
            <DotLoader color="#0d6efd" />
         </div>
      </div>
   )
}


export const Loader4 = () => {
   return (
      <div className="d-flex justify-content-center flex-column loaders">
         <h3 className="text-center">Loading...</h3>
         <div className="d-flex mx-auto my-5">
            <ScaleLoader color="#0d6efd" />
         </div>
      </div>
   )
}

export default Loading
