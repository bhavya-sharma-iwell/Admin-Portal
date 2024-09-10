// import React from 'react'
// import {connect} from 'react-redux'
// import {Field, reduxForm, formValueSelector,change} from 'redux-form'
// import {FieldComponentOfForm,GeneralField} from 'app/uiCollection/shared/form/formField'
// import * as formValidator from 'app/uiCollection/shared/form/validation'
// import {RIA_LIST} from 'app/constants/broker/brokerDashboardConst'
// import {COMPOSITE_GST,TRUE_FALSE_COMMON} from 'app/constants/shared/commonConst'
// import {ShowDateFormater} from 'app/utils/dataFormater'
// import Loader from 'app/uiCollection/shared/loaders'
// import {LOADER_WIDTH} from 'app/constants/shared/commonConst'

// let ArnForm = (props) => {  
//         let finalArnData =[]
//         finalArnData = props.arnNoData.concat(props.arnInitInfo);    
//     return(
        
//             <li class={` ${(props.openTab == 3 && 'openTabs' ) || (!props.activeAllFrm && 'removeDisabled') }`}>
//                 <h2 class="heading" onClick={()=>props.openAccordionTabs(3)} metatitle = 'adminIfaArnHeading'>ARN</h2>
//                 <div class="tabsContainers">
//                     {props.verifyCredentialsLoader && 
//                         <Loader
//                             loaderType = 'line'
//                             loaderWidth = { LOADER_WIDTH[2].width }
//                             loaderHeight = { LOADER_WIDTH[2].height }
//                         />
//                     }
//                     {props.submitMsg==false&&<span class="submitMsg errorMsg">{props.errorMsg}</span>}
//                     {props.submitMsg==true&&<span class="submitMsg successMsg">ARN Created Successfully</span>}
//                     {(props.activeActionBox || props.arnInitInfo !=0 ) && <div>
//                     {(props.duplicateArnData==true) && <span class="submitMsg errorMsg">ArnNo is already present</span>}    
//                     {((props.showMsgDeleteArn==true) && (props.arnDeleteMsg && props.arnDeleteMsg.status==0))&&<span class="submitMsg successMsg">{props.arnDeleteMsg && props.arnDeleteMsg.message}</span>}
//                     {((props.showMsgDeleteArn==true) && (props.arnDeleteMsg && props.arnDeleteMsg.status== -1)) && <span class="submitMsg errorMsg">{props.arnDeleteMsg && props.arnDeleteMsg.message}</span>}
                    
//                     <div class="formRows colsSec noMargin"><div class="tableListing boxShadow resultBox noMargin">
//                          <div class="filterResult">
//                             <span>ARN: </span>
//                              {finalArnData.map((arn, index) => (
//                             <span key={index} class="filterList hidePseudoOpts active" ><span onClick={(e) => {props.getArnData(arn); props.onEditForm(arn)}} metatitle = {`adminIfaArn${arn && arn.arnNo}`}>{arn && arn.arnNo}</span> <span class="closeBtn" onClick={()=>props.deleteArnNoCrossBtn(arn)} metatitle = {`adminIfaArn${arn && arn.arnNo}Close`}>X</span> </span>
//                         ))}   
//                         {props.showActionBtns &&<div class="btnsContainer btnInFilterArea fr"><button type="button" onClick= {(e) => props.sendRegistrationData(e)} metatitle = 'adminIfaArnSendRegData'>Done</button>
//                         </div>}
//                          </div>

//                     </div>
                    
//                     </div>
//                         {/*<span>ARN No:</span>*/} 
//                             {/*finalArnData.length>0 && <ul>
//                                 {finalArnData.map((arn, index) => (
//                                     <li key={index} onClick={(e) => props.getArnData(arn)}>{arn.arnNo}</li>
//                                 ))}                            
//                             </ul>*/}
                        
