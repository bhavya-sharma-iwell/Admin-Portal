// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {Field, reduxForm, formValueSelector, change} from 'redux-form'
// import {FieldComponentOfForm, GeneralField} from 'app/uiCollection/shared/form/formField'
// import * as formValidator from 'app/uiCollection/shared/form/validation'
// import Loader from 'app/uiCollection/shared/loaders'
// import * as commonConst from 'app/constants/shared/commonConst'

// let LevelInfoForm = (props) => {
//     const { handleSubmit, actionModeEnabled, addNewLevelInfo} = props;
    
//     const createLevelInfoList = paramData => {
//         let levelInfoList = paramData || []
//         let levelListRow
//         levelListRow = levelInfoList.map((obj, index) => {
//             let customObj = {...obj, selected : index}
//             return <li>
//                 <div class={`formRows colsSec colSpan3 ${actionModeEnabled ? 'removeDisabled' : ''}`}>
//                     <div class ="inputCols">
//                         <label>{obj.levelNo}</label>
//                     </div>
//                     <div class ="inputCols">
//                         <label>{obj.levelName}</label>
//                     </div>
//                     <div class ="inputCols btnsContainer smlFltrsBtns txtRight">
//                         <a href="javascript:void(0)" onClick= {(fldName, rowData) => props.actionApply('edit', customObj)} metatitle = {`adminIfaLevel${obj.levelName}Edit`}>Edit</a>
//                     </div>
//                 </div>
//                 {(actionModeEnabled && (props.initialLevelInfo && props.initialLevelInfo.selected == index)) && createLevelForm()}
//             </li>
//         })
//         return levelListRow
//     }
//     const createLevelForm = () => {
//         return (
//             <form onSubmit={(e) => props.handleSubmit(e)}>
//                 <div class='formRows colsSec colSpan3'>
//                     <Field component={GeneralField} type="select" 
//                         placeholder = 'Select Level No'
                        
//                         outerDivClass={`inputCols ${props.initialLevelInfo && props.initialLevelInfo.levelid ? 'removeDisabled' : ''}`}
//                         labelClass="label"
//                         innerDivClass="inputFld"
//                         selectBoxDivClass = "filter-section selectBox "
//                         name="levelNo"
//                         selectedOpt={props.selectedLevelNo}
//                         options={props.availableLevelNumbers} 
//                         customTitle="Level No"
//                         valueName="levelNo"
//                         labelName="levelNo"
//                         autoComplete = 'off'
//                         onOptionSelection ={(obj)=>{props.dispatch(change('LevelInfoForm','levelNo', obj['levelNo']));props.onOptionSelection(obj,'selectedLevelNo');}}
//                         metatitle = 'adminIfaLevelNumberEdit'
//                     />
//                     <div class="inputCols">
//                         <label class="label">Level Name </label>
//                         <Field
//                             name='levelName'
//                             type='text'
//                             maxlength = '25'
//                             labelClass="label"
//                             innerDivClass="inputFld"
//                             component={GeneralField}
//                             validate={[formValidator.required, formValidator.nameRegex]}
//                             autoComplete = 'off'
//                             metatitle = 'adminIfaLevelNameEdit'
//                         />
//                     </div>
//                     <div class ="inputCols btnsContainer smlFltrsBtns txtRight">
//                         <label class="label">&nbsp;</label>
//                         <button type="submit" metatitle = 'adminIfaLevelEditSave'>Save</button>
//                         <button type="button" class="cancel" onClick= {(fldName) => props.actionApply('cancel')} metatitle = 'adminIfaLevelEditCancel'>Cancel</button>
//                     </div>
//                 </div>
//             </form>
//         )
//     }

//     return(
        
//             <li class={` ${(props.openTab == 5 && 'openTabs') || (!props.activeAllFrm && 'removeDisabled') }`}>
//                 <h2 class="heading" onClick={()=>props.openAccordionTabs(5)} metatitle = 'adminIfaLevelHeading'>Level & Info</h2>
//                 <div class="tabsContainers propsRelative">
//                     {props.afterAPICall && 
//                         <Loader
//                         loaderType = 'line'
//                         loaderWidth = { commonConst.LOADER_WIDTH[2].width }
//                         loaderHeight = { commonConst.LOADER_WIDTH[2].height }
//                     />
//                     }
//                     <ul>
//                         {(props.levelInitialInfo && props.levelInitialInfo.length > 0) && createLevelInfoList(props.levelInitialInfo)}
//                         {addNewLevelInfo && <li>
//                             {createLevelForm()}
//                         </li>}
//                     </ul>
//                     {(props.availableLevelNumbers && props.availableLevelNumbers.length >0) && <div class ={`inputCols btnsContainer  mTop20 txtRight ${actionModeEnabled ? 'removeDisabled' : ''}`}>
//                         <a href="javascript:void(0)" onClick= {(fldName) => props.actionApply('addInfo')}>+ Add Level Info</a>
//                     </div>}
                    
//                 </div>
//                 { (props.ifaNotification && props.ifaNotification.notification && props.ifaNotification.notification.message) && 
//                     <div class={`sentSuccessFully active ${props.ifaNotification.notification.status==-1? 'error': ''} `}>
//                         {props.ifaNotification.notification.message} 
//                     <span class="close" onClick= {()=> props.clearNotification()}></span>
//                 </div> }
//             </li>
        
//     )

// }
// function mapStateToProps(state, props){
//     let satateValue={
//         initialValues: Object.assign({}, props.initialLevelInfo)
//     }
//     return satateValue;
// }
// LevelInfoForm = reduxForm({
//     form:'LevelInfoForm',
//     enableReinitialize:true,

// })(LevelInfoForm)

// const selector = formValueSelector('LevelInfoForm');

// LevelInfoForm = connect(
//     mapStateToProps
// )(LevelInfoForm)

// export default LevelInfoForm;