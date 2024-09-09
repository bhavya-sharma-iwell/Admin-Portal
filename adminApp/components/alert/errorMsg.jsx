import React,{ Fragment } from 'react'

export default function AlertMsg(props){
	return(
      <div class={"alertMsg "+props.alertClass}>
        {!props.hideCrossBtn && <Fragment><span class="closebtn" onClick={props.closeBttn}>close</span>  
        <span>Oops.</span></Fragment>}
        {props.alertMessage || 'It seems like there was a problem.'}
      </div>
	)
}