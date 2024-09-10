// import React, {Component,Fragment} from 'react'
// import {connect} from 'react-redux'
// import IFARegistrationForm from './ifaRegistrationForm'
// import { IfaRegistrationData, ShowNSEFirstFetch, GetIINDetailsByBid, DeleteLogoImage, ShowBSEfirstFetch, bidForNewIFAOnboarding, GetUCCNDetailsByBid } from 'app/actions/admin/ifaRegistration'
// import {USER_ACTIVE_STATUS,SEND_BIRTHDAY_MAIL_OPTIONS,PROTECTED_PDF_OPTIONS,
//         TWO_FACTOR_AUTH_OPTIONS,DIRECT_SCHEME_OPTIONS,EXCHANGE_LIST, SUBSCRIPTION_EXPIRATION,LOADER_WIDTH,TRUE_FALSE_COMMON, DOMAIN_URL, PAGE_SIZE, INDIAN_STATES} from 'app/constants/shared/commonConst'
// import * as reportActions from 'app/actions/admin/report/oneViewReport'
// import * as ArnListAPI  from 'app/actions/admin/arnMapping'
// import {THEMES} from 'app/constants/dashboardConst'
// import Loader from 'app/uiCollection/shared/loaders'

// class IFARegistration extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             selectedOpt:{label:'',value:0},
//             selectedTheme:{label:'', key:'',value:1}, filter:{},
//             selectedPageOpt : {label:'20', value :20},
//             selectedExChange:{label:'NSE',value:1},
//             isActiveStatus: USER_ACTIVE_STATUS[0],
//             selectedSubscriptionFlag: SUBSCRIPTION_EXPIRATION[1],
//             isMigration: TRUE_FALSE_COMMON[0],
//             nseOpted: false, bseOpted: false, mfuOpted:false,
//             selectedAdminExecutives : {},
//             showOneDayChange: TRUE_FALSE_COMMON[1],
//             apiCall:true, stopApiCall:true
//         }
//         props.dispatch({type:'DB_SHARDING_STARTED',payload:null})
//     }

//     componentDidMount() {
//         let param ={}
//         param.bid=this.props.storeBid;
//         this.props.dispatch(reportActions.getAdminExecutives())
//         this.showFirstFetchBtns('nseOpted')
//         this.showFirstFetchBtns('bseOpted')
//         this.props.dispatch(bidForNewIFAOnboarding(param))
//     }
   

