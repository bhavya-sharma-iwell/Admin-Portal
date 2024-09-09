import React , {useState} from 'react'
import SearchFilter from "./customSelect/searchFilterCnt"

import moment from 'moment'
import {UTIL} from '../constants'

import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css';
import {ConvertNumberToWords} from '../utils/dataFormater'
import {NumberOnlyTypeText} from '../validators/numberOnlyFormat'


import { valid } from './datePicker/datePickerFunctions'



export const FormFieldComponent = (props) => {

  const {input, value, className, isActive, handleChange, type, placeholder, children, readonly, maxlength, max, min, imageSrc, classNameIcon,label, meta: {touched, error}, showHidePass, checked, defaultChecked, resetDefault,requiredFlag} = props;

    //let dataDemo = ConvertNumberToWords()

    let customMobileValidation = {}
    if(props.prefix){
    	customMobileValidation = {
    		onKeyPress : (e) => NumberOnlyTypeText(e)
    	}
    }

  return (
    <div class={`formRows ${props.customClass ? 'removeBtmPadding' : ''}`}>
      <div class={"inputField "+(((touched && error  || props.customErrorCase)&&'errorFld ')+ (input.value&&' holdPlaceholder'))}>
        {isActive &&<span class={"showPass " + isActive} onClick= {()=> showHidePass()}></span>}
        <input {...input} maxLength={maxlength} class={className} 
        type={type} placeholder={placeholder} 
        disabled={readonly}
        {...customMobileValidation}
        autoComplete={props.autoComplete || 'off' }
        metatitle= {props.metatitle ? props.metatitle : ''}
        />
        <span class="boderEft"></span>
        <span class={`placeholder ${props.prefix? 'withPrefix': ''}`}>{label}</span>
        <span class="prefix ">{props.prefix}</span>
        { touched && (error && <span class= 'error'>{error}</span>)}
      </div> 
    </div>
  )
}


