// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import IfaPreferencesForm from 'app/uiCollection/admin/IFAOnBoarding/ifaPreferences/ifaPreferencesForm'
// import {CreateUpdatePreference, DeleteImageFromFTP,RemoveImage} from 'app/actions/admin/ifaRegistration'

// import {reset, change} from 'redux-form'
// import {RIA_LIST, TXN_FREQUENCY, TXN_PERIOD, ALLOW_FIREBASE_NOTIFICATION_OPTIONS,ALLOW_CAS_LIST,ALLOW_XIRR} from 'app/constants/broker/brokerDashboardConst'
// import {notificationMsg} from 'app/utils/actionsInTable'
// import {IfaPreferencesData} from 'app/actions/admin/ifaInitialInfo'
// import {GetArnAllInfoData} from 'app/actions/admin/arnInitialInfo'
// import {TRUE_FALSE_COMMON,ONBOARDING_OPTIONS, MOBILE_LAYOUT_OPTIONS,BUSINESS_TYPE_OPTIONS} from 'app/constants/shared/commonConst'
// import { DOCS_LOCATION_DOMAIN, INVESTWELL_LOGOS, INVESTWELL_CLOUD_IMAGES, INVESTWELL_CUSTOM_IMAGES } from 'app/constants'

// class PreferencesCont extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             showCredentialForm : true,
//             activeForm : true,
//             selectedAllowTxnOpts : RIA_LIST[1],
//             selectedTxnFrequencyOpts : TXN_FREQUENCY[0],
//             hideMetricsSubUsers : TRUE_FALSE_COMMON[1],
//             selectedTxnPeriodOpts : TXN_PERIOD[0],
//             actionTaken : true,
//             selectedMsActiveOpts : RIA_LIST[1],   
//             selectedFirebaseNotificationOpts : ALLOW_FIREBASE_NOTIFICATION_OPTIONS[0],
//             selectedXirrOpt:  ALLOW_XIRR[1],
//             selectedWeightedCagr : RIA_LIST[0],
//             selectedAuthLinkOpts : RIA_LIST[1], 
//             selectedTopSchemes: TRUE_FALSE_COMMON[0],
//             selectedTopSIPSchemes: TRUE_FALSE_COMMON[0],
//             selectedSIPCalculator: TRUE_FALSE_COMMON[0],
//             selectedFutureProjection: TRUE_FALSE_COMMON[0],
//             selectedLatestNav: TRUE_FALSE_COMMON[0],
//             selectedFundPicks: TRUE_FALSE_COMMON[0],
//             selectedNFO: TRUE_FALSE_COMMON[0],
//             selectedMajorUpdate: TRUE_FALSE_COMMON[0],
//             selectedGoogleSignin: TRUE_FALSE_COMMON[0],
//             allowMobileOtpLogin : TRUE_FALSE_COMMON[1],
//             selectedShowAppBadge : TRUE_FALSE_COMMON[1],
//             selectedOnboardingOption : ONBOARDING_OPTIONS[1],
//             selectedMobileLayoutOption : MOBILE_LAYOUT_OPTIONS[0],
//             selectedBusinessTypeOption : BUSINESS_TYPE_OPTIONS[0],
//             disableClientLogin : 0, 
//             isBrokerage : TRUE_FALSE_COMMON[1],
//             selectedWhatsAppOpt : TRUE_FALSE_COMMON[1],
//             selectedShowIsin : TRUE_FALSE_COMMON[1],
//             imageDeleted: false,
//             initialValues : {
//                 androidAppLink:'https://play.google.com/store/apps/details?id=com.iw.mint.app&hl=en',
//                 iosAppLink : 'https://apps.apple.com/in/app/mint-by-investwell/id1479042500'
//             },
//             bgDeleted:false,
//             customBackground:false,
//             selectedAllowCasOption : ALLOW_CAS_LIST[0],
//             selectedSOAEnable : RIA_LIST[0],
//             selectedUseEdge360Option : RIA_LIST[0]
//         }
//     }

