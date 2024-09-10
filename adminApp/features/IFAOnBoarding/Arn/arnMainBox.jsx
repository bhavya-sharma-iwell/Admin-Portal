// import React, {Component, Fragment} from 'react'
// import {connect} from 'react-redux'
// import ArnForm from './arnForm'
// import {ArnRegistrationData} from 'app/actions/admin/arnRegistration'
// import {GetArnAllInfoData, VerifyArnInfo, checkArnAvailablility} from 'app/actions/admin/arnInitialInfo'
// import {reset} from 'redux-form';
// import {GetRtaPassInfoData} from 'app/actions/admin/rtaPassInitialInfo'
// import {RIA_LIST} from 'app/constants/broker/brokerDashboardConst'
// import {COMPOSITE_GST, ARN_TYPE_LIST,TRUE_FALSE_COMMON, excludedDefaultArns} from 'app/constants/shared/commonConst'
// import {StateMaster} from 'app/actions/shared/utils'
// import {ShowDateFormater, DateFormater} from 'app/utils/dataFormater'
// import {checkArnNo} from 'app/uiCollection/shared/form/validation';
// import Captcha from './Captcha'

// class ARN extends Component{
//     constructor(props){
//         super(props);
//         this.state={filter:{}, customData:[], arnNoData:[], activeActionBox:false,notification:false,showMsgDeleteArn:false,duplicateArnData:false,
//             selectedRiaOpt:{label:RIA_LIST[1].label,value:RIA_LIST[1].value},
//             selectedCompositeGst : {label:COMPOSITE_GST[1].label,value:COMPOSITE_GST[1].value},
//             updateSelectedStateCode : true,
//             selectedStateCode : {},
//             verifiedEmailOpts : [
//                 'camsEmailVerified',
//                 'karvyEmailVerified',
//                 'franklinEmailVerified',
//                 'nseEmailVerified',
//                 'bseNetEmailVerified',
//                 'fundsNetEmailVerified',
//                 'edge360EmailVerified',
//             ],
//             selectedOrderCams:{label:TRUE_FALSE_COMMON[1].label,value:TRUE_FALSE_COMMON[1].value},
//             selectedOrderFranklin:{label:TRUE_FALSE_COMMON[1].label,value:TRUE_FALSE_COMMON[1].value},
//             selectedOrderKarvy:{label:TRUE_FALSE_COMMON[1].label,value:TRUE_FALSE_COMMON[1].value},
//             camsBrokerageAMCwise:TRUE_FALSE_COMMON[1],
//             karvyBrokerageAMCwise:TRUE_FALSE_COMMON[1],
//             editForm: false,
//             selectedDefaultMfu: TRUE_FALSE_COMMON[1]
//         }
//         this.props.dispatch(StateMaster())
//         this.props.dispatch({type : 'GOT_AVAILABLE_ARN', payload: null})
//     }
//     sendRegistrationData(event){
//         event.preventDefault();
//         let param ={};
//         param.bid = this.props.storeBid
//         param.arnList = this.state.customData;
//         let wbrEndDate = DateFormater(this.state.wbrEndDate)
//         if(param.arnList && param.arnList[0]){
//             param.arnList[0].wbr6EndDate = wbrEndDate
//         }
//         // param.isRIA = this.state.selectedRiaOpt.value;
//         param.componentForLoader = {componentName:'ifaForm'}
//         this.props.dispatch(ArnRegistrationData(param))

