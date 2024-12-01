import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'

function PhoneNumberInput() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState()
  return (
    <PhoneInput
      placeholder="+0 (___) ___-__-__"
      international  
      withCountryCallingCode={true}
      value={value}
      onChange={() => setValue(value)}
      className='form-control'/>
  )
}

export default PhoneNumberInput