//     getSelectedObject(data, objectsArray, key, index){
//         return (objectsArray.find(obj => (obj.value == data[key])) || objectsArray[index] )
//     }

//     UNSAFE_componentWillReceiveProps(newProps){
//         let popupImagePath = null
//         let popupURL = null
//         if(this.state.actionTaken && newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]){
//             let ifaPreferencesInfoData = newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]
//             if(ifaPreferencesInfoData.popupImagePath){
//                 popupImagePath=ifaPreferencesInfoData.popupImagePath
//                  popupURL = ifaPreferencesInfoData.popupURL
//             }
//             let backgroundStretch = TRUE_FALSE_COMMON.find(obj => obj.value == ifaPreferencesInfoData.backgroundStretch)     
//             let pmsSoa = TRUE_FALSE_COMMON.find(obj =>obj.value == ifaPreferencesInfoData.pmsSoa )
//             let liquiloan = TRUE_FALSE_COMMON.find(obj =>obj.value == ifaPreferencesInfoData.liquiloan )
//             let priorityBid = TRUE_FALSE_COMMON.find(obj =>obj.value == ifaPreferencesInfoData.priorityBid )
//             let sendTxnWithoutBrokerage = TRUE_FALSE_COMMON.find(obj =>obj.value == ifaPreferencesInfoData.sendTxnWithoutBrokerage )

//             let selectedAllowTxnOpts = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , RIA_LIST , 'allowTxnNotification',1) 
//             let hideMetricsSubUsers = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'hideMetricsSubUsers',1)
//             let selectedMsActiveOpts = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , RIA_LIST , 'msActive',1)
//             let selectedSOAEnable = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , RIA_LIST , 'allowSOADownload',0)
//             let selectedTxnFrequencyOpts = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TXN_FREQUENCY , 'txnNotificationFrequency',0)
//             let selectedTxnPeriodOpts = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TXN_PERIOD , 'txnNotificationPeriod',0)
//             let selectedFirebaseNotificationOpts = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , ALLOW_FIREBASE_NOTIFICATION_OPTIONS , 'allowFirebaseNotification',0)
//             let selectedAllowCasOption = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , ALLOW_CAS_LIST , 'allowCas',0)
//             let selectedXirrOpt = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , RIA_LIST , 'hideXirr',1)
//             let selectedWeightedCagr = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , RIA_LIST , 'isWeightedCagr',0)
//             let selectedAuthLinkOpts = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , RIA_LIST , 'isUccAuthLink',1)
//             let selectedUseEdge360Option = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , RIA_LIST , 'useEdge360',0)
//             let selectedTopSchemes = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'topSchemes',0)
//             let selectedTopSIPSchemes = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'topSIPSchemes',0)
//             let selectedSIPCalculator = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'SIPCalculator',0)
//             let selectedFutureProjection = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'futureProjectionCalculator',0)
//             let selectedLatestNav = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'latestNav',0)
//             let selectedFundPicks = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'fundPicks',0)
//             let selectedNFO = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'NFO',0)
//             let selectedMajorUpdate = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'majorUpdate',0)
//             let selectedGoogleSignin = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'isGoogleSignin',0)
//             let allowMobileOtpLogin = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0] , TRUE_FALSE_COMMON , 'allowMobileOtpLogin',1)
//             let selectedShowAppBadge = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'showAppBadge',1)
//             let selectedOnboardingOption = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , ONBOARDING_OPTIONS , 'allowOnboarding',1)
//             let selectedMobileLayoutOption = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , MOBILE_LAYOUT_OPTIONS , 'layout',0)
//             let selectedBusinessTypeOption = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , BUSINESS_TYPE_OPTIONS , 'businessType',0)
//             let isBrokerage = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'hideBrokerage',1)
//             let selectedWhatsAppOpt = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'whatsappEnabled',1)
//             let selectedShowIsin = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'showISIN',1)
//             let isAlertNotification = this.getSelectedObject(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]  , TRUE_FALSE_COMMON , 'isAlertNotification',1)
            
