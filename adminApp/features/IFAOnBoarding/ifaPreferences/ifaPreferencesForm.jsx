// import React, {Component, Fragment} from 'react'
// import {connect} from 'react-redux'
// import {Field, reduxForm, formValueSelector,change} from 'redux-form'
// import {GeneralField, FieldComponentOfForm} from 'app/uiCollection/shared/form/formField'
// import * as formValidator from 'app/uiCollection/shared/form/validation'
// import {RIA_LIST, TXN_FREQUENCY, TXN_PERIOD, ALLOW_FIREBASE_NOTIFICATION_OPTIONS,ALLOW_CAS_LIST,ALLOW_XIRR} from 'app/constants/broker/brokerDashboardConst'
// import Loader from 'app/uiCollection/shared/loaders'
// import { LOADER_WIDTH,TRUE_FALSE_COMMON,ONBOARDING_OPTIONS , MOBILE_LAYOUT_OPTIONS,BUSINESS_TYPE_OPTIONS } from 'app/constants/shared/commonConst'
// import SwitchButtonBox from 'app/uiCollection/shared/switchButton'
// import Uploader from 'app/utils/uploader'
// export const IfaPreferencesForm = (props) => {
//     let ifaPreferencesInfoData = props.ifaPreferencesInfoData || {}
//     //let popUpImgProtoType = props.popupURL && props.popupURL.includes('https://') ? '' : 'https://'
//     let ifaNotification = props.ifaNotification || {}
//     return (
//     	<div class="posRelative">
// 	    	<h2 class="heading" onClick={()=>props.openAccordionTabs(7)} metatitle = 'adminIfaPrefHeading'>IFA Preferences</h2>
// 		    <div class="tabsContainers ">
// 		        <form onSubmit={(e) => props.handleSubmit(e)} >
// 		            {((props.preferencesData && props.preferencesData.ifaPreferencesLoader && props.preferencesData.ifaPreferencesLoader.componentName == 'ifaPreferencesLoader') || (ifaNotification && ifaNotification.loaderDeleteImage) )
//                         && <Loader 
//                             loaderType = 'line'
//                             loaderWidth = { LOADER_WIDTH[2].width }
//                             loaderHeight = { LOADER_WIDTH[2].height }
//                         />}
// 		            <div class="formSec ">
// 		                <div class="formRows colsSec colSpan3">
// 		                    <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select Txn Opts'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="allowTxnNotification"
//                                 selectedOpt={props.selectedAllowTxnOpts}
//                                 options={RIA_LIST} 
//                                 customTitle="Send Transaction summary mail"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','allowTxnNotification', obj['value']));props.onOptionSelection(obj,'allowTxnNotification');}}
//                                 metatitle = 'adminIfaPrefTxnSummaryMail'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select Txn Frequency'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="txnNotificationFrequency"
//                                 selectedOpt={props.selectedTxnFrequencyOpts}
//                                 options={TXN_FREQUENCY} 
//                                 customTitle="Transaction summary mail frequency"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','txnNotificationFrequency', obj['value']));props.onOptionSelection(obj,'txnNotificationFrequency');}}
//                                 metatitle = 'adminIfaPrefTxnFrequency'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select Txn Period'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="txnNotificationPeriod"
//                                 selectedOpt={props.selectedTxnPeriodOpts}
//                                 options={TXN_PERIOD} 
//                                 customTitle="Transaction summary mail period"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','txnNotificationPeriod', obj['value']));props.onOptionSelection(obj,'txnNotificationPeriod');}}
//                                 metatitle = 'adminIfaPrefTxnPeriod'
//                             /> 
// 		                </div>
// 		                <div class="formRows colsSec colSpan3">
//                             <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select MS Active'
//                                 //title = 'Select MS Active'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="msActive"
//                                 customTitle = "MS Active"
//                                 selectedOpt={props.selectedMsActiveOpts}
//                                 options={RIA_LIST} 
//                                 //label="MS Active"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','msActive', obj['value']));props.onOptionSelection(obj,'msActive');}}
//                                 metatitle = 'adminIfaPrefMsActive'
//                             />
//                             <Field
//                                 outerDivClass="inputCols"
//                                 innerDivClass="inputFld"
//                                 name="msUsername"
//                                 type="text"
//                                 label="MS Username"
//                                 component={GeneralField}
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefMsUserName'
//                             />
//                             <Field
//                                 outerDivClass="inputCols"
//                                 innerDivClass="inputFld"
//                                 name="msPassword"
//                                 type="text"
//                                 label="MS Password"
//                                 component={GeneralField}
//                                 autoComplete = "new-password"
//                                 metatitle = 'adminIfaPrefMsPassword'
//                             /> 
		                    