//     updateIfaRegistration(event){
//         if(!this.state.logoParamNotRequired){
//             event.logo = (this.props.fileName|| this.props.ifaRegistrationInfo&&this.props.ifaRegistrationInfo.domain)
//             event.largeLogo = this.state.largeLogo
//         }else
//         {
//             event.logo = null
//             event.largeLogo = null
//         }
//        // event.domain = dataFormatter.removeExtraSpaceString(this.props.ifaRegistrationInfo.domain)
//        // event.uid = this.props.uIdFrmUserList ? this.props.uIdFrmUserList : (this.props.ifaSignUpInfo && this.props.ifaSignUpInfo.uid)
//         event.uid = (this.props.uIdFrmUserList)|| (this.props.ifaSignUpInfo && this.props.ifaSignUpInfo.uid) ||(this.props.ifaInfoData && this.props.ifaInfoData.data && this.props.ifaInfoData.data[0] &&  this.props.ifaInfoData.data[0].uid)
//         event.state = (this.state.selectedOpt && this.state.selectedOpt.value !=0) ? this.state.selectedOpt.value : '';
//         event.theme = this.state.selectedTheme.value;
//         event.paginationSize = this.state.selectedPageOpt.value;
//         event.exchange =  this.state.selectedExChange ? this.state.selectedExChange.value : null
//         event.isActive = this.state.isActiveStatus.value
//         event.isPaid = this.state.selectedSubscriptionFlag && this.state.selectedSubscriptionFlag.value
//         event.nseOpted = this.state.nseOpted?1:0
//         event.bseOpted = this.state.bseOpted?1:0
//         event.mfuOpted = this.state.mfuOpted?1:0
//         event.componentForLoader = {componentName : 'ifaForm'}
//         event.bid = this.props.storeBid ? this.props.storeBid : this.props.ifaNotification && this.props.ifaNotification.bidForNewIfa && this.props.ifaNotification.bidForNewIfa[0].bid 
//         event.status = this.props.ifaNotification && this.props.ifaNotification.bidForNewIfa && this.props.ifaNotification.bidForNewIfa[0].status 
//         event.dbStatus = this.props.ifaNotification && this.props.ifaNotification.bidForNewIfa && this.props.ifaNotification.bidForNewIfa[0].dbStatus 
//         event.executiveAdminUid = this.state.selectedAdminExecutives && this.state.selectedAdminExecutives.uid
//         event.sendBirthdayMails = this.state.selectedSendBirthdayMails && this.state.selectedSendBirthdayMails.value
//         event.isAllowXLS = this.state.selectedXLSPreference && this.state.selectedXLSPreference.value
//         event.allow2FactorAuth = this.state.selectedTwoFactorAuthOption && this.state.selectedTwoFactorAuthOption.value
//         event.isPdfProtected = this.state.selectedProtectedPDFOption && this.state.selectedProtectedPDFOption.value
//         event.directScheme = this.state.selectedDirectScheme && this.state.selectedDirectScheme.value
//         event.showOneDayChange = this.state.showOneDayChange && this.state.showOneDayChange.value
//         event.domainURL = this.state.domainURL && this.state.domainURL.value
//         event.sendAnniversaryMails = this.state.selectedSendAnniversaryMails && this.state.selectedSendAnniversaryMails.value
//         this.props.dispatch(IfaRegistrationData(event))
//     }
//     onOptionSelection(obj,fldName){
//         switch(fldName){
//             case 'state' :
//                 this.setState({
//                     selectedOpt: obj,
//                     filter:{}
//                 })
//                 break;
//             default :
//             this.setState({
//                 [fldName] : obj
//             })
//             break;

//         }


    	
//     }
//     openArnListPopUp(){
//         let param = {}
// 		param.componentForLoader = {componentName:'loaderArnMapping'}
//         param.bid=this.props.storeBid;
//         param.bseMFCredentials= 1
//         this.props.dispatch(ArnListAPI.ToArnInfoRepoData(param))        
        
// 	}
//     closePopUpBox(){
//         this.props.dispatch({type : 'GOT_TO_ARN', payload : null})
// 		this.props. dispatch({type:'GOT_UCC_DETAILS_BY_BID', payload: null})
// 		this.setState({
// 			showARNListPopUp : false,
// 			showJobPopUp:false
// 		})
// 	}
//     createARNListRows(arnListData){
// 		let arnListRows = arnListData.map((obj, index) => {
// 			let listData = obj
// 			let mfType = obj.bseMemberId?'MFD':'MFI'
//                 return <Fragment key={index}>
//                     <li key={index}>
//                         <div class="cols width" data-title="ARN">{obj.arnNo}</div>
//                         <div class="cols width" data-title="Member ID">{obj.bseMemberId ? obj.bseMemberId : obj.bseMFIMemberId}</div>
//                         <div class="cols width" data-title="Type">{mfType}</div>
//                         <div class="cols width last btnsContainer mdlSizeBtns widthAuto" data-title="Action">
//                             <a class="gray" href="javascript:void(0)" onClick={() => this.getUccDetails(listData, mfType)}>Go</a>
//                         </div>
//                     </li>
//                     {listData.bseMemberCode && listData.bseMFIMemberId && <li key={index}>
//                         <div class="cols width" data-title="ARN">{obj.arnNo}</div>
//                         <div class="cols width" data-title="Member ID">{obj.bseMemberId}</div>
//                         <div class="cols width" data-title="Type">MFI</div>
//                         <div class="cols width last btnsContainer mdlSizeBtns widthAuto" data-title="Action">
//                             <a class="gray" href="javascript:void(0)" onClick={() => this.getUccDetails(listData, 'MFI')}>Go</a>
//                         </div>
//                     </li>}
// 			    </Fragment>
// 		    })
// 		this.setState({
// 			arnListRows,
// 		})
// 	}
// 	getUccDetails(obj,type){
// 		let param = {}
//         let filters = {}
//         filters.arnid= obj.arnid
//         filters.arnNo = obj.arnNo
//         filters.bid = this.props.storeBid
//         filters.isMFI = (type == 'MFD') ? 0 :1
// 		param.MFType = type
// 		param.task = 43
//         param.bid = this.props.storeBid
//         param.filters = filters
// 		this.props.dispatch(GetUCCNDetailsByBid(param))	
// 	}
//     onThemeSelection(obj){
//     	this.setState({
//             selectedTheme:obj,
//             filter:{}
//         })
//     }
//     onPageSizeSelection(obj){
//     	this.setState({
//             selectedPageOpt:obj,
//             filter:{}
//         })
//     }
//     onExChangeSelection(obj){
//         this.setState({
//             selectedExChange:obj
//         })
//     }
//     isActiveStatusSelection(obj){
//         this.setState({
//             isActiveStatus:obj
//         })
//     }
//     isMigrationSelection(obj){
//         this.setState({
//             isMigration:obj
//         })
//     }
//     onSendBirthdayMailsSelection(obj){
//         this.setState({
//             selectedSendBirthdayMails:obj
//         })
//     }
//     onSendAnniversaryMailsSelection(obj){
//         this.setState({
//             selectedSendAnniversaryMails:obj
//         })
//     }
//     onIsPDFProtectedOptionSelection(obj){
//         this.setState({
//             selectedProtectedPDFOption : obj
//         })
//     }

