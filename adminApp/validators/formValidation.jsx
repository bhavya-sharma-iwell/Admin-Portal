// export const required = value => (!value && value != 0) ? 'Required' : undefined
import { PASSWORD_CHECKER } from '../constants'
import { ConvertNumberToWords } from '../utils/dataFormater'

export const required = values => {
  let value
  if( typeof values === "string"){
      value = values && values.trim()
  }else{
    value = values
  }
  return ((!value && value != 0) || (value == "") ) ? 'Required' : undefined
}

export const inValidDate = values => {
  let value
  if( typeof values === "string"){
      value = values && values.trim()
  }else{
    value = values
  }
  return ((!value && value != 0) || (value == "") ) ? 'Invalid Date' : undefined
}

/*export const required = value => {
  console.log(value,'tante');
  (!value && value != 0) ? 'Required' : undefined 
}*/

export const checkArnNo = value => value && /^ARN-\d+$/.test(value) ? true : false

export const maxLength = max => value => {
  return value && value.length > max ? `Must be ${max} characters or less` : undefined
}

export const maxValue = max => value => {
  return value && parseInt(value) > max ? `Must be less than or equal to ${max}` : undefined
}

export const maxNumber = max => value => {
  return value && parseInt(value) > max ? `Must be less than or equal to ${ConvertNumberToWords(max)}` : undefined
}

export const maxValueExclusive = max => value => { //to resolved Decimal issue (100.9)
  return value && parseFloat(value) > max ? `Must be less than ${max}` : undefined
}

export const minValue = min => value => {
  return value && parseInt(value) < min ? `Must be at least ${min}` : undefined
}

export const minLength = min => value => {
  return value && value.length < min ? `Must be ${min} characters or more` : undefined
}

export const number = value => {
  return value && isNaN(Number(value)) ? 'Must be a number' : undefined
}

export const fisrtDigitNotZero = value =>  value && !/^([1-9]\d){1}[0-9]*$/.test(value) ?
  'First digit can not be 0' : undefined

export const numberOnly = value =>  value && !/^[0-9]*$/.test(value) ?
  'Whole number only' : undefined

  export const percentageValue = value =>  value && !/^[1-9]\d*$/.test(value) ?
 'number should be > 0' : undefined

export const whiteSpace = value =>  value && /\s/.test(value) ?
  'No Space allowed' : undefined

export const alphaBetsOnly = value =>  value && !/^[A-Z a-z.]+$/.test(value) ?
  'Alphabet characters Only' : undefined

export const alphaNumericOnly = value =>  value && !/^[a-zA-Z0-9]*$/.test(value) ?
  'Alpha Numeric Only' : undefined

export const specialNameRegex = value =>  value && !/^[a-zA-Z0-9-_. ]*$/.test(value) ?
  'Please Enter Valid Name' : undefined

export const alphaNumericOnlyWithSpace = value =>  value && !/^[a-zA-Z0-9 ]*$/.test(value) ?
  'Alpha Numeric Only' : undefined


export const emailRegex = value =>
  value && !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/.test(value) ?
  'Invalid email address' : undefined

export const phoneNumberRegex = value =>  value && !/^[6789]\d{9}$/.test(value) ?
  'Invalid mobile number' : undefined

export const internationalMobileRegex = value =>  value && !/^(\+|0)?\d{10,13}$/.test(value) ?
'Invalid mobile number' : undefined

export const PanRegex = value => value &&  !/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(value) ? 
	'Invalid Pan ex:ABCDE1234H' : undefined

export const PanCompanyRegex = value => value &&  !/^([a-zA-Z]{3})+\H([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/.test(value) ? 
  'Invalid Pan ex:ABCHE1234D' : undefined

export const ifscRegex = value =>  value && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value) ?
  'Invalid IFSC Code' : undefined

export const pincodeRegex = value =>  value && !/^[1-9][0-9]{5}$/.test(value) ?
  'Invalid Pincode' : undefined

export const aadharNumberRegex = value =>  value && !/^[0-9]*$/.test(value) ?
  'Invalid Aadhar Number': undefined

export const gstNumberRegex = value =>  value && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value) ?
  'Invalid GST Number': undefined

