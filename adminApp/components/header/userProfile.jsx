import React, {Fragment} from 'react'
import {connect} from 'react-redux'
// import {getTopics} from 'app/actions/broker/brokerAction'
import {DomainNameValidator, dependencyCheck, maskUserData} from 'adminApp/utils/dataFormater'
// import {DownloadPreviewDocument} from 'app/actions/client/myDocuments'
import Loader from 'adminApp/components/loaders'
import {LOADER_WIDTH } from 'adminApp/constants'
import { DOCS_LOCATION_DOMAIN, INVESTWELL_LOGOS, INVESTWELL_CLOUD_IMAGES, INVESTWELL_SMALL_LOGOS } from 'adminApp/constants'
// import { GetClientInformation } from 'app/actions/client/dashboard';
export class ProfileStrip extends React.Component{
	constructor(props){
		super(props)
		let domainNameChecked = DomainNameValidator()
		this.state = {
			open:0, 
			utilityDirectory:'',
			showOnlyBroker: false,
			domainNameChecked : domainNameChecked.showStoreLink,
			downloadImg : true,
		}
		props.dispatch({ type: 'WHATS_NEW_POP_STORAGE', payload: { showWhatsNewPopup: false } })
	}

	componentDidMount() {
		// if ((this.props.user.userType == 'broker')) {
		// 	this.setState({
		// 		showOnlyBroker: true
		// 	})
		// }
	}

	addRemoveClass(showHide)
	{
	  	if(this.state.open!=showHide)
		{
		  	this.setState({
		  	   open: showHide
		  	})
		}
		 else{
		 	this.setState({
		  	   open: 0
		  	})	 	
		}
	}
	hideOverlayBox()
	{
		this.setState({
		  	open: 0
		})	
	}
	downloadPreview(paramData){
        let param = paramData ? paramData : {}
        param.fileHandle = 1
        param.attachment = 0
        param.componentForLoader={componentName:'profileLoader'}
        // this.props.dispatch(DownloadPreviewDocument(param, 'profile') )  
    }
	
	UNSAFE_componentWillReceiveProps(newProps){
		if(newProps.selectedTab != this.props.selectedTab){
			let utilityDirectory='';
			if ( newProps.selectedTab.label && newProps.selectedSubTab && newProps.selectedSubTab.label) {
				utilityDirectory = `${newProps.selectedTab.label} / ${newProps.selectedSubTab.label}`;
			}else if(newProps.selectedTab.isLink){
				utilityDirectory = newProps.selectedTab.label;
			}
			this.setState({utilityDirectory});
		}
		// if (newProps.getUserInfo.data && newProps.getUserInfo.data.levelNo != 1 && this.state.showOnlyBroker) {
		// 	this.setState({
		// 		showOnlyBroker: false
		// 	})
		// }
		// if(!this.state.apiCall && this.props.userType == 'client' && dependencyCheck(newProps.getUserInfo, 'data.uid')){
		// 	let params = {}
		// 	params.investorUid = dependencyCheck(newProps.getUserInfo, 'data.uid')
		// 	// this.props.dispatch(GetClientInformation(params))
		// 	this.setState({ apiCall: true })
		// }
		// if(this.state.downloadImg && (  (newProps.getClientInfo != this.props.getClientInfo) && dependencyCheck(newProps.getUserInfo, 'data.uid') ) ){
		// 	let profileImage =  newProps.getClientInfo && newProps.getClientInfo.profileImage
		// 	this.setState({
		// 		downloadImg : false,
		// 	})
		// 	let param = {}
		// 	param.uid =  dependencyCheck(newProps.getUserInfo, 'data.uid')
		// 	param.fileName = profileImage
		// 	param.isExternal = 1
		// 	this.downloadPreview(param)
		// }
	}
	
