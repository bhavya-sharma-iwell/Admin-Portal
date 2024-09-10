// import React, {useEffect, useState} from 'react'
// import {connect} from 'react-redux'
// import {Field, reduxForm,change} from 'redux-form'
// import SearchFilter from "app/uiCollection/shared/customSelect/searchFilterCnt"
// import {FieldComponentOfForm,GeneralField} from 'app/uiCollection/shared/form/formField'
// import * as formValidator from 'app/uiCollection/shared/form/validation'
// import {THEMES} from 'app/constants/dashboardConst'
// import {INDIAN_STATES, PAGE_SIZE , EXCHANGE_LIST,USER_ACTIVE_STATUS,SEND_BIRTHDAY_MAIL_OPTIONS,PROTECTED_PDF_OPTIONS,TWO_FACTOR_AUTH_OPTIONS,XLS_PREFERENCE_OPTIONS,DIRECT_SCHEME_OPTIONS, SUBSCRIPTION_EXPIRATION} from 'app/constants/shared/commonConst'
// import Uploader from 'app/utils/uploader'
// import {TRUE_FALSE_COMMON, LOADER_WIDTH, DOMAIN_URL} from 'app/constants/shared/commonConst'
// import Loader from 'app/uiCollection/shared/loaders'
// import {CheckCustomURL} from 'app/actions/admin/ifaRegistration'
// import { DOCS_LOCATION_DOMAIN, INVESTWELL_LOGOS, INVESTWELL_CLOUD_IMAGES, INVESTWELL_LARGE_LOGOS, INVESTWELL_SMALL_LOGOS} from 'app/constants'


// let IFARegistrationForm = (props) => {
//     const [activeURLCheck, setActiveURLCheck] = useState(false)
//     const[exchange,setExchange] = useState()
//     const[selectedExchange,setSelectedExchange] = useState(props.selectedExChange)
//     useEffect(()=>{
// 		const activeFlags = [props.nseOpted,props.bseOpted,props.mfuOpted];
//         const filteredList = EXCHANGE_LIST.filter((exchange, index) => activeFlags[index]);
//         setExchange(filteredList)
// 	},[props.nseOpted,props.bseOpted,props.mfuOpted])
//     useEffect(() => {
//         let selectedExChange = exchange && (exchange.find((obj => props.selectedExChange && props.selectedExChange.value == obj.value)) || exchange[0]);
//         setSelectedExchange(selectedExChange)
//         props.onExChangeSelection(selectedExChange)
//     }, [exchange, props.selectedExChange])


//     let ifaNotification = props.ifaNotification || {}

//     const checkCustomValidation = e => {
//         props.dispatch({type : 'SUCCESS_CHECK_CUSTOM_URL', payload: null})
//         let getVal = e.target.value
//         getVal = getVal.trim()
//         let param = {}
//         if(getVal && getVal.length>0){
//             param.componentForLoader={componentName:'deleteLogoLoader'}
//             param.customURL = e.target.value
//             props.dispatch(CheckCustomURL(param))
//             setActiveURLCheck(true)
//         }else{
//             setActiveURLCheck(false)
//         }
//     }
//      return(
//             <li class={` ${(props.openTab == 2 && 'openTabs') || (!props.successFormFrst && 'removeDisabled') }`} >
//                 <h2 class="heading" onClick={()=>props.openAccordionTabs(2)} metatitle = 'adminIfaRegHeading'>IFA Registration</h2>
//                 <div class="tabsContainers posRelative">
//                 {props.submitMsg==false&&<span class="submitMsg errorMsg">{props.errorMsg}</span>}
//                 {props.submitMsg==true&&<span class="submitMsg successMsg">Successfully Created</span>}