// 		                </div>
//                         <div class="formRows colsSec colSpan3">
//                             <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="allowFirebaseNotification"
//                                 selectedOpt={props.selectedFirebaseNotificationOpts}
//                                 options={ALLOW_FIREBASE_NOTIFICATION_OPTIONS} 
//                                 customTitle="Firebase Notification"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','allowFirebaseNotification', obj['value']));props.onOptionSelection(obj,'allowFirebaseNotification');}}
//                                 metatitle = 'adminIfaPrefFireBaseNotification'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="allowCas"
//                                 selectedOpt={props.selectedAllowCasOption}
//                                 options={ALLOW_CAS_LIST} 
//                                 customTitle="Allow CAS"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','allowCas', obj['value']));props.onOptionSelection(obj,'allowCas');}}
//                                 metatitle = 'adminIfaPrefAllowCas'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="allowSOADownload"
//                                 selectedOpt={props.selectedSOAEnable}
//                                 options={RIA_LIST} 
//                                 customTitle="SOA Enable"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','allowSOADownload', obj['value']));props.onOptionSelection(obj,'allowSOADownload');}}
//                                 metatitle = 'adminIfaPrefSoaEnable'
//                             />
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="hideXirr"
//                                 selectedOpt={props.selectedXirrOpt}
//                                 options={ALLOW_XIRR} 
//                                 customTitle="Hide XIRR"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','hideXirr', obj['value']));props.onOptionSelection(obj,'hideXirr');}}
//                                 metatitle = 'adminIfaPrefHideXirr'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="androidAppLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Android App Link :"
//                                 maxlength= '200'
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefAndroidLink'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="iosAppLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="iOS App Link :"
//                                 maxlength= '200'
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefIosLink'
//                             />
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                         <Field component={GeneralField} type="select" 
//                             placeholder = 'Select Weighted CAGR'
//                             outerDivClass="inputCols"
//                             labelClass="label"
//                             innerDivClass="inputFld"
//                             selectBoxDivClass = "filter-section selectBox "
//                             name="isWeightedCagr"
//                             selectedOpt={props.selectedWeightedCagr}
//                             options={RIA_LIST} 
//                             customTitle="Weighted CAGR with investment amount"
//                             valueName="value"
//                             labelName="label"
//                             autoComplete = 'off'
//                             onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','isWeightedCagr', obj['value']));props.onOptionSelection(obj,'isWeightedCagr');}}
//                             metatitle = 'adminIfaPrefWeightedCagr'
//                         />
//                         {(ifaPreferencesInfoData && ifaPreferencesInfoData.exchange == 2) &&<Field component={GeneralField} type="select" 
//                             placeholder = 'Select UCC Auth Link'
//                             outerDivClass="inputCols"
//                             labelClass="label"
//                             innerDivClass="inputFld"
//                             selectBoxDivClass = "filter-section selectBox "
//                             name="isUccAuthLink"
//                             selectedOpt={props.selectedAuthLinkOpts}
//                             options={RIA_LIST} 
//                             customTitle="UCC Auth Link"
//                             valueName="value"
//                             labelName="label"
//                             autoComplete = 'off'
//                             onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','isUccAuthLink', obj['value']));props.onOptionSelection(obj,'isUccAuthLink');}}
//                             metatitle = 'adminIfaPrefUccAuthLink'
//                         />}

