import React, { Fragment, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { reduxForm, change, focus,getFormValues } from 'redux-form'
import Loader from './loaders'
import { LOADER_WIDTH } from '../constants'
import { Field } from 'redux-form'
import { GeneralField } from './formField';
import * as Validation from '../validators/formValidation';
import { ADMIN_LOGIN_HISTORY_REASON } from '../constants'
import {isMobileOrTab} from '../utils/dataFormater'

const LoginReasonForm = (props) => {
    const { handleSubmit } = props
    const selectRef = useRef(null);

    useEffect(() => {
         // Focus on Remark Feild
        if (selectRef.current) {
            selectRef.current.focus();
        }
    }, []);
    return (
        <Fragment>
            {props.formLoader
                && <Loader
                    loaderType='line'
                    loaderWidth={LOADER_WIDTH[2].width}
                    loaderHeight={LOADER_WIDTH[2].height}
                />}
            <form onSubmit={handleSubmit} id="settingsForm">
                <div class="formRows">
                    {props.brokerDetails && <div class="listigCols">
                        <ul>
                            <li>
                                <span class="labelTxt">Domain : </span>
                                <span class="txt bold">{props.brokerDetails.domain}</span>
                            </li>
                            <li class="mTop10">
                                <span class="labelTxt mTop10">User : </span>
                                <span class="txt bold">{props.brokerDetails.name}</span>
                            </li>
                        </ul>
                    </div>}
                    <div class="cl"></div>
                </div>
                <div class="formRows colsSec" metatitle = {`${props.metatitle}LoginFormSelect`}>
                    <Field
                        component={GeneralField}
                        type="select"
                        placeholder='Select'
                        outerDivClass="inputCols midLever"
                        labelClass="label"
                        innerDivClass="inputFld noMargin"
                        selectBoxDivClass="filter-section selectBox"
                        name="label"
                        validate={[Validation.required]}
                        onOptionSelection={(obj, fldName) => { props.dispatch(change('LoginReasonForm', 'label', obj['label'].toString())); props.onOptionSelection(obj, 'selectedReason'); }}
                        options={ADMIN_LOGIN_HISTORY_REASON}
                        selectedOpt={props.selectedReason}
                        customTitle='Login Reason :'
                    />
                </div>
                <div class="formRows" metatitle = {`${props.metatitle}LoginFormRemarks`}>
                    <Field outerDivClass="inputCols"
                        labelClass="label"
                        innerDivClass="inputFld noMargin"
                        name="remarks"
                        type="textarea"
                        height={4}
                        component={GeneralField}
                        label="Remark :"
                        autoComplete='off'
                        inputRef={selectRef}
                    />
                </div>
                <div class="btnsContainer mTop30">
                    <button type="button" onClick={ ()=>props.onSubmit(props.getFormValues,'openInWeb')} metatitle = {`${props.metatitle}LoginFormProceeddd`}>Open in Web</button>
                    {/* {isMobileOrTab() && <button onClick={ ()=>props.onSubmitFun(props.getFormValues,'openInApp')} type="submit" metatitle = {`${props.metatitle}LoginFormProceed`}>Open in App</button>} */}
                </div>
            </form>
        </Fragment>
    )
}

const mapStateToprops = (state, props) => {
    return {
        getFormValues: getFormValues('LoginReasonForm')(state),
        initialValues: ({ label: props.selectedReason && props.selectedReason.label })
    }
}
let loginReasonForm = reduxForm({ form: 'LoginReasonForm', enableReinitialize: true, keepDirtyOnReinitialize: true })(LoginReasonForm)
export default connect(mapStateToprops)(loginReasonForm)