//         setTimeout(() =>{
//             let param2 = {}
//             param2.bid = this.props.storeBid
//             param2.componentForLoader = {componentName:'ifaForm'}
//             this.props.dispatch(GetArnAllInfoData(param2))
//             this.setState({
//                 arnNoData : [],
//                 customData : [],
//                 showActionBtns : null,
//                 notification:!this.state.notification,
//                 defaultArn: null,
//                 defaultArnIndex: null
//             })
//             document.getElementById("registrationForm").reset();
//         },200)
//     }
//     arnValidation(obj){
//         const typedVal = obj && obj.target.value
//         if(typedVal.length == 0)
//             this.props.dispatch({type : 'GOT_AVAILABLE_ARN', payload: null})
//         let excludedArns, selectedDefaultMfu = this.state.selectedDefaultMfu
//         if(typedVal && excludedDefaultArns.includes(typedVal)){            
//             excludedArns = true
//             selectedDefaultMfu = TRUE_FALSE_COMMON[1]
//         }
//         const arnErrorMsg = checkArnNo(typedVal)
//         this.setState({arnErrorMsg, excludedArns, selectedDefaultMfu});
//     }
//     checkArnAvailablility(obj){
//         this.props.dispatch({type : 'GOT_AVAILABLE_ARN', payload: null})
//         const arnNo = obj && obj.target.value
//         if(arnNo.length) {
//             if((this.state.editForm && this.state.editFormData.arnNo.toUpperCase().trim() != arnNo.toUpperCase().trim()) || !this.state.editForm){
//                 this.props.dispatch(checkArnAvailablility({arnNo}))
//                 this.setState({ arnErrorMsg: null })
//             }
//         }
//     }

//     camsData(data){
//         const fieldValues ={
//             name : data.target.name,
//             value:data.target.value
//         }
       
//        let camsData = this.state.camsData || {}
//        camsData[fieldValues.name]= fieldValues.value
//        this.setState({camsData});
//     }

//     fundsnetData(data){
//         const fieldValues ={
//             name : data.target.name,
//             value:data.target.value
//         }
       
//        let fundsnetData = this.state.fundsnetData || {}
//        fundsnetData[fieldValues.name]= fieldValues.value
//        this.setState({fundsnetData});
//     }

//     karvyData(data){
//         const fieldValues ={
//             name : data.target.name,
//             value:data.target.value
//         }
       
//        let karvyData = this.state.karvyData || {}
//        karvyData[fieldValues.name]= fieldValues.value
//        this.setState({karvyData});
//     }

//     edge360Data(data) {
//         const fieldValues = {
//             name: data.target.name,
//             value: data.target.value
//         }
//         let edge360Data = this.state.edge360Data || {}
//         edge360Data[fieldValues.name] = fieldValues.value
//         this.setState({ edge360Data });
//     }

//     franklinData(data){
//         const fieldValues ={
//             name : data.target.name,
//             value:data.target.value
//         }
       
//        let franklinData = this.state.franklinData || {}
//        franklinData[fieldValues.name]= fieldValues.value
//        this.setState({franklinData});
//     }

//     sendData(secName){
//         let params={};
//         switch(secName){
//             case 'camsProp':
//                 params= this.state.camsData || {};
//                 params.category = 'CAMS_EMAIL';
//                 this.setState({
//                     checkCamsVerified : true,
//                 })
//                 break;

//             case 'karvyProps':
//                 params= this.state.karvyData || {};
//                 params.category = 'KARVY';
//                 this.setState({
//                     checkKarvyVerified : true,
//                 })
//                 break;

//             case 'fundsnetProps':
//                 params= this.state.fundsnetData || {}; 
//                 params.category = 'FUNDS_NET';
//                 this.setState({
//                     checkFundsNetVerified : true,
//                 })
//                 break;

//             case 'Edge360':
//                 params = this.state.edge360Data || {};
//                 params.category = 'EDGE_360';
//                 this.setState({ showCaptcha : true })
//                 break;
//         }
//         if(this.props.arnInitFldInfo && this.props.arnInitFldInfo.arnid){
//             params.arnid = this.props.arnInitFldInfo.arnid
//         }
//          params.isRIA = this.state.selectedRiaOpt && this.state.selectedRiaOpt.value;
//          this.setState({
//             getARNAPICall : true,
//          }, ()=> {
//             this.props.dispatch(VerifyArnInfo(params))
//          })
//     }

//     addRegistrationData(event){
//         this.props.availableArn && this.props.dispatch({type : 'GOT_AVAILABLE_ARN', payload: null})
//         let stateCode = this.state.selectedStateCode && this.state.selectedStateCode.stateCode
//         if(event.gst && event.gst.trim().length>0 && !stateCode ){
//           this.setState({
//             stateCodeError : true
//           })
//           return
//         }else{
//           this.setState({
//             stateCodeError : false
//           })
//         }
//         this.props.resetArnNum()
//         let arnData=this.props.arnInfoData&&this.props.arnInfoData.data
//         let customDataVal = this.state.customData
//         let arnNoVal = this.state.arnNoData
//         let defaultArn = this.state.defaultArn
//         let defaultArnIndex = this.state.defaultArnIndex