export const nameRegex = value =>  value && !/^([a-zA-Z.]+\s?)*$/.test(value) ?
  'Invalid name' : undefined
export const userTypeRegex = value =>  value && !/^\w+$/.test(value) ?
  'Invalid userType' : undefined
export const passwordRegex = value => value && !/^(?=.*[A-Za-z])[A-Za-z\d\.\#\@\*\%\_\!\@]{8,}$/.test(value) ?
  'Invalid Password (min 8 alphanumeric characters)': undefined 
  
export const numberDecimal = value =>  value && !/^\d{1,14}\.{0,1}\d{0,4}$/.test(value) ?
'Only 4 decimals allowed' : undefined


export const numberTwoDecimal = value =>  value && !/^\d{1,14}\.{0,1}\d{0,2}$/.test(value) ?
'Only 2 decimals allowed (ex:32.02)' : undefined

/*export const numberDecimal = (value,precision=4) => { 
  let regexTest = new RegExp("^\\d{1,14}\\.{0,1}\\d{0,"+ precision +"}$")
  return (value && !regexTest.test(value) ?
  ("Number only (after decimal max "+ precision + " char)") : 'tante')


  to pass from form 

  validate={[formValidator.required, (value,precision=2)=>{
        let validationResult = formValidator.numberDecimal(value,2)
        return validationResult
    }]}
}*/

export const interestRateRegex = value => value && !/^(([0-9]\d{0,2})|(\d))(\.(\d\d)|\d){0,1}$/.test(value) ?
  'Invalid Interest Rate (ex: 22.02)': undefined

export const alphaNumericOnlyWithSpecialChar = value => value && !/^[ A-Za-z][ A-Za-z0-9_@./!@#$%^&*()]*$/.test(value) ?
  'Invalid Text (ex:Name@123$)': undefined

export const PanRegexManual = value => value &&  !/[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}/.test(value) ? 
  false : true

export const PanCompanyRegexManual = value => value &&  !/([A-Za-z]{3})+\H([A-Za-z]){1}[0-9]{4}[A-Za-z]{1}/.test(value) ? 
  false : true


export const OTPSixDigit = value =>  value && !/^[0-9]{6}$/.test(value) ?
  'OTP must contain six digits' : undefined

export const alphaNumericWithSpacialChr = value =>  value && !/^[a-z0-9A-Z!@.#*()+_ -]*$/
.test(value) ?
  "Invalid Name" : undefined

export const spaceSpecialCharNotAllowedExceptHyphen = value =>  value && !/^[a-zA-Z0-9-]*$/.test(value) ?
  'Space & Special Char Not Allowed Except (-)' : undefined

export const DateValidate = (value) => {
  var dateStr = value;
  if(dateStr){
    var datePat = /^(\d{2,2})-(\d{2,2})-(\d{4}|\d{4})$/;  
    var matchDatePattern = dateStr.match(datePat); 
   
   if (matchDatePattern == null) {
    return ("Date must be in DD-MM-YYYY format")
   }
   
   var day = matchDatePattern[1];
   var month = matchDatePattern[2];
   var year = matchDatePattern[3];

   if (day < 1 || day > 31) {
    return ("Day must be between 1 and 31");
   }
   if (month < 1 || month > 12) { 
    return ("Month must be between 1 and 12");
   }
   if ((month==4 || month==6 || month==9 || month==11) && day==31) {
    return ("Month "+month+" doesn't have 31 days!")
   }
   if (month == 2) { 
    var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
    if (day>29 || (day==29 && !isleap)) {
     return ("February " + year + " doesn't have " + day + " days!");
      }
   }
  }
  return undefined;  
}

export const EuinRegx = value => value &&  !/^([E]){1}([0-9]*)?$/.test(value) ? 
	'Invalid EUIN' : undefined

export const numberZeroToFiveOnly = value =>  value && !/^(0|[0-5]?|5)$/.test(value) ?
  'Number 0 - 5 only' : undefined

export const numberZeroToSeventyFiveOnly = value =>  value && !/^(0|[1-7][0-5]?|75)$/.test(value) ?
  'Number 0 - 75 only' : undefined

export const numberZeroToHundredOnly = value =>  value && !/^(0|[1-9][0-9]?|100)$/.test(value) ?
  'Number 0 - 100 only' : undefined

  export const alphaNumericAndlimitedSpacialChr = value =>  value && !/^[a-z0-9A-Z!@.#*()+_ -&/]*$/
  .test(value) ?
    "Invalid Name(Ex: abc12A343 &()-/ )" : undefined

export const alphaNumericAndlimitedSpacialChrAndSlash = value =>  value && !/^[a-z0-9A-Z!@.#*()+_ -&]*$/
  .test(value) ?
    "Invalid Name(Ex: abc12A343 &()-/ )" : undefined

export const passwordCheckAsNumber = value => {
  return value && Number(value)==PASSWORD_CHECKER[0] ? 'Reset default password given by BSE' : undefined
}


export const fixedLength = min => value => {
  return value && (value.length != min) ? `Must be ${min} characters` : undefined
}

export const alphaNumericWithSpacialAndChr = value =>  value && !/^[a-z0-9A-Z!@&.#*()+_ -\[\]]*$/.test(value) ?
  "Invalid Name" : undefined

export const alphaNumericWithSpaceSlashAndHyphen = value =>  value && !/^[a-z0-9A-Z /-]*$/
  .test(value) ?
    "Alpha Numeric and Special Characters only space - and /" : undefined

export const commaSeparatedDigits = value => value && !/^[-,0-9]+$/.test(value)?
  'only digits & comma is allowed' : undefined    

  export const dateCheck = value => value&& value.split(',').map(day=>(day < 1 || day > 31)).find(val=>val==true)?
  'Date between 1 & 31' : undefined

export const numberZeroToninetynineOnly = value =>  value && !(value>=0 && value<100 ) ?
  'Number should be >=0 and < 100' : undefined

export const IPAddressRegex = value =>  value && !/((\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(\,((\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]^[0-9]?)){3}))*$/.test(value) ?
'Invalid IP (Eg: IP1,IP2,IP3)' : undefined

export const numberDotCommaRegex = value =>  value && !/^(?!\.)(?!.*\.\.)[.,0-9]+[^.,]$/.test(value) ?
'Not a valid IP address' : undefined

export const invalidAmount = value => value && (isNaN(Number(value)) || !/^\d{1,14}\.{0,1}\d{0,2}$/.test(value) ) ?
'Invalid Amount' : undefined

export const minAmountValue = min => value => {
  return value && parseInt(value) < min ? 'Invalid Amount' : undefined
}
// allows space only in between string
export const inBetweenWhiteSpace = value =>  value && !/^[^\s]+(\s+[^\s]+)*$/.test(value) ?
  'No Space allowed at start and end' : undefined

export const validateNumber = value => value && !/^[0-9]\d*$/.test(value) ?
"Number must be non-negative and integer." : undefined

export const individualPanValidation = value => value && /^[a-zA-Z]{3}P[a-zA-Z][0-9]{4}[a-zA-Z]$/.test(value)

export const maxValueInclusive = max => value => {
  return value && parseInt(value) >= max ? `Must be less then ${max}` : undefined
}

export const individualPanCheck = value => value && !/^[a-zA-Z]{3}P[a-zA-Z][0-9]{4}[a-zA-Z]$/.test(value) ?
"Invalid Pan ex:ABCPD1234E" : undefined

export const validAssetName = value => value && !/^[a-zA-Z0-9\s/%.\(\)\{\}[\]_\-]+$/.test(value) ?
  '@,<,>,:,*,^,~,`,;,&,$,! are not allowed': undefined

export const passRegex = value => value && /[^A-Za-z\d@#%_!]/.test(value) ? 
'Special characters allowed(#,@,%,_,!)': undefined;
