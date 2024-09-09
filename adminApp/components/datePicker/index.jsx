import React from 'react'
import {UTIL} from '../../constants'

import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css';

import { valid} from './datePickerFunctions'


export  const DatePickerWrap = props =>{
    var errorMessage= "";
    var typedDate;
    // var keyPress=true;
    // var putHiphen= false;
    var error = false;
   
    var minDate = props.minDate
    var maxDate = props.maxDate
    var startDate = props.startDate
    var endDate = props.endDate
    var selectedDate = props.selectedDate

    typedDate = props.selectedDate ? ( props.dateFormat ? props.selectedDate.format(props.dateFormat) : props.selectedDate.format("DD-MM-YYYY"))   : ""

    var inputProps = {  value : typedDate, 
                        onChange : (e)=>{ onDateTyping(e) } ,  
                        // onKeyDown : (e)=>{ onKeyDown(e) } , 
                        placeholder : props.dateFormat ? props.dateFormat : UTIL.frontDateFormat,
                        ref : props.inputDateRef,
                        readOnly: props.readOnly
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

    // const onDateType = (e)=>{
    //     let obj = onDateTyping(e,keyPress,inputProps,putHiphen); 
    //     inputProps.value = obj['dateValue']; 
    //     keyPress = obj['keyPress'] ;
    //     putHiphen = obj['putHiphen'] ;
    // }

    // const onKeyPress = (e) =>{
    //     let obj = onKeyDown(e,keyPress,putHiphen)
    //     keyPress = obj['keyPress'] ;
    //     putHiphen = obj['putHiphen'] ;
    // }

    function onDateChange(date,minDate,maxDate){
        props.customDateChange && props.customDateChange(date,minDate,maxDate)
        if( ( !minDate || date>=minDate ) && ( !maxDate || date<=maxDate ) ){
            typeof date == "object" && props.onDateSelection(date);
            error = false;
        }
        else{
            error = true ;
        }
        if( typeof date == "object" && props.ontypeValidate){
          props.ontypeValidate(error,date)
        }
    }

    var renderers = {   
        renderDay: function( props, currentDate, selectedDate ){
            let x;
            if( (startDate && currentDate>=startDate.startOf('day')) && (endDate && currentDate<=endDate) ){
                x = true;
            }
            return  <td {...props} class={ x ? (props.className + ' rdtActive') : props.className }>
                        <span >
                            { ( currentDate.date()/10<1 ? ("0" + currentDate.date()) : currentDate.date() ) }
                        </span>
                    </td>;
        }
    }

	return(
        <div metatitle = {props.metatitle ? props.metatitle : ''}>
            <Datetime 
                value={selectedDate}
                isValidDate={ (current)=>valid(current,minDate ,maxDate,props.hideWeekends,props.showCustomDaysOnly,props.selectedWeekDays) }
                timeFormat={false}
                dateFormat={props.dateFormat ? props.dateFormat : UTIL.frontDateFormat}
                onChange={ (date)=>{ onDateChange(date,minDate,maxDate) } }
                renderDay={ renderers.renderDay } 
                inputProps={ inputProps }
                closeOnSelect={true}
                { ...(props.calendarOpeningDate && { viewDate: props.calendarOpeningDate }) }
            /> 
        </div>
	)
}

export default  DatePickerWrap;