//             // chosen user selection for "Show BSE Portal Login Button"
//             let userType =this.state.userList && this.state.userList.find(obj => obj.levelNo == ifaPreferencesInfoData.bseLoginLevelNo) 
//             userType = userType ? userType : { levelName: "Broker", levelNo: 1 }

//             this.setState({
//                 selectedAllowTxnOpts,
//                 selectedTxnFrequencyOpts,
//                 selectedTxnPeriodOpts,
//                 selectedMsActiveOpts,
//                 selectedFirebaseNotificationOpts,
//                 selectedAllowCasOption,
//                 selectedSOAEnable,
//                 selectedXirrOpt,
//                 selectedWeightedCagr,
//                 selectedAuthLinkOpts,
//                 selectedTopSchemes,
//                 selectedTopSIPSchemes,
//                 selectedSIPCalculator,
//                 selectedFutureProjection,
//                 selectedLatestNav,
//                 selectedFundPicks,
//                 selectedNFO,
//                 selectedMajorUpdate,
//                 selectedGoogleSignin,
//                 selectedUseEdge360Option,
//                 selectedShowAppBadge,
//                 selectedOnboardingOption,
//                 selectedMobileLayoutOption,
//                 selectedBusinessTypeOption,isBrokerage,
//                 popupImagePath,
//                 popupURL,
//                 selectedWhatsAppOpt,
//                 selectedShowIsin,
//                 hideMetricsSubUsers,
//                 isAlertNotification,
//                 userType,
//                 pmsSoa,liquiloan,priorityBid,
//                 sendTxnWithoutBrokerage,
//                 backgroundStretch,
//                 allowMobileOtpLogin
//             })

//             if(ifaPreferencesInfoData.disableClientLogin == 1)
//             {
//                 this.setState({
//                     disableClientLogin : 1
//                 })
//             }
//             else {
//                 this.setState({
//                     disableClientLogin : 0
//                 })
//             }
            
//         }
//         // creating dropdown options for "Show BSE Portal Login Button"
//         if (this.props.levelInitialData) {
//             let userList = Array.from(this.props.levelInitialData)
//             for (let i = 0; i < userList.length; i++) {
//                 if (userList[i].levelNo === 8) userList.splice(i, 1)
//                 if (userList[i].levelNo === 10) userList.splice(i, 1)
//                 if (userList[i].levelNo === 98) userList.splice(i, 1)
//                 if (userList[i].levelNo === 100) userList.splice(i, 1)
//             }
//             this.setState({ userList })
//         }

//         if(newProps.preferencesData && newProps.preferencesData.updatedPreferencesData && newProps.preferencesData.updatedPreferencesData.status==0){
//             this.props.dispatch({type:'CREATE_SUCCESS_PREFERENCE', payload : null})
//             this.props.dispatch({type:'GOT_IFA_PREFERENCES_DATA', payload: null})
//             this.props.dispatch(reset('IfaPreferencesForm'));
//             this.props.dispatch({type:'TAB_STATE_MANAGEMENT',payload:3})
//             this.props.dispatch({type:'CLEAR_NOTIFICATION'})
//             let param = {}
//             param.bid = this.props.storeBid
//             this.props.dispatch(IfaPreferencesData(param))
//             this.props.dispatch(GetArnAllInfoData(param))

//             this.setState({
//                 actionTaken:true
//             })
//         }
//         if(newProps.popupImageData && newProps.popupImageData.filename && this.props.uploadDiff =='uploadPopupImg'){
//             this.setState({
//                 popupImagePath:newProps.popupImageData && newProps.popupImageData.filename,
//                 popupURL:`${DOCS_LOCATION_DOMAIN}/${INVESTWELL_CLOUD_IMAGES}/${INVESTWELL_LOGOS}/${INVESTWELL_CUSTOM_IMAGES}/${newProps.popupImageData && newProps.popupImageData.filename}`
//             })
//         }

