import React , {Fragment} from 'react';
import {UTIL} from 'adminApp/constants'
import * as commonConst from 'adminApp/constants'
import { EncryptData } from 'adminApp/utils/encryption'
import { KYC_NOT_VERIFIED } from 'adminApp/constants'
import moment from 'moment-timezone'

export const NumberFormater = (num) =>{
     if(!num){
        return 0
     }
    let sign = '';
            if(num<0){
                sign ="-";
            }
			num=num.toString();
            if(sign){
                num = num.substring(1);
            }
            var afterPoint = num.split('.')[1];
            var valueBeforeDot = num.split('.')[0];
            var lastThree = valueBeforeDot.substring(valueBeforeDot.length-3);
            var otherNumbers = valueBeforeDot.substring(0,valueBeforeDot.length-3);
            if(otherNumbers){
                lastThree = ',' + lastThree;
            var formatedValue = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            }
            else{
                formatedValue = lastThree;
            }
            if (afterPoint) {
              formatedValue  =  formatedValue + '.' + afterPoint;
              }
            return (sign+formatedValue)||num;
}

export const DateFormater = (date,format=UTIL.dateFormat) =>{
	if(!date) return date;
	return moment(date).format(format);
}

export const ConvertDateToBackEndFromFront =(date) => {
    return  date.split("-").reverse().join("-");
}

export const ShowDateFormater = (date,format=UTIL.frontDateFormat, utcOffsetValue = false) =>{
    if(!date) return date;
    return utcOffsetValue ? moment(date).tz('Asia/Tokyo').format(format) : moment(date).tz("Asia/Kolkata").format(format);
}

export const ShowDateAndTime = (date,format=UTIL.dateAndTimeFormat) =>{
    if(!date) return date;
    return moment(date).format(format);
}

export const ShowCustomDateTimeFormat = (date,format=UTIL.dateAndTimeFormat) =>{
    if(!date) return date;
    return moment(date).format(format);
}
export const PrecesionValueFormater = (columnValue, precisionValue, onlyInteger) => {
    if(!columnValue)
        return 0;
	if(typeof columnValue == 'string'){
        if(Number.isNaN(NaN)){
            return columnValue;
        }
		columnValue = parseFloat(columnValue)
	}
    // Will remove zeros after decimal, which have no contribution in absolute value.
    // Ex:- columnValue == 1000.0000 will return 1000
    if (onlyInteger && Number.isInteger(parseFloat(columnValue))) {
        return parseFloat(columnValue) // Return as-is if it's an integer
    }
     return parseFloat(Math.round(columnValue * 10000) / 10000).toFixed(precisionValue);
}

export const amountFormaterPrecisionValue = (amountValue, precisionValue) =>{
    if(!amountValue){
        return 0;
    }

    if(amountValue >= 10000000){
        amountValue = (amountValue/10000000).toFixed(precisionValue) + ' cr';
    }else if(amountValue >= 100000){
        amountValue = (amountValue/100000).toFixed(precisionValue) + ' lac';
    }else if(amountValue >= 1){
        amountValue = (amountValue/1000).toFixed(precisionValue) + ' k';
    }
    return amountValue;
}
export default NumberFormater;

export const capitalizeFirstLetter = (inputString) =>{
    if(!inputString) return
    let firstCahr = inputString[0]
    return (firstCahr.toUpperCase()+inputString.slice(1))
}
export const capitalizeFirstLetterEachWord = (string) =>{
    string = string.toLowerCase()
    .split(' ')
    .map((subString) => subString.charAt(0).toUpperCase() + subString.substring(1))
    .join(' ');
    return string
}
export const minMaxValues = (dataList , minMax , keyNameOfDate) => {
    // dataList : Receive all data from the function arguments
    // minMax : This is define the min or max (Math.min or Math.max) which is passed from the function arguments
    // keyNameOfDate : This is a key of define data, which return the value of particular key
    var calculatedValue =  Math[minMax].apply( null, dataList.map( function(obj) { return  obj[keyNameOfDate] } ) ) 
    return calculatedValue;
}

export const roundOf = (data) => {
   var roundOfValue =  Math.round(data/1000)*1000;

   return roundOfValue;
}