//                         <Field component={GeneralField} type="select" 
//                             placeholder = 'Select'
//                             outerDivClass="inputCols"
//                             labelClass="label"
//                             innerDivClass="inputFld"
//                             selectBoxDivClass = "filter-section selectBox "
//                             name="topSchemes"
//                             selectedOpt={props.selectedTopSchemes}
//                             options={TRUE_FALSE_COMMON} 
//                             customTitle="Top Schemes"
//                             valueName="value"
//                             labelName="label"
//                             autoComplete = 'off'
//                             onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','topSchemes', obj['value']));props.onOptionSelection(obj,'topSchemes');}}
//                             metatitle = 'adminIfaPrefTopSchemes'
//                         />
//                         <Field component={GeneralField} type="select" 
//                             outerDivClass="inputCols"
//                             labelClass="label"
//                             innerDivClass="inputFld"
//                             selectBoxDivClass = "filter-section selectBox "
//                             name="userType"
//                             selectedOpt={props.userType}
//                             options={props.userList||[]} 
//                             customTitle="Show BSE Portal Login Button"
//                             valueName="levelNo"
//                             labelName="levelName"
//                             autoComplete = 'off'
//                             onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','userType', obj['levelNo']));props.onOptionSelection(obj,'userType');}}
//                             metatitle = 'adminIfaPrefBsePortalLogin'
//                         />
//                         </div>

//                         <div class="formRows colsSec colSpan3">
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="topSIPSchemes"
//                                 selectedOpt={props.selectedTopSIPSchemes}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="Top SIP Schemes"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','topSIPSchemes', obj['value']));props.onOptionSelection(obj,'topSIPSchemes');}}
//                                 metatitle = 'adminIfaPrefTopSipScheme'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="SIPCalculator"
//                                 selectedOpt={props.selectedSIPCalculator}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="SIP Calculator"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','SIPCalculator', obj['value']));props.onOptionSelection(obj,'SIPCalculator');}}
//                                 metatitle = 'adminIfaPrefSipCalculator'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="futureProjectionCalculator"
//                                 selectedOpt={props.selectedFutureProjection}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="Future Projection Calculator"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','futureProjectionCalculator', obj['value']));props.onOptionSelection(obj,'futureProjectionCalculator');}}
//                                 metatitle = 'adminIfaPrefProjectionCalculator'
//                             />
//                         </div>

//                         <div class="formRows colsSec colSpan3">
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="latestNav"
//                                 selectedOpt={props.selectedLatestNav}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="Latest Nav"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','latestNav', obj['value']));props.onOptionSelection(obj,'latestNav');}}
//                                 metatitle = 'adminIfaPrefLatestNav'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="NFO"
//                                 selectedOpt={props.selectedNFO}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="NFO"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','NFO', obj['value']));props.onOptionSelection(obj,'NFO');}}
//                                 metatitle = 'adminIfaPrefNfo'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="majorUpdate"
//                                 selectedOpt={props.selectedMajorUpdate}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="Major Update"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','majorUpdate', obj['value']));props.onOptionSelection(obj,'majorUpdate');}}
//                                 metatitle = 'adminIfaPrefMajorUpdate'
//                             />
//                         </div>



//                         <div class="formRows colsSec colSpan3">
//                             <Field component={GeneralField} type="select"
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="fundPicks"
//                                 selectedOpt={props.selectedFundPicks}
//                                 options={TRUE_FALSE_COMMON}
//                                 customTitle="Fund Picks"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','fundPicks', obj['value']));props.onOptionSelection(obj,'fundPicks');}}
//                                 metatitle = 'adminIfaPrefFundPicks'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="privacyPolicyURL"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Privacy Policy URL "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefPrivacyPolicy'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="youtubeLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Youtube Link "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefYoutubeLink'
//                             />
//                         </div>

//                         <div class="formRows colsSec colSpan3">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="whatsappLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Whatsapp Link "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefWhatsappLink'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="facebookLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Facebook Link "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefFacebookLink'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="instagramLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Instagram Link "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefIntagramLink'
//                             />
//                         </div>

//                         <div class="formRows colsSec colSpan3">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="twitterLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Twitter Link "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefTwitterLink'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="linkedinLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Linkedin Link "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefLinkedinLink'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="termsAndConditionsLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Terms And Conditions Link "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefTermAndCondition'
//                             />
//                         </div>