//         if(newProps.popupImageData && newProps.popupImageData.filename && this.props.uploadDiff =='uploadBackgroundImg'){
//             this.setState({
//                 customBackground:true
//             })
//         }
//         if(this.state.popupURLImgDelete && newProps.ifaNotification && ( newProps.ifaNotification.notificationData && !newProps.ifaNotification.errorNotification ) ){
//             this.props.dispatch(change('IfaPreferencesForm', 'popupURL', null));
//             this.props.dispatch({type : 'GOT_LOGO_UPLOAD', payload : null})
//             if(newProps.ifaPreferencesInfoData && newProps.ifaPreferencesInfoData[0]){
//                 newProps.ifaPreferencesInfoData[0].popupURL= null
//                 newProps.ifaPreferencesInfoData[0].popupImagePath= null
//             }
//             this.setState({
//                 popupImagePath : null,
//                 popupURL : null,
//                 popupURLImgDelete : false,
//                 imageDeleted: true
//             })
//         }

//         if(this.state.customBackgroundDelete && newProps.ifaNotification && ( newProps.ifaNotification.notificationData && !newProps.ifaNotification.errorNotification )){
//             this.props.dispatch({type : 'GOT_LOGO_UPLOAD', payload : null})
//             this.setState({
//                 customBackgroundDelete : false,
//                 bgDeleted: true,
//                 customBackground:false

//             })
//         }
//     }
//     componentWillUnmount(){
//         this.props.dispatch({type:'GOT_LOGO_UPLOAD', payload:null})
//     }
//     switchFun(slideBtnVal){
//         switch(slideBtnVal){
//             case 'slideRight' :
//             this.setState({
//                 disableClientLogin : 0
//             })
//             break;

//             case 'slideLeft' :
//             this.setState({
//                 disableClientLogin : 1
//             })
//             break;
//         }
//     }

//     onSubmitForm(elm){
//         let param = elm || {}
//             param.allowCas = this.state.selectedAllowCasOption.value
//             param.allowTxnNotification = this.state.selectedAllowTxnOpts && this.state.selectedAllowTxnOpts.value
//             param.txnNotificationFrequency = this.state.selectedTxnFrequencyOpts && this.state.selectedTxnFrequencyOpts.value
//             param.txnNotificationPeriod = this.state.selectedTxnPeriodOpts && this.state.selectedTxnPeriodOpts.value
//             param.allowSOADownload = this.state.selectedSOAEnable && this.state.selectedSOAEnable.value
//             param.isWeightedCagr = this.state.selectedWeightedCagr && this.state.selectedWeightedCagr.value
//             param.isUccAuthLink = this.state.selectedAuthLinkOpts && this.state.selectedAuthLinkOpts.value
//             param.topSchemes = this.state.selectedTopSchemes && this.state.selectedTopSchemes.value
//             param.topSIPSchemes =  this.state.selectedTopSIPSchemes && this.state.selectedTopSIPSchemes.value
//             param.SIPCalculator =  this.state.selectedSIPCalculator && this.state.selectedSIPCalculator.value
//             param.futureProjectionCalculator =  this.state.selectedFutureProjection && this.state.selectedFutureProjection.value
//             param.latestNav =  this.state.selectedLatestNav && this.state.selectedLatestNav.value
//             param.fundPicks =  this.state.selectedFundPicks && this.state.selectedFundPicks.value
//             param.NFO =  this.state.selectedNFO && this.state.selectedNFO.value
//             param.majorUpdate =  this.state.selectedMajorUpdate && this.state.selectedMajorUpdate.value
//             param.isGoogleSignin =  this.state.selectedGoogleSignin && this.state.selectedGoogleSignin.value
//             param.useEdge360 = this.state.selectedUseEdge360Option && this.state.selectedUseEdge360Option.value
//             param.componentForLoader = {componentName:'ifaPreferencesLoader'}
//             param.bid = this.props.storeBid
//             param.disableClientLogin = this.state.disableClientLogin
//             param.popupURL= elm.popupURL
//             param.hideMetricsSubUsers  = this.state.hideMetricsSubUsers && this.state.hideMetricsSubUsers.value
//             param.interaktFirstSyncUsers = this.state.interaktFirstSyncUsers ? 1 : 0
//             param.interaktFirstSyncEvents = this.state.interaktFirstSyncEvents ? 1 : 0
//             param.bseLoginLevelNo = this.state.userType && this.state.userType.levelNo
//             param.layout = this.state.selectedMobileLayoutOption.label
//             param.businessType=this.state.selectedBusinessTypeOption && this.state.selectedBusinessTypeOption.value
//             param.allowIps = (param.allowIps && param.allowIps.length > 0) ? param.allowIps.replace(/\s/g, "").split(',') : null
//             param.backgroundStretch = this.state.backgroundStretch && this.state.backgroundStretch.value
//             if(this.state.customBackground && !this.state.bgDeleted){
//                 let bgFileName=this.props.fileName && this.props.fileName.split('_')
//                 bgFileName= bgFileName[0] + '_customBackground.png'
//                 param.customBackgroundImage = bgFileName
//             }else if(this.state.bgDeleted)
//             {
//                 param.customBackgroundImage = null
//             }
//             if(this.state.popupImagePath && this.state.popupImagePath.length >0 && !this.state.imageDeleted){
//                 param.popupImagePath=this.state.popupURL       
//             }
//             else if(this.state.imageDeleted)
//             {
//                 param.popupImagePath = null
//             }
//             this.setState({
//                 actionTaken : false, 
//                 customBackground:false,
//                 bgDeleted:false