//                     {(ifaNotification && ifaNotification.loaderDeleteLogoImage  && ifaNotification.loaderDeleteLogoImage.componentName == 'deleteLogoLoader')
//                         && <Loader
//                           loaderType = 'line'
//                           loaderWidth = { LOADER_WIDTH[2].width }
//                           loaderHeight = { LOADER_WIDTH[2].height }
//                          />}
//                     <form onSubmit={(e) => props.handleSubmit(e)}>
//                         <div className="formRows colsSec options checkBoxSec">
//                             <div className="inputCols">
//                                 <label className="label">Online Transaction Exchange</label>
//                                 <div className="inputFld colsSec">
//                                     <Field
//                                         component={GeneralField}
//                                         type="checkbox"
//                                         name="nseOpted"
//                                         id='nseOpted'
//                                         checkBoxLabelName='NSE'
//                                         checked={props.nseOpted}
//                                         onClickFun={(event)=>props.onExchangeCheckboxTick(event,'nseOpted')}
//                                         metatitle = 'adminIfaRegNseCheckbox'
//                                     /> 
//                                 </div>
//                                 <div className="inputFld colsSec">
//                                     <Field
//                                         component={GeneralField}
//                                         type="checkbox"
//                                         name="bseOpted"
//                                         id='bseOpted'
//                                         checkBoxLabelName='BSE'
//                                         checked={props.bseOpted}
//                                         onClickFun={(event)=>props.onExchangeCheckboxTick(event,'bseOpted')}
//                                         metatitle = 'adminIfaRegBseCheckbox'
//                                     />
//                                 </div>
//                                 <div className="inputFld colsSec">
//                                     <Field
//                                         component={GeneralField}
//                                         type="checkbox"
//                                         name="mfuOpted"
//                                         id='mfuOpted'
//                                         checkBoxLabelName='MFU'
//                                         checked={props.mfuOpted}
//                                         onClickFun={(event)=>props.onExchangeCheckboxTick(event,'mfuOpted')}
//                                         metatitle = 'adminIfaRegMfuCheckbox'
//                                     />
//                                 </div>
//                              </div>
//                         </div>
//                         <div class={(props && props.people=="executive") ? "removeDisabled" : ''}>
//                         <div class="formRows colsSec">
//                             <div class={`inputCols openTabs`}>
//                                 <label class="label">Broker Domain <span class="mandate">*</span> :</label>
//                                 <Field
//                                     name="domain"
//                                     type="text"
//                                     maxlength= '30'
//                                     component={FieldComponentOfForm}
//                                     validate={[formValidator.required]}
//                                     autoComplete = 'off'
//                                     onBlur = {(e)=>props.domainNameValue(e)}
//                                     metatitle = 'adminIfaRegDomain'
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <h3 class="title domainAlign">
//                                     <span>{props.domain}.investwell.app</span>
//                                 </h3>
//                             </div>
//                         </div>

//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Whitelabelled URL :</label>
//                                 <Field
//                                     name="customURL"
//                                     type="text"
//                                     maxlength= '100'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     onBlur = {(e)=> checkCustomValidation(e)}
//                                     metatitle = 'adminIfaRegWhiteLabelledUrl'
//                                 >
//                                 </Field>
//                                 {(ifaNotification && ifaNotification.customUrlData && ifaNotification.customUrlData) && 
//                                 <span class={`errorMsgFontSize message ${ ifaNotification.customUrlData.urlAvaliability == 0 ? 'errorMsg' : 'successMsg'}`}>
//                                  {ifaNotification.customUrlData.urlAvaliability == 0 ? 'URL not Available' : 'URL Available'}
//                                 </span>}
//                             </div>
//                             <div class="inputCols">
//                                 <div class="inputFld">
//                                     <div class="filter-section selectBox">
//                                         <SearchFilter placeholder="Select Page Size"
//                                         name="paginationSize"
//                                         inputclass="input-group-field selector inputgrp"
//                                         selectedOpt={props.selectedPageOpt}
//                                         onOptionSelection={(obj)=> props.onPageSizeSelection(obj) }
//                                         component={FieldComponentOfForm}
//                                         options={PAGE_SIZE}
//                                         customTitle = "Page Size* :"
//                                         validate={[formValidator.required]}
//                                         metatitle = 'adminIfaRegPageSize'
//                                         >
//                                         </SearchFilter>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Company Name <span class="mandate">*</span> :</label>
//                                 <Field
//                                     name="compName"
//                                     type="text"
//                                     maxlength= '60'
//                                     component={FieldComponentOfForm}
//                                     validate={[formValidator.required,formValidator.alphaNumericAndlimitedSpacialChrAndSlash]}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegCompanyName'
//                                 >
//                                 </Field>
//                             </div>