//         if(arnData){
//             for(let i=0; i< arnData.length; i++ ){
//                 if(arnData[i].arnid === event.arnid){
//                    arnData = arnData.splice(arnData.indexOf(arnData[i]),1)
//                 this.props.dispatch(reset('ArnForm'));
//                 }
//                 else if( (arnData[i].arnNo === event.arnNo) || (arnNoVal && arnNoVal[i] && arnNoVal[i].arnNo == event.arnNo) ){
//                     this.setState({
//                         selectedDefaultMfu: TRUE_FALSE_COMMON[1],
//                         duplicateArnData: true
//                     })   
//                     return
//                 }
//             }
//             arnNoVal.push(event)
//             this.props.dispatch(reset('ArnForm'));
//           }
//         if(event){
//             event.isRIA = this.state.selectedRiaOpt && this.state.selectedRiaOpt.value;
//             event.compositeGst = [this.state.selectedCompositeGst && this.state.selectedCompositeGst.value];
//             event.autoFileOrderingCams=this.state.selectedOrderCams && this.state.selectedOrderCams.value
//             event.autoFileOrderingFranklin=this.state.selectedOrderFranklin && this.state.selectedOrderFranklin.value
//             event.autoFileOrderingKarvy=this.state.selectedOrderKarvy && this.state.selectedOrderKarvy.value
//             event.camsBrokerageAMCwise=this.state.camsBrokerageAMCwise && this.state.camsBrokerageAMCwise.value
//             event.karvyBrokerageAMCwise=this.state.karvyBrokerageAMCwise && this.state.karvyBrokerageAMCwise.value
//             event.defaultMfu = this.state.selectedDefaultMfu && this.state.selectedDefaultMfu.value
//         }
        
//         if(event.arnNo){
//             event.camsCredentialsStatus = (this.state.camsEmailVerified && this.state.camsEmailVerified.camsCredentialsStatus) ? this.state.camsEmailVerified.camsCredentialsStatus : 0
//             event.karvyCredentialsStatus = (this.state.karvyEmailVerified && this.state.karvyEmailVerified.karvyCredentialsStatus) ? this.state.karvyEmailVerified.karvyCredentialsStatus : 0
//             event.franklinCredentialsStatus = (this.state.franklinEmailVerified && this.state.franklinEmailVerified.franklinCredentialsStatus) ? this.state.franklinEmailVerified.franklinCredentialsStatus : 0
//             event.fundsnetCredentialsStatus = (this.state.fundsNetEmailVerified && this.state.fundsNetEmailVerified.fundsnetCredentialsStatus) ? this.state.fundsNetEmailVerified.fundsnetCredentialsStatus : 0
//             event.edge360CredentialsStatus = (this.state.edge360EmailVerified && this.state.edge360EmailVerified.edge360CredentialsStatus) ? this.state.edge360EmailVerified.edge360CredentialsStatus : 0
//             this.setState({
//                 activeActionBox:true
//             }, ()=> {
//                 this.setState({
//                     camsEmailVerified : false,
//                     karvyEmailVerified : false,
//                     franklinEmailVerified : false,
//                     fundsNetEmailVerified : false,
//                     edge360EmailVerified : false,
//                 })
//             })
//         }
//         if(event.defaultMfu) {
//             if(defaultArnIndex != null){
//                 customDataVal[defaultArnIndex].defaultMfu = 0
//             }
//             defaultArn = event.arnNo
//             defaultArnIndex = customDataVal.length   
//         }
//         customDataVal.push(event)
//         this.setState({
//             defaultArn,
//             defaultArnIndex,
//             customData:customDataVal,
//             arnNoData:arnNoVal,
//             showActionBtns : true,
//             editForm: false,
//             selectedDefaultMfu: TRUE_FALSE_COMMON[1]
//         })
        
