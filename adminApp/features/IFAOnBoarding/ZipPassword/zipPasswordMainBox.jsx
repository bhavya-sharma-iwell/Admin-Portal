// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import ZipPasswordForm from './zipPasswordForm'
// import {ZipPasswordData} from 'app/actions/admin/zipPassword'
// import {GetRtaPassInfoData} from 'app/actions/admin/rtaPassInitialInfo'
// import {GetlevelInitialData} from 'app/actions/admin/levelInitialInfo'

// class ZipPassword extends Component{
//     constructor(props){
//         super(props);
//         this.state={filter:{},passDeleteMsg:false,prefilledFormDetails:{}}
//     }
//     updateZipPassword(event){
//         let param = {}
//         let zippassList = [];
//         param.bid = this.props.storeBid
//         zippassList.push(event)
//         let savedRtaZipPassword =[]
// 		savedRtaZipPassword = this.props.zipPassInitInfo && this.props.zipPassInitInfo.map(obj => obj.zippass)
// 	    param.zippassList = Object.keys(event).length > 0 ? Object.values(zippassList[0]):(savedRtaZipPassword.length>0?savedRtaZipPassword:[""]);
//         param.componentForLoader = {componentName : 'ifaForm'}
//         this.props.dispatch(ZipPasswordData(param))
//         this.setState({
//           submitPass:true,
//           switchTab:true
//         })
//     }
//     UNSAFE_componentWillReceiveProps(newProps){
//         if(newProps.zipPassDetails.apiStatus==-1 && this.state.submitPass==true){
//             this.setState({
//                 submitMsg:false,
//                 submitPass:false,
//                 errorMsg:newProps.zipPassDetails.errorMsg
//             })
//         }
//         if(newProps.zipPassDetails.apiStatus==0 && this.state.submitPass==true){
//             setTimeout(()=>{
//                 this.setState({
//                     submitMsg:false,
//                     submitPass:false
//                 })
//             },3000)
//         }
//         if(newProps.removeZipPassData && newProps.removeZipPassData.apiStatus==0 && this.state.passDeleteMsg==false){
//             if(newProps.removeZipPassData && newProps.removeZipPassData.data){
//               let paramRta = {}
//               paramRta.bid = this.props.storeBid ? this.props.storeBid : (this.props.ifaRegistrationDetails && this.props.ifaRegistrationDetails.bid)
//               this.setState({
//                   storeBid: paramRta.bid
//               })
//               this.props.dispatch(GetRtaPassInfoData(paramRta))
//               this.props.closeAlert()
//               this.setState({
//                   passDeleteMsg:true
//               })
//               setTimeout(()=>{
//                   this.setState({
//                       passDeleteMsg:false
//                   })
//               },3000)
//               this.props.dispatch({type:'REMOVE_ZIPPASSWORD', payload:null})
//             }

//         }
//         if(newProps.ifaNotification && newProps.ifaNotification.notification && (newProps.ifaNotification.notification.status == 0) && (newProps.ifaNotification.activeTab == 4) && (this.state.switchTab==true)){
//              this.props.dispatch({type:'TAB_STATE_MANAGEMENT',payload:5})
//              this.props.dispatch({type:'CLEAR_NOTIFICATION'})
//              this.setState({
//                switchTab:false
//              })
//              let param = {}
//                 param.bid = this.props.storeBid ? this.props.storeBid : (this.props.ifaRegistrationDetails && this.props.ifaRegistrationDetails.bid)
//                 param.uid = this.props.ifaSignUpInfo ? (this.props.ifaSignUpInfo && this.props.ifaSignUpInfo.uid) : this.props.uIdFrmUserList;
//                 param.componentForLoader = {componentName:'ifaForm'}
//              this.props.dispatch(GetlevelInitialData(param))
//         }
//     }
//     fillformDetails(obj){
//       let prefilledFormDetails = {}
//           prefilledFormDetails.zippass1 = obj.zippass
//       this.setState({
//         prefilledFormDetails:prefilledFormDetails
//       })
//     }
//     render(){
//       let passwordList = this.props.zipPassInitInfo && this.props.zipPassInitInfo.map((obj, key) => {
//                           return  <li key={key} >
//                                   <span class="filterList hidePseudoOpts active mTop" ><span onClick={()=>this.fillformDetails(obj)} metatitle = {`adminIfaRtaPasswords${obj.zippass}`}>{obj.zippass}</span> <span class="closeBtn" onClick={()=>this.props.showPassDeleteAlert(obj)} metatitle= {`adminIfaRtaPasswords${obj.zippass}Close`}>X</span> </span>
//                               </li>
//                         })
//         return(
//             <ZipPasswordForm
//                 openTab={this.props.openTab}
//                 openAccordionTabs={this.props.openAccordionTabs}
//                 onSubmit={(e)=> this.updateZipPassword(e)}
//                 submitMsg = {this.state.submitMsg}
//                 errorMsg = {this.props.zipPassDetails.errorMsg}
//                 passDeleteMsg = {this.state.passDeleteMsg}
//                 activeAllFrm={this.props.activeAllFrm}
//                 clearDrillDown = {(obj)=>this.clearDrillDown(obj)}
//                 removePasswordFuntion = {(obj)=> this.removePasswordFuntion(obj)}
//                 zipPassInitInfo = {this.props.zipPassInitInfo && this.props.zipPassInitInfo}
//                 passwordList = {passwordList}
//                 showPassDeleteAlert = {(obj)=>this.props.showPassDeleteAlert(obj)}
//                 prefilledFormDetails = {this.state.prefilledFormDetails}
//             />
//         )
//     }
// }

// const mapStateToProp = (state) =>{
//     return {
//        zipPassDetails: state.adminFormsReducers && state.adminFormsReducers.zipPassData,
//        ifaRegistrationInfo: state.adminFormsReducers && state.adminFormsReducers.ifaRegistrationData.data,
//        ifaInfoData: state.adminFormsReducers && state.adminFormsReducers.ifaInfoData,
//        ifaNotification: state.adminFormsReducers,
//        ifaSignUpInfo: state.adminFormsReducers && state.adminFormsReducers.ifaSignUpData.data,
//        removeZipPassData: state.adminFormsReducers && state.adminFormsReducers.removeZipPassData,
//     }
//   }
//    const mapDispatchToProp = (dispatch) => {
//     return {dispatch:dispatch}
//    }

//   export default connect(mapStateToProp,mapDispatchToProp)(ZipPassword);