//     on2FactorOptionSelection(obj){
//         this.setState({
//             selectedTwoFactorAuthOption : obj
//         })
//     }

//     onXLSPreferenceSelection(obj){
//         this.setState({
//             selectedXLSPreference : obj
//         })
//     }
//     subscriptionExpiration(obj){
//         this.setState({
//             selectedSubscriptionFlag : obj
//         })
//     }

//     onDirectSchemeSelection(obj){
//         this.setState({
//             selectedDirectScheme : obj
//         })
//     }

//     adminExecutivesSelection(obj){
//         this.setState({
//             selectedAdminExecutives : obj
//         })
//     }
//     getSelectedObject(data, objectsArray, key, defaultIndex){
//         return (objectsArray.find(obj => (obj.value == data[key])) || objectsArray[defaultIndex] )

//     }

//     UNSAFE_componentWillReceiveProps(newProps){
//         let arnListData = newProps.getArnListData|| []
// 		if( (arnListData && arnListData.length > 0)){			
// 				this.setState({
// 					showARNListPopUp : true,
// 				}, ()=> {
// 					this.createARNListRows(arnListData)
// 				})
// 		}
//         if( newProps.ifaNotification && newProps.ifaNotification.ifaNotificationDataUcc
//             && newProps.ifaNotification.ifaNotificationDataUcc.status == 1 ){
// 			this.setState({
// 				showJobPopUp :true,
// 				showARNListPopUp:false
// 			})
			
// 		}
//         let ifaNotification = newProps.ifaNotification || {}
//       this.setState({
//           largeLogo:this.props.largeLogo
//       })
//       if(newProps.ifaNotification && newProps.ifaNotification.logoUploadData && newProps.ifaNotification.logoUploadData.status == 0){
//         this.setState({
//             logoParamNotRequired : false,
//         })
//       }
//       if(newProps.ifaSignUpInfo && this.state.apiCall){
//         let param = {}
//         param.bid = this.props.ifaNotification && this.props.ifaNotification.bidForNewIfa && this.props.ifaNotification.bidForNewIfa[0].bid 
//         this.props.dispatch(bidForNewIFAOnboarding(param))
//         this.setState({
//             apiCall:false
//         })
//       }