//                         {/*props.showActionBtns &&<div class="btnsContainer"><button type="button" onClick= {(e) => props.sendRegistrationData(e)} >Done</button>
//                         </div>*/}
//                     </div>}
//                     <form onSubmit={(e) => props.handleSubmit(e)} id='registrationForm'>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label mLeft5">ARN No <span class="mandate">*</span> : </label>
//                                 <Field
//                                     name='arnNo'
//                                     type='text'
//                                     maxlength= '15'
//                                     component={GeneralField}
//                                     validate={[formValidator.required, formValidator.spaceSpecialCharNotAllowedExceptHyphen]}
//                                     autoComplete = 'off'
//                                     onChange={(e)=>props.arnValidation(e)}
//                                     onBlur={(e)=>props.checkArnAvailablility(e)}
//                                     metatitle = 'adminIfaArnArnNo'
//                                 />
//                                 {props.availableArn && props.availableArn.arnMessage && <div class="errorMsg message">{props.availableArn.arnMessage}</div>}
//                             </div>
//                             <div class="inputCols">
//                             <Field id='dropdown' component={GeneralField} type="select" 
//                                 placeholder = 'Select RIA'
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="isRIA"
//                                 selectedOpt={props.selectedRiaOpt}
//                                 options={RIA_LIST} 
//                                 customTitle="RIA"
//                                 valueName="value"
//                                 labelName="label"
//                                 // onChange={(e)=>props.camsData(e)}
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj)=>{props.dispatch(change('ArnForm','isRIA', obj['value']));props.onOptionSelection(obj,'isRIA');}}
//                                 metatitle = 'adminIfaArnIsRia'
//                               />
//                              {(props.arnErrorMsg) && (props.selectedRiaOpt.value) && <span class= "message errorMsg">Cannot be YES if ARN is entered</span>}
//                               </div>
//                               <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select Composite'
                                
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="compositeGst"
//                                 selectedOpt={props.selectedCompositeGst}
//                                 options={COMPOSITE_GST} 
//                                 customTitle="Composite Gst"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 // onChange={(e)=>props.verifyData(e)}
//                                 onOptionSelection ={(obj)=>{props.dispatch(change('ArnForm','compositeGst', obj['value']));props.onOptionSelection(obj,'compositeGst');}}
//                                 metatitle = 'adminIfaArnCompositeGst'
//                               />
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">Cams Email : </label>
//                                 <Field
//                                     name='camsEmail'
//                                     type='text'
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     validate={[formValidator.emailRegex, formValidator.whiteSpace]}
//                                     autoComplete = 'off'
//                                     onChange={(e)=>props.camsData(e)}
//                                     metatitle = 'adminIfaArnCamsEmail'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Cams Trxn Ref : </label>
//                                 <Field
//                                     name='camsTxnRefNo'
//                                     type='text'
//                                     maxlength= '20'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.camsData(e)}
//                                     metatitle = 'adminIfaArnCamsTxnRefNo'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Cams Folio Ref : </label>
//                                 <Field
//                                     name='camsFolioRefNo'
//                                     type='text'
//                                     maxlength= '20'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.camsData(e)}
//                                     metatitle = 'adminIfaArnCamsFolioRefNo'
//                                 />
//                             </div>
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">Cams SIP Terminated Ref : </label>
//                                 <Field
//                                     name='camsSipTerminatedRefNo'
//                                     type='text'
//                                     maxlength= '20'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.camsData(e)}
//                                     metatitle = 'adminIfaArnCamsSipTerminatedRefNo'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Cams SIP Ref : </label>
//                                 <Field
//                                     name='camsSIPRefNo'
//                                     type='text'
//                                     maxlength= '20'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.camsData(e)}
//                                     metatitle = 'adminIfaArnCamsSIPRefNo'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 {/* <label class="label">Karvy Email : </label>
//                                 <Field
//                                     name='karvyEmail'
//                                     type='text'
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     validate={formValidator.emailRegex}
//                                     autoComplete = 'off'
//                                 /> */}
//                             <div class='btnsContainer btnsWithMessage txtRight smlFltrsBtns mRightNone btnsMdl'>
//                                 {props.camsEmailVerified && props.camsEmailVerified.message }
//                                 <button type="button" class={`btnsContainer verifyButton ${props.camsEmailVerified && props.camsEmailVerified.verified ? 'removeDisabled' : ''}`} onClick={()=>props.sendParentData('camsProp')} metatitle = 'adminIfaArnCamsProp'>Verify</button>
//                             </div>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">Karvy UID : </label>
//                                 <Field
//                                     name='karvyUID'
//                                     type='text'
//                                     maxlength= '40'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     onChange={(e)=>props.karvyData(e)}
//                                     validate = {[formValidator.inBetweenWhiteSpace]}
//                                     metatitle = 'adminIfaArnKarvyUID'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Karvy Email : </label>
//                                 <Field
//                                     name='karvyEmail'
//                                     type='text'
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     validate={[formValidator.emailRegex, formValidator.whiteSpace]}
//                                     autoComplete = 'off'
//                                     // onChange={(e)=>props.karvyData(e)}
//                                     metatitle = 'adminIfaArnKarvyEmail'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Karvy Password : </label>
//                                 <Field
//                                     name='karvyPassword'
//                                     type='text'
//                                     maxlength= '30'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     onChange={(e)=>props.karvyData(e)}
//                                     validate = {[formValidator.whiteSpace]}
//                                     metatitle = 'adminIfaArnKarvyPassword'
//                                 />
//                             </div>
//                             {/* <div class="inputCols">
//                                 <label class="label">Karvy Trxn Ref : </label>
//                                 <Field
//                                     name='karvyTxnRefNo'
//                                     type='text'
//                                     maxlength= '20'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                 />
//                             </div> */}
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">Karvy Folio Ref : </label>
//                                 <Field
//                                     name='karvyFolioRefNo'
//                                     type='text'
//                                     maxlength= '20'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.karvyData(e)}
//                                     metatitle = 'adminIfaArnKarvyFolioRefNo'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Karvy SIP Reg Ref : </label>
//                                 <Field
//                                     name='karvySIPRegisteredRefNo'
//                                     type='text'
//                                     maxlength= '20'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.karvyData(e)}
//                                     metatitle = 'adminIfaArnKarvySIPRegisteredRefNo'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Karvy SIP Term Ref : </label>
//                                 <Field
//                                     name='karvySIPTerminatedRefNo'
//                                     type='text'
//                                     maxlength= '20'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.karvyData(e)}
//                                     metatitle = 'adminIfaArnKarvySIPTerminatedRefNo'
//                                 />
//                             </div>
//                         </div>

