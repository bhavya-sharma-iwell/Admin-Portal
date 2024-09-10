// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {reset} from 'redux-form'
// import LevelInfoForm from './levelInfoForm'
// import {LevelNumberInfoData} from 'app/actions/admin/levelInfo'
// import {LEVEL_NUMBERS_FOR_INFO} from 'app/constants/shared/commonConst'
// import {getSmtpDetails} from 'app/actions/admin/ifaRegistration'

// class LevelInfo extends Component{
//     constructor(props){
//         super(props);
//         this.state={filter:{}}
//     }
//     updateLevelInfo(event){
//         let initialLevelInfo  = this.state.initialLevelInfo || {}
//         let params = event || {}
//         params.uid = this.props.ifaSignUpInfo ? (this.props.ifaSignUpInfo && this.props.ifaSignUpInfo.uid) : this.props.uIdFrmUserList;
//         params.bid = this.props.storeBid
//         params.levelid = initialLevelInfo && initialLevelInfo.levelid ? initialLevelInfo.levelid : null
//         params.levelNo = this.state.selectedLevelNo && this.state.selectedLevelNo.levelNo 
//         this.setState({
//             getApiCall : true
//         })
//         this.props.dispatch(LevelNumberInfoData(params))
//     }
//     UNSAFE_componentWillReceiveProps(newProps){
//         let initialLevelInfo = this.state.initialLevelInfo
//         if(this.state.getApiCall && newProps.ifaNotification && newProps.ifaNotification.notification && (newProps.ifaNotification.notification.status == 0) && (newProps.ifaNotification.activeTab ==5)){
//             this.props.levelInfoAPI()
//             this.setState({
//                 getApiCall : false,
//                 initialLevelInfo : null,
//                 addNewLevelInfo : false,
//                 actionModeEnabled : false,
//                 afterAPICall : true,
//             })
//              setTimeout(()=> {
//                 this.props.dispatch(reset('LevelInfoForm'));
//                 this.clearNotification()
//              }, 1000)
//              setTimeout(()=> {
//                 this.setState({
//                     afterAPICall : false
//                 })
//              }, 3000)
//         }
//         if(newProps.openTab == 5){
//             this.setState({
//                 actionModeEnabled : false,
//                 initialLevelInfo : null,
//                 addNewLevelInfo : false,
//             })
//         }
//         let levelsOpts = {...LEVEL_NUMBERS_FOR_INFO}
//         let levelInitialInfo = newProps.levelInitialInfo || []
//         let availableLevelNumbers = []
//         availableLevelNumbers = levelsOpts && Object.values(levelsOpts).filter(obj => {
//             levelInitialInfo && levelInitialInfo.map(levelInfoObj => {
//                 if(LEVEL_NUMBERS_FOR_INFO.hasOwnProperty(levelInfoObj.levelNo)){
//                     delete levelsOpts[levelInfoObj.levelNo]
//                 }
//             })
//             return levelsOpts[obj.levelNo]
//         })
//         this.setState({
//             availableLevelNumbers,
//             selectedLevelNo : availableLevelNumbers[0],
//         })
//     }

//     actionApply(fldName, rowData){
//         let availableLevelNumbers = this.state.availableLevelNumbers
//         switch(fldName){
//             case 'edit' :
//             this.setState({
//                 actionModeEnabled : true,
//                 initialLevelInfo : rowData ? rowData : null,
//                 selectedLevelNo : rowData,
//             })
//             break;
//             case 'addInfo' :
//             this.setState({
//                 actionModeEnabled : true,
//                 addNewLevelInfo : true,
//                 selectedLevelNo : availableLevelNumbers[0],
//             })
//             break;
//             case 'cancel' : 
//             this.setState({
//                 actionModeEnabled : false,
//                 initialLevelInfo : null,
//                 addNewLevelInfo : false,
//             })
//             break;
//         }
//     }
//     clearNotification(){
//         this.props.dispatch({type:'CLEAR_NOTIFICATION'})
//     }
//     onOptionSelection(obj, fldName){
//         this.setState({
//             [fldName] : obj,
//         })
//     }

//     render(){
//         return(
//             <LevelInfoForm
//                 openTab={this.props.openTab}
//                 openAccordionTabs={this.props.openAccordionTabs}
//                 onSubmit={(e)=> this.updateLevelInfo(e)}
//                 activeAllFrm={this.props.activeAllFrm}

//                 levelInitialInfo = {this.props.levelInitialInfo}
//                 actionApply = {(fldName, rowData)=> this.actionApply(fldName, rowData)}
//                 actionModeEnabled = {this.state.actionModeEnabled}
//                 initialLevelInfo = { this.state.initialLevelInfo}
//                 addNewLevelInfo = {this.state.addNewLevelInfo}
//                 availableLevelNumbers = {this.state.availableLevelNumbers}
//                 selectedLevelNo = { this.state.selectedLevelNo}
//                 ifaNotification = {this.props.ifaNotification}
//                 clearNotification = {()=> this.clearNotification()}
//                 onOptionSelection = {(obj, fldName) => this.onOptionSelection(obj, fldName)}
//                 afterAPICall = { this.state.afterAPICall}
//             />
//         )
//     }
// }

// const mapStateToProp = (state) =>{
//     return {
//        levelDetails: state.adminFormsReducers && state.adminFormsReducers.levelNumberData,
//        ifaSignUpInfo: state.adminFormsReducers && state.adminFormsReducers.ifaSignUpData.data,
//        ifaNotification: state.adminFormsReducers
//     }
//   }
//    const mapDispatchToProp = (dispatch) => {
//     return {dispatch:dispatch}
//    }
  
//   export default connect(mapStateToProp,mapDispatchToProp)(LevelInfo);