//                         <div class="formRows colsSec colSpan3">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="specialMessage"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Special Message "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefSpecialMsg'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="specialMessageLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Special Message Link "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefSpecialMsgLink'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="popupMessage"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Popup Message "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefPopupMsg'
//                             />
//                         </div>

//                         <div class="formRows colsSec colSpan3">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="popupMessageLink"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Popup Message Link "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefPopupMsgLink'
//                             />
//                             {/* <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="popupImagePath"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Popup Image Path "
//                                 autoComplete = 'off'
//                             /> */}
//                               <div class={'inputCols upload'}>
//                                 <label class="label">Popup Image : 
//                                     <span class="logoSize"> * Popup size in px (720 X 450) <br /> PNG only allowed, Image size limit 2 MB </span>
//                                 </label>
//                                 <div class="logoContainerArea inlineBlock mTop10">
//                                     <div class="chooseFile overflowHidden posRelative logoButton vAlignMdle">Upload
//                                     <Uploader
//                                         onFileUpload={(file,fileSrc, hideCropper)=>props.onFileUpload(file,fileSrc,2, 'uploadPopupImg')}
//                                         maxFileSize={{value:2,type:'MB'}}
//                                         fileHandle={1}
//                                         cropImage={true}
//                                         customClassName = {'chooseFileBtn'}
//                                         multipleUpload = {false}
//                                         fileTypeAccepted = 'onlyPng'
//                                         minCanvasWidth={72}
//                                         minCanvasHeight = {45}
//                                         metatitle = 'adminIfaPrefUploadPopupImage'
//                                     />
//                                     </div>
//                                     {(props.popupURL || props.popupImagePath) && <span class="info upArrow status  activeIcon vAlignMdle"></span>}
//                                        <div class='cl'></div>
//                                 </div>
//                                 {(props.popupURL || props.popupImagePath) && <Fragment> 
//                                     <span class="logoPreview vAlignTop logoInMdlSize">
//                                         <span class="previewImg posRelative">
//                                             <img src={`${props.popupURL}?${Date.now()}`} alt='Popup Image' metatitle = 'adminIfaPrefPopupImage'/>
//                                         </span>
//                                     </span>
//                                     <div class="actionOptsBox displayInlineBlock mTop10">
//                                         <span class="deleteOpts" onClick = {() => props.deletePopupURLImg('uploadPopupImg')} metatitle = 'adminIfaPrefDeletePopupImage'></span>
//                                     </div>
//                                     {(props.utils && props.utils.fileSizeBigger) && <p class="redColor">Please select image less than 2 MB</p>}
//                                 </Fragment>}
//                             </div>   
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="popupURL"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Popup URL "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefPopupUrl'
//                             />
//                         </div>

//                         <div class="formRows colsSec colSpan3">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="googleCoordinates"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Google Coordinates "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefCoordinates'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="inviteMessage"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Invite Message "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefInviteMsg'
//                             />
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="aboutUsURL"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="About Us "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefAboutUsUrl'
//                             />
//                         </div>


//                         <div class="formRows colsSec colSpan3">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="contactUs"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Contact Us "
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefContactUs'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="isGoogleSignin"
//                                 selectedOpt={props.selectedGoogleSignin}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="Google Signin"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','isGoogleSignin', obj['value']));props.onOptionSelection(obj,'isGoogleSignin');}}
//                                 metatitle = 'adminIfaPrefGoogleSignIn'
//                             />

//                             <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="useEdge360"
//                                 selectedOpt={props.selectedUseEdge360Option}
//                                 options={RIA_LIST} 
//                                 customTitle="Use Edge360"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','useEdge360', obj['value']));props.onOptionSelection(obj,'useEdge360');}}
//                                 metatitle = 'adminIfaPrefUseEdeg360'
//                             />
//                             </div>