	getImageSource(fileObject){
        let fileSource = 'data:image/jpeg;base64,' + fileObject
      return fileSource;
    }
	closeUserBox(){
		this.setState({
			open: 0
		})
	}
	startTour(){
		let existing = this.getCookie('localCookie')
		let pageUrl= window.location.href.split('#')[1].split("/");
		let pageName = pageUrl[pageUrl.length-1] ;
		existing = existing ? existing.split(',') : [];
		for (let i=0 ; i < existing.length ;i++){
			if( pageName === existing[i]){
				existing.splice( existing.indexOf(pageName), 1 );
				i--;
			}
		}
		existing.splice( existing.indexOf(pageName), 1 );
		//this.delete_cookie('localCookie')
		this.setCookie('localCookie', existing, 365)
		location.reload()

	}
	getCookie(name) {
		    let checkCookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		    return checkCookie ? checkCookie[2] : null;
	}
	setCookie(name, value, days) {
		    let dateStamp = new Date;
		    dateStamp.setTime(dateStamp.getTime() + 24*60*60*1000*days);
		    document.cookie = name + "=" + value + ";path=/;expires=" + dateStamp.toGMTString();
	}
	delete_cookie(name){
		document.cookie =name +'=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		//window.location.reload(true)
		location.reload()
	}
	// getUserProfileImg(userName){
	// 	let profileIcon
	// 	let profileImg = this.props.previewDownload && this.props.previewDownload.profile
	// 	if((this.props.getClientInfo && this.props.getClientInfo.profileImage) && !this.state.showOnlyBroker){
	// 		profileIcon = <Fragment>{(this.props.profileLoader && this.props.profileLoader.componentName =='profileLoader')&&
	// 		<Loader 
	// 		  loaderType = 'line'
	// 		  loaderWidth = { LOADER_WIDTH[2].width }
	// 		  loaderHeight = {LOADER_WIDTH[2].height }
	// 		/>}<img src={this.getImageSource(profileImg)} /></Fragment>
	// 	}else{
	// 	profileIcon = userName && userName.substring(0,2)
 
	// 	}
	// 	return profileIcon
	// }