//                             <div class="inputCols">
//                                 <label class="label">Email <span class="mandate">*</span> : </label>
//                                 <Field
//                                     name='email'
//                                     type='text'
//                                     maxlength= '255'
//                                     component={FieldComponentOfForm}
//                                     validate={[formValidator.required, formValidator.emailRegex]}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegEmail'
//                                 />
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class={`inputCols upload ${props.ifaRegistrationInfo.domain  ? '':'removeDisabled'}`}>
//                                 <label class="label">Choose Logo : <span class="logoSize">* Logo size in px (Small : 400X237 and Large : 935X237) <br /> PNG only allowed, Image size limit 500 KB </span> </label>
//                                 <div class="logoContainerArea inlineBlock ">
//                                     <div class="chooseFile overflowHidden posRelative logoButton vAlignMdle"> Small logo
//                                     <Uploader
//                                         onFileUpload={(file,fileSrc)=>props.onFileUpload(file,fileSrc,0)}
//                                         onFileRejection = {error =>props.onFileRejection(error,0)}
//                                         maxFileSize={{value:489,type:'KB'}}
//                                         fileHandle={1}
//                                         cropImage={true}
//                                         customClassName = {'chooseFileBtn'}
//                                         multipleUpload = {false}
//                                         fileTypeAccepted = 'onlyPng'
//                                         metatitle = 'adminIfaRegSmallLogoUpload'
//                                     />
//                                     </div>
//                                     {((props.ifaNotification &&props.ifaNotification.logoUploadData &&(props.ifaNotification.logoUploadData.status ==0) && ((props.logoState) ||(props.logoTypeArrayLength >= 2))) || props.smallLogo ) && <span class="info upArrow status  activeIcon vAlignMdle"></span>}
//                                     <span class="logoPreview vAlignMdle smlLogo posRelative">
//                                         <img src={`${DOCS_LOCATION_DOMAIN}/${INVESTWELL_CLOUD_IMAGES}/${INVESTWELL_LOGOS}/${INVESTWELL_SMALL_LOGOS}/${props.smallLogo}?${Date.now()}`} alt='Image not found' />
//                                     </span>
//                                     <div class='cl'></div>
//                                     <div class="chooseFile overflowHidden posRelative logoButton vAlignMdle">Large logo
//                                     <Uploader
//                                         onFileUpload={(file,fileSrc)=>props.onFileUpload(file,fileSrc,1)}
//                                         onFileRejection = {error =>props.onFileRejection(error,0)}
//                                         maxFileSize={{value:489,type:'KB'}}
//                                         fileHandle={1}
//                                         cropImage={true}
//                                         customClassName = {'chooseFileBtn'}
//                                         multipleUpload = {false}
//                                         fileTypeAccepted = 'onlyPng'
//                                         metatitle = 'adminIfaRegLargeLogoUpload'
//                                     />
//                                     </div>
//                                     {((props.ifaNotification &&props.ifaNotification.logoUploadData &&(props.ifaNotification.logoUploadData.status ==0) &&((!props.logoState) ||(props.logoTypeArrayLength >= 2))) || props.largeLogo) && <span class="info upArrow status  activeIcon vAlignMdle"></span>}
//                                     <span  class="logoPreview vAlignMdle largeLogo posRelative">
//                                         <img src={`${DOCS_LOCATION_DOMAIN}/${INVESTWELL_CLOUD_IMAGES}/${INVESTWELL_LOGOS}/${INVESTWELL_LARGE_LOGOS}/${props.largeLogo}?${Date.now()}`} alt='Image not found' />
//                                     </span>
//                                 </div>
//                                 <div class="actionOptsBox displayInlineBlock mTop10 mLeft10">
//                                     <span class="deleteOpts" onClick = {() => props.deleteLogo()} metatitle = 'adminIfaRegDeleteLogo'></span>
//                                 </div>
//                             </div>
//                             <Field outerDivClass="inputCols  midLever"
// 								labelClass="label"
// 								innerDivClass="inputFld"
// 								name="slogan"
// 								type="text" 
// 								component={GeneralField}
// 								label="Slogan:"
// 								maxlength= '40'
// 								autoComplete = 'off'
//                                 metatitle = 'adminIfaRegSlogan'
// 							/>
//                         </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class={`inputCols ${exchange && exchange.length > 0 ? '' : 'removeDisabled' }`}>
//                                 <div class='inputFld '>
//                                     <Field component={GeneralField} type="select"
//                                         placeholder = 'Select'
//                                         outerDivClass="filter-section selectBox "
//                                         labelClass="label"
//                                         innerDivClass="filter-box left "
//                                         name="exchange"
//                                         selectedOpt={selectedExchange}
//                                         options={exchange}
//                                         valueName="value"
//                                         labelName="label"
//                                         customTitle = 'Exchange :'
//                                         onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','exchange',obj['value'].toString()));props.onExChangeSelection(obj)}}
//                                         metatitle = 'adminIfaRegExchange'
//                                     />
//                                 </div>
//                             </div>
//                          <div class="inputCols">
//                              <div class='inputFld mTop10'>
//                                  {props.ifaNotification.showNseFirstFetchButton && props.ifaNotification.showNseFirstFetchButton.showButton && props.nseOpted &&
//                                      <div class="btnsContainer fl noMargin pRight10">
//                                          <button onClick={(e) => { e.preventDefault(); props.GetIINDetailsByBidAPICall() }} metatitle = 'adminIfaRegNseFirstFetch'>NSE First Fetch</button>
//                                      </div>
//                                  }