export const defaultFields = (props) =>{
  const [passwordType, setPasswordType] = useState(props.type)
  const showHidePassword = ()=>{
    if(passwordType == 'password'){
      setPasswordType('text')
    }else{
      setPasswordType('password')
    }
}
    // Functions for DatePicker
    var keyPress=true;
    var putHiphen = false;
    var typedDate = props.input.value
    if( typedDate instanceof moment) { typedDate = props.dateFormat ? typedDate.format(props.dateFormat) : typedDate.format("DD-MM-YYYY") } 
    var inputProps = { placeholder : props.dateFormat ? props.dateFormat : UTIL.frontDateFormat,
                       disabled: props.disable , 
                       autoComplete : props.autoComplete ,
                       readOnly : props.readOnly ,
                       onChange : (e)=>{onDateTyping(e)}, 
                       // onKeyDown : (e)=>onKeyPress(e),
                       value : typedDate
                    } 

    const onDateChange = (date, minDate, maxDate)=>{
      props.customDateChange && props.customDateChange(date)
        if( date instanceof moment && ( !minDate || date>=minDate ) && ( !maxDate || date<=maxDate ) ){
            let dateValue = props.dateFormat ? date.format(props.dateFormat) : date.format("DD-MM-YYYY")
            props.onDateSelection(date);
            props.input.onChange(dateValue);  
        }
    }
    const onDateTyping  = (e)=>{
      if(e.target.value.length<=10){
          if(  (e.target.value.length>=inputProps.value.length) && (e.target.value.length==2 || ( !props.dateFormat && (e.target.value.length==5))) ){
                  inputProps.value = e.target.value + "-"
          }
          else{
               inputProps.value = e.target.value
          }
      }
    }

    // const onKeyPress = (e) =>{
    //     let obj = onKeyDown(e,keyPress,putHiphen)
    //     keyPress = obj['keyPress'] ;
    //     putHiphen = obj['putHiphen'] ;
    // }
 
    const renderDay=( props, currentDate, selectedDate,startDate,endDate )=>{
        let flag;
        if( (startDate && currentDate>=startDate.startOf('day')) && (endDate && currentDate<=endDate) ){
            flag = true;
        }
        return  <td {...props} class={ flag ? (props.className + ' rdtActive') : props.className } >
                    <span >
                        { ( currentDate.date()/10<1 ? "0" : "" ) + currentDate.date() }
                    </span>
                </td>;
    }

    const onBlur = (date,minDate,maxDate) =>{
      if(  date && (!minDate ||moment(date,UTIL.frontDateFormat)>=minDate) && (!maxDate ||moment(date,UTIL.frontDateFormat)<=maxDate)  ){
        props.input.onBlur(date)
      }
      else{
        props.input.onBlur(null)
      }
    }

    /* --------------------------------------------------------------- */

  return (
   <div class={props.innerDivClass} title={props.showTitle}>
      {props.type == 'text' && !props.customTextField &&
        (props.prefix ? (<div class='posRelative'>
          <input {...props.input} maxLength={props.maxlength} ref={props.inputRef} class={props.className} type={props.type} placeholder={props.placeholder} disabled={props.readonly} autoFocus={props.autoFocus} autoComplete={props.autoComplete}/>
          <span class="prefix">{props.prefix}</span>
        </div>) : (<input {...props.input} maxLength={props.maxlength} ref={props.inputRef} class={props.className} type={props.type} placeholder={props.placeholder} disabled={props.readonly} autoFocus={props.autoFocus} autoComplete={props.autoComplete} metatitle={props.metatitle ? props.metatitle : ''}/>)
      )}

      {props.type == 'text' && props.customTextField && 
      <div class = {props.innerClass}>
        <div class = {`${props.firstInputclassName}`}>{props.firstInputValue}</div>
        <input {...props.input} maxLength={props.maxlength} ref={props.inputRef} class={props.secondInputclassName} type={props.type} placeholder={props.placeholder} disabled={props.readonly} autoFocus={props.autoFocus} autoComplete={props.autoComplete} metatitle={props.metatitle ? props.metatitle : ''} />
      </div>
      }

  { props.type == 'textarea' && 
    (<textarea {...props.input} maxLength={props.maxlength} ref= {props.inputRef} class={props.className} type={props.type} placeholder={props.placeholder}  disabled={props.readonly} autoFocus={props.autoFocus} rows = {props.height} metatitle={props.metatitle ? props.metatitle : ''}></textarea>)
  }

{ (props.type == 'number' || props.type == 'tel') && 
    (props.prefix ? (<div class='posRelative'>
      <input {...props.input} maxLength={props.maxlength} class={props.className} type={props.type} placeholder={props.placeholder}  disabled={props.readonly} autoFocus={props.autoFocus} max={props.max} min={props.min} autoComplete={props.autoComplete} step={props.step} metatitle={props.metatitle ? props.metatitle : ''}/>
        <span class="prefix">{props.prefix}</span>
      </div>) : (<input {...props.input} maxLength={props.maxlength} class={props.className} type={props.type} placeholder={props.placeholder}  disabled={props.readonly} autoFocus={props.autoFocus} max={props.max} min={props.min} autoComplete={props.autoComplete} step={props.step} metatitle={props.metatitle ? props.metatitle : ''}/>)
    )
  }
  { props.type == 'password' && 
    (<>
    {props.showHideStatus && <span class={`showHidePass ${passwordType == 'text' ? 'showPassword' : 'hidePassword' }`} onClick= {()=> showHidePassword()}></span>}
    <input {...props.input} class={props.className} type={passwordType} placeholder={props.placeholder} disabled={props.readonly} autoComplete={props.autoComplete} metatitle={props.metatitle ? props.metatitle : ''}/>
    </>)
  }
  { props.type == 'radio' && 
    (<label class = 'radioBtnPadding' for={props.labelId}><input {...props.input} class={props.className} type={props.type} name={props.radioButtonName} checked={props.checked} metatitle={props.metatitle ? props.metatitle : ''}/><span class ={`${props.shiftTopNotReqd ? '' : 'shftTop'}`}><span class = "radioDot"></span></span>{props.radioButtonLabelName}</label>)
  }
  { props.type == 'select' && 
  (
    <div class={props.selectBoxDivClass}>
        <SearchFilter placeholder={props.placeholder}
            title={props.title}
            inputclass= {props.inputclass}
            selectedOpt={props.selectedOpt}
            options={props.options}
            labelName={props.labelName}
            valueName={props.valueName}
            onOptionSelection={(obj)=>props.onOptionSelection(obj)}
            input = {props.input}
            isSearchEnable ={props.isSearchEnable}
            resetDefault = {props.resetDefault}
            customTitle = {props.customTitle}
            onSelectSearch = {props.onSelectSearch}
            onEnterPress = {(obj) => props.onEnterPress && props.onEnterPress(obj)}
            placeholderForInput = {props.placeholderForInput}
            keepDropDownOpenOnEnter = { props.keepDropDownOpenOnEnter}
            autoComplete={props.autoComplete}
            isOpen = {props.isOpen}
            showFirstListHead = {props.showFirstListHead}
            selectedfirstList = {props.selectedfirstList}
            selectFirstList = {(obj)=>props.selectFirstList(obj)}
            parentClass = {props.parentClass}
            formFieldId = {props.formFieldId}
            resetSearchField = {props.resetSearchField}
            removeSearchField={props.removeSearchField}
            showLoader={props.showLoader}
            allowEnteredValue={props.allowEnteredValue}
            customClass = {props.customClass}
            selectedOptMain = {props.selectedOptMain}
            optionClearFun = {(obj)=>props.optionClearFun(obj)}
            showAsSearchField={props.showAsSearchField}
            hideFocus={props.hideFocus}
            metatitle={props.metatitle}
            customError = {props.meta.error}
            isTouched = {props.meta.touched}
            isCustomSelectBoxError = {props.isCustomSelectBoxError}
            maskDataFlag = {props.maskDataFlag}
            maskingType = {props.maskingType}
           >
          </SearchFilter >
    </div>
  )
  }
  {

    props.type =="date" &&
    (
      <Datetime 
        input={props.input}
        renderDay={(prop, currentDate, selectedDate)=>renderDay(prop, currentDate, selectedDate,props.startDate,props.endDate)}
        timeFormat={false}
        dateFormat={props.dateFormat ? props.dateFormat : UTIL.frontDateFormat}
        onChange={(e)=>{ onDateChange(e, props.minDate ,props.maxDate ) }}
        closeOnSelect={!(props.closeOnSelect)}
        inputProps ={inputProps} 
        isValidDate={ (current)=>valid(current,props.minDate ,props.maxDate) }
        onBlur={e => {onBlur(inputProps.value,props.minDate, props.maxDate)}}
        value={props.input.value}
        ref = {props.dateFldRef}
        { ...(props.calendarOpeningDate && { viewDate: props.calendarOpeningDate }) }        
      />
    )
  }
  {props.labelTopShifted && <span class="shiftedLabel">{props.labelTopShifted}</span>}
  { props.type == 'checkbox' && 
    (<label><input {...props.input} class={props.className} id={props.id} type={props.type} onClick={props.onClickFun} defaultChecked = {props.defaultChecked} checked = {props.checked} metatitle={props.metatitle ? props.metatitle : ''}/><span>{props.checkBoxLabelName}</span></label>)
  }
  { props.meta.touched && (props.meta.error && !props.isCustomSelectBoxError && <div class={props.errMsgClass||'errorMsgFontSize errorMsg message'}>{props.meta.error}</div>)}

  </div>
)
}

