import React, { useState } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { DotLoader, MoonLoader } from 'react-spinners'
import { FaTimes } from 'react-icons/all'
import { toast } from 'react-toastify'
import axios from 'axios'


import { Underline1 } from '../../../Utils/Misc/Underline'

const FullStaffRegistration = ({ isLoading }) => {

   const [images, setImages] = useState(false)
   let [loading, setLoading] = useState(false)
   // let [callbackAcadSR, setCallbackAcadSR] = useState(false)
   let [avatar, setAvatar] = useState('')

   let styleUpload = {
      display: images ? "block" : "none"
   }

   let handleProfileUpload = async e => {
      e.preventDefault()

      try {
         let file = e.target.files[0]
         if (!file) return toast.error("No Image file included...")
         if (file.size > 1024 * 1024) return toast.error("File size too large, ~= 1mb...")
         if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') return toast.error("File format unaccepted...")

         avatar = new FormData()
         avatar.append('avatar', file)

         setLoading(true)
         const res = await axios.post(`/franchise/upload/profile-picture`, avatar, {
            headers: {
               'content-type': 'multipart/form-data'
            }
         })
         setLoading(false)
         setImages(res.data.msg);
         setAvatar(res.data.msg.avatar)
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleProfileDestroy = async () => {
      try {

         setLoading(true)
         let res = await axios.post(`/franchise/destroy/profile-picture`, { avatar_path: `./Public/Images/${avatar}` })

         setLoading(false)
         setImages(false)
         toast.warning(res.data.msg)
         setAvatar('avatar3.jpg')
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   return (
      <div className="main-view gen-height">
         <Container className="py-4">
            <div className="mb-5">
               <h1 className="text-center text-uppercase">Full staff Registration</h1>
               <Underline1 />
            </div>
            <form>
               <div className="form-grid">
                  <div className="form-floating mb-3">
                     <input type="text"
                        placeholder="First Name"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                     />
                     <label htmlFor="firstName">First Name:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input type="text"
                        placeholder="Last Name"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                     />
                     <label htmlFor="lastName">Last Name:</label>
                  </div>
                  <div>
                     <div className="upload mx-auto position-relative p-2">
                        <input
                           className="upload-file"
                           type="file"
                           id="file_up"
                           name="file"
                           onChange={handleProfileUpload}
                        />
                        {
                           loading ?
                              <div className="file_img d-flex align-items-center justify-content-center">
                                 <DotLoader color="#198754" size={24} />
                              </div>
                              : <div className="file_img" style={styleUpload}>
                                 <img src={images ? `/Images/${avatar}` : ''} alt="profile_picture" />
                                 <div className="faTimes" onClick={handleProfileDestroy}>
                                    <FaTimes color="red" size={20} />
                                 </div>
                              </div>
                        }
                     </div>
                  </div>
               </div>
               <div className="form-grid">
                  <div className="form-floating mb-3">
                     <input type="email"
                        placeholder="Email"
                        className="form-control"
                        id="email"
                        name="email"
                     />
                     <label htmlFor="email">Email:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input type="tel"
                        placeholder="Telephone"
                        className="form-control"
                        id="telephone"
                        name="telephone"
                     />
                     <label htmlFor="telephone">Telephone:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <textarea
                        name="address"
                        id="address"
                        placeholder="Address"
                        style={{ height: '10rem', resize: 'none', width: '100%' }}
                        className="form-control"
                     ></textarea>
                     <label htmlFor="address">Address:</label>
                  </div>
               </div>
               <div className="form-grid">
                  <div className="form-floating mb-3">
                     <input type="text"
                        placeholder="Account Number"
                        className="form-control"
                        id="account_number"
                        name="account_number"
                     />
                     <label htmlFor="account_number">Account Number:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <select
                        name="gender"
                        id="gender"
                        className="form-select form-control"
                     >
                        <option value="">Choose gender here</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                     </select>
                     <label htmlFor="gender">Gender</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input type="date"
                        placeholder="Date of birth"
                        className="form-control"
                        id="dob"
                        name="dob"
                     />
                     <label htmlFor="dob">Date of birth:</label>
                  </div>
               </div>
               {isLoading ?
                  <div className="my-3">
                     <button disabled="disabled" className="btn btn-dark text-capitalize">
                        <MoonLoader size={32} />
                     </button>
                  </div>
                  : <button type="submit" className="btn btn-dark text-capitalize my-3">register staff</button>
               }
            </form>
         </Container>
      </div>
   )
}

const mapStateToProps = state => ({
   isLoggedIn: state.staff.isLoggedIn,
   isLoading: state.staff.isLoading,
   isStaff: state.staff.isStaff
})

export default connect(mapStateToProps, null)(FullStaffRegistration)
