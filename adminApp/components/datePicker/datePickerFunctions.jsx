// export const onDateTyping=(e,keyPress,inputProps,putHiphen)=> {
//     let dateValue = inputProps.value;
//     if( keyPress===true  && inputProps.value.length<=10 ){
//         keyPress=false;
//         dateValue = e.target.value
//         if(putHiphen===true){
//             dateValue = dateValue +"-"
//             putHiphen=false;
//         }   
//     }
//     return { dateValue, keyPress ,putHiphen };
// }
    
// export const onKeyDown=(e,keyPress,putHiphen)=>{
//     var key = e.which;
//     let date = e.target.value;
//     let numKey = false;

//     if( ( (key>=96&&key<=105) || (key>=48&&key<=57) ) && date.length<10 ){
//         numKey=true;
//         keyPress = true
//     }
//     else{
//         keyPress=false
//     }

//     if( (key==8||key==46) ||  ( (key === 109 || key ===189) && date.length<10  )  ){
//         keyPress =true
//     }

//     if( (date.length==1 || date.length==4) && numKey===true ){
//         putHiphen=true;
//     }
//     return { keyPress ,putHiphen };
// }

export const valid = ( current ,minDate ,maxDate, hideWeekends, showCustomDaysOnly , selectedWeekDays ) => {
    let val = true;
    if( (minDate&& current < minDate)  ||  (maxDate && current > maxDate) ){
        val = false;
    }

    if( hideWeekends && (current.day()==6 || current.day()==0) ){
    	val = false;
	}
	if( showCustomDaysOnly && !showCustomDaysOnly[current.date()] ){
	    val = false
	}
    if(selectedWeekDays && !selectedWeekDays.includes(current.day()+1)){
        val = false 
    }

    return val;
};