//                         <div class="formRows colsSec colSpan3">
//                              <div class="inputCols">
//                                 <label class="label">Karvy Trxn Ref : </label>
//                                 <Field
//                                     name='karvyTxnRefNo'
//                                     type='text'
//                                     maxlength= '20'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.karvyData(e)}'
//                                     metatitle = 'adminIfaArnKarvyTxnRefNo'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">&nbsp;</label>
//                             </div>
//                             <div class="inputCols">
//                                 <div class='btnsContainer btnsWithMessage txtRight smlFltrsBtns mRightNone btnsMdl'>
//                                     {props.karvyEmailVerified && props.karvyEmailVerified.message }
//                                     <button type="button" class={`btnsContainer verifyButton ${props.karvyEmailVerified && props.karvyEmailVerified.verified ? 'removeDisabled' : ''}`} onClick={()=>props.sendParentData('karvyProps')} metatitle = 'adminIfaArnKarvyProps'>Verify</button>
//                                 </div>
//                             </div>
//                         </div>   

                        
//                         {/*<div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label"> Sundaram Email : </label>
//                                 <Field
//                                     name='sundaramEmail'
//                                     type='text'
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     validate={formValidator.emailRegex}
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Sundaram UID : </label>
//                                 <Field
//                                     name='sundaramUID'
//                                     type='text'
//                                     maxlength= '30'
//                                     component={FieldComponentOfForm}
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Sundaram Password : </label>
//                                 <Field
//                                     name='sundaramPassword'
//                                     type='text'
//                                     maxlength= '30'
//                                     component={FieldComponentOfForm}
//                                 />
//                             </div>
//                         </div>*/}