//                                  {props.ifaNotification.showBseFirstFetchButton && props.ifaNotification.showBseFirstFetchButton.showButton && props.bseOpted &&
//                                      <div class="btnsContainer fl noMargin">
//                                          <button onClick={(e) => { e.preventDefault(); props.openArnListPopUp() }} metatitle = 'adminIfaRegBseFirstFetch'>BSE First Fetch</button>
//                                      </div>
//                                  }
//                              </div>
//                          </div>                            
//                         </div>
//                         <div class={(props && props.people=="executive") ? "removeDisabled" : ''}>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Address 1 :</label>
//                                 <Field
//                                     name="address1"
//                                     type="text"
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegFirstAddress'
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Address 2 :</label>
//                                 <Field
//                                     name="address2"
//                                     type="text"
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegSecondAddress'
//                                 >
//                                 </Field>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Address 3 :</label>
//                                 <Field
//                                     name="address3"
//                                     type="text"
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegThirdAddress'
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <div class="inputFld">
//                                     <div class="filter-section selectBox">
//                                         <SearchFilter placeholder="Select State"
//                                         customTitle="State :"
//                                         name="state"
//                                         inputclass="input-group-field selector inputgrp"
//                                         selectedOpt={props.selectedOpt}
//                                         onOptionSelection={(obj)=> props.onOptionSelection(obj,'state') }
//                                         component={FieldComponentOfForm}
//                                         options={INDIAN_STATES}
//                                         isSearchEnable={true}
//                                         placeholderForInput='Search...'
//                                         metatitle = 'adminIfaRegState'
//                                         >
//                                         </SearchFilter>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">City :</label>
//                                 <Field
//                                     name="city"
//                                     type="text"
//                                     maxlength= '25'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegCity'
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Pin :</label>
//                                 <Field
//                                     name="pin"
//                                     type="text"
//                                     maxlength= '8'
//                                     component={FieldComponentOfForm}
//                                     validate = {[formValidator.numberOnly]}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegPin'
//                                 >
//                                 </Field>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Tel No1 :</label>
//                                 <Field
//                                     name="telNo1"
//                                     type="text"
//                                     maxlength= '25'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegFirstTelNo'
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Tel No2 :</label>
//                                 <Field
//                                     name="telNo2"
//                                     type="text"
//                                     maxlength= '25'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegSecondTelNo'
//                                 >
//                                 </Field>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Mobile No1 :</label>
//                                 <Field
//                                     name="mobileNo1"
//                                     type="text"
//                                     maxlength= '25'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegFirstMobNo'
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Mobile No2 :</label>
//                                 <Field
//                                     name="mobileNo2"
//                                     type="text"
//                                     maxlength= '25'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegSecondMobNo'
//                                 >
//                                 </Field>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Website :</label>
//                                 <Field
//                                     name="website"
//                                     type="text"
//                                     maxlength= '150'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegWebsite'
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <div class="inputFld">
//                                     <div class="filter-section selectBox">
//                                         <SearchFilter placeholder="Select Theme"
//                                         customTitle="Theme :"
//                                         name="theme"
//                                         inputclass="input-group-field selector inputgrp"
//                                         selectedOpt= {props.selectedTheme}
//                                         labelName = 'key'
//                                         onOptionSelection={(obj)=> props.onThemeSelection(obj) }
//                                         component={FieldComponentOfForm}
//                                         options={THEMES}
//                                         metatitle = 'adminIfaRegTheme'
//                                         >
//                                         </SearchFilter>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {/*<div class="formRows colsSec">
//                                                     <div class="inputCols">
//                                                         <label class="label">Broker Limit :</label>
//                                                         <Field
//                                                             name="brokerLimit"
//                                                             type="text"
//                                                             component={FieldComponentOfForm}
//                                                             validate = {[formValidator.number]}
//                                                         >
//                                                         </Field>
//                                                     </div>
//                                                     <div class="inputCols">
//                                                         <label class="label">Client Limit :</label>
//                                                         <Field
//                                                             name="clientLimit"
//                                                             type="text"
//                                                             component={FieldComponentOfForm}
//                                                             validate = {[formValidator.number]}
//                                                         >
//                                                         </Field>
//                                                     </div>
//                                                 </div>*/}
//                         {/* <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">feVendorid :</label>
//                                 <Field
//                                     name="feVendorid"
//                                     type="text"
//                                     maxlength= '30'
//                                     component={FieldComponentOfForm}
//                                 >
//                                 </Field>
//                             </div>
//                            <div class="inputCols">
//                                <label class="label">feUsername :</label>
//                                <Field
//                                    name="feUsername"
//                                    type="text"
//                                    maxlength= '30'
//                                    component={FieldComponentOfForm}
//                                >
//                                </Field>
//                            </div>
//                         </div>*/}
//                         {/*<div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">feUserPass :</label>
//                                 <Field
//                                     name="feUserPass"
//                                     type="text"
//                                     maxlength= '30'
//                                     component={FieldComponentOfForm}
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">feActive :</label>
//                                 <Field
//                                     name="feActive"
//                                     type="text"
//                                     maxlength= '5'
//                                     component={FieldComponentOfForm}
//                                 >
//                                 </Field>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">TDS Rate :</label>
//                                 <Field
//                                     name="tdsRate"
//                                     type="text"
//                                     component={FieldComponentOfForm}
//                                     validate = {[formValidator.number]}
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">TXN Min Bill :</label>
//                                 <Field
//                                     name="txnMinBill"
//                                     type="text"
//                                     maxlength= '19'
//                                     component={FieldComponentOfForm}
//                                     validate = {[formValidator.numberDecimal]}
//                                 >
//                                 </Field>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">TXN Max Bill :</label>
//                                 <Field
//                                     name="txnMaxBill"
//                                     type="text"
//                                     maxlength= '19'
//                                     component={FieldComponentOfForm}
//                                     validate = {[formValidator.numberDecimal]}
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">AUM Min Bill :</label>
//                                 <Field
//                                     name="aumMinBill"
//                                     type="text"
//                                     maxlength= '19'
//                                     component={FieldComponentOfForm}
//                                     validate = {[formValidator.numberDecimal]}
//                                 >
//                                 </Field>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">AUM Max Bill :</label>
//                                 <Field
//                                     name="aumMaxBill"
//                                     type="text"
//                                     maxlength= '19'
//                                     component={FieldComponentOfForm}
//                                     validate = {[formValidator.numberDecimal]}
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Alert After :</label>
//                                 <Field
//                                     name="alertAfter"
//                                     type="text"
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                 >
//                                 </Field>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Bench Mark Opt :</label>
//                                 <Field
//                                     name="benchMarkOpt"
//                                     type="text"
//                                     maxlength= '1'
//                                     component={FieldComponentOfForm}
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">cinNo :</label>
//                                 <Field
//                                     name="cinNo"
//                                     type="text"
//                                     maxlength= '25'
//                                     component={FieldComponentOfForm}
//                                 >
//                                 </Field>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Signatory :</label>
//                                 <Field
//                                     name="signatory"
//                                     type="text"
//                                     maxlength= '255'
//                                     component={FieldComponentOfForm}
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">TAN No :</label>
//                                 <Field
//                                     name="tanNo"
//                                     type="text"
//                                     maxlength= '15'
//                                     component={FieldComponentOfForm}
//                                 >
//                                 </Field>
//                             </div>
//                         </div>

