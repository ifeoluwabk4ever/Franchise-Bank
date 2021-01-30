import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_ACCTYPES, DELETE_ACCTYPES, ACCTYPES_LOADING, GET_ACCTYPES_FAIL, DELETE_ACCTYPES_FAIL, UPDATE_ACCTYPES_FAIL, UPDATE_ACCTYPES, ADD_ACCTYPES, ADD_ACCTYPES_FAIL } from './ActionTypes'



export let getAccTypes = () => async dispatch => {
   try {
      let res = await axios.get(`/franchise/account-type`)
      dispatch({
         type: GET_ACCTYPES,
         payload: res.data.accountType
      })
      // console.log(res.data.allAccTypes);
   } catch (error) {
      dispatch({ type: GET_ACCTYPES_FAIL })
   }
}
export let addAccTypes = ({ course, course_code, faculty }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   let body = JSON.stringify({ course, course_code, faculty })
   try {
      dispatch(setItemLoading())
      let res = await axios.post(`/franchise/account-type`, body, config)
      dispatch({
         type: ADD_ACCTYPES,
         payload: res.data
      })
      dispatch(getAccTypes())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: ADD_ACCTYPES_FAIL })
   }
}


export let editAccTypes = ({ course_slug, name }) => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.put(`/franchise/account-type/${course_slug}`, { name })
      dispatch({
         type: UPDATE_ACCTYPES,
         payload: res.data
      })
      dispatch(getAccTypes())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: UPDATE_ACCTYPES_FAIL })
   }
}

export let deleteAccTypes = course_slug => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.delete(`/franchise/account-type/${course_slug}`)
      dispatch({
         type: DELETE_ACCTYPES,
         payload: course_slug
      })
      toast.success(res.data.msg)
      dispatch(getAccTypes())
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: DELETE_ACCTYPES_FAIL })
   }
}

export let setItemLoading = () => {
   return {
      type: ACCTYPES_LOADING
   }
}