//         if(newProps.ifaNotification && newProps.ifaNotification.logoUploadData && newProps.ifaNotification.logoUploadData.result && newProps.ifaNotification.logoUploadData.result.filename){
//           if(this.props.isCropMessage==1){
//             this.setState({
//                 largeLogo:newProps.ifaNotification.logoUploadData.result.filename,
//             })
//           }
//           else if(this.props.isCropMessage==0){
//             this.setState({
//                 smallLogo:newProps.ifaNotification.logoUploadData.result.filename,
//             })
//           }
//         }
//         if(newProps.ifaRTegistrationDetails.apiStatus==-1){
//             this.setState({
//                 submitMsg:false,
//                 errorMsg:newProps.ifaRTegistrationDetails.errorMsg
//             })
//         }else if(this.props.ifaRTegistrationDetails.savingIFA && newProps.ifaRTegistrationDetails.savedIFA){
//             this.setState({
//                 submitMsg:true
//             })
//             this.props.activeAllForm();
//             setTimeout(()=>{
//                 this.setState({
//                     submitMsg:false
//                 })
//             },3000)
//         }
//         if(newProps.ifaNotification && newProps.ifaNotification.notification && (newProps.ifaNotification.notification.status == 0) && (newProps.ifaNotification.activeTab == 2)){
//             this.props.dispatch({type:'TAB_STATE_MANAGEMENT',payload:7})
//             this.props.dispatch({type : "GETTING_IFAREGISTRATION_DATA" ,payload : null })
//                 this.props.dispatch({type:'CLEAR_NOTIFICATION'})
//         }
//         if(newProps.ifaRegistrationInfo!=this.props.ifaRegistrationInfo&&newProps.ifaRegistrationInfo&&newProps.ifaRegistrationInfo.exchange){
//             EXCHANGE_LIST.find((obj)=>{
//                 if(obj.value == newProps.ifaRegistrationInfo.exchange){
//                     this.setState({
//                         selectedExChange:obj
//                     })
//                 }
//             })
//         }
//         if((newProps.ifaNotification && newProps.ifaNotification.bidForNewIfa) && Array.isArray(newProps.ifaNotification.bidForNewIfa) && (newProps.ifaNotification.bidForNewIfa.length == 0)){
//             this.setState({showBidPopUp : true})
//         }
//         if(newProps.ifaRegistrationInfo != this.props.ifaRegistrationInfo && newProps.ifaRegistrationInfo.bid && this.state.stopApiCall){
//                 let sendBirthdayMails = this.getSelectedObject(newProps.ifaRegistrationInfo, SEND_BIRTHDAY_MAIL_OPTIONS,'sendBirthdayMails',0)
//                 let sendAnniversaryMails = this.getSelectedObject(newProps.ifaRegistrationInfo, SEND_BIRTHDAY_MAIL_OPTIONS,'sendAnniversaryMails',0)
//                 let isPdfProtected = this.getSelectedObject(newProps.ifaRegistrationInfo, PROTECTED_PDF_OPTIONS,'isPdfProtected',1)
//                 let allow2FactorAuth = this.getSelectedObject(newProps.ifaRegistrationInfo, TWO_FACTOR_AUTH_OPTIONS,'allow2FactorAuth',1)
//                 let allowXLS = this.getSelectedObject(newProps.ifaRegistrationInfo, PROTECTED_PDF_OPTIONS,'isAllowXLS',0)
//                 let directScheme = this.getSelectedObject(newProps.ifaRegistrationInfo, DIRECT_SCHEME_OPTIONS,'directScheme', 0)
//                 let isPaid = this.getSelectedObject(newProps.ifaRegistrationInfo, SUBSCRIPTION_EXPIRATION,'isPaid', 0)
//                 let showOneDayChange = this.getSelectedObject(newProps.ifaRegistrationInfo,TRUE_FALSE_COMMON,'showOneDayChange',0)
//                 let domainURL = this.getSelectedObject(newProps.ifaRegistrationInfo, DOMAIN_URL,'domainURL',0)
//                 let isActiveStatus = this.getSelectedObject(newProps.ifaRegistrationInfo, USER_ACTIVE_STATUS,'isActive',0)
//                 let selectedTheme = this.getSelectedObject(newProps.ifaRegistrationInfo, THEMES,'theme',0)
//                 let selectedPageOpt = this.getSelectedObject(newProps.ifaRegistrationInfo, PAGE_SIZE,'paginationSize',1)
//                 let selectedOpt = INDIAN_STATES.find( obj => obj.value == newProps.ifaRegistrationInfo.state ) || {label:'',value:0}
//                 this.setState({
//                     showOneDayChange,
//                     domainURL,
//                     isActiveStatus,
//                     selectedTheme,
//                     selectedPageOpt,
//                     selectedOpt,
//                     selectedSendBirthdayMails : sendBirthdayMails,
//                     selectedSendAnniversaryMails : sendAnniversaryMails,
//                     selectedProtectedPDFOption : isPdfProtected,
//                     selectedTwoFactorAuthOption : allow2FactorAuth,
//                     selectedXLSPreference : allowXLS,
//                     selectedDirectScheme : directScheme,
//                     selectedSubscriptionFlag: isPaid,
//                 })
//             let isMigration = TRUE_FALSE_COMMON.find(obj => (obj.value == newProps.ifaRegistrationInfo.isMigration ))
            