//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <label class="label">Slogan :</label>
//                                 <Field
//                                     name="slogan"
//                                     type="text"
//                                     maxlength= '100'
//                                     component={FieldComponentOfForm}
//                                 >
//                                 </Field>
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">RM Heading For Report :</label>
//                                 <Field
//                                     name="rmHeadingForReport"
//                                     type="text"
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                 >
//                                 </Field>
//                             </div>
//                         </div>*/}
//                         <div class="formRows colsSec">
//                            {/* <div class="inputCols">
//                                <label class="label">pdfSecopt :</label>
//                                <Field
//                                    name="pdfSecopt"
//                                    type="text"
//                                    maxlength= '9'
//                                    component={FieldComponentOfForm}
//                                    validate = {[formValidator.numberOnly]}
//                                >
//                                </Field>
//                            </div>*/}
                            
//                             <div class="inputCols">
//                                 <div class='inputFld'>
//                                     <Field component={GeneralField} type="select" 
//                                         placeholder = 'Select'
//                                         outerDivClass="filter-section selectBox " 
//                                         labelClass="label"
//                                         innerDivClass="filter-box left "
//                                         name="sendBirthdayMails"
//                                         selectedOpt={props.selectedSendBirthdayMails}
//                                         options={SEND_BIRTHDAY_MAIL_OPTIONS} 
//                                         customTitle="Send Birthday Mails :"
//                                         valueName="value"
//                                         labelName="label"
//                                         onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','sendBirthdayMails',obj['value']));props.onSendBirthdayMailsSelection(obj);}}
//                                         autoComplete = 'off'
//                                         metatitle = 'adminIfaRegBirthDayMail'
//                                     />
//                                 </div>
//                             </div>
//                             <div class="inputCols">
//                                 <div class='inputFld'>
//                                     <Field component={GeneralField} type="select" 
//                                         placeholder = 'Select'
//                                         customTitle = 'Password Protected PDF (With PAN No.) :'
//                                         outerDivClass="filter-section selectBox " 
//                                         labelClass="label"
//                                         innerDivClass="filter-box left "
//                                         name="isPdfProtected"
//                                         selectedOpt={props.selectedProtectedPDFOption}
//                                         options={PROTECTED_PDF_OPTIONS} 
//                                         valueName="value"
//                                         labelName="label"
//                                         onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','isPdfProtected',obj['value']));props.onIsPDFProtectedOptionSelection(obj);}}
//                                         autoComplete = 'off'
//                                         metatitle = 'adminIfaRegPasswordPdf'
//                                     />
//                                 </div>
//                             </div>

