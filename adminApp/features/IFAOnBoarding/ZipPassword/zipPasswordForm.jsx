// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {Field, reduxForm, formValueSelector} from 'redux-form'
// import {FieldComponentOfForm} from 'app/uiCollection/shared/form/formField'
// import DrillDownStrip from 'app/uiCollection/shared/drillDown'
// //import * as formValidator from 'app/uiCollection/shared/form/validation'

// let ZipPasswordForm = (props) => {
//     const { handleSubmit, initialValues, openTab, openAccordionTabs, submitMsg, errorMsg, activeAllFrm, zipPassInitInfo} = props;
//     return(

//             <li class={` ${(props.openTab == 4 && 'openTabs') || (!props.activeAllFrm && 'removeDisabled') }`}>
//                 <h2 class="heading" onClick={()=>props.openAccordionTabs(4)} metatitle = 'adminIfaRtaHeading'>RTA Zip Passwords</h2>
//                 <div class="tabsContainers">
//                     {props.submitMsg==false&&<span class="submitMsg errorMsg">{props.errorMsg}</span>}
//                     {props.submitMsg==true&&<span class="submitMsg successMsg">Zip Password created Successfully</span>}
//                     {!props.errorMsg && props.passDeleteMsg==true && <span class="submitMsg successMsg">Zip Password deleted Successfully</span>}
//                     {/*(props.zipPassInitInfo) && <div class="selectedOpts">
//                         <span>Passwords :</span>
//                              <ul>
//                                 {props.zipPassInitInfo.map((passwordList, index) => (
//                                         <li key={index}>{passwordList.zippass}</li>
//                                 ))}
//                             </ul>

//                     </div>*/}
//                     {props.zipPassInitInfo && props.zipPassInitInfo[0] && <div class="formRows colsSec noMargin"><div class="tableListing boxShadow resultBox noMargin">
//                         <div class="filterResult">
//                           <div class="schemesSelectionArea">
//                               <ul id="schemesListed">
//                                   <li><span class="mTop">Passwords : </span></li>
//                                   {/*props.availablePasswords*/}
//                                   {props.passwordList}
//                               </ul>
//                           </div>
//                         </div>
//                     </div></div>}
//                     <form onSubmit={(e) => props.handleSubmit(e)}>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Zip Pass 1 </label>
//                                 <Field
//                                     name='zippass1'
//                                     type='text'
//                                     maxlength= '25'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRtaZipPass1'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Zip Pass 2 </label>
//                                 <Field
//                                     name='zippass2'
//                                     type='text'
//                                     maxlength= '25'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRtaZipPass2'
//                                 />
//                             </div>
//                         </div>
//                         <div class="btnsContainer">
//                         <button type="submit" metatitle = 'adminIfaRtaSubmit'>Submit</button>
//                         </div>
//                     </form>
//                 </div>
//             </li>

//     )

// }
// function mapStateToProps(state, props){
//     let satateValue={
//         initialValues: props.prefilledFormDetails
//     }
//     return satateValue;
// }
// ZipPasswordForm = reduxForm({
//     form:'ZipPasswordForm',
//     enableReinitialize:true,

// })(ZipPasswordForm)

// const selector = formValueSelector('ZipPasswordForm');

// ZipPasswordForm = connect(
//     mapStateToProps
// )(ZipPasswordForm)

// export default ZipPasswordForm;
