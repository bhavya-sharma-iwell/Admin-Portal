// import React, {Component} from 'react'
// import {connect} from 'react-redux';
// import { Field, reduxForm, formValueSelector } from 'redux-form'
// import SearchFilter from "app/uiCollection/shared/customSelect/searchFilterCnt"
// import {FieldComponentOfForm, GeneralField} from 'app/uiCollection/shared/form/formField'
// import * as formValidator from 'app/uiCollection/shared/form/validation'
// import {USER_TYPE} from 'app/constants/admin/adminDashboardConst'

// let IfaSignUpForm = (props) =>{
//     const { handleSubmit,initialValues, openTab,openAccordionTabs, selectedOpt, onOptionSelection, successFormFrst, submitMsg, errorMsg, domainNameValue, signUpData, signUpFormDisabled, nameValue} = props;
//     let userTypeList;

//     if(props.signUpData){
//         userTypeList = props.signUpData.userType
//     }else{
//         userTypeList = props.selectedOpt
//     }

//     return(

//         <li class={` ${(props.openTab == 1 && props.signUpFormDisabled && 'openTabs ') || (props.openTab == 1 && ' openTabs ') }`} >
//             <h2 class="heading" onClick={()=>props.openAccordionTabs(1)} metatitle = 'adminIfaSignupHeading'>IFA Sign Up</h2>
//             <div class="tabsContainers">
//             {props.submitMsg==false&&<span class="submitMsg errorMsg">{props.errorMsg}</span>}
//             {props.submitMsg==true&&<span class="submitMsg successMsg">Sign up Successfully</span>}
//                 <form onSubmit={(e)=> handleSubmit(e)} className={(props.people && props.people=="executive") && "removeDisabled" }>
//                   {/*  <div class="formRows colsSec">
//                         <div class={`inputCols openTabs`}>
//                             <label class="label">Broker Domain <span class="mandate">*</span> :</label>
//                             <Field
//                                 name="domain"
//                                 type="text"
//                                 maxlength= '30'
//                                 component={FieldComponentOfForm}
//                                 validate={[formValidator.required]}
//                                 autoComplete = 'off'
//                                 onBlur = {(e)=>domainNameValue(e)}
//                             >
//                             </Field>
//                         </div>
//                         <div class="inputCols">
//                             <h3 class="title domainAlign">
//                                 <span>investwell.com/app/#/login</span>
//                             </h3>
//                         </div>
//                     </div> */}
//                     <div class="formRows colsSec">
//                         <div class="inputCols">
//                             <label class="label">Name <span class="mandate">*</span> :</label>
//                             <Field
//                                 name="name"
//                                 type="text"
//                                 component={FieldComponentOfForm}
//                                 validate = {[formValidator.required, formValidator.alphaNumericAndlimitedSpacialChr]}
//                                 autoComplete = 'off'
//                                 onBlur = {(e)=>nameValue(e)}
//                                 metatitle = 'adminIfaSignupFormName'
//                             >
//                             </Field>
//                         </div>
//                         <div class="inputCols">
//                             <label class="label">Email <span class="mandate">*</span> :</label>
//                             <Field
//                                 name="email"
//                                 type="text"
//                                 maxlength= '255'
//                                 component={FieldComponentOfForm}
//                                 validate = {[formValidator.emailRegex, formValidator.required]}
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaSignupFormEmail'
//                             >
//                             </Field>
//                         </div>
//                     </div>
//                     <div class="formRows colsSec">
//                         <div class="inputCols">
//                             <label class="label">Phone <span class="mandate">*</span>:</label>
//                             <Field
//                                 name="phone"
//                                 type="text"
//                                 component={FieldComponentOfForm}
//                                 validate = {[formValidator.required]} 
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaSignupFormPhone'
//                             >
//                             </Field>
//                         </div>
//                         <div class="inputCols">
//                             <label class="label">User Name <span class="mandate">*</span> :</label>
//                             <Field
//                                 name="username"
//                                 type="text"
//                                 component={GeneralField}
//                                 validate={[formValidator.required, formValidator.whiteSpace,formValidator.userTypeRegex]}
//                                 autoComplete = 'off'
//                                 // onBlur = {(event)=> props.checkUserAvailablility(event)}
//                                 metatitle = 'adminIfaSignupFormUserName'
//                             >    
//                             </Field>
//                          {((props.availableUser == 0) && (props.hideUserNameMsg))&& <div class="errorMsg message">Username not available</div>}
//                         </div>
//                     </div>
//                     <div class="btnsContainer">
//                         <button type="submit" metatitle = 'adminIfaSignupFormSubmit'>Submit</button>
//                     </div>
//                 </form>
//             </div>
//         </li>
//     )
// }

// function mapStateToProps(state, props){
//     let stateValue = {
//       initialValues: Object.assign({}, props.signUpData )
//     }
//     return stateValue
//   }

//   IfaSignUpForm = reduxForm({
//     form: 'IfaSignUpForm',
//     enableReinitialize: true
//   })(IfaSignUpForm)

//   const selector = formValueSelector('IfaSignUpForm')
//   IfaSignUpForm = connect(
//     mapStateToProps
//   )(IfaSignUpForm)

//   export default IfaSignUpForm;