//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">Fundsnet Username : </label>
//                                 <Field
//                                     name='fundsNetUsername'
//                                     type='text'
//                                     maxlength= '30'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     onChange={(e)=>props.fundsnetData(e)}
//                                     metatitle = 'adminIfaArnFundsNetUsername'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Fundsnet Password : </label>
//                                 <Field
//                                     name='fundsNetPassword'
//                                     type='text'
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     onChange={(e)=>props.fundsnetData(e)}
//                                     metatitle = 'adminIfaArnFundsNetPassword'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Fundsnet Security Answer: </label>
//                                 <Field
//                                     name='fundsNetSecurityAnswer'
//                                     type='text'
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     onChange={(e)=>props.fundsnetData(e)}
//                                     metatitle = 'adminIfaArnFundsNetSecurityAnswer'
//                                 />
//                             </div>
//                         </div>
//                         <div class="formRows">
//                             <div class='btnsContainer btnsWithMessage txtRight smlFltrsBtns mRightNone'>
//                                 {props.fundsNetEmailVerified && props.fundsNetEmailVerified.message }
//                                 <button type="button" class={`btnsContainer verifyButton ${props.fundsNetEmailVerified && props.fundsNetEmailVerified.verified ? 'removeDisabled' : ''}`} onClick={()=>props.sendParentData('fundsnetProps')} metatitle = 'adminIfaArnFundsnetProps'>Verify</button>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">Edge360 Username : </label>
//                                 <Field
//                                     name='edge360Username'
//                                     type='text'
//                                     maxlength= '30'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     onChange={(e)=>props.edge360Data(e)}
//                                     metatitle = 'adminIfaArnEdge360Username'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Edge360 Password : </label>
//                                 <Field
//                                     name='edge360Password'
//                                     type='text'
//                                     maxlength= '30'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     onChange={(e)=>props.edge360Data(e)}
//                                     metatitle = 'adminIfaArnEdge360Password'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Edge360 Security Answer : </label>
//                                 <Field
//                                     name='edge360SecurityAnswer'
//                                     type='text'
//                                     maxlength= '20'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     onChange={(e)=>props.edge360Data(e)}
//                                     metatitle = 'adminIfaArnEdge360SecurityAnswer'
//                                 />
//                             </div>
//                         </div>
//                         <div class="formRows">
//                             <div class='btnsContainer btnsWithMessage txtRight smlFltrsBtns mRightNone'>
//                                 {props.edge360EmailVerified && props.edge360EmailVerified.message }
//                                 <button type="button" class={`btnsContainer verifyButton ${props.edge360EmailVerified && props.edge360EmailVerified.verified ? 'removeDisabled' : ''}`} onClick={()=>props.sendParentData('Edge360')} metatitle = 'adminIfaArnFundsnetProps'>Verify</button>
//                             </div>
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">GST : </label>
//                                 <Field
//                                     name='gst'
//                                     type='text'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnGst'  
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">CIN : </label>
//                                 <Field
//                                     name='cin'
//                                     type='text'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnCin'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">SAC: </label>
//                                 <Field
//                                     name='sac'
//                                     type='text'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnSac'
//                                 />
//                             </div>
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">TAN : </label>
//                                 <Field
//                                     name='tan'
//                                     type='text'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnTan'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Bill Note : </label>
//                                 <Field
//                                     name='billNote'
//                                     type='text'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnBillNote'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Signatory: </label>
//                                 <Field
//                                     name='signatory'
//                                     type='text'
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnSignatory'
//                                 />
//                             </div>
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">PAN : </label>
//                                 <Field
//                                     name='pan'
//                                     type='text'
//                                     validate={[formValidator.PanRegex, formValidator.whiteSpace]}
//                                     maxlength={10}
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnPan'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Phone : </label>
//                                 <Field
//                                     name='phone'
//                                     type='text'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnPhone'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Email: </label>
//                                 <Field
//                                     name='email'
//                                     type='text'
//                                     maxlength= '50'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     validate={[formValidator.emailRegex, formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnEmail'
//                                 />
//                             </div>
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">Address 1 : </label>
//                                 <Field
//                                     name='address1'
//                                     type='text'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnFirstAddress'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Address 2 : </label>
//                                 <Field
//                                     name='address2'
//                                     type='text'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnSecondAddress'
//                                 />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">Address 3: </label>
//                                 <Field
//                                     name='address3'
//                                     type='text'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnThirdAddress'
//                                 />
//                             </div>
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                               <Field component={GeneralField} type="select" 
//                                 placeholder = 'Select State'
//                                 customTitle = "State"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="stateCode"
//                                 selectedOpt={props.selectedStateCode}
//                                 options={props.stateMaster} 
//                                 valueName="stateCode"
//                                 labelName="stateName"
//                                 autoComplete = 'off'
//                                 isSearchEnable={true}
//                                 onOptionSelection ={(obj)=>{props.dispatch(change('ArnForm','stateCode', obj['stateCode']));props.onOptionSelection(obj,'stateCode');}}
//                                 resetSearchField = {props.resetSearchField}
//                                 // onChange={(e)=>props.verifyData(e)}
//                                 metatitle = 'adminIfaArnState'
//                               />
//                               {props.stateCodeError && <div class="errorMsgFontSize errorMsg message">Required</div>}
//                             </div>
//                             <div class="inputCols">
//                               <label class="label">EUIN : </label>
//                               <Field
//                                   name='euin'
//                                   type='text'
//                                   component={FieldComponentOfForm}
//                                   autoComplete = 'off'
//                                   validate = {[formValidator.whiteSpace]}
//                                 //   onChange={(e)=>props.verifyData(e)}
//                                 metatitle = 'adminIfaArnEuin'
//                               />
//                             </div>
//                             <div class="inputCols">
//                                 <label class="label">City : </label>
//                                 <Field
//                                     name='city'
//                                     type='text'
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     maxlength={100}
//                                     validate = {[formValidator.whiteSpace]}
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnCity'
//                                 />
//                             </div>
                            
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                             <div class="inputCols">
//                                 <label class="label">Pin: </label>
//                                 <Field
//                                     name='pin'
//                                     type='text'
//                                     maxlength={30}
//                                     validate={[formValidator.pincodeRegex, formValidator.whiteSpace]}
//                                     component={FieldComponentOfForm}
//                                     autoComplete = 'off'
//                                     // onChange={(e)=>props.verifyData(e)}
//                                     metatitle = 'adminIfaArnPin'
//                                 />
//                             </div>

