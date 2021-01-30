import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_ACCCATEGORY, DELETE_ACCCATEGORY, ACCCATEGORY_LOADING, GET_ACCCATEGORY_FAIL, DELETE_ACCCATEGORY_FAIL, UPDATE_ACCCATEGORY_FAIL, UPDATE_ACCCATEGORY, ADD_ACCCATEGORY, ADD_ACCCATEGORY_FAIL } from './ActionTypes'



export let getAccCategory = () => async dispatch => {
   try {
      let res = await axios.get(`/franchise/account-category`)
      dispatch({
         type: GET_ACCCATEGORY,
         payload: res.data.allAccountCategory
      })
      // console.log(res.data.allAccCategory);
   } catch (error) {
      dispatch({ type: GET_ACCCATEGORY_FAIL })
   }
}
export let addAccCategory = ({ course, course_code, faculty }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   let body = JSON.stringify({ course, course_code, faculty })
   try {
      dispatch(setItemLoading())
      let res = await axios.post(`/franchise/account-category`, body, config)
      dispatch({
         type: ADD_ACCCATEGORY,
         payload: res.data
      })
      dispatch(getAccCategory())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: ADD_ACCCATEGORY_FAIL })
   }
}


export let editAccCategory = ({ course_slug, name }) => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.put(`/franchise/account-category/${course_slug}`, { name })
      dispatch({
         type: UPDATE_ACCCATEGORY,
         payload: res.data
      })
      dispatch(getAccCategory())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: UPDATE_ACCCATEGORY_FAIL })
   }
}

export let deleteAccCategory = course_slug => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.delete(`/franchise/account-category/${course_slug}`)
      dispatch({
         type: DELETE_ACCCATEGORY,
         payload: course_slug
      })
      toast.success(res.data.msg)
      dispatch(getAccCategory())
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: DELETE_ACCCATEGORY_FAIL })
   }
}

export let setItemLoading = () => {
   return {
      type: ACCCATEGORY_LOADING
   }
}