export const ReportingLevels = (list, levelNumbers) => {
    let newListOfLevels = []
    let levelObj = {}

if (levelNumbers && typeof levelNumbers != 'string') {
    for(let i=0; i<(list&&list.length);i++){
        levelObj[list[i].levelNo] = list[i]
    }
    for(let k=0; k<levelNumbers.length;k++){
        if(levelObj[levelNumbers[k]]){
            newListOfLevels[levelNumbers[k]] = levelObj[levelNumbers[k]]
        }else{
            newListOfLevels[levelNumbers[k]] = commonConst.LEVEL_NUMBERS_VALUE[levelNumbers[k]]
        }
    }
}
else if (typeof levelNumbers == 'string') {
    newListOfLevels = list
}
    return newListOfLevels
}

export const MergeTwoArray = (firstArr, secondArr ) => {
   return firstArr.concat(secondArr)
}

export const SelectAllRows = (keyName, tableData,elementsName,fullObj) =>{
    let selectedRows = {}
    let listOfSelectedIds = {}
    let inputCheckboxList = document.getElementsByName(elementsName || 'action')
        for (let i = 0; i < inputCheckboxList.length; i++) {
            if (inputCheckboxList[i].type == 'checkbox')
                inputCheckboxList[i].checked = true;
        }
        let tableDataLength = tableData && tableData.length 
        for (let i = 0; i < tableDataLength; i++) {
            if ((tableData[i]) && (tableData[i][keyName]) && (!fullObj)) {
                selectedRows[tableData[i][keyName]] = tableData[i]
                listOfSelectedIds[tableData[i][keyName]] = tableData[i][keyName]
            }
            if ((tableData[i]) && (tableData[i][keyName]) && (fullObj)) {
                selectedRows[tableData[i][keyName]] = tableData[i]
                listOfSelectedIds[tableData[i][keyName]] = tableData[i]
            }
        }    
    return {selectedRows, listOfSelectedIds}
}

export const UnselectAllRows = (elementsName)=>{    
    let inputCheckboxList = document.getElementsByName(elementsName || 'action')
    for (let i = 0; i < inputCheckboxList.length; i++) {
        if (inputCheckboxList[i].type == 'checkbox'){
            inputCheckboxList[i].checked = false;
        }
    }
    return 
}

export const removeExtraSpaceString = (string)=>{
    let alterString = string.replace(/\s+/g, " ")
    return alterString
}

export const dynamicOptionList = (optionsList,value)=>{
    let optionsListFinal = optionsList && optionsList.filter((object,index)=>{
      while(index < value){
        return (object)
      }
    })
    return optionsListFinal
  }

export const CustomTableScroll = (headScrollTable, mainScrollTable) => {
    let scrollTable= headScrollTable
    let mainTable= mainScrollTable
    let dodyClassList = document.body.classList
    if (scrollTable && mainTable) {
        scrollTable.onscroll = function() {
            mainTable.scrollLeft =scrollTable.scrollLeft
        };
        mainTable.onscroll = function() {
            scrollTable.scrollLeft =mainTable.scrollLeft;
        };
    }
    if((dodyClassList[0] == 'tableScrollAdded') && mainTable){
        mainTable.onscroll = function() {
            if(mainTable.scrollTop == 0){
                let resetWindowOffSet = window.pageYOffset - 150
                window.scroll(0, resetWindowOffSet);
                if (scrollTable) {
                    scrollTable.scrollLeft = mainTable && mainTable.scrollLeft;
                }
            }
        }
    }
}

export const TableCustopScrollOptions = (offsetHeight,offsetWidth)=> {
    let customOpts = {
        headerTop : offsetHeight,
        mainTableWidth : offsetWidth,
    }
    return customOpts
}
export const ConvertNullToString = ()=>{
    return ''
}

