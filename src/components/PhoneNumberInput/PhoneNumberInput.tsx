import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { rootStore } from '../../store'


function PhoneNumberInput() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const {cartStore: {
    phone, setPhone
  }} = rootStore;
  
  // значение ввода телефона value
  // изначально имеет тип E164Number,
  // но в дальнейшем, похоже, нормально
  // конвертируется в обычный string
  // (по крайней мере, при console.log)
  return (
    <PhoneInput
      placeholder="+0 (___) ___-__-__"
      international  
      withCountryCallingCode={true}
      value={phone??""}
      onChange={value => setPhone(value)}
      className='form-control'
      required/>
  )
}

export default PhoneNumberInput