//                             <div class="formRows colsSec colSpan3">
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="showAppBadge"
//                                 selectedOpt={props.selectedShowAppBadge}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="Show App Badge"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','showAppBadge', obj['value']));props.onOptionSelection(obj,'showAppBadge');}}
//                                 metatitle = 'adminIfaPrefShowAppBadge'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="allowOnboarding"
//                                 selectedOpt={props.selectedOnboardingOption}
//                                 options={ONBOARDING_OPTIONS} 
//                                 customTitle="Onboarding"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','allowOnboarding', obj['value']));props.onOptionSelection(obj,'allowOnboarding');}}
//                                 metatitle = 'adminIfaPrefOnboarding'
//                             /> 
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="layout"
//                                 selectedOpt={props.selectedMobileLayoutOption}
//                                 options={MOBILE_LAYOUT_OPTIONS}
//                                 customTitle="Mobile Layout"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','layout', obj['label']));props.onOptionSelection(obj,'mobileLayout');}}
//                                 metatitle = 'adminIfaPrefMobileLayout'
//                             />                           
//                         </div>
//                         <div class="formRows">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="firebaseCredentials"
//                                 type="textarea"
//                                 height = {4} 
//                                 component={GeneralField}
//                                 label="Firebase Credentials"
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefFirebaseCredentials'
//                             />                            
//                         </div>
//                         <div class="formRows">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="firebaseToken"
//                                 type="textarea"
//                                 height = {2} 
//                                 maxlength= '500'
//                                 component={GeneralField}
//                                 label="Firebase Token"
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefFirebaseToken'
//                             />                          
//                         </div>
//                         <div class='formRows colsSec colSpan2'> 
//                             <div class="inputCols">
//                             <label class="label">Client Login </label>
//                             <SwitchButtonBox 
//                             leftTitle= "Enable"
//                             rightTitle= " Disable"
//                             switchSlideFun= {(slideVal)=>props.switchFun(slideVal)}
//                             manualPosition = {props.clientSlideLoginPosition == 1 ? true : false}
//                             metatitle = 'adminIfaPrefClientLogin'
//                             />
//                             </div>
//                               <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="businessType"
//                                 selectedOpt={props.selectedBusinessTypeOption}
//                                 options={BUSINESS_TYPE_OPTIONS} 
//                                 customTitle="Business Type"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','businessType', obj['value']));props.onOptionSelection(obj,'businessType');}}
//                                 metatitle = 'adminIfaPrefBusinessType'
//                             /> 
//                         </div> 

//                         <div class="formRows colsSec colSpan2 ">
//                              <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="hideBrokerage"
//                                 selectedOpt={props.isBrokerage}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="Hide Brokerage"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','hideBrokerage', obj['value']));props.onOptionSelection(obj,'hideBrokerage');}}
//                                 metatitle = 'adminIfaPrefHideBrokerage'
//                              />

