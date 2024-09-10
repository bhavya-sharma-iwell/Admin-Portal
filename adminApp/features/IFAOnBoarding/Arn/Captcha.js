// import React from 'react'
// import { Field, reduxForm } from 'redux-form'
// import { connect } from 'react-redux'
// import { GeneralField } from 'app/uiCollection/shared/form/formField';
// import * as formValidator from 'app/uiCollection/shared/form/validation';
// import Loader from 'app/uiCollection/shared/loaders'
// import { LOADER_WIDTH } from 'app/constants/shared/commonConst'
// import ACLButton from 'app/uiCollection/shared/aclButton/button'
// import { FEATURE_PERMISSIONS } from 'app/constants'

// export const CaptchaForm = (props) => {
//     let loaderMessage = 'Sending Captcha...'
//     return (
//             <div id='popUpFullPage' class='posFixed'>
//                 <div class='contentmainArea posRelative smallSize'>
//                     {props.verifyCredentialsLoader && <Loader
//                         loaderType='line'
//                         loaderWidth={LOADER_WIDTH[2].width}
//                         loaderHeight={LOADER_WIDTH[2].height}
//                         loaderInnerPopupMessage={loaderMessage}
//                     />}
//                     <div class='popContainerArea heightChanges'>
//                         <div class='siteArea singleContainer'>
//                             <div class='rightContainer'>
//                                 <div class='formContainer'>
//                                     <form onSubmit={props.handleSubmit}>
//                                         <h2 class='txtCenter'> Enter CAPTCHA </h2>
//                                         <div class='formFldGroup txtCenter'>
//                                             <div id='svgCaptcha'></div>
//                                             <div class='formRows colsSec colSpan4'>
//                                                 <Field outerDivClass='inputCols span' labelClass='label'
//                                                     innerDivClass='inputFld' name='captchaText' type='text'
//                                                     component={GeneralField}
//                                                     placeholder='Enter CAPTCHA '
//                                                     validate={[formValidator.required]}
//                                                     autoComplete='off'
//                                                     format={(val) => val && val.toUpperCase()}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div class='btnsContainer'>
//                                             <ACLButton
//                                                 label='Submit'
//                                                 type='submit'
//                                                 method={FEATURE_PERMISSIONS[0]}
//                                             />
//                                             <button class='lightSky' type='button' onClick={() => props.closeCaptchaForm()} >Cancel</button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//     )
// }

// const mapStateToProps = (state, props) => {
//     return {
//         initialValues: props.editCaptchaDetails
//     }
// }
// let CaptchaFormMain = reduxForm({ form: 'CaptchaForm' })(CaptchaForm)
// export default connect(mapStateToProps)(CaptchaFormMain)