//     }
//     UNSAFE_componentWillReceiveProps(newProps){
//         let selectedStateCode = this.state.selectedStateCode
//         let stateMaster = newProps.stateMaster || []
//         if (this.props != newProps) {
//             setTimeout(()=> {
//                 this.setState({
//                     duplicateArnData: false
//                 })
//             },4000)
//         }
//         if((newProps.arnDetails.apiStatus==-1) && this.state.notification){
//             this.setState({
//                 submitMsg:false,
//                 errorMsg:newProps.arnDetails.errorMsg,
//                 showActionBtns : false,
//                 notification:!this.state.notification
//             })
//         }else if((newProps.arnDetails.apiStatus==0) && this.state.notification){
//             this.setState({
//                 submitMsg:true,
//                 activeActionBox:false,
//                 notification:!this.state.notification
//             })
//             setTimeout(()=>{
//                 this.setState({
//                     submitMsg:false
//                 })
//             },3000)
//         }
//         if(newProps.ifaNotification && newProps.ifaNotification.notification && (newProps.ifaNotification.notification.status == 0) && (newProps.ifaNotification.activeTab ==3)){
//              this.props.dispatch({type:'TAB_STATE_MANAGEMENT',payload:4})
//              this.props.dispatch({type:'CLEAR_NOTIFICATION'})
//              this.setState({
//                 selectedRiaOpt:{label:RIA_LIST[1].label,value:RIA_LIST[1].value},
//                 selectedCompositeGst : {label:COMPOSITE_GST[1].label,value:COMPOSITE_GST[1].value},
//                 selectedOrderCams:{label:TRUE_FALSE_COMMON[1].label,value:TRUE_FALSE_COMMON[1].value},
//                 selectedOrderFranklin:{label:TRUE_FALSE_COMMON[1].label,value:TRUE_FALSE_COMMON[1].value},
//                 selectedOrderKarvy:{label:TRUE_FALSE_COMMON[1].label,value:TRUE_FALSE_COMMON[1].value},
//                 camsBrokerageAMCwise:TRUE_FALSE_COMMON[1],
//                 karvyBrokerageAMCwise:TRUE_FALSE_COMMON[1]
//              })
//              let paramArn = {}
//                 paramArn.bid =  this.props.storeBid ? this.props.storeBid : (this.props.ifaRegistrationDetails && this.props.ifaRegistrationDetails.bid)
//             this.props.dispatch(GetRtaPassInfoData(paramArn))

//         }
//         if((newProps.arnDeleteMsg) && (!this.props.hideAlertBox)&&(this.state.showMsgDeleteArn==false)){
//             if(newProps.arnDeleteMsg){
//                 let paramArn = {}
//                 paramArn.bid =  this.props.storeBid ? this.props.storeBid : (this.props.ifaRegistrationDetails && this.props.ifaRegistrationDetails.bid)
//                 this.setState({
//                    storeBid: paramArn.bid,
//                  })
//                 this.props.dispatch(GetArnAllInfoData(paramArn))

//                 this.props.closeArnDeleteAlertBox();
//                 this.setState({
//                     showMsgDeleteArn: true
//                  })
//                 setTimeout(()=>{
//                   this.setState({
//                       showMsgDeleteArn:false
//                   })
//                 },3000)