//                              <Field component={GeneralField} type="select"
//                                 placeholder = 'Select'
//                                 customTitle = 'Hide Metrics Sub Users'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="hideMetricsSubUsers"
//                                 selectedOpt={props.hideMetricsSubUsers}
//                                 options={TRUE_FALSE_COMMON}
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','hideMetricsSubUsers', obj['value']));props.onOptionSelection(obj,'hideMetricsSubUsers');}}
//                                 metatitle = 'adminIfaPrefHideMetricsSubUsers'
//                             />
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="whatsappPhone"
//                                 type="text"
//                                 component={GeneralField}
//                                 label="Whatsapp Phone :"
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefWhatsappPhone'
//                             />
//                             <Field component={GeneralField} type="select"
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="whatsappEnabled"
//                                 selectedOpt={props.selectedWhatsAppOpt}
//                                 options={TRUE_FALSE_COMMON}
//                                 customTitle="Whatsapp Enabled"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','whatsappEnabled', obj['value']));props.onOptionSelection(obj,'whatsappEnabled');}}
//                                 metatitle = 'adminIfaPrefWhatsappEnabled'
//                             />
//                              <Field component={GeneralField} type="select"
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="showISIN"
//                                 selectedOpt={props.selectedShowIsin}
//                                 options={TRUE_FALSE_COMMON}
//                                 customTitle="Show ISIN"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','showISIN', obj['value']));props.onOptionSelection(obj,'showISIN');}}
//                                 metatitle = 'adminIfaPrefShowIsin'
//                             />
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <Field component={GeneralField} type="select"
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="isAlertNotification"
//                                 selectedOpt={props.isAlertNotification}
//                                 options={TRUE_FALSE_COMMON}
//                                 customTitle="Alert Notification"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','isAlertNotification', obj['value']));props.onOptionSelection(obj,'isAlertNotification');}}
//                                 metatitle = 'adminIfaPrefAlertNotification'
//                             />
//                                <Field component={GeneralField} type="select"
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="pmsSoa"
//                                 selectedOpt={props.pmsSoa}
//                                 options={TRUE_FALSE_COMMON}
//                                 customTitle="PMS SOA"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','pmsSoa', obj['value']));props.onOptionSelection(obj,'pmsSoa');}}
//                                 metatitle = 'adminIfaPrefPmsSoa'
//                             />
//                             <Field component={GeneralField} type="select"
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="liquiloan"
//                                 selectedOpt={props.liquiloan}
//                                 options={TRUE_FALSE_COMMON}
//                                 customTitle="Liquiloan"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','liquiloan', obj['value']));props.onOptionSelection(obj,'liquiloan');}}
//                                 metatitle = 'adminIfaPrefLiquiloan'
//                             />
                           
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <Field component={GeneralField} type="select"
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="priorityBid"
//                                 selectedOpt={props.priorityBid}
//                                 options={TRUE_FALSE_COMMON}
//                                 customTitle="Priority Bid"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName)=>{props.dispatch(change('IfaPreferencesForm','priorityBid', obj['value']));props.onOptionSelection(obj,'priorityBid');}}
//                                 metatitle = 'adminIfaPrefPriorityBid'
//                             />
//                             <Field component={GeneralField} type="select" 
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="allowMobileOtpLogin"
//                                 selectedOpt={props.allowMobileOtpLogin}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="Enable Mobile OTP Login"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj)=>{props.dispatch(change('IfaPreferencesForm','allowMobileOtpLogin', obj['value']));props.onOptionSelection(obj,'allowMobileOtpLogin');}}
//                                 metatitle = 'adminIfaPrefEnableMobileOtpLogin'
//                             />
//                         </div>
//                         <div class="formRows">
//                         <label class="label">IP Address <span class="info"><span>All users of this broker will be able to login only from these IP Addresses</span></span></label>
//                             <Field outerDivClass="inputCols midLever mBtm10"
//                             innerDivClass="inputFld"
//                             name="allowIps"
//                             type="text"
//                             maxlength={80}
//                             component={GeneralField}
//                             autoComplete = 'off'
//                             validate={[formValidator.IPAddressRegex]}
//                             metatitle = 'adminIfaPrefAllowIps'
//                             />
//                         </div>
//                         <div class="formRows">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="alertNotificationMessage"
//                                 type="textarea"
//                                 height = {4} 
//                                 component={GeneralField}
//                                 label="Notification Alert Message"
//                                 autoComplete = 'off'
//                                 maxlength = {150}
//                                 metatitle = 'adminIfaPrefAlertNotificationMessage'
//                             />                            
//                         </div>
//                         <div class="formRows">
//                             <Field outerDivClass={`inputCols  midLever `}
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="interaktApiKey"
//                                 type="textarea"
//                                 height = {2} 
//                                 maxlength= '100'
//                                 component={GeneralField}
//                                 label="Interakt API Key"
//                                 autoComplete = 'off'
//                                 metatitle = 'adminIfaPrefInteraktApiKey'
//                             />                          
//                         </div>
//                         <div className="formRows colsSec options checkBoxSec">
//                             <div className="inputCols">
//                             <label className="label">Interact First Sync</label>
//                                 <div className="inputFld colsSec">
//                                     <Field
//                                         component={GeneralField}
//                                         type="checkbox"
//                                         name="interaktFirstSyncUsers"
//                                         id='interaktFirstSyncUsers'
//                                         checkBoxLabelName='Users'
//                                         checked={props.interaktFirstSyncUsers}
//                                         onClickFun={(event,fldValue)=>props.onInteraktCheckboxTick(event,'interaktFirstSyncUsers')}
//                                         metatitle = 'adminIfaPrefInteraktFirstSyncUsers'
//                                     /> 
//                                 </div>
//                                 <div className="inputFld colsSec">
//                                     <Field
//                                         component={GeneralField}
//                                         type="checkbox"
//                                         name="interaktFirstSyncEvents"
//                                         id='interaktFirstSyncEvents'
//                                         checkBoxLabelName='Events'
//                                         checked={props.interaktFirstSyncEvents}
//                                         onClickFun={(event,fldValue)=>props.onInteraktCheckboxTick(event,'interaktFirstSyncEvents')}
//                                         metatitle = 'adminIfaPrefInteraktFirstSyncEvents'
//                                     />
//                                 </div>
//                              </div>
//                         </div>
// 		            </div>
//                     <div class="formRows">
//                         <div class="inputCols">
//                             <label class="label">Background image for login page Image size should be ( 1920 x 1080 ), PNG/JPG/JPEG only allowed, Image size limit 2 MB</label>
//                             <div class=" upload ">
//                                 <div class="uploaderBtnsBox">
//                                     <div class="chooseFile posRelative logoButton"> Upload
//                                         <Uploader 
//                                             onFileUpload={(file,fileSrc,hideCropper)=>props.onFileUpload(file,fileSrc,2, 'uploadBackgroundImg')}
//                                             maxFileSize={{value:2,type:'MB'}}
//                                             fileHandle={1}
//                                             cropImage={true}
//                                             customClassName = {'chooseFileBtn'}
//                                             multipleUpload = {false}
//                                             fileTypeAccepted = 'imageFormate'
//                                             metatitle = 'adminIfaPrefUploadBgImage'
//                                         />
//                                     </div>
//                                     {((ifaNotification && ifaNotification.logoUploadData && ifaNotification.logoUploadData.status ==0) && props.customBackground || (props.ifaPreferencesInfoData && props.ifaPreferencesInfoData.customBackgroundImage)) && 
//                                         <span class="info upArrow status  activeIcon"></span>}
//                                     {(props.ifaPreferencesInfoData && props.ifaPreferencesInfoData.customBackgroundImage) && <div class="actionOptsBox displayInlineBlock">
//                                         <span class="deleteOpts" onClick = {() => props.deletePopupURLImg('uploadBackgroundImg')} metatitle = 'adminIfaPrefDeleteBgImage'></span>
//                                     </div>}
//                                 </div>
//                                 {(props.utils && props.utils.fileSizeBigger) && <p class="redColor">Please select image less than 2 MB</p>}
//                             </div>