//             let selectedAdminExecutives;
//             if(this.props.oneViewReportData && this.props.oneViewReportData.adminExecutives && this.props.oneViewReportData.adminExecutives.data)
//             {
//                 let EXECUTIVE_LIST = this.props.oneViewReportData.adminExecutives.data;

//                 selectedAdminExecutives = EXECUTIVE_LIST.find(obj => {
//                     if(obj.uid === newProps.ifaRegistrationInfo.executiveAdminUid)
//                     {
//                         return { name : obj.name, uid : obj.uid}
//                     }
//                 })
//             }
//             let nseOpted=newProps.ifaRegistrationInfo.nseOpted==1?true:false
//             let bseOpted=newProps.ifaRegistrationInfo.bseOpted==1?true:false
//             let mfuOpted=newProps.ifaRegistrationInfo.mfuOpted==1?true:false

//             this.setState({
//                 isMigration, nseOpted, bseOpted, mfuOpted, selectedAdminExecutives,stopApiCall:false,
//             })
//         }
//         if(this.state.logoDelete && ifaNotification && (ifaNotification.notificationData && !ifaNotification.errorNotification)){
//             this.props.dispatch({type:'GOT_LOGO_UPLOAD', payload:null})
//             this.setState({
//                 logoDelete : null,
//                 logoParamNotRequired : true,
//             })
//         }