//                             <div class="inputCols singleDateFld">
//                                 <label class="label">WBR6 EndDate: </label>
//                                 <div class="react-datepicker-wrapper">
//                                     <div class="react-datepicker__input-container" metatitle = 'adminIfaArnEndDate'>
//                                         <Field innerDivClass="custom-calendar alighToLeft"
//                                             type="date"
//                                             peekNextMonth = {true}
//                                             showMonthDropdown = {true}
//                                             //maxDate={moment()}
//                                             showYearDropdown = {true}
//                                             selectStart = {true}
//                                             selectedDate = {props.wbrEndDate}
//                                             onDateSelection = {(e) => props.onDateChange(e,'endDate')}
//                                             component={FieldComponentOfForm}
//                                             //validate={[formValidator.required]}
//                                             name="wbr6EndDate"
//                                             // onChange={(e)=>props.verifyData(e)}
//                                         >        
//                                         </Field>
//                                     </div>
//                                 </div>
//                             </div>
//                             <Field id='dropdown' component={GeneralField} type="select" 
//                                 placeholder = 'Select'
//                                 outerDivClass="inputCols"
//                                 labelClass="label"
//                                 innerDivClass="inputFld"
//                                 selectBoxDivClass = "filter-section selectBox "
//                                 name="autoFileOrderingCams"
//                                 selectedOpt={props.selectedOrderCams}
//                                 options={TRUE_FALSE_COMMON} 
//                                 customTitle="Order Cams File"
//                                 valueName="value"
//                                 labelName="label"
//                                 autoComplete = 'off'
//                                 onOptionSelection ={(obj)=>{props.dispatch(change('ArnForm','autoFileOrderingCams', obj['value']));props.onOptionSelection(obj,'autoFileOrderingCams');}}
//                                 metatitle = 'adminIfaArnAutoFileOrderingCams'
//                               />
//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                               <Field id='dropdown' component={GeneralField} type="select" 
//                               placeholder = 'Select'
//                               outerDivClass="inputCols"
//                               labelClass="label"
//                               innerDivClass="inputFld"
//                               selectBoxDivClass = "filter-section selectBox "
//                               name="autoFileOrderingKarvy"
//                               selectedOpt={props.selectedOrderKarvy}
//                               options={TRUE_FALSE_COMMON} 
//                               customTitle="Order Karvy File"
//                               valueName="value"
//                               labelName="label"
//                               autoComplete = 'off'
//                               onOptionSelection ={(obj)=>{props.dispatch(change('ArnForm','autoFileOrderingKarvy', obj['value']));props.onOptionSelection(obj,'autoFileOrderingKarvy');}}
//                               metatitle = 'adminIfaArnAutoFileOrderingKarvy'
//                             />


