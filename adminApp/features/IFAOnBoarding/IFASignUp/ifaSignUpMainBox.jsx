// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import IfaSignUpForm from './ifaSignUpForm'
// import {ifaSignUpData} from 'app/actions/admin/ifaSignUp'
// import * as SettingAction from 'app/actions/broker/accountSettings'
// import {USER_TYPE} from 'app/constants/admin/adminDashboardConst'
// import {GetIFAInfoData} from 'app/actions/admin/ifaInitialInfo'

// class IfaSignUp extends Component{
//     constructor(props){
//         super(props);
//         this.state={selectedOpt:USER_TYPE[0], filter:{}}
//     }

//     updateIfaSignUp(event){
//         this.setState({
//             getDomain:event.domain
//         })
//         var obj ={
//             'userType': this.state.selectedOpt.value,
//             //'domain' : event.domain,
//             'email' : event.email,
//             'name' : event.name,
//             'phone' : event.phone,
//             'username' : event.username,
//             'levelNo' : this.state.selectedOpt.levelNo,
//             'bid' : this.props.ifaNotification && this.props.ifaNotification.bidForNewIfa && this.props.ifaNotification.bidForNewIfa[0].bid ,
//             'status' : this.props.ifaNotification && this.props.ifaNotification.bidForNewIfa && this.props.ifaNotification.bidForNewIfa[0].status ,
//             'dbStatus' : this.props.ifaNotification && this.props.ifaNotification.bidForNewIfa && this.props.ifaNotification.bidForNewIfa[0].dbStatus ,
//             'uid' : (event.uid) ||(this.props.ifaSignUpDetails && this.props.ifaSignUpDetails.data && this.props.ifaSignUpDetails.data.uid)||(this.props.ifaInfoData && this.props.ifaInfoData.data && this.props.ifaInfoData.data[0] &&  this.props.ifaInfoData.data[0].uid)
//         }
//         obj.componentForLoader = {componentName:'ifaForm'}
//         this.props.dispatch(ifaSignUpData(obj))

//         if(this.props.ifaSignUpDetails && this.props.ifaSignUpDetails.data && this.props.ifaSignUpDetails.data.uid){
//             let paramIfa = {}
//             paramIfa.uid = this.props.ifaSignUpDetails && this.props.ifaSignUpDetails.data && this.props.ifaSignUpDetails.data.uid
//             this.props.dispatch(GetIFAInfoData(paramIfa))
//         }
//     }
//     onOptionSelection(obj){
//         this.setState({
//             selectedOpt: obj,
//             filter:{}
//         })
//     }
//     UNSAFE_componentWillReceiveProps(newProps){
//         if(newProps.ifaNotification && newProps.ifaNotification.notification && (newProps.ifaNotification.notification.status == 0) && (newProps.ifaNotification.activeTab == 1)){
//             if(this.state.selectedOpt&&(this.state.selectedOpt.value == 'subBroker') || (this.state.selectedOpt.value == 'relationshipManager')){
//                 this.props.dispatch({type:'TAB_STATE_MANAGEMENT',payload:0})
//             }else{
//                 this.props.dispatch({type:'TAB_STATE_MANAGEMENT',payload:2})
//             }
//             this.props.dispatch({type:'CLEAR_NOTIFICATION'})
//         }
//         if(newProps.ifaSignUpDetails.apiStatus==-1)
//         {
//             this.setState({
//                 submitMsg:false,
//                 errorMsg:newProps.ifaSignUpDetails.errorMsg
//             })
//         }else if(this.props.ifaSignUpDetails.savingSignUp && newProps.ifaSignUpDetails.savedSignUp)
//         {
//             this.setState({
//                 submitMsg:true,
//                 successFormFrst:true
//             })
//             setTimeout(()=>{
//                 this.setState({
//                     submitMsg:false
//                 })
//             },3000)
//         }

//         // if((newProps.availableUser && newProps.availableUser.data == 0) && (this.state.extistingUser)){
//         //     this.setState({
//         //         extistingUser:false,
//         //      })
//         //     setTimeout(()=> {
//         //         this.setState({
//         //             hideUserNameMsg: false,
//         //          })
//         //     },2000)
            
//         // }
//     }
//     // userAvailablility(event){
//     //     let param = {}
//     //     param.username = event.target.value && event.target.value.trim()
//     //     param.uid = this.props.signUpData && this.props.signUpData.uid
//     //     this.props.dispatch(SettingAction.checkUserAvailablility(param))
//     //     this.setState({
//     //             hideUserNameMsg:true,
//     //             extistingUser:true
//     //     })
//     //     this.props.dispatch({type:'GOT_AVAILABLE_USER',payload:null})

//     // }

//     render(){
//         return(
//             <IfaSignUpForm
//             onSubmit={(e)=> this.updateIfaSignUp(e)}
//             openTab={this.props.openTab}
//             openAccordionTabs={this.props.openAccordionTabs}
//             selectedOpt={this.state.selectedOpt}
//             successFormFrst={this.props.successFormFrst}
//             submitMsg={this.state.submitMsg}
//             errorMsg={this.props.ifaSignUpDetails.errorMsg}
//            // domainNameValue={(e) => {this.props.domainNameValue(e)}}
//             nameValue={(e) => {this.props.nameValue(e)}}
//             signUpData = {this.props.signUpData}
//             signUpFormDisabled = {this.props.signUpFormDisabled}
//             checkUserAvailablility={(event) => this.userAvailablility(event) }
//             availableUser = {this.props.availableUser && this.props.availableUser.data}
//             // hideUserNameMsg = {this.state.hideUserNameMsg}
//            // domainName= {this.props.domainName}
//            people = {this.props.userReducer && this.props.userReducer.user && this.props.userReducer.user.subUserType}
//             />
//         )
//     }
// }

// const mapStateToProp = (state) =>{
//     return {
//       ifaSignUpDetails: state.adminFormsReducers && state.adminFormsReducers.ifaSignUpData,
//       ifaNotification: state.adminFormsReducers,
//       availableUser:state.accountSettings.availableUser,
//       ifaInfoData : state.adminFormsReducers && state.adminFormsReducers.ifaInfoData,
//       userReducer: state.userReducer
//     }
//   }
//    const mapDispatchToProp = (dispatch) => {
//     return {dispatch:dispatch}
//    }

//   export default connect(mapStateToProp,mapDispatchToProp)(IfaSignUp);
