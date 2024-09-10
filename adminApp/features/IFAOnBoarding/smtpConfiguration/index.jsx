// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import SmtpForm from 'app/uiCollection/admin/IFAOnBoarding/smtpConfiguration/smtpForm'
// import {getSmtpDetails ,updateSmtpDetails} from 'app/actions/admin/ifaRegistration'
// import {reset,initialize, change} from 'redux-form'
// import {SSL_LIST} from 'app/constants/broker/brokerDashboardConst'
// import {notificationMsg} from 'app/utils/actionsInTable'


// class Smtp extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             showCredentialForm : true,
//             activeForm : true,
//             selectedOpts : 2,
//             selectedSslOpt : SSL_LIST[0]
//         }
//     }
//     getSmtpDetails(){
//         let param = {}
// 	        param.bid = this.props.storeBid
// 	        param.componentForLoader = {componentName:'smtpSettingLoader'}
//         this.props.dispatch(getSmtpDetails(param))
//     }
//     componentDidMount(){
//         // this.getSmtpDetails()
//     }
//     UNSAFE_componentWillReceiveProps(newProps){
//         if(newProps.ifaUserInitialize != this.props.ifaUserInitialize){
//             switch(newProps.ifaUserInitialize.smtpStatus){
//                 case  1 :
//                 this.setState({
//                     showCredentialForm : true,
//                     selectedOpts : 2
//                 })
//                 break;
//                 case  0 :
//                 this.setState({
//                     showCredentialForm : false,
//                     selectedOpts : 1
//                 })
//                 break;
//             }
//             let sslList = SSL_LIST.find(obj => (obj.value == newProps.ifaUserInitialize.smtPssl) )
//                 sslList =  sslList ? {label :sslList.label, value : sslList.value } : SSL_LIST[0]

//             this.setState({
//                 selectedSslOpt : sslList
//             })
//         }
//         if(newProps.smtpSettingsData && newProps.smtpSettingsData.updatedSmtpData && newProps.smtpSettingsData.updatedSmtpData.status == 0){
//             setTimeout(()=>{
//                 this.props.dispatch({type:'GOT_UPDATE_SMTP_DETAILS_DATA',payload:null})
//                 this.getSmtpDetails()  
// 	            this.props.dispatch({type:'TAB_STATE_MANAGEMENT',payload:null})
//                 this.setState({
//                     activeForm : false,
//                     selectedSslOpt : SSL_LIST[0],
//                 })
//             },1000)
//         }
//     }
    
//     onSubmitForm(elm){
//         let selectedSSLVal = this.state.selectedSslOpt && this.state.selectedSslOpt.value
//         let param = {}
//             param = this.state.showCredentialForm ? elm : {}
//             param.componentForLoader = {componentName:'smtpSettingLoader'}
//             param.smtPssl = this.state.showCredentialForm ? selectedSSLVal : null
//             param.smtpStatus = this.state.showCredentialForm ? 1 : 0
// 	        param.bid = this.props.storeBid
//         this.props.dispatch(updateSmtpDetails(param))
//     }
//     onOptionSelection(obj){
//         this.setState({
//             selectedSslOpt : obj
//         })
//     }
//     onChangeEmailType(obj){
//         //this.props.dispatch(reset('SmtpForm',this.props));
//         switch(obj.target.value){
//             case 'noreply' :
//             this.setState({
//                 showCredentialForm : false,
//                 selectedOpts : 1
//             })
//             break;

//             case 'smtpMail' :
//             this.setState({
//                 showCredentialForm : true,
//                 selectedOpts : 2
//             })
//             break;
//         }
//     }
    

//     render(){
//         return(
// 	    	<li class={` ${(this.props.openTab == 6 && 'openTabs') || (!this.props.activeAllFrm && 'removeDisabled') }`} >
//                 <SmtpForm
//                 	openAccordionTabs = {(obj)=>this.props.openAccordionTabs(obj)}
//                 	openTab = {this.props.openTab}
//                 	activeAllFrm = {this.props.activeAllFrm}
//                     onSubmit = {(obj)=>this.onSubmitForm(obj)}
//                     onOptionSelection = {(obj)=>this.onOptionSelection(obj)}
//                     selectedSslOpt = { this.state.selectedSslOpt }
//                     onChangeEmailType = {(obj) => this.onChangeEmailType(obj)}
//                     showCredentialForm = { this.state.showCredentialForm }
//                     smtpSettingsData = { this.props.smtpSettingsData }
//                     ifaUserInitialize = { this.props.ifaUserInitialize}
//                     selectedOpts = { this.state.selectedOpts }
//                 />
//             	{notificationMsg(this.props.smtpSettingsData && this.props.smtpSettingsData.notificationData,'CLEAR_NOTIFICATION',this.props)}
//             </li>
//         )
//     }
// }

// const mapStateToProp = (state) =>{
//     return {
//         smtpSettingsData : state.adminFormsReducers,
//         ifaUserInitialize : state.adminFormsReducers && state.adminFormsReducers.smtpDetailsData && state.adminFormsReducers.smtpDetailsData.data,
//     }
// }
// const mapDispatchToProp = (dispatch) => {
//     return {dispatch:dispatch}
// }
// export default connect(mapStateToProp,mapDispatchToProp)(Smtp);