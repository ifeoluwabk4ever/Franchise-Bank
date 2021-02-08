import React, { Fragment, useContext, useState } from 'react'
import { Container } from 'reactstrap'
import { DotLoader, MoonLoader } from 'react-spinners'
import { FaTimes } from 'react-icons/all'
import { toast } from 'react-toastify'
import axios from 'axios'


import { Underline1 } from '../../../Utils/Misc/Underline'
import { GlobalState } from '../../../Data/Context'

const initialState = {
   firstName: '',
   lastName: '',
   email: '',
   telephone: '',
   dob: '',
   address: '',
   account_number: '',
   gender: '',
   bvn_number: '',
   account_type: '',
   account_category: '',
   mothers_firstName: '',
   mothers_lastName: '',
   mothers_telephone: '',
}

const FullStaffRegistration = () => {
   const { isLoadingStaff, isAddedStaff, addedMsgStaff, registerBankStaff } = useContext(GlobalState)


   const [data, setData] = useState(initialState);
   const { firstName, lastName, email, telephone, dob, address, account_number, gender } = data
   const initAvatar = gender === 'Male' ? 'avatar3.png' : 'avatar6.png'

   const [images, setImages] = useState(false)
   let [loading, setLoading] = useState(false)
   let [callbackFullAcadSR, setCallbackFullAcadSR] = useState(false)
   let [avatar, setAvatar] = useState(initAvatar)

   const handleDataChange = input => e => {
      setData({ ...data, [input]: e.target.value })
   }

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
         const res = await axios.post(`/franchise/upload/staff-picture`, avatar, {
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

   if (isAddedStaff) {
      var accString = `${lastName} ${firstName} StaffID is:- ${addedMsgStaff}`
   }

   let clearDefault = () => {
      setData({
         ...data,
         firstName: '',
         lastName: '',
         email: '',
         telephone: '',
         dob: '',
         address: '',
         account_number: '',
         gender: '',
         bvn_number: '',
         account_type: '',
         account_category: '',
         mothers_firstName: '',
         mothers_lastName: '',
         mothers_telephone: '',
      });
      setAvatar(initAvatar)
      setImages(false)
      accString = ''
      setCallbackFullAcadSR(false)
   }

   let handleSubmit = async e => {
      e.preventDefault()
      registerBankStaff({ firstName, lastName, email, telephone, dob, address, account_number, gender, avatar })

      setCallbackFullAcadSR(true)
   }


   return (
      <div className="main-view gen-height">
         <Container className="py-4">
            <div className="mb-5">
               <h1 className="text-center text-uppercase title-color">Full staff Registration</h1>
               <Underline1 />
            </div>
            <form onSubmit={handleSubmit}>
               <div className="form-grid">
                  <div className="form-floating mb-3">
                     <input type="text"
                        placeholder="First Name"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleDataChange("firstName")}
                     />
                     <label htmlFor="firstName">First Name:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input type="text"
                        placeholder="Last Name"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleDataChange("lastName")}
                     />
                     <label htmlFor="lastName">Last Name:</label>
                  </div>
                  <div className="mb-3">
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
                                 <DotLoader color="#0d6efd" size={24} />
                              </div>
                              : <div className="file_img" style={styleUpload}>
                                 <img src={images ? `/Uploads/${avatar}` : ''} alt="profile_picture" />
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
                        value={email}
                        onChange={handleDataChange("email")}
                     />
                     <label htmlFor="email">Email:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input type="tel"
                        placeholder="Telephone"
                        className="form-control"
                        id="telephone"
                        name="telephone"
                        value={telephone}
                        onChange={handleDataChange("telephone")}
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
                        value={address}
                        onChange={handleDataChange("address")}
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
                        value={account_number}
                        onChange={handleDataChange("account_number")}
                     />
                     <label htmlFor="account_number">Account Number:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <select
                        name="gender"
                        id="gender"
                        className="form-select form-control"
                        value={gender}
                        onChange={handleDataChange("gender")}
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
                        value={dob}
                        onChange={handleDataChange("dob")}
                     />
                     <label htmlFor="dob">Date of birth:</label>
                  </div>
               </div>
               <div className="d-flex align-content-center justify-content-between">
                  {isLoadingStaff ?
                     <div className="my-3">
                        <MoonLoader size={32} />
                     </div>
                     : <button type="submit" className="btn btn-dark text-capitalize my-3">register staff</button>
                  }
                  {
                     isAddedStaff && callbackFullAcadSR &&
                     <Fragment>
                        <h4 className="my-auto">{accString}</h4>
                        <button type="reset"
                           onClick={clearDefault}
                           className="btn btn-dark my-auto"
                        >Clear</button>
                     </Fragment>
                  }
               </div>
            </form>
         </Container>
      </div>
   )
}

export default FullStaffRegistration