	// currentDirectory(){
	// 	let currentDirectory='';
	// 	const { setSelectedTab, addViewActionType, allowedFeatureList } = this.props;
	// 	let selectedFeature = addViewActionType && addViewActionType.featureNo
	// 	if (setSelectedTab && setSelectedTab.parentTab && setSelectedTab.parentTab.label) {
	// 		// Tab Labeling As Per BE response (Parent Tab / Child Tab)
	// 		if (allowedFeatureList) {
	// 			if (setSelectedTab.childTab && setSelectedTab.parentTab.featureNo && selectedFeature) {
	// 				currentDirectory = `${allowedFeatureList[setSelectedTab.parentTab.featureNo] && allowedFeatureList[setSelectedTab.parentTab.featureNo].label} / ${allowedFeatureList[selectedFeature] && allowedFeatureList[selectedFeature].label}`
	// 			} else if (setSelectedTab.parentTab.isLink && setSelectedTab.parentTab.isSubOption && setSelectedTab.parentTab.featureNo) {
	// 				currentDirectory = allowedFeatureList[setSelectedTab.parentTab.featureNo] && allowedFeatureList[setSelectedTab.parentTab.featureNo].label;
	// 			} else {
	// 				currentDirectory = selectedFeature && allowedFeatureList[selectedFeature] && allowedFeatureList[selectedFeature].label;
	// 			}
	// 		} else {
	// 			// For Admin Tab Labeling (Parent Tab / Child Tab)
	// 			if (setSelectedTab.parentTab && setSelectedTab.childTab) {
	// 				currentDirectory = setSelectedTab.parentTab.label + " / " + setSelectedTab.childTab.label;
	// 			} else {
	// 				currentDirectory = setSelectedTab.parentTab && setSelectedTab.parentTab.label;
	// 			}
	// 		}
	// 	}
	// 	return currentDirectory
	// }
	showWidget() {
		this.props.dispatch({ type: 'WHATS_NEW_POP_STORAGE', payload: { showWhatsNewPopup: true } })
		// this.props.dispatch(getTopics())
	}
	render(){
		// let userName = ((this.props.getUserInfo.data && this.props.getUserInfo.data.name)||(this.props.user&& this.props.user.name))
		// let companyName = this.props.user&& this.props.user.compName
		return(	
		<Fragment>
		<div class="profile-header">
			<i class="slide-icon" onClick={this.props.toggleLeftSidebar} metatitle = {this.props.metatitle ? `${this.props.metatitle}SlideIcon` : ''}></i>
			<h2 class="head-label">
				{/* {this.currentDirectory()} */}
			</h2>

			<div class={`navOptsMenu withShortName ${this.state.open == 1 ? ' open':''}`} onClick={(stateVal) => this.addRemoveClass('1')} metatitle = {this.props.metatitle ? `${this.props.metatitle}UsrProfileImg` : ''}>
				{/* {this.getUserProfileImg(userName)} */}
			</div>
			<ul class={`topLinksContainers right borderRgtNone  ${this.state.showOnlyBroker ? '' : 'shiftedOnTop'}`}>
				<li class="userNameOpts mView">
				{/* {maskUserData(userName,'name',this.props.clientDataMasked)} */}
				</li>
				{this.state.showOnlyBroker && <Fragment>
					{/* {this.props.user.levelNo == 1 && <li class="optionalIcon setting" onClick={()=> this.closeUserBox()}>
						<a href="#/broker/accountSettings" metatitle = 'feature16'>Settings</a>
					</li>} */}

					{this.state.domainNameChecked &&
					<Fragment>
						<li class="optionalIcon feedback" >
							<a onClick={()=>this.showWidget()} metatitle = 'WhatsNew'>What's New</a>
						</li>
						<li class="optionalIcon helpOpts" >
							<a href="https://investwell.freshdesk.com/support/solutions" target="_blank" metatitle='helpOpt'>Help</a>
						</li>
					</Fragment>
					}
					<li class="optionalIcon subMenu">
						<a href="javascript:void(0)" onClick={(stateVal) => this.addRemoveClass('1')} metatitle='username'>
							{/* {userName} */}
							</a>
						{this.state.open == 1 && <Fragment>
							<ul>
								<li class="subIcon user">
									{/* {this.props.userTheme.logo &&
									<img src={`${DOCS_LOCATION_DOMAIN}/${INVESTWELL_CLOUD_IMAGES}/${INVESTWELL_LOGOS}/${INVESTWELL_SMALL_LOGOS}/${this.props.userTheme.logo}`} alt={this.props.userTheme.logo} class="logoImg" />} */}
										{companyName}
								</li>
								<li class="optionalIcon help">
									<a href="https://investwell.freshdesk.com/support/solutions/19000102962" target="_blank" metatitle='faq'>FAQ</a>
								</li>
								<li class="optionalIcon changePassword	">
                                    <a onClick={() => this.props.showHidePopup('open')} metatitle='changePassword'>Change Password</a>
                                </li>
								<li class="optionalIcon logOut">
									<a onClick={() => this.props.logoutUser()} metatitle='logout'>Logout</a>
								</li>
							</ul>
							<div class="custom-select-overlay" onClick={()=> this.closeUserBox()} metatitle='closeUserbox'></div>
						</Fragment>}
					</li>
				</Fragment>}
				{!this.state.showOnlyBroker && 
					<li class="optionalIcon subMenu">
						<a href="javascript:void(0)" class="widthProfileImg" onClick={(stateVal) => this.addRemoveClass('1')} metatitle = {this.props.metatitle ? `${this.props.metatitle}UserProfileName` : ''}>
							<span class="navOptsMenu withShortName displayInlineBlock ">
								{/* {this.getUserProfileImg(userName)} */}
							</span>
							{/* {maskUserData(userName,'name',this.props.clientDataMasked)} */}
						</a>
						{this.state.open == 1 && <Fragment>
							<ul class="defaultDropDown">
								{/* {this.props.showMaskingOption && this.props.user && (this.props.user.userType == 'broker') &&
									<li class="optionalIcon maskDataIcon">
										<a onClick={() => this.props.handleDataMasking(`${this.props.clientDataMasked ? 'setMaskingFlag' : 'showMaskingAlert'}` ,!this.props.clientDataMasked)}>{`${this.props.clientDataMasked ? 'Unmask Data' : 'Mask Data'}`}</a>
									</li>
								}
								{(!this.props.clientDataMasked) && this.props.user && (this.props.user.userType != 'admin') && <li class="optionalIcon editProfileOpt">
									<a onClick={() => this.props.editProfile()}>Profile</a>
								</li>}
								{this.props.user && this.props.user.userType == 'client' && 
								<li class="optionalIcon changePassword">
                                    <a onClick={() => this.props.showHidePopup('open')}>Change Password</a>
                                </li>} */}
								<li class="optionalIcon logOut">
									<a onClick={() => this.props.logoutUser()} metatitle = {this.props.metatitle ? `${this.props.metatitle}Logout` : ''}>Logout</a>
								</li>
							</ul>
							<div class="custom-select-overlay" onClick={()=> this.closeUserBox()} metatitle = {this.props.metatitle ? `${this.props.metatitle}CloseUserBox` : ''}></div>
						</Fragment>}
					</li>
				}
			</ul>
			{this.state.open == 1 && <div class="custom-select-overlay mView" onClick={()=> this.closeUserBox()} metatitle = {this.props.metatitle ? `${this.props.metatitle}CloseUserBox` : ''}></div>}
			
		</div>
		</Fragment>
	  )
  }
}
const mapStoreToProps =({userReducer,myDocumentList,clientDashboard}) =>{
	return{
		// user:userReducer.user,
		// getUserInfo: userReducer.getUserInfo,
		// setSelectedTab: userReducer.setSelectedTab,
		// userTheme : userReducer.theme,
		// previewDownload: myDocumentList.previewDownload,
		// profileLoader : myDocumentList.loaderMyDocument,
		// allowedFeatureList: userReducer && userReducer.allowedFeatureList,
		// addViewActionType: userReducer && userReducer.addViewActionType,
		// getClientInfo: clientDashboard.clientInformation
	}
}
const mapDispatchToprops = (dispatch) =>{
	return ({dispatch:dispatch});
}

export default connect(mapStoreToProps,mapDispatchToprops)(ProfileStrip)