//     }
//     showFirstFetchBtns(fldName){
//         let params={};
//         params.bid=this.props.storeBid;
//         switch (fldName) {
//             case 'nseOpted':
//                 this.props.dispatch(ShowNSEFirstFetch(params));
//             break;
//             case 'bseOpted':
//                 this.props.dispatch(ShowBSEfirstFetch(params))
//             break;
//         }
//     }
//     GetIINDetailsByBidAPICall(){
//         let params={};
//         params.bid=this.props.storeBid;
//         params.componentForLoader = {componentName : 'ifaForm'}
//         this.props.dispatch(GetIINDetailsByBid(params));
//     }
//     deleteLogo(){
//         let param = {}
//         param.bid = this.props.storeBid
//         param.imageType = 'logo'
//         param.componentForLoader={componentName:'deleteLogoLoader'}
//         this.setState({
//             logoDelete : true,
//         })
//         this.props.dispatch(DeleteLogoImage(param))
//     }
//     onExchangeCheckboxTick(obj,type){
//         switch(type){
//             case 'nseOpted' :
//             this.setState({
//                 nseOpted : !this.state.nseOpted
//             })
//             if(!this.state.nseOpted){
//                 this.showFirstFetchBtns(type)
//             }
//             break;
//             case 'bseOpted' :
//             this.setState({
//                 bseOpted : !this.state.bseOpted
//             })
//                 if (!this.state.bseOpted) {
//                     this.showFirstFetchBtns(type)
//                 }
//             break;
//             case 'mfuOpted' :
//             this.setState({
//                 mfuOpted : !this.state.mfuOpted
//             })
//             break;
//         }
//     }
//     componentWillUnmount(){
//         this.props.dispatch({ type:"GOT_SHOW_NSE_FIRST_FETCH_DATA", payload: null })
//         this.props.dispatch({ type:"GOT_BID_FOR_IFA_ONBOARDING_DATA", payload: null })
//     }
//     hideBidPopUp(){
//         this.setState({showBidPopUp : false})
//         this.props.closeIFAFOrm()
//     }
//     render(){
//         return(
//             <Fragment>
//                 {this.state.showBidPopUp && <div class="popUpArea autoPopupArea fullSizeBoxContainer ">
// 				<div class="popContainer">
// 					<div class="tableListing tableContainers tableShadowOff">
// 						<h2>No Buffer DB is currently  available for creating a new IFA Creation</h2>
// 						<div class="btnsContainer txtCenter smlFltrsBtns">
// 							<button type="button" onClick={() => this.hideBidPopUp()} metatitle = 'adminIfaRegHideBidPopup'>Ok</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>}
//                  <IFARegistrationForm
//                     openTab={this.props.openTab}
//                     openAccordionTabs={this.props.openAccordionTabs}
//                     onSubmit={(e)=> this.updateIfaRegistration(e)}
//                     selectedOpt={this.state.selectedOpt}
//                     selectedTheme={this.state.selectedTheme}
//                     selectedPageOpt = {this.state.selectedPageOpt}
//                     onOptionSelection = {(obj,fldName)=> this.onOptionSelection(obj,fldName)}
//                     onThemeSelection = {(obj)=> this.onThemeSelection(obj)}
//                     onPageSizeSelection = {(obj) => this.onPageSizeSelection(obj)}
//                     submitMsg= {this.state.submitMsg}
//                     errorMsg = {this.props.ifaRTegistrationDetails.errorMsg}
//                     successFormFrst={this.props.successFormFrst}
//                     ifaRegistrationInfo = {this.props.ifaRegistrationInfo}
//                     onFileUpload = {this.props.openCropImage}
//                     onDomainChange = {this.props.onDomainChange}
//                     fileName = {this.props.fileName}
//                     ifaNotification = {this.props.ifaNotification}
//                     logoState = {this.props.logoState}
//                     logoTypeArrayLength = {this.props.logoTypeArray &&this.props.logoTypeArray.length}
//                     onExChangeSelection = {(obj)=>this.onExChangeSelection(obj)}
//                     selectedExChange = {this.state.selectedExChange}
//                     largeLogo = {(this.state.largeLogo && this.state.largeLogo) || this.props.largeLogo}
//                     smallLogo = {(this.state.smallLogo && this.state.smallLogo) || this.props.logo}
//                     domain = {this.props.domain}
//                     //domainNameValue = {this.props.domainNameValue}
//                     compName={this.props.compName}

