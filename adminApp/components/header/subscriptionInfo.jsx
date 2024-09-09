import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {isMobileOrTab} from 'adminApp/utils/dataFormater'
import PDFViewer from 'adminApp/components/pdfViewer'
const SubscriptionInfo = props => {

    const [userPortal, setSserPortal] = useState(window.location.hash.split('/')[1]) 
	const [displayPDF, setDisplayPDF] = useState(false)
    const [savedPdfUrl, setSavedPdfUrl] = useState(false)

	const renewNow = ()=> {
		let onMobileScreen = isMobileOrTab()
        let customSavedPdfUrl = props.user && props.user.brokerLedgerUrl
		if(!customSavedPdfUrl){
			window.open ("https://www.instamojo.com/@investwell",'_blank' ) 
			return
		}
    setSavedPdfUrl(customSavedPdfUrl)		
		openPDFInNewTab(onMobileScreen, customSavedPdfUrl)
    }

    const openPDFInNewTab = (isNewTab, customSavedPdfUrl)=> {
      if (isNewTab) {
        window.open (customSavedPdfUrl,'_blank' )
      }else{
        setDisplayPDF(true)
      }
    }
    const closePdfPopup = ()=> {
      setDisplayPDF(null)
    }

	return(	
		<Fragment>
      {(props.userInfo && props.userInfo.levelNo == 1) && (props.user && props.user.isAppUpdatePending == 1) && <div class='subscriptionBox txtRedColor redColorOption hideBoxOnMobile'>
        Urgent and Important: Immediate action is required for your Google and Apple Developer accounts. Please WhatsApp "HELP" to 9289844168, and we will respond soon.
      </div>}
		{ (props.userInfo && props.userInfo.levelNo == 1) && !(props.foliosProcessStatus && props.foliosProcessStatus.foliosUnderProcess) && !(props.userInfo && props.userInfo.isPaid) && (userPortal != 'client') && <div class='subscriptionBox redColorOption hideBoxOnMobile'>
            Your Subscription will expire soon.
            {props.user &&  <a href='javascript:void(0);' onClick={()=>{renewNow()}} metatitle={props.metatitle ? `${props.metatitle}renew` : ''}>Renew Now</a>}
        </div>}
        { (props.foliosProcessStatus && props.foliosProcessStatus.foliosUnderProcess) && <div class='subscriptionBox greenColorOption hideBoxOnMobile'>
            Data Updation is under process.
        </div>}
		{ displayPDF &&
                  <PDFViewer 
                    pdfSource={savedPdfUrl}
                    openOnSamePage = {true}
                    pdfHeight = '100%'
                    closePdfPopup = {()=> closePdfPopup()}
                    openPDFInNewTab = {(isNewTab)=> openPDFInNewTab(isNewTab)}
                    metatitle={props.metatitle ? `${props.metatitle}Pdf` : ''}
                />}
		</Fragment>
	)
}
const mapStoreToProps =({userReducer, brokerDashboard}) =>{
	return{
		// user:userReducer.user,
		// foliosProcessStatus : brokerDashboard.foliosProcessStatus,
	}
}
const mapDispatchToprops = (dispatch) =>{
	return ({dispatch:dispatch});
}

export default connect(mapStoreToProps,mapDispatchToprops)(SubscriptionInfo)
