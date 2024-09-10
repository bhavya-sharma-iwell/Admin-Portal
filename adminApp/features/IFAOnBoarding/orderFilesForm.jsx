// import React from 'react'
// import {connect} from 'react-redux'
// import {Field, reduxForm, formValueSelector} from 'redux-form'
// import SearchFilter from "app/uiCollection/shared/customSelect/searchFilterCnt"
// import {FieldComponentOfForm,GeneralField} from 'app/uiCollection/shared/form/formField'
// import DatePickerWrap from 'app/uiCollection/shared/datePicker';
// import moment from 'moment'
// import * as Validation from 'app/uiCollection/shared/form/validation'
// import { REGISTRAR } from 'app/constants/dashboardConst'
// import {ValidCheckboxKARVY,ValidCheckBoxCAMS} from 'app/actions/admin/report/oneViewReport.jsx'
// import CretateElementsOfRadioBtns from 'app/uiCollection/shared/filterContent/createRadioButtonsForFilters'
// import { FILE_TYPE } from 'app/constants/admin/adminDashboardConst'
// import Loader from 'app/uiCollection/shared/loaders'


// let tableHeading = (props)=>{
//     let heading = props.taskListData&&props.taskListData.data&&props.taskListData.data.map((position,index)=>{
//         return (<th><span>{position.taskName}</span></th>)
//     })
//     return heading
// }
// let createCheckbox = (props,headPosition)=>{
//     let checkbox = props.taskListData&&props.taskListData.data&&props.taskListData.data.map((position,index)=>{
//         return(  
//              <td class={`${(
//                 ((ValidCheckBoxCAMS(position.taskid))&& headPosition.value =="C") || ((ValidCheckboxKARVY(position.taskid))&& headPosition.value == "K") )?'':'removeDisabled'}`}>
//                 <Field
//                       name ={headPosition.label + ' ' +position.taskName}
//                       type="checkbox"
//                       component={FieldComponentOfForm}
//                       value = {position.taskid}
//                       id = {position.taskid}
//                       onClickFun = {()=>props.onClickFun(headPosition.value,position.taskid)}
//                     />
//                   </td>
//         )
//     })
//     return checkbox
// }

// let tableRows = (props)=>{
//     let rows = REGISTRAR.map((obj,index)=>{
//         return (
//             <tr metatitle = 'adminIfaOrderfileCheckbox'>
//                 <td>{obj.label}</td>
//                 {createCheckbox(props,obj)}
//             </tr>)
//     })
//     return rows
// }

// let OrderFilesForm = props =>{
//     const { handleSubmit, initialValues} = props;
//     return(
//         <div class="table-cnt ">
//             <form onSubmit={(e) => props.handleSubmit(e)}>
//             <div class="formSec formRows colsSec colSpan3">
//                     <div class="btnsContainer fl pTop12">
//                       <button type="button" onClick={(e)=>props.sinceFn(e)} metatitle = 'adminIfaOrderfileInception'>Since Inception</button>
//                     </div>
//                     <div class="inputCols singleDateFld" metatitle = 'adminIfaOrderfileStartDate'>
                    