export const GetNumberInWords = (props) => {
  let getValue = props.input && props.input.value
  let numberInWords
  if(props.isNumberInWords && getValue ){
    return numberInWords = ConvertNumberToWords(getValue, props.maxLimit)
  }
}

export const FieldComponentOfForm = (props) => {
  const { label,containerClass, meta: {touched, error}} = props

  let getFinalResult
  if(props.isNumberInWords){
    getFinalResult = GetNumberInWords(props)
  }

  return (
    <div class="inputFld"> 
        {defaultFields(props)}
        { touched && (error &&  <div class='errorMsgFontSize errorMsg message '>{error}</div>)}
        { !(!error && (props.requiredFlag)) && (props.isNumberInWords && getFinalResult) && <div class='errorMsgFontSize inputFld marginLeft message'>{getFinalResult}</div>}
    </div>
  )
}


export const GeneralField = props =>{ 
  const { label,containerClass, meta: {touched, error}} = props
  
  let getFinalResult
  if(props.isNumberInWords){
    getFinalResult = GetNumberInWords(props)
  }
  
  return (<div class={props.outerDivClass}>
              {props.showInputInfo && props.inputInfoMessage &&
                <div class="customTooltips withAbsolute withOverFlow">
                  <div class='toolTipsIcon'></div>
                  <span class="toolTipsOpts">
                    <span class=" addScroll customScrollBar">
                      {props.inputInfoMessage}                      
                    </span>
                  </span>
                </div>}
              {props.label && <label class={props.labelClass}>{props.label} {props.mandate &&<span class="mandate">*</span>} </label>}
              {defaultFields(props)}
              { !error && (props.requiredFlag) && <div class='errorMsgFontSize errorMsg message pTop '>Required</div>}
              { !(!error && (props.requiredFlag)) && (props.isNumberInWords && getFinalResult) && <div class='errorMsgFontSize inputFld marginLeft message'>{getFinalResult}</div>}
            </div>)

}


// For validation outside inner div class
export const NewFormField = props =>{ 
  const { label,containerClass, meta: {touched, error}} = props
  return (
    <div class={props.outerDivClass}>
        {props.label && <label class={props.labelClass}>{props.label} {props.mandate &&<span class="mandate">*</span>} </label>}
        {defaultFields( {...props, meta: {} } )}
        { props.meta.touched && (props.meta.error &&  <div class={props.errMsgClass||"messageInfo errorMsg"}>{props.meta.error}</div>)}
    </div>
  )
}