export const sortArrayListByKey = (array, key)=> {
    return array.sort(function(a, b) {
        let x = a[key];
        let y = b[key];

        if (typeof x == "string"){
            x = x.toLowerCase(); 
        }
        if (typeof y == "string"){
            y = y.toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
export const getDomain = () => {
    let domainObj = {domainName : window.location.hostname.split('.')[0]}
    return domainObj;
}
export const fileSizeFormat = (bytes,sizePrecision=2) =>{
    if(bytes >= 1073741824){ 
        bytes = (bytes / 1073741824).toFixed(sizePrecision) + " GB"; 
    }else if(bytes >= 1048576){ 
        bytes = (bytes / 1048576).toFixed(sizePrecision) + " MB"; 
    }else if(bytes >= 1024){ 
        bytes = (bytes / 1024).toFixed(sizePrecision) + " KB"; 
    }else if(bytes > 1){ 
        bytes = bytes + " bytes"; 
    }else if(bytes == 1){ 
        bytes = bytes + " byte"; 
    }else{ 
        bytes = "0 bytes"; 
    }
  return bytes;
}
export const smartNumber = (columnValue,precision) => {
    // Math.sign() returns 1, -1, 0 if the argument is a positive , negative or zero, respectively
    //storing the sign of columnValue and then taking its absolute value, then we call the function
    //later we attach the signVal back to the columnValue
   let signVal = Math.sign(columnValue);
   columnValue = Math.abs(columnValue);
   columnValue = NumberFormater(amountFormaterPrecisionValue(columnValue,precision))
   columnValue = (signVal===1||signVal===0)? columnValue : "-" + columnValue;
   return columnValue;

}

export const ConvertTo24Hour = time => {
    let getTime = time.toUpperCase();
    let hours = parseInt(getTime.substr(0, 2));
    if(getTime.indexOf('AM') != -1 && hours == 12) {
        getTime = getTime.replace('12', '0');
    }
    if(getTime.indexOf('PM')  != -1 && hours < 12) {
        getTime = getTime.replace(hours, (hours + 12));
    }
    return getTime.replace(/(AM|PM)/, '');
}
export const ConvertTo12Hour = time => {
    let getTime = time;
    let getHH = getTime.split(':')[0];
    let H
    let h
    if (getHH < 10) {
        //H = +getTime.substr(0, 1);
        H = '0'+getHH
        h = H
    }else {
        H = +getTime.substr(0, 2);
        h = (H % 12) || 12;
    }
    
    let ampm = H < 12 ? "AM" : "PM";
    let checkColonSymbol = getTime && getTime.substr(2, 2)
    checkColonSymbol = checkColonSymbol && checkColonSymbol.split(':') && checkColonSymbol.split(':')

    if ( (ampm == 'AM') && (checkColonSymbol.length <= 1) ) {
        getTime = h + ":"+ getTime.substr(2, 2) +' '+ ampm;
    }else{
        getTime = h + getTime.substr(2, 3) +' '+ ampm;
    }    
    return getTime
}

export const ConvertDayToFullDate = day =>{
    let finalDate
    let today = new Date()

    let getYear = today.getFullYear()
    let getMonth = today.getMonth()

    finalDate = getYear + '-' + '0' + (getMonth+1) + '-' + day

    return finalDate 
}
export const ConvertDateToDay = date =>{
    let finalDay
    let dateSplit = date && date.split('-')
    finalDay = dateSplit && dateSplit[2]
    return finalDay 

}

export const checkMonth = month => {
    let finalMonth
    if(month > 12){
        finalMonth = 1
    }else{
        finalMonth = month
    }
    if(finalMonth < 10){
        finalMonth = '0' + finalMonth
    }
    return finalMonth
}

export const DateCompressionForNextMonth = date =>{
    let finalDate
    let receivedDay = date.split('-')

    let today = new Date()

    let getYear = today.getFullYear()
    let getMonth = today.getMonth() + 1
    let getDay = today.getDate()
    if(getDay > receivedDay[2])
    {
        getMonth = getMonth + 1
    }else
    {
        getMonth = getMonth
    }
    finalDate = (getMonth>12 ? (getYear + 1 ) : getYear) + '-' + checkMonth(getMonth) + '-' + receivedDay[2]

    return finalDate 
}

export const IsMobileCheck = () => {
    let check = false; 
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check
}
export const DomainNameValidator = (domainUrl) =>{
    let domainList = commonConst.DOMAIN_LIST
    let hostName = window.location.host.split('.')
    let getDomainName = domainUrl ? domainUrl : hostName[1]+'.'+hostName[2]
    let domainData = domainList.find(obj=> obj.value == getDomainName)
    return getDomainName == (domainData && domainData.value) ? domainData :false
}

export const MultiSelectFormater = (dataObj,paramArray, getArrayOfValues, optionData, avoidAllSelectedValue, excludeLength, excludeEnable) =>{
    let optionDataLength = optionData && optionData.length
    let returnArray=[]
    let selectedValuesArr = []
    returnArray=Object.values(dataObj||{}).map((obj)=>{
        let tempObj={}
        paramArray && paramArray.map((val)=>{
            tempObj[val]=obj[val]
            
            if(getArrayOfValues){
                selectedValuesArr.push(obj[val])
            }
        })
        return tempObj;
    }) 
    returnArray = getArrayOfValues ? selectedValuesArr : returnArray
    if((optionDataLength == (returnArray && returnArray.length)) && avoidAllSelectedValue){
        returnArray = []
    }
    //for exclude option (this if only) : exicute this when given exclude length are greater than selected option
    if(excludeEnable && (returnArray.length > excludeLength )){
        returnArray = optionData && optionData.filter(obj => !returnArray.includes(obj[paramArray[0]])).map(elm => elm[paramArray[0]])
        returnArray.push(`${paramArray[0]}ExcludeEnable`)
    }
    return (returnArray.length>0) ? returnArray: null    
}


export const ConvertNumberToWords = (num, maxLimit) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if(isNaN(num)){
        return
    }
    if ((typeof num) == 'number') {
        num = JSON.stringify(num)
    }
    num = num && num.split('.')[0]
    let result = '';
    if (num > maxLimit) {
        return `Value can not be more than ${ConvertNumberToWords(maxLimit)}`
    }
    if (num < 10) {
        result = units[num];
    } else if (num < 20) {
        result = teens[num - 10];
    } else if (num < 100) {
        result = tens[Math.floor(num / 10)] + ' ' + ConvertNumberToWords(num % 10);
    } else if (num < 1000) {
        result = units[Math.floor(num / 100)] + ' Hundred ' + ConvertNumberToWords(num % 100);
    } else if (num < 100000) {
        result = ConvertNumberToWords(Math.floor(num / 1000)) + ' Thousand ' + ConvertNumberToWords(num % 1000);
    } else if (num < 10000000) {
        result = ConvertNumberToWords(Math.floor(num / 100000)) + ' Lakh ' + ConvertNumberToWords(num % 100000);
    } else if (num <= 10000000000) {
        result = ConvertNumberToWords(Math.floor(num / 10000000)) + ' Crore ' + ConvertNumberToWords(num % 10000000);
    } else {
        return 'Value can not be more than One Thousand Crore.'
    }
    return result;
}

export const DateRangeBetweenTwoDates = (endDate, fromDate, diffOpt) => {
    let range = endDate.diff(fromDate, diffOpt, true)
    range = Math.floor(range)
    return range
}


export const GetQueryParamFromURL = (keyToSplit)=> {
    let location = window.location.href.split(keyToSplit || '?')
    let queryParam = (location &&location.length > 1) ? location[1] : null
    if (!queryParam) return
    let seperateQuery = queryParam && queryParam.split('&')
    let customObj = {}
    seperateQuery && seperateQuery.map(elm => {
      let paramPairs = elm.split('=')
      customObj[paramPairs[0]] = paramPairs[1]
    })
    return customObj
}

export const CheckImageExists =(imageUrl,callBack)=>{
        var imageData= new Image();
        imageData.src=imageUrl;
        imageData.onload=function(){
          callBack(true);
        }
        imageData.onerror=function(){
          callBack(false);
        }
       
}

export const getWindowScreen = (screenValue) => {
    let getScreenValue = screenValue ? screenValue : 736
	let onMobileScreen = false
	if(window.innerWidth >= getScreenValue){
			onMobileScreen = false
	}else{
		onMobileScreen = true
	}
	return onMobileScreen

}

export const dependencyCheck = (obj,stringOfKeys,returnBoolean) => {
    if(!obj || !Object.keys(obj).length || !stringOfKeys){
        return null
    }
	let currentKeyValue =  stringOfKeys.split('.').reduce((prev,curr)=>{
        return prev && prev[curr] !== 'undefined' ? prev[curr] : null
    }, obj);
    if(returnBoolean)
    currentKeyValue = currentKeyValue ? true : false
    return currentKeyValue
}

export const filterOutViewType = (arrayOfViewType,permission) => {
    return arrayOfViewType && arrayOfViewType.filter(obj => (permission && permission[obj.method] === 1 || !obj.method));  
}

export const encryptExportXls = (fetureNo) => {
    let encryptExportXls = EncryptData(`{"featureTag":"${fetureNo}", "method":"export"}`)
    return encryptExportXls
}

export const duplicateBankCheck = (banks, newBank, keys) => {
    return banks && banks.find(obj => (keys.every(key => obj[key] == newBank[key])));
}

export const otpMobileFormat = (mobileNumber , index = 0) => `XXXXXX${mobileNumber ? mobileNumber.slice(index) : ''}`

export const isMobileOrTab = () => {
    let isMobileOrTab = false
    const UA = navigator.userAgent
    const isSafari = /^((?!chrome|android).)*safari/i.test(UA)
    if (isSafari) { return true }

    isMobileOrTab = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);

    if (isMobileOrTab || (window.innerWidth <= 1210 && window.innerHeight <= 840)) { // fallback based on screen height and screen width
        isMobileOrTab = true
    }
    return isMobileOrTab
}

export const checkFilesPermissions = (user) => {
    if (!user)
        return false

    const { loginSource, userType, isAllowXLS, levelNo } = user

    if (loginSource && loginSource.userType == 'admin')
        return false

    switch (userType) {
        case 'broker':
            if (isAllowXLS == 1 || (isAllowXLS == 0 && levelNo == 1)) {
                return true
            } else {
                return false
            }
        case 'client':
            return true
    }
}
export const getAdditionalKeyBasedOnUser = (loggedInUser, validUser) => {
    let tempObj = {}
    const { userType } = loggedInUser || {}
    if ((userType == validUser)) {
        tempObj = { deciderKeyForAppend: 'isOutsideData', appendAfterValue: '*' }
    }
    return tempObj
}
export const checkArrayValue = (arrayObj, index, key, objKey = 'value') => {
    if (!index) {
        return; // Return undefined if index is not provided
    } else {
        // Using .some() to check if any of the specified indices contain the key
        return index.some(obj => [arrayObj[obj][objKey]].includes(key));
    }
};
export const riskMeterValue = (value, noOflevels) => {
    const oneLevel = 100 / noOflevels
    value = (value > noOflevels) ? noOflevels : value
    return (value * oneLevel - oneLevel / 2) / 100
}
export const schemeTypeComputation = (schemeType, defaultValue) => {
    const schemeTypeData = schemeType ? schemeType.data : ''
    let schemeList = []
    if (schemeTypeData && schemeTypeData.length) {
        schemeList = schemeTypeData.map((schemes, index) => ({
            label: capitalizeFirstLetter(schemes.dividendFrequency), value: index
        }))
    }
    return schemeList
}

export const maskUserData = (data, type, isMaskingOn) => {
    if ((!isMaskingOn) ||(!type) || (!data) || !['string','number'].includes(typeof data)) {
        return data
    }
    data = String(data)
    switch (type) {
        case 'name':
        case 'iin':
            data = `${data.substring(0, 1)}xxxx`
            break;
        case 'folio':
            data = data=='NEW' ? 'New': `xxxxx${data.slice(5)}`
            break;
        case 'pan':
            data = `${data.substring(0, 1)}xxxxxxxxx`
            break;
        case 'email':
            const emailParts = data.split('@')
            data = emailParts.length>0 ?`xxxxxx@${emailParts[1]}` : null
        break;
        case 'bank':
            data = `xxxxxx`
            break;
        case 'branch':
            data = 'xxxx'
            break;
        case 'nameWithFolio':
            const schemeNameWithFolio = data.split('/')
            if (schemeNameWithFolio.length > 1) {
                const schemeNamePart = schemeNameWithFolio[0].trim()
                const folioPart = schemeNameWithFolio[1].trim()
                const maskedFolio = `xxxxx${folioPart.slice(folioPart.length - 5)}`
                data = `${schemeNamePart} / ${maskedFolio}`
            }
            break;
        case 'folioWithScheme':
            const folioWithScheme = data.split('/')
            if (folioWithScheme.length > 1) {
                const folioPart = folioWithScheme[0].trim()
                const schemeNamePart = folioWithScheme[1].trim()
                const maskedFolio = `xxxxx${folioPart.slice(folioPart.length - 5)}`
                data = `${maskedFolio} /${schemeNamePart} `
            }
            break;
        case 'clientCode':
            data = `${data.substring(0, 2)}xxxxx`;
            break;
        case 'folioInSchemeName':
            const folioPart = data.match( /\((\d+\/?\d*)\)/ )
            if (!folioPart) return data
            const folioDetails = folioPart[1]
            data  =  data.replace(`(${folioDetails})`, `(xxxxx${folioDetails.slice(5)})`);
            break;
        case 'mobile':
        case 'address':
        case 'accNo':
        case 'ifsc':
            data = `xxxxxxxxxxx`
            break;
    }
    return data
}
export const nameAndPanStatus = (generateKYCinfo,isMaskingOn) => {
    const kycStatus = generateKYCinfo.map((obj,index) => {
        if(obj.name){
            return <Fragment key={index}><li>
                <span class="labelTxt">{obj.holderInfoObj.name}</span>
                <span class="txt">{maskUserData(obj.name , 'name' , isMaskingOn)}</span>
            </li>
            <li>
                <span class="labelTxt">{obj.holderInfoObj.status}</span>
                <span class="txt">{obj.kycMessage}</span>
        </li></Fragment>
        }
    })
    return kycStatus
}
export const applicationKycType = (panData) => {
    const { kycRequired, appStatus, ServiceMSG } = panData  || {}
    return (kycRequired == 'Yes' || ServiceMSG == 'KYC Validated') ? appStatus : ''
}
export const getFinancialStartEndYear = (date) => {
    const fromDateYear = moment(date, UTIL.dateFormat).year()
    const fromMonth = moment(date, UTIL.dateFormat).month() + 1
    let increaseInStartYear=0,increaseInEndYear=0
    if(fromMonth>=4){
         increaseInEndYear=1
    } else{
         increaseInStartYear=-1
    }
    const dateAfterFyStarts = `${fromDateYear+increaseInStartYear}-03-31`
    const dateBeforeFyEnds = `${fromDateYear+increaseInEndYear}-04-01`
    return {dateAfterFyStarts,dateBeforeFyEnds}
}

//logic for frontend pagination
export const paginationDataFunction = (params, arr) => {    
    const data = arr && (Array.isArray(arr) ? arr : arr.data)
    return data && data.slice(params.pageSize * params.currentPage - params.pageSize, params.pageSize * params.currentPage)
}
// sorting the complete data
export const frontendSortingFun = (sortingInfo, headingNumber = 0, allTableData, tableCustomData,loaderAction,dispatch) => {
    let tableData = allTableData && allTableData.data || [];
    let col = tableCustomData && tableCustomData[headingNumber] && tableCustomData[headingNumber].value;

    if (!(tableCustomData && tableCustomData[headingNumber] && tableCustomData[headingNumber].withoutSorting)) {
        tableData = tableData.sort(function (a, b) {
            if (a === null) return -sortingInfo.state;
            if (b === null) return sortingInfo.state;
            if (a[col] && b[col] && typeof a[col] == 'string' && typeof b[col] == 'string') {
                if (a[col].toLowerCase() > b[col].toLowerCase())
                    return sortingInfo.state;
                return -sortingInfo.state;
            }
            if (a[col] > b[col])
                return sortingInfo.state;
            return -sortingInfo.state;
        })
    }

    dispatch({ type: loaderAction, payload: { ...allTableData, data: tableData } });
}
//function to avoid some repeatability in frontend pagination
export const frontendPaginanationFunction = (data, newProps={}, props={},str) => {
    let paginationData = {}
    let mainData = data || {};
    mainData.currentPage = str ? mainData.currentPage : newProps.feParams && newProps.feParams.currentPage || 1
    mainData.totalNoRows = mainData && mainData.data && mainData.data.length
    mainData.pageSize = props.pageSize || 20
    mainData.noOfPages = Math.ceil(mainData.totalNoRows / mainData.pageSize)
    paginationData.currentPage = parseInt(mainData.currentPage);
    paginationData.noOfPage = parseInt(mainData.noOfPages);
    paginationData.totalNoRows = parseInt(mainData.totalNoRows);
    paginationData.pageSize = parseInt(mainData.pageSize);
    return [paginationData, mainData]
}
export const hexToRgba = (hex, opacity) => {
    let c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')'
    }
}