//             }
//         }
//         if((newProps.arnInitFldInfo != this.props.arnInitFldInfo)){
//             if(newProps.arnInitFldInfo && newProps.arnInitFldInfo.isRIA){
//                 this.setState({
//                     selectedRiaOpt:{label:RIA_LIST[0].label,value:RIA_LIST[0].value}
//                 })
//             }else{
//                 this.setState({
//                     selectedRiaOpt:{label:RIA_LIST[1].label,value:RIA_LIST[1].value}
//                 })
//             }
//             if(newProps.arnInitFldInfo && newProps.arnInitFldInfo.compositeGst){
//                 this.setState({
//                     selectedCompositeGst:{label:COMPOSITE_GST[0].label,value:COMPOSITE_GST[0].value}
//                 })
//             }else{
//                 this.setState({
//                     selectedCompositeGst:{label:COMPOSITE_GST[1].label,value:COMPOSITE_GST[1].value}
//                 })
//             }
//             let selectedOrderCams={}
//             let selectedOrderFranklin={}
//             let selectedOrderKarvy ={}
//             let camsBrokerageAMCwise ={}
//             let karvyBrokerageAMCwise ={}
//             let selectedDefaultMfu
//             if(newProps.arnInitFldInfo){
//                 let autoOrder = newProps.arnInitFldInfo
//                 selectedOrderCams = TRUE_FALSE_COMMON.find(obj => {
//                     if(obj.value == autoOrder.autoFileOrderingCams )
//                         return { label: TRUE_FALSE_COMMON[autoOrder.autoFileOrderingCams].label, value: TRUE_FALSE_COMMON[autoOrder.autoFileOrderingCams].value }
//                 } )
//                 selectedOrderFranklin = TRUE_FALSE_COMMON.find(obj => {
//                     if(obj.value == autoOrder.autoFileOrderingFranklin )
//                         return { label: TRUE_FALSE_COMMON[autoOrder.autoFileOrderingFranklin].label, value: TRUE_FALSE_COMMON[autoOrder.autoFileOrderingFranklin].value }
//                 } )
//                 selectedOrderKarvy = TRUE_FALSE_COMMON.find(obj => {
//                     if(obj.value == autoOrder.autoFileOrderingKarvy )
//                         return { label: TRUE_FALSE_COMMON[autoOrder.autoFileOrderingKarvy].label, value: TRUE_FALSE_COMMON[autoOrder.autoFileOrderingKarvy].value }
//                 } )
//                 camsBrokerageAMCwise = TRUE_FALSE_COMMON.find(obj => obj.value == autoOrder.camsBrokerageAMCwise)
//                 karvyBrokerageAMCwise = TRUE_FALSE_COMMON.find(obj => obj.value == autoOrder.karvyBrokerageAMCwise)
//                 selectedDefaultMfu = autoOrder.defaultMfu ? TRUE_FALSE_COMMON[0] : TRUE_FALSE_COMMON[1]

//                 this.setState({
//                     selectedOrderCams,
//                     selectedOrderFranklin,
//                     selectedOrderKarvy,
//                     karvyBrokerageAMCwise,
//                     camsBrokerageAMCwise,
//                     selectedDefaultMfu,
//                     excludedArns: newProps.excludedArns
//                 })

//             }
           