//                         </div>
//                     </div>
//                     <div class="formRows colsSec colSpan3">
//                             <Field component={GeneralField} type="select"
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 customTitle="Strech Background Image"
//                                 selectedOpt={props.backgroundStretch}
//                                 options={TRUE_FALSE_COMMON}
//                                 name="backgroundStretch"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj, fldName) => props.onOptionSelection(obj,'backgroundStretch')}
//                                 metatitle = 'adminIfaPrefBgStretch'
//                             />
//                             <Field outerDivClass='inputCols'
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 name="voltPartnerCode"
//                                 type="text" 
//                                 component={GeneralField}
//                                 label="Volt Partner Code "
//                                 autoComplete = 'off'
//                                 maxlength={50}
//                                 validate={[formValidator.alphaNumericOnly]}
//                                 metatitle = 'adminIfaPrefVoltPartnerCode'
//                             />
//                     </div>
// 		            <div class="btnsContainer">
// 		                <button type="submit" metatitle = 'adminIfaPrefSubmit'>Save</button>
// 		            </div>
// 		        </form>
// 	        </div>
//        	</div>
//     )
// }
// const mapStateToprops = (state,props)=>{
//     let customInitialValues = {...props.initialValues, ...props.ifaPreferencesInfoData }
//     if (customInitialValues){
//         customInitialValues.allowIps = customInitialValues.allowIps && customInitialValues.allowIps.toString()
//       }
//     return {
//       initialValues:Object.assign({}, customInitialValues )
//     }
// }
// let IfaPreferencesFormMain = reduxForm({form:'IfaPreferencesForm',enableReinitialize:true,keepDirtyOnReinitialize: true})(IfaPreferencesForm)
// export default connect(mapStateToprops)(IfaPreferencesFormMain)