//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <div class='inputFld'>
//                                     <Field component={GeneralField} type="select" 
//                                         placeholder = 'Select'
//                                         customTitle = 'Allow XLS Download :'
//                                         outerDivClass="filter-section selectBox " 
//                                         labelClass="label"
//                                         innerDivClass="filter-box left "
//                                         name="isAllowXLS"
//                                         selectedOpt={props.selectedXLSPreference}
//                                         options={XLS_PREFERENCE_OPTIONS} 
//                                         valueName="value"
//                                         labelName="label"
//                                         onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','isAllowXLS',obj['value']));props.onXLSPreferenceSelection(obj);}}
//                                         autoComplete = 'off'
//                                         metatitle = 'adminIfaRegAllowXlsDownload'
//                                     />
//                                 </div>
//                             </div>
//                             <div class="inputCols">
//                                 <div class='inputFld'>
//                                     <Field 
//                                         component={GeneralField} 
//                                         type="select" 
//                                         placeholder = 'Select'
//                                         customTitle = 'Activate Two Factor Authentication :'
//                                         outerDivClass="filter-section selectBox " 
//                                         labelClass="label"
//                                         innerDivClass="filter-box left "
//                                         name="allow2FactorAuth"
//                                         selectedOpt={props.selectedTwoFactorAuthOption}
//                                         options={TWO_FACTOR_AUTH_OPTIONS} 
                                        
//                                         valueName="value"
//                                         labelName="label"
//                                         onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','allow2FactorAuth',obj['value']));props.on2FactorOptionSelection(obj);}}
//                                         autoComplete = 'off'
//                                         metatitle = 'adminIfaRegTwoFactorAuth'
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
//                             <div class="inputCols">
//                                 <div class='inputFld'>
//                                     <Field 
//                                         component={GeneralField} 
//                                         type="select" 
//                                         placeholder = 'Select'
//                                         customTitle = 'Direct Scheme :'
//                                         outerDivClass="filter-section selectBox " 
//                                         labelClass="label"
//                                         innerDivClass="filter-box left "
//                                         name="directScheme"
//                                         selectedOpt={props.selectedDirectScheme}
//                                         options={DIRECT_SCHEME_OPTIONS} 
                                        
//                                         valueName="value"
//                                         labelName="label"
//                                         onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','directScheme',obj['value']));props.onDirectSchemeSelection(obj);}}
//                                         autoComplete = 'off'
//                                         metatitle = 'adminIfaRegDirectScheme'
//                                     />
//                                 </div>
//                             </div>