//             if ((stateMaster && stateMaster.length>0) && (newProps.arnInitFldInfo && newProps.arnInitFldInfo.stateCode))
//             {
//               selectedStateCode = stateMaster.find(obj => {
//                 if(obj.stateCode == newProps.arnInitFldInfo.stateCode){
//                   return obj
//                 }
//               })
//               this.setState({
//                 selectedStateCode,
//               })
//             }else{
//                 this.setState({
//                 selectedStateCode: {}
//               })
//             }
//             if(newProps.arnInitFldInfo && newProps.arnInitFldInfo.wbr6EndDate){
//                 let wbrEndDate=ShowDateFormater(newProps.arnInitFldInfo.wbr6EndDate)
//                 this.setState({
//                     wbrEndDate
//                 })
//             }
//         }
//         if(!newProps.arnInitFldInfo){
//             this.setState({
//                 selectedRiaOpt:{label:RIA_LIST[1].label,value:RIA_LIST[1].value},
//                 selectedCompositeGst : {label:COMPOSITE_GST[1].label,value:COMPOSITE_GST[1].value},
//                 selectedStateCode: {},
//             })
//         }
//         if((newProps.arnInitFldInfo != this.props.arnInitFldInfo) && (newProps.arnInitFldInfo && Object.values(newProps.arnInitFldInfo).length>0)){
//             this.createNotificationMessage(newProps.arnInitFldInfo)
//             this.setState({
//                 franklinData : {
//                     franklinUID : newProps.arnInitFldInfo && newProps.arnInitFldInfo.franklinUID ,
//                     franklinPassword : newProps.arnInitFldInfo && newProps.arnInitFldInfo.franklinPassword ,
//                 },
//                 camsData : {
//                     camsEmail : newProps.arnInitFldInfo && newProps.arnInitFldInfo.camsEmail ,
//                 },
//                 fundsnetData : {
//                     fundsNetUsername : newProps.arnInitFldInfo && newProps.arnInitFldInfo.fundsNetUsername ,
//                     fundsNetPassword : newProps.arnInitFldInfo && newProps.arnInitFldInfo.fundsNetPassword ,
//                     fundsNetSecurityAnswer : newProps.arnInitFldInfo && newProps.arnInitFldInfo.fundsNetSecurityAnswer ,
//                 },
//                 edge360Data : {
//                     edge360Username : newProps.arnInitFldInfo && newProps.arnInitFldInfo.edge360Username ,
//                     edge360Password : newProps.arnInitFldInfo && newProps.arnInitFldInfo.edge360Password ,
//                     edge360SecurityAnswer : newProps.arnInitFldInfo && newProps.arnInitFldInfo.edge360SecurityAnswer
//                 },
//                 karvyData : {
//                     karvyUID : newProps.arnInitFldInfo && newProps.arnInitFldInfo.karvyUID ,
//                     karvyPassword : newProps.arnInitFldInfo && newProps.arnInitFldInfo.karvyPassword ,
//                 },
//             })
//         }
//         if(newProps.verifyCredentialsData){
//             this.createNotificationMessage(newProps.verifyCredentialsData)
//             if(this.state.checkCamsVerified){
//                 this.setState({
//                     //camsEmailVerified : messageInfo ,
//                     checkCamsVerified : false,
//                 })
//             }
//             if(this.state.checkKarvyVerified){
//                 this.setState({
//                     //karvyEmailVerified : messageInfo ,
//                     checkKarvyVerified : false,
//                 })
//             }
//             if(this.state.checkFranklinVerified){
//                 this.setState({
//                     //franklinEmailVerified : messageInfo ,
//                     checkFranklinVerified : false,
//                 })
//             }
//             if(this.state.checkFundsNetVerified){
//                 this.setState({
//                     //fundsNetEmailVerified : messageInfo ,
//                     checkFundsNetVerified : false,
//                 })
//             }
//         }
//         if (this.state.showCaptcha && newProps.verifyCredentialsData && (newProps.verifyCredentialsData != this.props.verifyCredentialsData)) {
//             setTimeout(() => {
//                 let svg = newProps.verifyCredentialsData.captchaSVG
//                 let container = document.getElementById("svgCaptcha");
//                 if (container && svg) {
//                     container.innerHTML = svg;
//                 }
//             }, 100)
//             this.setState({ showCaptchaScreen: newProps.verifyCredentialsData })
//             if (newProps.verifyCredentialsData && [0, -1, 2].includes(newProps.verifyCredentialsData.edge360CredentialsStatus)) {
//                 this.setState({ showCaptcha: false })
//             }
//         }
//         if((newProps.openTab !=3) || (newProps.arnDeleteAlertBox)){
//             this.setState({
//                 camsEmailVerified : false,
//                 karvyEmailVerified : false,
//                 franklinEmailVerified : false,
//                 fundsNetEmailVerified : false,
//                 edge360EmailVerified : false,
//             })
//         }
//     }
//     createNotificationMessage(notificationData){
//         let verifiedEmailOpts = this.state.verifiedEmailOpts
//         let customArray = ARN_TYPE_LIST
//         let message
//         let messageInfo = {}
//         for(let i =0; i<customArray.length; i++){
//             switch(notificationData[customArray[i].value]){
//                 case 0 :
//                 message = <span class="message errorMsg">Not verified</span>
//                 messageInfo = {message : message , verified : false, [customArray[i].value] : 0}
//                 this.setState({
//                     [verifiedEmailOpts[i]] : messageInfo,
//                 })
//                 break;
//                 case 1 :
//                 message = <span class="message successMsg">Verified</span>
//                 messageInfo = {message : message , verified : true, [customArray[i].value] : 1}
//                 this.setState({
//                     [verifiedEmailOpts[i]] : messageInfo,
//                 })
//                 break;
//                 case 2 :
//                 message = <span class="message errorMsg">Not Available</span>
//                 messageInfo = {message : message , verified : false, [customArray[i].value] : 2}
//                 this.setState({
//                     [verifiedEmailOpts[i]] : messageInfo,
//                 })
//                 break;
//                 case -1 :
//                 message = <span class="message errorMsg">Failure</span>
//                 messageInfo = {message : message , verified : false, [customArray[i].value] : -1}
//                 this.setState({
//                     [verifiedEmailOpts[i]] : messageInfo,
//                 })
//                 break;
//             }
//             if(this.state.getARNAPICall && (notificationData[customArray[i].value])){
//                 this.setState({
//                     getARNAPICall : false,
//                 }, ()=> {
//                     this.props.ArnAllInfoAPI()
//                 })
//             }
//         }
//     }
//     onOptionSelection(obj, fldName){
//         switch(fldName){
//             case 'isRIA' :
//             this.setState({
//                 selectedRiaOpt:obj
//             })
//             break;
//             case 'compositeGst' :
//             this.setState({
//                 selectedCompositeGst:obj
//             })
//             break;
//             case 'stateCode':
//             this.setState({
//                 selectedStateCode : obj,
//                 stateCodeError : false,