//                         <Field innerDivClass="custom-calendar alignToLeft"
//                                label = 'From Date :'
//                                type="date"
//                                peekNextMonth = {true}
//                                showMonthDropdown = {true}
//                                showYearDropdown = {true}
//                                selectStart = {true}
//                                startDate={props.startDate}
//                                selectedDate={props.startDate}
//                                //minDate={moment( 2015+'-'+1+'-'+1 + ' 00:00:00' )}
//                                maxDate={moment()}
//                                onDateSelection ={(startDate) => props.onDateChange(startDate, 'startDate')}
//                                validate={[Validation.required]}
//                                name="reqFromDate"
//                                component={GeneralField}
//                            />
//                       </div>
//                       <div class="inputCols singleDateFld" metatitle = 'adminIfaOrderfileEndDate'>
//                           <Field innerDivClass="custom-calendar"
//                                label = 'Today Date :'
//                                type="date"
//                                peekNextMonth = {true}
//                                showMonthDropdown = {true}
//                                showYearDropdown = {true}
//                                selectsEnd = {true}
//                                startDate={props.startDate}
//                                endDate={props.endDate}
//                                minDate={moment(props.startDate)}
//                                maxDate={moment()}
//                                selectedDate={props.endDate}
//                                onDateSelection ={(endDate) => props.onDateChange(endDate, 'endDate')}
//                                validate={[Validation.required]}
//                                name="reqToDate"
//                                component={GeneralField}
//                            />
//                     </div>
//                     <div class="inputCols tabsContentBox noPadding" metatitle = 'adminIfaOrderfileType'>
//                         <div class="inputFld">
//                             <div class="listing">
//                                 <label class="label">File Type :</label>
//                                 <CretateElementsOfRadioBtns
//                                     buttonsList={FILE_TYPE}
//                                     onSectionRadioButton={obj => props.onFileTypeSelection(obj, 'selectedFileType')}
//                                     buttonName="selectedFileType"
//                                     selectedRadioBtn={props.selectedFileType}
//                                     customPadding={true}
//                                 />
//                             </div>
//                         </div>
//                     </div>  
//                 </div>  
//                 <div class="formRows tableWithActionFld pTop20 posRelative">
//                     {props.loaderReport &&
//                            <Loader
//                                loaderType = 'tableLoader'
//                                loaderColumns = { tableHeading(props).length }
//                                loaderRows = {tableRows(props).length}
//                            />
//                        } 
//                     <div class="customScrollBar customTableScrollAuto">
//                         <table class="tableBox options" cellpadding="0" cellspacing="0">
//                             <thead>
//                                 <tr>
//                                     <th><span>RTA</span></th>
//                                     {tableHeading(props)}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {tableRows(props)}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//                 <div class="filter-section showInOneLine">
//                     {props.camsDropdown && <SearchFilter placeholder='Select'
//                         customTitle="CAMS AMC "
//                         inputClass='input-group-field selector inputgrp'
//                         customParentClass="mTopNone"
//                         selectedOpt={props.selectedCamsAMC}
//                         onOptionSelection={(obj) => props.onOptionSelectionAMCList(obj, 'selectedCamsAMC')}
//                         options={props.fundsDataListCams }
//                         isSearchEnable={true}
//                         isDefaultAllSelected={true}
//                         valueName="fundid"
//                         labelName="fundName"
//                         isMultipleSelect={true}
//                         isCheckboxFixed={true}
//                         metatitle = 'adminIfaOrderfileSearchCams'
//                     />}
//                     {props.karvyDropdown && <SearchFilter placeholder='Select'
//                         customTitle="KARVY AMC "
//                         inputClass='input-group-field selector inputgrp'
//                         customParentClass="mTopNone"
//                         selectedOpt={props.selectedKarvyAMC}
//                         onOptionSelection={(obj) => props.onOptionSelectionAMCList(obj, 'selectedKarvyAMC')}
//                         options={props.fundsDataListKarvy }
//                         isMultipleSelect={true}
//                         isSearchEnable={true}
//                         isDefaultAllSelected={true}
//                         valueName="fundid"
//                         labelName="fundName"
//                         isCheckboxFixed={true}
//                         metatitle = 'adminIfaOrderfileSearchKarvy'
//                     />}
//                 </div>  
//                 <div class="btnsContainer">
//                     <button type="submit" metatitle = 'adminIfaOrderfileSubmit'>Submit</button>
//                     {props.isErrorMessage && <p class="errorMessage">{props.isErrorMessage}</p>}
//                 </div>
//             </form>
//         </div>
//     )
// }


// function mapStateToProps(state, props){
//     return {
//         loaderReport:state.reportAdmin && state.reportAdmin.loaderReport 
//     }
// }
// OrderFilesForm = reduxForm({form:'OrderFilesForm',enableReinitialize:true,})(OrderFilesForm)

// const selector = formValueSelector('OrderFilesForm');

// OrderFilesForm = connect(mapStateToProps)(OrderFilesForm)

// export default OrderFilesForm;