//                     key = {this.state.key}
//                     isActiveStatusSelection= {(obj)=> this.isActiveStatusSelection(obj)}
//                     isActiveStatus = {this.state.isActiveStatus}
//                     domainNameValue={(e) => {this.props.domainNameValue(e)}}
//                     selectedSendBirthdayMails={this.state.selectedSendBirthdayMails}
//                     selectedSendAnniversaryMails={this.state.selectedSendAnniversaryMails}
//                     onSendBirthdayMailsSelection={(obj)=>{this.onSendBirthdayMailsSelection(obj)}}
//                     onSendAnniversaryMailsSelection={(obj)=>{this.onSendAnniversaryMailsSelection(obj)}}
//                     selectedProtectedPDFOption = {this.state.selectedProtectedPDFOption} 
//                     onIsPDFProtectedOptionSelection = {(obj)=>{this.onIsPDFProtectedOptionSelection(obj)}}
//                     selectedTwoFactorAuthOption= {this.state.selectedTwoFactorAuthOption}
//                     on2FactorOptionSelection = {(obj)=>{this.on2FactorOptionSelection(obj)}}
//                     selectedXLSPreference={this.state.selectedXLSPreference}
//                     onXLSPreferenceSelection={(obj)=>{this.onXLSPreferenceSelection(obj)}}
//                     selectedDirectScheme={this.state.selectedDirectScheme}
//                     onDirectSchemeSelection={(obj)=>{this.onDirectSchemeSelection(obj)}}
//                     isShardingEnabled = {this.props.isShardingEnabled}
//                     selectedSubscriptionFlag={this.state.selectedSubscriptionFlag}
//                     subscriptionExpiration={(obj)=>{this.subscriptionExpiration(obj)}}
//                     GetIINDetailsByBidAPICall={()=>{this.GetIINDetailsByBidAPICall()}}
//                     isSharded = {this.props.isSharded}
//                     domainURL = {this.state.domainURL}
//                     isMigrationSelection = {(obj)=> {this.isMigrationSelection(obj)} }
//                     isMigration = {this.state.isMigration}
//                     deleteLogo = {()=> this.deleteLogo()}
//                     onExchangeCheckboxTick={(obj,type)=>this.onExchangeCheckboxTick(obj,type)}
//                     nseOpted={this.state.nseOpted}
//                     bseOpted={this.state.bseOpted}
//                     mfuOpted={this.state.mfuOpted}
//                     people = {this.props.userReducer && this.props.userReducer.user && this.props.userReducer.user.subUserType}
//                     onFileRejection = {error => this.props.onFileRejection(error)}
//                     adminExecutives = {this.props.oneViewReportData && this.props.oneViewReportData.adminExecutives && this.props.oneViewReportData.adminExecutives.data}
//                     adminExecutivesSelection = {(obj) => {this.adminExecutivesSelection(obj)}}
//                     selectedAdminExecutives = {this.state.selectedAdminExecutives}
//                     showOneDayChange = {this.state.showOneDayChange}
//                     openArnListPopUp = {()=> this.openArnListPopUp()}
//                     tableFiltersAction = {this.props.tableFiltersAction}
//                 />
//                  { this.state.showARNListPopUp && <div class="popUpArea autoPopupArea fullSizeBoxContainer contentManagement">
// 		        	<div class="popContainer posRelative">
//                 {(this.props.ifaNotification&& this.props.ifaNotification.loaderIfa)
// 					&&<Loader
// 		                loaderType = 'line'
// 			            loaderWidth = { LOADER_WIDTH[2].width }
// 			            loaderHeight = { LOADER_WIDTH[2].height }
// 		            />
//                     }
// 		        		<div class="listingBoxSec">
// 		        			<div class="closeBtns" onClick ={()=> this.closePopUpBox()} metatitle = 'adminIfaRegCloseNotification'>X</div>
// 		        			<h2>Choose ARN</h2>
// 		        			<ul class="selectedClientPreview customScrollBar">
// 		        				<li class="headingRows">
// 		        					<div class="cols width">ARN</div>
// 		        					<div class="cols width">Member ID</div>
// 		        					<div class="cols width">Type</div>
// 		        					<div class="cols width last"></div>
// 		        				</li>
// 		        				{this.state.arnListRows}
// 		        			</ul>
// 		        		</div>
// 		        	</div>
// 		        </div>}


// 				{ this.state.showJobPopUp && <div class="popUpArea autoPopupArea fullSizeBoxContainer contentManagement">
// 		        	<div class="popContainer posRelative">
// 		        		<div class="listingBoxSec">
// 		        			<div class="closeBtns" onClick ={()=> this.closePopUpBox()} metatitle = 'adminIfaRegCloseJobPopup'>X</div>
// 		        			<p>We Will sync BSE data since inception for this ARN.</p>
//                             <p>Please check after sometime</p>
		        			
// 		        		</div>
// 		        	</div>
// 		        </div>}
//             </Fragment>
               
                
                
//         )
//     }
// }

// const mapStateToProp = (state) =>{
//     return {
//        ifaRTegistrationDetails: state.adminFormsReducers && state.adminFormsReducers.ifaRegistrationData,
//        ifaSignUpInfo: state.adminFormsReducers && state.adminFormsReducers.ifaSignUpData.data,
//        ifaNotification: state.adminFormsReducers,
//        ifaInfoData : state.adminFormsReducers && state.adminFormsReducers.ifaInfoData,
//        userReducer: state.userReducer,
//        oneViewReportData:state.reportAdmin,
//        adminSearchReducers :state.adminSearchReducers,
//        getArnListData : state.adminSearchReducers && state.adminSearchReducers.toArnListData,
//        isShardingEnabled : state.adminSearchReducers && state.adminSearchReducers.shardMeNotification,
//     }
//   }
//    const mapDispatchToProp = (dispatch) => {
//     return {dispatch:dispatch}
//    }

//   export default connect(mapStateToProp,mapDispatchToProp)(IFARegistration);