//             })
//             param = {...param}
//             this.props.dispatch(CreateUpdatePreference(param))
//     }
//     onOptionSelection(obj, fldName){
//         switch(fldName){
//             case 'allowTxnNotification' :
//             this.setState({
//                 selectedAllowTxnOpts : obj
//             })
//             break;
//             case 'txnNotificationFrequency' :
//             this.setState({
//                 selectedTxnFrequencyOpts : obj
//             })
//             break;
//             case 'txnNotificationPeriod' :
//             this.setState({
//                 selectedTxnPeriodOpts : obj
//             })
//             break;
//             case 'allowSOADownload' :
//             this.setState({
//                 selectedSOAEnable : obj
//             })
//             break;
//             case 'msActive' :
//             this.setState({
//                 selectedMsActiveOpts : obj
//             })
//             break;
//             case 'allowFirebaseNotification' :
//             this.setState({
//                 selectedFirebaseNotificationOpts : obj
//             })
//             break;
//             case 'allowCas' :
//             this.setState({
//                 selectedAllowCasOption : obj
//             })
//             break;
//             case 'hideXirr' :
//             this.setState({
//                 selectedXirrOpt : obj
//             })
//             break;
//             case 'isWeightedCagr' :
//             this.setState({
//                 selectedWeightedCagr : obj
//             })
//             break;
//             case 'isUccAuthLink' :
//             this.setState({
//                 selectedAuthLinkOpts : obj
//             })
//             break;
//             case 'topSchemes' :
//             this.setState({
//                 selectedTopSchemes : obj
//             })
//             break;
//             case 'topSIPSchemes' :
//             this.setState({
//                 selectedTopSIPSchemes : obj
//             })
//             break;
//             case 'SIPCalculator' :
//             this.setState({
//                 selectedSIPCalculator : obj
//             })
//             break;
//             case 'futureProjectionCalculator' :
//             this.setState({
//                 selectedFutureProjection : obj
//             })
//             break;

