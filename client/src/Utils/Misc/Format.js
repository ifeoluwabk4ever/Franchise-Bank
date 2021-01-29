export let numberWithCommas = x => {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export let getAge = myAge => {
   let val1 = new Date(myAge).getTime()
   let val2 = Date.now()
   let val3 = new Date(val2 - val1)
   return Math.abs(val3.getUTCFullYear() - 1970)
}

export let dateFormat = dob => {
   let val1 = new Date(dob)
   let utc2 = val1.toUTCString().substring(0, 16)
   return utc2
}