//             })
//             break;
//             case 'autoFileOrderingCams' :
//             this.setState({
//                 selectedOrderCams:obj
//             })
//             break;
//             case 'autoFileOrderingFranklin' :
//             this.setState({
//                 selectedOrderFranklin:obj
//             })
//             break;
//             case 'autoFileOrderingKarvy' :
//             this.setState({
//                 selectedOrderKarvy:obj
//             })
//             break;
//             default :
//                 this.setState({
//                     [fldName]:obj
//                 })
//             break;
//         }   
//     }

//     componentWillUnmount(){
//         this.props.resetArnNum()
//     }
//     onDateChange(e){
//         this.setState({
//             wbrEndDate:e
//         })
//     }
//     onEditForm(obj){
//         this.props.dispatch({type : 'GOT_AVAILABLE_ARN', payload: null})
//         this.setState({
//             editForm: true,
//             editFormData: obj
//         })
//     }
//     closeCaptchaForm() {
//         this.setState({ showCaptcha: false })
//     }
//     submitCaptcha(e) {
//         const param = {}
//         param.captchaText = e.captchaText
//         param.sessionToken = this.state.showCaptchaScreen && this.state.showCaptchaScreen.sessionToken
//         param.isRIA = this.state.selectedRiaOpt && this.state.selectedRiaOpt.value
//         param.category = 'EDGE_360'
//         if(this.props.arnInitFldInfo && this.props.arnInitFldInfo.arnid){
//             param.arnid = this.props.arnInitFldInfo.arnid
//         }
//         this.props.dispatch(VerifyArnInfo(param))
//         this.setState({ showCaptcha: false })
//     }
//     render(){
//         return(
//             <Fragment>
//                 <div class='posRelative'>
//                     {this.state.showCaptcha && <Captcha
//                         onSubmit={(event) => this.submitCaptcha(event)}
//                         closeCaptchaForm={(event) => this.closeCaptchaForm(event)}
//                         verifyCredentialsLoader={this.props.verifyCredentialsLoader}
//                     />}
//                 </div>
//             <ArnForm
//                 openTab={this.props.openTab}
//                 openAccordionTabs={this.props.openAccordionTabs}
//                 onSubmit={(e)=> this.addRegistrationData(e)}
//                 submitMsg= {this.state.submitMsg}
//                 errorMsg = {this.props.arnDetails.errorMsg}
//                 isVerified= {this.props.isVerified}
//                 activeAllFrm={this.props.activeAllFrm}
//                 sendRegistrationData = {(e) => this.sendRegistrationData(e)}
//                 arnNoData = {this.state.arnNoData}
//                 activeActionBox = {this.state.activeActionBox}
//                 arnInitInfo = {this.props.arnInitInfo}
//                 getArnData = {(e) => this.props.getArnData(e)}
//                 arnInitFldInfo = {this.props.arnInitFldInfo}
//                 showActionBtns = {this.state.showActionBtns}
//                 deleteArnNoCrossBtn={(arn)=>this.props.deleteArnNoCrossBtn(arn)}
//                 arnDeleteMsg={this.props.arnDeleteMsg}
//                 closeArnDeleteAlertBox={()=>this.props.closeArnDeleteAlertBox()}
//                 hideAlertBox={this.props.hideAlertBox}
//                 hideAlertBoxFn={()=>this.props.hideAlertBoxFn()}
//                 showMsgDeleteArn={this.state.showMsgDeleteArn}
//                 duplicateArnData={this.state.duplicateArnData}
//                 selectedRiaOpt = {this.state.selectedRiaOpt}
//                 onOptionSelection = {(obj, fldName)=>this.onOptionSelection(obj, fldName)}
//                 selectedCompositeGst = {this.state.selectedCompositeGst}
//                 selectedStateCode = {this.state.selectedStateCode}
//                 stateMaster = {this.props.stateMaster}
//                 stateCodeError = { this.state.stateCodeError}
//                 resetSearchField = {this.props.resetSearchField}
//                 onDateChange = {(e,name)=> this.onDateChange(e,name)}
//                 wbrEndDate = {this.state.wbrEndDate}
//                 camsData = {(data)=>{this.camsData(data)}}
//                 fundsnetData = {(data)=>{this.fundsnetData(data)}}
//                 karvyData = {(data)=>{this.karvyData(data)}}
//                 franklinData = {(data)=>{this.franklinData(data)}}
//                 edge360Data = {(data)=>{this.edge360Data(data)}}
//                 sendParentData = {(val)=>this.sendData(val)}
//                 camsEmailVerified = {this.state.camsEmailVerified}
//                 karvyEmailVerified = {this.state.karvyEmailVerified}
//                 franklinEmailVerified = {this.state.franklinEmailVerified}
//                 fundsNetEmailVerified = {this.state.fundsNetEmailVerified}
//                 edge360EmailVerified = {this.state.edge360EmailVerified}
//                 verifyCredentialsLoader = {this.props.verifyCredentialsLoader}
//                 selectedOrderCams={this.state.selectedOrderCams}
//                 selectedOrderFranklin={this.state.selectedOrderFranklin}
//                 selectedOrderKarvy={this.state.selectedOrderKarvy}
//                 arnValidation = {(obj) => this.arnValidation(obj)}
//                 arnErrorMsg={this.state.arnErrorMsg}
//                 camsBrokerageAMCwise={this.state.camsBrokerageAMCwise}
//                 karvyBrokerageAMCwise={this.state.karvyBrokerageAMCwise}
//                 availableArn = {this.props.availableArn}
//                 checkArnAvailablility = {(obj) => this.checkArnAvailablility(obj)}
//                 onEditForm = {(obj) => this.onEditForm(obj)}
//                 selectedDefaultMfu = {this.state.selectedDefaultMfu}
//                 excludedArns = {this.state.excludedArns}
//             />
//             </Fragment>
//         )
//     }
// }