//             case 'latestNav' :
//             this.setState({
//                 selectedLatestNav : obj
//             })
//             break;
//             case 'fundPicks' :
//             this.setState({
//                 selectedFundPicks : obj
//             })
//             break;
//             case 'NFO' :
//             this.setState({
//                 selectedNFO : obj
//             })
//             break;
//             case 'majorUpdate' :
//             this.setState({
//                 selectedMajorUpdate : obj
//             })
//             break;
//             case 'isGoogleSignin' :
//             this.setState({
//                 selectedGoogleSignin : obj
//             })
//             break;
//             case 'useEdge360' :
//             this.setState({
//                 selectedUseEdge360Option : obj
//             })
//             break;
//             case 'showAppBadge':
//                 this.setState({
//                     selectedShowAppBadge: obj
//                 })
//             break;
//             case 'allowOnboarding':
//                 this.setState({
//                     selectedOnboardingOption: obj
//                 })
//             break;
//             case 'mobileLayout':
//                 this.setState({
//                     selectedMobileLayoutOption: obj
//                 })
//             break;
//             case 'businessType':
//                 this.setState({
//                     selectedBusinessTypeOption: obj
//                 })
//             break;
//             case 'hideBrokerage':
//                 this.setState({
//                     isBrokerage: obj
//                 })
//             break;
//             case 'whatsappEnabled':
//                 this.setState({
//                     selectedWhatsAppOpt: obj
//                 })
//             break;
//             case 'showISIN':
//                 this.setState({
//                     selectedShowIsin:obj
//                 })
//              break;
//             default : 
//             this.setState({
//                 [fldName]:obj
//             })
//             break;

//         }
//     }
//     deletePopupURLImg(fldName){
//         let ifaPreferencesInfoData = (this.props.ifaPreferencesInfoData && this.props.ifaPreferencesInfoData[0] || {})
//         let param = {}
//         param.domain = ifaPreferencesInfoData && ifaPreferencesInfoData.domain
//         switch (fldName) {
//             case 'uploadPopupImg':
//                 param.imageType = 'popupImage'
//                 this.props.dispatch(DeleteImageFromFTP(param))
//                 this.setState({
//                     popupURLImgDelete : true,
//                 })
//             break;
//             case 'uploadBackgroundImg':
//                 param.componentForLoader={componentName:'deleteCustomBgLoader'}
//                 param.bid = ifaPreferencesInfoData && ifaPreferencesInfoData.bid
//                 param.imageType = 'customBackground'
//                 this.props.dispatch(RemoveImage(param))
//                 this.setState({
//                     customBackgroundDelete : true,
//                     customBackground:false
//                 })
//             break;
//             default:
//             break;
//         }        
//     }

//     onInteraktCheckboxTick(obj,fldName){
//         this.setState({
//             [fldName] : !this.state[fldName]
//         })
//     }

