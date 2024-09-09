import React from 'react'
import {connect} from 'react-redux';
import SearchFilter from "../customSelect/searchFilterCnt"
import DatePickerWrap from '../datePicker';
import SearchField from '../searchField'


let SearchInTable = (props) =>{
		let objValue = ( (props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.customKeyNameForApi) || (props.completeObject.value) )
		let customPlaceHolder = ( (props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.customPlaceHolder) || (props.completeObject.key) )
		let functionToSearchData = props.completeObject.isSearchInTable.functionToSearchData
		let dropDownList = props.completeObject.isSearchInTable.options && props.completeObject.isSearchInTable.options.list
		let labelName = props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.options && props.completeObject.isSearchInTable.options.labelName
		let labelValue = props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.options &&props.completeObject.isSearchInTable.options.labelValue
		let isSearchEnable = props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.isSearchEnable
		let onChangeFunction = props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.onChangeFunction
		let removeSearchField = props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.removeSearchField
		let closeSearchFilter = props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.closeSearchFilter
		let isOpen= props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.isOpen
		
return (
	<div class="posRelative">
		{props.completeObject && props.completeObject.isSearchInTable && <div class="">
			
	        {props.completeObject.isSearchInTable.searchType == 'text' && 
				<SearchField
	              placeholder ={customPlaceHolder}
	              customClass = 'left posRelative inputFld fullSize'
	              onEnterFunction = { (e,obj) => functionToSearchData(e,objValue) }
	              defaultValue = {props.completeObject && props.completeObject.searchedValue}
	              autoFocus = {true}
	              id = {props.completeObject.value}
				  type= 'search'
	            />
			}

			{props.completeObject.isSearchInTable.searchType == 'select' && <div class={` filter-section selectBox `}>
				<SearchFilter placeholder="Select Filter"
		            title="Select Filter"
		            inputclass="input-group-field selector inputgrp" 
		            selectedOpt={props.completeObject && props.completeObject.searchedValue}
		            onOptionSelection={ (obj,keyName) => functionToSearchData(obj,objValue) }
		            options={dropDownList}
		            isOpen = {(props.completeObject && props.completeObject.addFiltersToSearch || isOpen==false)? false :true}
		            parentClass = "txnFilter posRelative showFrstChild"
		            labelName = {labelName}
		            labelValue = {labelValue}
		            isSearchEnable = {isSearchEnable}
		            onChangeFunction = {onChangeFunction}
		            removeSearchField={removeSearchField}
		            closeSearchFilter={closeSearchFilter}
		            formFieldId={props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.formFieldId}
					showAsSearchField={props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.showAsSearchField}
					hideFocus = {props.completeObject && props.completeObject.isSearchInTable && props.completeObject.isSearchInTable.hideFocus}
		            >
		          </SearchFilter>
			</div>}

			{props.completeObject.isSearchInTable.searchType == 'date' && 
				<div class="inputCols singleDateFld custom-calendar">
                    <div class="react-datepicker-wrapper">
                        <div class="react-datepicker__input-container">
                            <DatePickerWrap innerDivClass="custom-calendar"
				  				maxDate={props.completeObject.isSearchInTable.maxDate}
				  				minDate={props.completeObject.isSearchInTable.minDate}
				  				selectedDate = {props.selectedDate}
                                peekNextMonth = {true}
                                showMonthDropdown = {true}
                                showYearDropdown = {true}
                                selectStart = {true}
				  				ref = {props.inputRef}
                                onDateSelection = { (e,obj) => functionToSearchData(e,objValue) }
                            />        
                        </div>
                    </div>
                </div>}
		</div>}
	</div>)
}




const mapStateToProp = (state) =>{
	return {}
}
 const mapDispatchToProp = (dispatch) => {
 	return {dispatch:dispatch}
 }

export default connect(mapStateToProp,mapDispatchToProp)(SearchInTable);