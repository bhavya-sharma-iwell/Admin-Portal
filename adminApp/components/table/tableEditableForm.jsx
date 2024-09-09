import React from 'react'
import {connect} from 'react-redux';
import { Field, reduxForm, formValueSelector,change} from 'redux-form'
import { GeneralField } from '../formField';

let EditableColumnField = (props) => {
const { handleSubmit,initialValues, type, validate} = props;
return (
<div class="editContainerArea">
	<form onSubmit={(e)=> handleSubmit(e)}>
		<div class="formRows">
    		{props.type == 'text' && 
				<Field component={GeneralField} 
				  type= {props.type}
				  name={props.name}
				  // placeholder = {props.placeholder}
				  title = {props.title}
				  validate={props.validator}
				  ref = { props.inputRef}
				  autoComplete = 'off'
				/>}

				{props.type == 'select' && <div class={` filter-section selectBox `}>
				<Field component={GeneralField} 
				  type= {props.type}
				  name={props.name}
				  placeholder = {props.placeholder}
				  title = {props.title}
              	  parentClass="showFrstChild"
				  validate={props.validator}
				  options = {props.options}
				  selectedOpt={props.selectedOpt}
				  labelName = {props.labelName}
				  labelValue = {props.labelValue}
				  onSelectSearch = {(e)=>props.onChange(e)}
                  onOptionSelection ={(obj)=>{props.dispatch(change('EditableColumnField',props.name, obj[props.labelValue]));props.onClickAction(obj) }}
				  ref = {props.inputRef}
				  isSearchEnable = {props.isSearchEnable}
				/>
			</div>}

				{props.type == 'date' && 
				<div class="inputCols singleDateFld">
                    <div class="react-datepicker-wrapper">
                        <div class="react-datepicker__input-container">
                            <Field innerDivClass="custom-calendar"
                            	component={GeneralField}
                                type= {props.type}
				  				name={props.name}

				  				maxDate={props.maxDate}
				  				minDate={props.minDate}
				  				selectedDate = {props.selectedDate}

				  				validate={props.validator}

                                peekNextMonth = {true}
                                showMonthDropdown = {true}
                                showYearDropdown = {true}
                                selectStart = {true}
				  				ref = {props.inputRef}
                                onDateSelection = {(e) => props.onClickAction(e)}
                                closeOnSelect = {props.closeOnSelect}
                            >        
                            </Field>
                        </div>
                    </div>
                </div>}
				
			</div>
			<div class="actionArea">
				<button type="button" onClick = {() => props.cancel()} class="submitbtns cancel" >cancel</button>
				<button type="submit" class="submitbtns submit" >submit</button>
			</div>
	</form>
</div>
)

}



const mapStateToprops = (state,props)=>{
    return {
      initialValues: props.selectedRow
    }
}

let MyForm = reduxForm({form:'EditableColumnField',enableReinitialize:true,keepDirtyOnReinitialize: true})(EditableColumnField)
export default connect(mapStateToprops)(MyForm)