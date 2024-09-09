import React, {Component} from 'react'
import TabListing from 'adminApp/components/tabListing'
import {LEFT_SIDEBAR_TAB_OPTION, LEFT_SIDEBAR_TAB_PANEL_LABEL} from 'adminApp/constants'
import {DomainNameValidator} from 'adminApp/utils/dataFormater'

class SideBarLeft extends Component{

    constructor(props){
        super(props);
        let domainNameChecked = DomainNameValidator()
        this.state = {
            domainNameChecked:domainNameChecked.showStoreLink,
        }
    }

    render(){

        return(
            <div class={("left-side-box  left ")+(this.props.leftSidebarFlag&&'small-nav')}  >
					<h1 class="logo-main" title="Investwell Online">
						<a href="javascript:void(0);" class="logo-investwell">
	                       <img src="/app/media/images/logo.png" onError={(e)=>{e.target.onerror = null; e.target.src="../../app/media/images/blankLogo.png"}} alt="logo" class="logoImg" />
	                       <img src="/app/media/images/investwellIcon.png" onError={(e)=>{e.target.onerror = null; e.target.src="../../app/media/images/blankLogo.png"}} alt="logo" class="logoIcon" />
						</a>
					</h1>
					<ul class="tabs-box">

                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.searchsoa}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active',
                                    heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 100 && 'active'}`}}
                    >
                    </TabListing>
                    {/* <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.searchrejection}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name", tabActiveClass:'active'}}
                    >
                    </TabListing> */}
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.aumreconcilation}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 800 && 'active'}`}}
                    >
                    </TabListing>
                    {/* <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.sipReconciliation}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 2100 && 'active'}`}}
                    >
                    </TabListing> */}
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.arnMapping}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 1400 && 'active'}`}}
                    >
                    </TabListing>
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.ifalookup}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly folioLookupIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 300 && 'active'}`}}
                    >
                    </TabListing>
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.systemdata} openMainTabFlag={this.props.openMainTabFlag}
                        selectedTab={this.props.selectedTab}
                        tabListing ={LEFT_SIDEBAR_TAB_OPTION.systemdata}
                        onHeadingClick={this.props.toggleFuntion}
                        onLiclick={this.props.selectSubTab} selectedSubTab = {this.props.selectedSubTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading:'tabs',
                        tabActiveClass:'active', innerLi:"sub-tabs",subTabActiveClass:'active'}}
                        >
                        </TabListing>

                    {/* <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.duplicateTxn}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 900 && 'active'}`}}
                    >
                    </TabListing> */}
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.misMatch}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 1100 && 'active'}`}}
                    >
                    </TabListing>

                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.handleException}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 1200 && 'active'}`}}
                    >
                    </TabListing>
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.analytics} openMainTabFlag={this.props.openMainTabFlag}
                        selectedTab={this.props.selectedTab}
                        tabListing ={LEFT_SIDEBAR_TAB_OPTION.analytics}
                        onHeadingClick={this.props.toggleFuntion}
                        onLiclick={this.props.selectSubTab} selectedSubTab = {this.props.selectedSubTab}
                        customClass={{headingAncher:"label-name Transactional-Reports-icon", tabActiveClass:'active', heading:'tabs',
                        tabActiveClass:'active', innerLi:"sub-tabs",subTabActiveClass:'active'}}
                        >
                    </TabListing>
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.taskManagement}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dataManagement", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 1600 && 'active'}`}}
                    >
                    </TabListing>
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.settings} openMainTabFlag={this.props.openMainTabFlag}
                        selectedTab={this.props.selectedTab}
                        tabListing ={LEFT_SIDEBAR_TAB_OPTION.settings}
                        onHeadingClick={this.props.toggleFuntion}
                        onLiclick={this.props.selectSubTab} selectedSubTab = {this.props.selectedSubTab}
                        customClass={{headingAncher:"label-name Transactional-Reports-icon", tabActiveClass:'active', heading:'tabs',
                        tabActiveClass:'active', innerLi:"sub-tabs",subTabActiveClass:'active'}}
                        >
                    </TabListing>
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.searchFolio}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 1700 && 'active'}`}}
                    >
                    </TabListing>
                    {/*<TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.SOADownload}
                                            selectedTab={this.props.selectedTab}
                                            customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 1800 && 'active'}`}}
                                        >
                                        </TabListing>*/}
                    {/*<TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.emailLog}
                                            selectedTab={this.props.selectedTab}
                                            customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 1900 && 'active'}`}}
                                        >
                                        </TabListing>*/}
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.orders}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly myTransactionIcons", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 2000 && 'active'}`}}
                    >
                    </TabListing>
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.brokerageDataReport}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly brokerageIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 2300 && 'active'}`}}
                    >
                    </TabListing>
                    {(this.props.userInfo && this.props.userInfo.subUserType!='executive')&&<TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.dataDeletionModule}
                        selectedTab={this.props.selectedTab}
                        customClass={{headingAncher:"label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass:'active', heading: `${(this.props.selectedTab&&this.props.selectedTab.value) == 2400 && 'active'}`}}
                    >
                    </TabListing>}
                    <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.dataManagement} openMainTabFlag={this.props.openMainTabFlag}
                        selectedTab={this.props.selectedTab}
                        tabListing ={LEFT_SIDEBAR_TAB_OPTION.dataManagement}
                        onHeadingClick={this.props.toggleFuntion}
                        onLiclick={this.props.selectSubTab} selectedSubTab = {this.props.selectedSubTab}
                        customClass={{headingAncher:"label-name dataManagement", tabActiveClass:'active', heading:'tabs',
                        tabActiveClass:'active', innerLi:"sub-tabs",subTabActiveClass:'active'}}
                        >
                    </TabListing>
                    {(this.props.userInfo && this.props.userInfo.subUserType!='executive')&&<TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.createCredential} openMainTabFlag={this.props.openMainTabFlag}
                        selectedTab={this.props.selectedTab}
                        tabListing ={LEFT_SIDEBAR_TAB_OPTION.createCredential}
                        onHeadingClick={this.props.toggleFuntion}
                        onLiclick={this.props.selectSubTab} selectedSubTab = {this.props.selectedSubTab}
                        customClass={{headingAncher:"label-name Transactional-Reports-icon", tabActiveClass:'active', heading:'tabs',
                        tabActiveClass:'active', innerLi:"sub-tabs",subTabActiveClass:'active'}}
                        >
                    </TabListing>}
                    {(this.props.userInfo && this.props.userInfo.subUserType != 'executive') && <TabListing heading={LEFT_SIDEBAR_TAB_PANEL_LABEL.loginHistory}
                        selectedTab={this.props.selectedTab}
                        customClass={{ headingAncher: "label-name Frequently-Visited-icons frqntly dashboardIcon", tabActiveClass: 'active', heading: `${(this.props.selectedTab && this.props.selectedTab.value) == 2500 && 'active'}` }}
                    />}
                    {this.state.domainNameChecked &&<li>
                        <div class="downloadApp">
                            <div class="title">Download the App</div>
                            <a href="https://apps.apple.com/in/app/mint-by-investwell/id1479042500" target="_blank">
                                <img src="../app/media/images/appStore.png" alt="App Store" />
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.iw.mint.app&hl=en" target="_blank">
                              <img src="../app/media/images/googlePlay.png" alt="Google Play" />
                            </a>
                        </div>
                    </li>}
                    </ul>
                </div>
        )
    }

}
export default SideBarLeft;