// const mapStateToProp = (state) =>{
//     return {
//        arnDetails: state.adminFormsReducers && state.adminFormsReducers.arnRegistrationData,
//        ifaRegistrationInfo: state.adminFormsReducers && state.adminFormsReducers.ifaRegistrationData.data,
//        arnInfoData: state.adminFormsReducers && state.adminFormsReducers.arnInfoData,
//        ifaInfoData: state.adminFormsReducers && state.adminFormsReducers.ifaNotificationData,
//        ifaNotification: state.adminFormsReducers,
//        arnDeleteMsg: state.adminFormsReducers && state.adminFormsReducers.deleteArn,
//        stateMaster : state.utils && state.utils.stateMaster,
//        isVerified: state.adminFormsReducers && state.adminFormsReducers.arnFormInfo,
//         verifyCredentialsData: state.adminFormsReducers && state.adminFormsReducers.verifyCredentialsData,
//         verifyCredentialsLoader : state.adminFormsReducers && state.adminFormsReducers.verifyCredentialsLoader ,
//        availableArn: state.adminFormsReducers && state.adminFormsReducers.availableArn
//     }
//   }
//    const mapDispatchToProp = (dispatch) => {
//     return {dispatch:dispatch}
//    }

//   export default connect(mapStateToProp,mapDispatchToProp)(ARN);