//                             <div class="inputCols">
//                                 <label class="label">Remarks :</label>
//                                 <Field
//                                     name="remarks"
//                                     type="text"
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     metatitle = 'adminIfaRegRemarks'
//                                 >
//                                 </Field>
//                             </div>
//                             {/*<Field outerDivClass={`inputCols  midLever `}
//                                                         labelClass="label"
//                                                         innerDivClass="inputFld"
//                                                         name="euin"
//                                                         type="text" 
//                                                         component={GeneralField}
//                                                         label="EUIN :"
//                                                         autoComplete = 'off'
//                                                     />*/}

//                         </div>
//                        {/* <div class="formRows colsSec">
//                            <div class="inputCols">
//                                <label class="label">CC Mail ID :</label>
//                                <Field
//                                    name="ccMailid"
//                                    type="text"
//                                    maxlength= '70'
//                                    component={FieldComponentOfForm}
//                                    validate = {[formValidator.emailRegex]}
//                                >
//                                </Field>
//                            </div>
//                            <div class="inputCols">
//                                <label class="label">cagr Method :</label>
//                                <Field
//                                    name="cagrMethod"
//                                    type="text"
//                                    maxlength= '2'
//                                    component={FieldComponentOfForm}
//                                >
//                                </Field>
//                            </div>
//                        </div>*/}
//                        <div class="formRows colsSec">
                            
//                             <div class="inputCols">
//                                 <div class='inputFld'>
//                                     <Field component={GeneralField} type="select" 
//                                         placeholder = 'Select'
//                                         customTitle = 'IsPaid :'
//                                         outerDivClass="filter-section selectBox " 
//                                         labelClass="label"
//                                         innerDivClass="filter-box left "
//                                         name="isPaid"
//                                         selectedOpt={props.selectedSubscriptionFlag}
//                                         options={SUBSCRIPTION_EXPIRATION} 
//                                         valueName="value"
//                                         labelName="label"
//                                         onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','isPaid',obj['value']));props.subscriptionExpiration(obj);}}
//                                         autoComplete = 'off'
//                                         metatitle = 'adminIfaRegIsPaid'
//                                     />
//                                 </div>
//                             </div>
//                             <div class="inputCols">
//                                 <div class='inputFld '>
//                                 {props.isActiveStatus && <Field component={GeneralField} type="select"
//                                     placeholder = 'Select'
//                                     outerDivClass="filter-section selectBox "
//                                     labelClass="label"
//                                     innerDivClass="filter-box left "
//                                     name="isActive"
//                                     selectedOpt={props.isActiveStatus}
//                                     options={USER_ACTIVE_STATUS}
//                                     customTitle="Active :"
//                                     valueName="value"
//                                     labelName="label"
//                                     onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','isActive',obj['value'].toString()));props.isActiveStatusSelection(obj)}}
//                                     metatitle = 'adminIfaRegActive'
//                                 />}
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
                            
//                             <div class="inputCols">
//                                 <div class='inputFld '>
//                                     <div class="inputCols">
//                                         <Field component={GeneralField} type="select"
//                                             outerDivClass="filter-section selectBox "
//                                             labelClass="label"
//                                             innerDivClass="filter-box left "
//                                             name="isMigration"
//                                             selectedOpt={props.isMigration}
//                                             options={TRUE_FALSE_COMMON}
//                                             customTitle="Migration :"
//                                             valueName="value"
//                                             labelName="label"
//                                             onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','isMigration',obj['value'].toString()));props.isMigrationSelection(obj)}}
//                                             metatitle = 'adminIfaRegMigration'
//                                         />
//                                     </div>
//                                     {(props.isMigration && props.isMigration.value ==TRUE_FALSE_COMMON[0].value) && <div class="btnsContainer fr">
//                                         <button onClick={(e)=>{e.preventDefault(); props.tableFiltersAction( props.ifaRegistrationInfo, 'migration')}}>Run Migration</button>
//                                     </div>}
//                                 </div>
//                             </div>
//                             <div class="inputCols">
//                                 <div class='inputFld '>
//                                     <Field component={GeneralField} placeholder="Select Service RM"
//                                         type="select"
//                                         labelClass="label"
//                                         innerDivClass="filter-box left "
//                                         outerDivClass="filter-section selectBox "
//                                         name="executiveAdminUid"
//                                         selectedOpt={props.selectedAdminExecutives}
//                                         options={props.adminExecutives}
//                                         customTitle="Service RM"
//                                         valueName="uid"
//                                         labelName="name"
//                                         autoComplete='off'
//                                         onOptionSelection={(obj) => { props.dispatch(change('IFARegistrationForm', 'executiveAdminUid', obj['uid'])); props.adminExecutivesSelection(obj) }}
//                                         metatitle = 'adminIfaRegServiceRm'
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
                            