//     render(){
//         return(
// 	    	<li class={` ${(this.props.openTab == 7 && 'openTabs') || (!this.props.activeAllFrm && 'removeDisabled') }`} >
//                 <IfaPreferencesForm
//                     openAccordionTabs = {(obj)=>this.props.openAccordionTabs(obj)}
//                     openTab = {this.props.openTab}
//                     activeAllFrm = {this.props.activeAllFrm}
//                     onSubmit = {(obj)=>this.onSubmitForm(obj)}
//                     onOptionSelection = {(obj, fldName)=>this.onOptionSelection(obj, fldName)}
//                     ifaPreferencesInfoData = { this.props.ifaPreferencesInfoData && this.props.ifaPreferencesInfoData[0]}
//                     selectedAllowTxnOpts = { this.state.selectedAllowTxnOpts }
//                     hideMetricsSubUsers = {this.state.hideMetricsSubUsers}
//                     selectedTxnFrequencyOpts = { this.state.selectedTxnFrequencyOpts }
//                     selectedTxnPeriodOpts = { this.state.selectedTxnPeriodOpts }
//                     preferencesData = { this.props.preferencesData }
//                     selectedMsActiveOpts = { this.state.selectedMsActiveOpts}
//                     selectedSOAEnable = { this.state.selectedSOAEnable}
//                     selectedFirebaseNotificationOpts={this.state.selectedFirebaseNotificationOpts}
//                     selectedAllowCasOption={this.state.selectedAllowCasOption}
//                     selectedXirrOpt = {this.state.selectedXirrOpt}
//                     selectedWeightedCagr = { this.state.selectedWeightedCagr}
//                     selectedAuthLinkOpts = { this.state.selectedAuthLinkOpts}
//                     selectedTopSchemes = { this.state.selectedTopSchemes}
//                     selectedTopSIPSchemes = { this.state.selectedTopSIPSchemes}
//                     selectedSIPCalculator = { this.state.selectedSIPCalculator}
//                     selectedFutureProjection = { this.state.selectedFutureProjection}
//                     selectedLatestNav = { this.state.selectedLatestNav}
//                     selectedFundPicks = { this.state.selectedFundPicks}
//                     selectedNFO = { this.state.selectedNFO}
//                     selectedMajorUpdate = { this.state.selectedMajorUpdate}
//                     selectedGoogleSignin = { this.state.selectedGoogleSignin}
//                     allowMobileOtpLogin = { this.state.allowMobileOtpLogin}
//                     selectedUseEdge360Option = {this.state.selectedUseEdge360Option}
//                     selectedShowAppBadge = { this.state.selectedShowAppBadge }
//                     selectedOnboardingOption={this.state.selectedOnboardingOption   }
//                     selectedMobileLayoutOption = { this.state.selectedMobileLayoutOption }
//                     selectedBusinessTypeOption ={this.state.selectedBusinessTypeOption}
//                     switchFun = {(slideBtnVal) => this.switchFun(slideBtnVal)}
//                     clientSlideLoginPosition = {this.state.disableClientLogin}
//                     isBrokerage = {this.state.isBrokerage}
//                     fileName = {this.props.fileName}
//                     ifaNotification = {this.props.ifaNotification}
//                     onFileUpload = {this.props.openCropImage}
//                     popupImagePath={this.state.popupImagePath}
//                     selectedWhatsAppOpt = {this.state.selectedWhatsAppOpt}
//                     selectedShowIsin={this.state.selectedShowIsin}
//                     popupURL = {this.state.popupURL}
//                     deletePopupURLImg = {(fldName)=> this.deletePopupURLImg(fldName)}
//                     utils= {this.props.utils}
//                     isAlertNotification = {this.state.isAlertNotification}
//                     pmsSoa = {this.state.pmsSoa}
//                     liquiloan = {this.state.liquiloan}
//                     priorityBid = {this.state.priorityBid}
//                     sendTxnWithoutBrokerage={this.state.sendTxnWithoutBrokerage}
//                     onInteraktCheckboxTick = {(obj,fldName)=>this.onInteraktCheckboxTick(obj,fldName)}
//                     initialValues = {this.state.initialValues}
//                     customBackground ={this.state.customBackground}
//                     userType = {this.state.userType}
//                     userList = {this.state.userList}
//                     backgroundStretch = {this.state.backgroundStretch}
//                 />
//                 {notificationMsg(this.props.preferencesData && this.props.preferencesData.notificationData,'CLEAR_NOTIFICATION',this.props)}
                
//             </li>
//         )
//     }
// }

// const mapStateToProp = (state) =>{
//     return {
//         preferencesData : state.adminFormsReducers,
//         ifaPreferencesInfoData : state.adminFormsReducers && state.adminFormsReducers.ifaPreferencesData,
//         ifaNotification: state.adminFormsReducers,
//         popupImageData:state.adminFormsReducers && state.adminFormsReducers.logoUploadData && state.adminFormsReducers.logoUploadData.result,
//         utils: state.utils,
//         levelInitialData: state.adminFormsReducers && state.adminFormsReducers.levelInitialData && state.adminFormsReducers.levelInitialData.data
//     }
// }
// const mapDispatchToProp = (dispatch) => {
//     return {dispatch:dispatch}
// }
// export default connect(mapStateToProp,mapDispatchToProp)(PreferencesCont);
