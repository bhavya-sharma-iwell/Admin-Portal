// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {Field, reduxForm, formValueSelector,change} from 'redux-form'
// import {GeneralField, FieldComponentOfForm} from 'app/uiCollection/shared/form/formField'
// import * as formValidator from 'app/uiCollection/shared/form/validation'
// import {SSL_LIST} from 'app/constants/broker/brokerDashboardConst'
// import Loader from 'app/uiCollection/shared/loaders'
// import { LOADER_WIDTH } from 'app/constants/shared/commonConst'

// export const SmtpForm = (props) => {
//     return (
//     	<div class="posRelative">
// 	    	<h2 class="heading" onClick={()=>props.openAccordionTabs(6)} metatitle = 'adminIfaSmtpConfiHeading'>SMTP Configuration</h2>
// 		    <div class="tabsContainers">
// 		        <form onSubmit={(e) => props.handleSubmit(e)} id="settingsForm" >
// 		            {((props.smtpSettingsData && props.smtpSettingsData.loaderSmtp && props.smtpSettingsData.loaderSmtp.componentName == 'smtpSettingLoader')  ||
// 		                (props.smtpSettingsData && props.smtpSettingsData.loaderUpdateSmtp && props.smtpSettingsData.loaderUpdateSmtp.componentName == 'smtpSettingLoader')  )
// 		                && <Loader 
// 		                    loaderType = 'line'
// 		                    loaderWidth = { LOADER_WIDTH[2].width }
// 		                    loaderHeight = { LOADER_WIDTH[2].height }
// 		                />}
// 		            {(props.showCredentialForm && props.ifaUserInitialize) && <div class="formSec ">
// 		                <div class="formRows colsSec">
// 		                    <Field
// 		                        outerDivClass="inputCols"
// 		                        labelClass="label"
// 		                        innerDivClass="inputFld"
// 		                        name="smtp"
// 		                        type="text" 
// 		                        component={GeneralField}
// 		                        label="Outgoing mail server (SMTP)"
// 		                        validate={[formValidator.required]}
// 		                        maxlength= '50'
// 		                        autoComplete = 'off'
// 								metatitle = 'adminIfaSmtpConfiSmtp'
// 		                    />
// 		                    <Field
// 		                        outerDivClass="inputCols"
// 		                        labelClass="label"
// 		                        innerDivClass="inputFld"
// 		                        name="senderName"
// 		                        type="text" 
// 		                        component={GeneralField}
// 		                        label="Your Name"
// 		                        validate={[formValidator.required]}
// 		                        autoComplete = 'off'
// 								metatitle = 'adminIfaSmtpConfiYourName'
// 		                    />
// 		                </div>

// 		                <div class="formRows colsSec">                    
// 		                    <Field
// 		                        outerDivClass="inputCols"
// 		                        labelClass="label"
// 		                        innerDivClass="inputFld"
// 		                        name="senderEmail"
// 		                        type="text" 
// 		                        component={GeneralField}
// 		                        label="Email ID"
// 		                        validate={[formValidator.required, formValidator.emailRegex]}
// 		                        maxlength= '250'
// 		                        autoComplete = 'off'
// 								metatitle = 'adminIfaSmtpConfiEmail'
// 		                    />
// 		                    <Field
// 		                        outerDivClass="inputCols"
// 		                        labelClass="label"
// 		                        innerDivClass="inputFld"
// 		                        name="smtpUsername"
// 		                        type="text" 
// 		                        component={GeneralField}
// 		                        label="User ID"
// 		                        validate={[formValidator.required]}
// 		                        maxlength= '100'
// 		                        autoComplete = 'off'
// 								metatitle = 'adminIfaSmtpConfiUserId'
// 		                    />
		                    
// 		                </div>