//                             <Field id='dropdown' component={GeneralField} type="select" 
//                               placeholder = 'Select'
//                               outerDivClass="inputCols"
//                               labelClass="label"
//                               innerDivClass="inputFld"
//                               selectBoxDivClass = "filter-section selectBox "
//                               name="camsBrokerageAMCwise"
//                               selectedOpt={props.camsBrokerageAMCwise}
//                               options={TRUE_FALSE_COMMON} 
//                               customTitle="CAMS Brokerage Order AMC Wise"
//                               valueName="value"
//                               labelName="label"
//                               autoComplete = 'off'
//                               onOptionSelection ={(obj)=>{props.dispatch(change('ArnForm','camsBrokerageAMCwise', obj['value']));props.onOptionSelection(obj,'camsBrokerageAMCwise');}}
//                               metatitle = 'adminIfaArnCamsBrokerageAMCwise'
//                             />


//                             <Field id='dropdown' component={GeneralField} type="select" 
//                               placeholder = 'Select'
//                               outerDivClass="inputCols"
//                               labelClass="label"
//                               innerDivClass="inputFld"
//                               selectBoxDivClass = "filter-section selectBox "
//                               name="karvyBrokerageAMCwise"
//                               selectedOpt={props.karvyBrokerageAMCwise}
//                               options={TRUE_FALSE_COMMON} 
//                               customTitle="Karvy Brokerage Order AMC Wise"
//                               valueName="value"
//                               labelName="label"
//                               autoComplete = 'off'
//                               onOptionSelection ={(obj)=>{props.dispatch(change('ArnForm','karvyBrokerageAMCwise', obj['value']));props.onOptionSelection(obj,'karvyBrokerageAMCwise');}}
//                               metatitle = 'adminIfaArnKarvyBrokerageAMCwise'
//                             />


//                         </div>
//                         <div class="formRows colsSec colSpan3">
//                         <Field id='dropdown' component={GeneralField} type="select" 
//                               placeholder = 'Select'
//                               outerDivClass="inputCols"
//                               labelClass="label"
//                               innerDivClass="inputFld"
//                               selectBoxDivClass = "filter-section selectBox "
//                               name="defaultMfu"
//                               selectedOpt={props.selectedDefaultMfu}
//                               options={props.excludedArns ? [TRUE_FALSE_COMMON[1]] : TRUE_FALSE_COMMON} 
//                               customTitle="MFU default ARN"
//                               valueName="value"
//                               labelName="label"
//                               autoComplete = 'off'
//                               onOptionSelection ={(obj)=>{props.dispatch(change('ArnForm','defaultMfu', obj['value']));props.onOptionSelection(obj,'selectedDefaultMfu');}}
//                               metatitle = 'adminIfaArnDefaultMfu'
//                             />
//                         </div>
//                         {props.arnInitFldInfo && props.arnInitFldInfo.nseFirstFetchRemarks && <span class="submitMsg">{`NSE First Fetch Remarks: ${props.arnInitFldInfo.nseFirstFetchRemarks}`}</span>}
//                     <div class={`btnsContainer ${(props.arnErrorMsg) && (props.selectedRiaOpt.value) ? 'removeDisabled' : ''}`}>
//                         <button type="submit" metatitle = 'adminIfaArnSubmitForm'>Submit</button>
//                         {props.showActionBtns && <button type="button" onClick={(e) => props.sendRegistrationData(e)} metatitle = 'adminIfaArnSendRegistrationData'>Done</button>}
//                     </div>
//                     </form>
//                     {props.submitMsg==false&&<span class="submitMsg errorMsg">{props.errorMsg}</span>}
//                     {props.submitMsg==true&&<span class="submitMsg successMsg">ARN Created Successfully</span>}
//                 </div>
//             </li>
//     )

// }
// function mapStateToProps(state, props){
//     let arnInitFldInfo= Object.assign({}, props.arnInitFldInfo)
//     arnInitFldInfo.wbr6EndDate=ShowDateFormater(arnInitFldInfo.wbr6EndDate)
//     let satateValue={
//         initialValues: arnInitFldInfo
//     }
//     return satateValue;
// }
// ArnForm = reduxForm({
//     form:'ArnForm',
//     enableReinitialize:true,

// })(ArnForm)

// const selector = formValueSelector('ArnForm');

// ArnForm = connect(
//     mapStateToProps
// )(ArnForm)

// export default ArnForm;