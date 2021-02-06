import React, { useState, Fragment, useContext } from 'react'
import { Container } from 'reactstrap'
import { DotLoader, MoonLoader } from 'react-spinners'
import { FaTimes } from 'react-icons/all'
import { toast } from 'react-toastify'
import axios from 'axios'


import Loading from '../../../Utils/Misc/Loading'
import { Underline1 } from '../../../Utils/Misc/Underline'
import { GlobalState } from '../../../Data/Context'



const initialState = {
   firstName: '',
   lastName: '',
   email: '',
   telephone: '',
   dob: '',
   address: '',
   occupation: '',
   gender: '',
   bvn_number: '',
   account_type: '',
   account_category: '',
   mothers_firstName: '',
   mothers_lastName: '',
   mothers_telephone: '',
}



const FullUserRegistration = () => {

   const { isLoading, allTypes, allCategory, isAdded, registerBankUser, addedMsg, isLoadingStaff } = useContext(GlobalState)

   isLoadingStaff && <Loading />

   const [data, setData] = useState(initialState);
   const { firstName, lastName, email, telephone, dob, address, occupation, gender, bvn_number, account_category, account_type, mothers_firstName, mothers_lastName, mothers_telephone } = data
   const initAvatar = gender === 'Male' ? 'avatar3.png' : 'avatar6.png'

   const handleDataChange = input => e => {
      setData({ ...data, [input]: e.target.value })
   }
   const [images, setImages] = useState(false)
   let [loading, setLoading] = useState(false)
   let [callbackFullUserReg, setCallbackFullUserReg] = useState(false)
   let [avatar, setAvatar] = useState(initAvatar)

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
         const res = await axios.post(`/franchise/upload/user-picture`, avatar, {
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
         let res = await axios.post(`/franchise/destroy/picture`, { avatar_path: `./Public/Images/${avatar}` })

         setLoading(false)
         setImages(false)
         toast.warning(res.data.msg)
         setAvatar('avatar3.png')
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleSubmit = async e => {
      e.preventDefault()
      registerBankUser({ firstName, lastName, email, telephone, dob, address, occupation, gender, bvn_number, account_category, account_type, mothers_firstName, mothers_lastName, mothers_telephone, avatar })

      setCallbackFullUserReg(true)
   }

   if (isAdded) {
      var accString = `${lastName} ${firstName} account number is:- ${addedMsg}`
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
         occupation: '',
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
      setCallbackFullUserReg(false)
   }


   return (
      <div className="main-view gen-height">
         <Container className="py-4">
            <div className="mb-5">
               <h1 className="text-center text-uppercase">Full User Registration</h1>
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
                        value={email}
                        onChange={handleDataChange("email")}
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
                        placeholder="Occupation"
                        className="form-control"
                        id="occupation"
                        name="occupation"
                        value={occupation}
                        onChange={handleDataChange("occupation")}
                     />
                     <label htmlFor="occupation">Occupation:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <select
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={handleDataChange("gender")}
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
                        value={dob}
                        onChange={handleDataChange("dob")}
                     />
                     <label htmlFor="dob">Date of birth:</label>
                  </div>
               </div>
               <div className="form-grid">
                  <div className="form-floating mb-3">
                     <input type="text"
                        placeholder="Mother's First Name"
                        className="form-control"
                        id="mothers_firstName"
                        name="mothers_firstName"
                        value={mothers_firstName}
                        onChange={handleDataChange("mothers_firstName")}
                     />
                     <label htmlFor="mothers_firstName">Mother's First Name:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input type="text"
                        placeholder="Mother's Last Name"
                        className="form-control"
                        id="mothers_lastName"
                        name="mothers_lastName"
                        value={mothers_lastName}
                        onChange={handleDataChange("mothers_lastName")}
                     />
                     <label htmlFor="mothers_lastName">Mother's Last Name:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input type="tel"
                        placeholder="Mother's Mobile Number"
                        className="form-control"
                        id="mothers_telephone"
                        name="mothers_telephone"
                        value={mothers_telephone}
                        onChange={handleDataChange("mothers_telephone")}
                     />
                     <label htmlFor="mothers_telephone">Mother's Mobile Number:</label>
                  </div>
               </div>
               <div className="form-grid">
                  <div className="form-floating mb-3">
                     <input type="text"
                        placeholder="BVN Number"
                        className="form-control"
                        id="bvn_number"
                        name="bvn_number"
                        value={bvn_number}
                        onChange={handleDataChange("bvn_number")}
                     />
                     <label htmlFor="bvn_number">BVN Number:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <select
                        placeholder="Account Type"
                        className="form-select form-control"
                        name="account_type"
                        id="account_type"
                        value={account_type}
                        onChange={handleDataChange("account_type")}>
                        <option value="">Choose Account Type here</option>
                        {
                           allTypes.sort().map(item => (
                              <option value={item._id} key={item._id}>{item.account_type}</option>
                           ))
                        }
                     </select>
                     <label htmlFor="account_type">Account Type:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <select
                        placeholder="Account Category"
                        className="form-select form-control"
                        name="account_category"
                        id="account_category"
                        value={account_category}
                        onChange={handleDataChange("account_category")}>
                        <option value="">Choose Account Category here</option>
                        {
                           allCategory.sort().map(item => (
                              <option value={item._id} key={item._id}>{item.category}</option>
                           ))
                        }
                     </select>
                     <label htmlFor="account_category">Account Category:</label>
                  </div>
               </div>
               <div className="d-flex align-content-center justify-content-between">
                  {isLoading ?
                     <div className="my-3">
                        <MoonLoader size={32} />
                     </div>
                     : <button type="submit" className="btn btn-dark text-capitalize my-3">register user</button>
                  }
                  {
                     isAdded && callbackFullUserReg &&
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

export default FullUserRegistration