// 		                <div class="formRows colsSec">
// 		                    <Field
// 		                        outerDivClass="inputCols"
// 		                        labelClass="label"
// 		                        innerDivClass="inputFld"
// 		                        name="smtPPwd"
// 		                        type="text" 
// 		                        component={GeneralField}
// 		                        label="Password"
// 		                        validate={[formValidator.required]}
// 		                        maxlength= '50'
// 		                        autoComplete = 'off'
// 								metatitle = 'adminIfaSmtpConfiPassword'
// 		                    />
// 		                    <div class="inputCols">
// 		                      <Field
// 		                        outerDivClass="inputCols"
// 		                        labelClass="label"
// 		                        innerDivClass="inputFld"
// 		                        name="smtPPortNo"
// 		                        type="text" 
// 		                        component={GeneralField}
// 		                        label="Port"
// 		                        validate={[formValidator.required]}
// 		                        maxlength= '10'
// 		                        autoComplete = 'off'
// 								metatitle = 'adminIfaSmtpConfiPort'
// 		                      />
// 		                      <Field component={GeneralField} type="select" 
// 		                        placeholder = 'Select SSL'
		                        
// 		                        outerDivClass={`inputCols `}
// 		                        labelClass="label"
// 		                        innerDivClass={`inputFld `}
// 		                        selectBoxDivClass = "filter-section selectBox "
// 		                        name="smtPssl"
// 		                        selectedOpt={props.selectedSslOpt}
// 		                        options={SSL_LIST} 
// 		                        customTitle="SSL"
// 		                        valueName="value"
// 		                        labelName="label"
// 		                        autoComplete = 'off'
// 		                        onOptionSelection ={(obj)=>{props.dispatch(change('SmtpForm','smtPssl', obj['value']));props.onOptionSelection(obj,'smtPssl');}}
// 								metatitle = 'adminIfaSmtpConfiSsl'
// 		                      />
// 		                    </div>
// 		                </div>

// 		                <div class="formRows colsSec colSpan3">
// 		                    <Field
// 		                        outerDivClass="inputCols"
// 		                        labelClass="label"
// 		                        innerDivClass="inputFld"
// 		                        name="smtpCcEmail"
// 		                        type="text"
// 		                        component={GeneralField}
// 		                        label="Cc"
// 		                        maxlength= '100'
// 		                        autoComplete = 'off'
// 								metatitle = 'adminIfaSmtpConfiCc'
// 		                    />
// 		                    <Field
// 		                        outerDivClass="inputCols"
// 		                        labelClass="label"
// 		                        innerDivClass="inputFld"
// 		                        name="smtpBccEmail"
// 		                        type="text"
// 		                        component={GeneralField}
// 		                        label="Bcc"
// 		                        maxlength= '100'
// 		                        autoComplete = 'off'
// 								metatitle = 'adminIfaSmtpConfiBcc'
// 		                    />
// 		                    <Field
// 		                        outerDivClass="inputCols labelIningleLine"
// 		                        labelClass="label"
// 		                        innerDivClass="inputFld"
// 		                        name="smtpReplyToEmail"
// 		                        type="text"
// 		                        component={GeneralField}
// 		                        label="Reply-to Email ID(if different from Sender Email ID)"
// 		                        maxlength= '100'
// 		                        autoComplete = 'off'
// 								metatitle = 'adminIfaSmtpConfiReplyToEmail'
// 		                    />
// 		                </div>


// 		            </div>}
// 		            <div class="btnsContainer">
// 		                <button type="submit" metatitle = 'adminIfaSmtpConfiSubmit'>Save</button>
// 		            </div>
// 		        </form>
// 	        </div>
//        	</div>
//     )
// }
// const mapStateToprops = (state,props)=>{
//     return {
//       initialValues:props.ifaUserInitialize
//     }
// }
// let SmtpFormMain = reduxForm({form:'SmtpForm',enableReinitialize:true,keepDirtyOnReinitialize: true})(SmtpForm)
// export default connect(mapStateToprops)(SmtpFormMain)