//                             <div class="inputCols">
//                                 <div class='inputFld '>
//                                     <Field component={GeneralField} type="select"
//                                         outerDivClass="filter-section selectBox "
//                                         labelClass="label"
//                                         innerDivClass="filter-box left "
//                                         name="showOneDayChange"
//                                         selectedOpt={props.showOneDayChange}
//                                         options={TRUE_FALSE_COMMON}
//                                         customTitle="Show 1 Day Change :"
//                                         valueName="value"
//                                         labelName="label"
//                                         onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','showOneDayChange',obj['value'].toString()));props.onOptionSelection(obj, 'showOneDayChange')}}
//                                         metatitle = 'adminIfaRegOneDayChange'
//                                     />
//                                 </div>
//                             </div>
//                              <div class="inputCols">
//                                 <div class='inputFld '>
//                                 <Field component={GeneralField} type="select"
//                                     placeholder = 'Select'
//                                     outerDivClass="filter-section selectBox "
//                                     labelClass="label"
//                                     innerDivClass="filter-box left "
//                                     name="domainURL"
//                                     selectedOpt={props.domainURL}
//                                     options={DOMAIN_URL}
//                                     customTitle="Domain URL :"
//                                     valueName="value"
//                                     labelName="label"
//                                     onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','domainURL',obj['value'].toString()));props.onOptionSelection(obj, 'domainURL')}}
//                                     metatitle = 'adminIfaRegDomainUrl'
//                                 />
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec">
                           
//                             <div class="inputCols">
//                                 <div class='inputFld'>
//                                     <Field component={GeneralField} type="select" 
//                                         placeholder = 'Select'
//                                         outerDivClass="filter-section selectBox " 
//                                         labelClass="label"
//                                         innerDivClass="filter-box left "
//                                         name="sendAnniversaryMails"
//                                         selectedOpt={props.selectedSendAnniversaryMails}
//                                         options={SEND_BIRTHDAY_MAIL_OPTIONS} 
//                                         customTitle="Send Anniversary Mails :"
//                                         valueName="value"
//                                         labelName="label"
//                                         onOptionSelection ={(obj)=>{props.dispatch(change('IFARegistrationForm','sendAnniversaryMails',obj['value']));props.onSendAnniversaryMailsSelection(obj);}}
//                                         autoComplete = 'off'
//                                         metatitle = 'adminIfaRegAnniversaryMails'
//                                     />
//                                 </div>
//                             </div>
//                          <div class="inputCols">
//                              <div class='inputFld '>
//                                  {(props.people != "executive") && (props.isSharded == 0) && <div class={`btnsContainer fr ${props.isShardingEnabled && props.isShardingEnabled == 1 ? 'disabledArea' : ''}`}>
//                                      <button onClick={(e) => { e.preventDefault(); props.tableFiltersAction(props.ifaRegistrationInfo, 'shardMe') }} metatitle = 'adminIfaRegShardMe'>Shard Me</button>
//                                  </div>}
//                              </div>
//                          </div>
//                         </div>
//                        </div>
//                         <div class={`btnsContainer ${(activeURLCheck && (ifaNotification && ifaNotification.customUrlData && ifaNotification.customUrlData.urlAvaliability == 0)) ? 'removeDisabled' : ''}`}>
//                         <button type="submit" metatitle = 'adminIfaRegSubmit'>Submit</button>
//                         </div>
//                     </form>
//                     {props.submitMsg==false&&<span class="submitMsg errorMsg">{props.errorMsg}</span>}
//                     {props.submitMsg==true&&<span class="submitMsg successMsg">Successfully Created</span>}
//                 </div>
//             </li>

//     )

// }
// function mapStateToProps(state, props){
//     let satateValue={
//         initialValues: Object.assign({}, props.ifaRegistrationInfo)
//     }
//     return satateValue;
// }
// IFARegistrationForm = reduxForm({
//     form:'IFARegistrationForm',
//     enableReinitialize:true,keepDirtyOnReinitialize: true

// })(IFARegistrationForm)

// // const selector = formValueSelector('IFARegistrationForm');

// IFARegistrationForm = connect(
//     mapStateToProps
// )(IFARegistrationForm)

// export default IFARegistrationForm;
