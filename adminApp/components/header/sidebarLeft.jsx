import React from 'react'
import {REPORTS, LEFT_SIDEBAR, LEFT_SIDEBAR_MAIN_TAB} from '../../../constants/dashboardConst'

export class SidebarLeft extends React.Component{
	constructor(props){
		super(props)
		this.state = {selectedTtl:0}
		let {toggleFuntion} = props;
	}

	hideLieftSidebarList(event){
		event.stopPropagation();
		this.setState({selectedTtl:0})
	}

	render(){ 
		return(	
				<div class = {`left-side-box  left ${this.props.isOpen==11 && 'small-nav'}`} > 
					<h1 class="logo-main" title="Investwell Online">
						<a href="javascript:void(0);" class="logo-investwell">
	                       <img src="/app/media/images/wealthcareLogo.png" alt="logo" class="logoImg" />
	                       <img src="/app/media/images/wealthcareLogoIcon.png" alt="logo" class="logoIcon" />
						</a>
					</h1>
					<ul class="tabs-box">
						<li class = {`tabs ${this.props.isActive==LEFT_SIDEBAR_MAIN_TAB.level1 && 'active'}`} 
						onClick={() => this.props.activeMainTab(LEFT_SIDEBAR_MAIN_TAB.level1)}>
							 <a href="javascript:void(0);" class="label-name Overview-icon ">
							 	<span class="lbl-txt"> Overview </span>
							 	</a>
							<ul class="sub-tabs-box">
								<li class={`sub-tabs ${this.props.currentState == LEFT_SIDEBAR.level13 && 'active'}`} >
									<a onClick={() => this.props.activeSubtabs(LEFT_SIDEBAR.level13,"/app/#/dashboard/overview/:param=freturn")} 
										href="javascript:void(0);" target="_self"> Portfolio Returns
									</a>
								</li>
								<li class={`sub-tabs ${this.props.currentState ==LEFT_SIDEBAR.level11 && 'active'}`} >
									<a onClick={() => this.props.activeSubtabs(LEFT_SIDEBAR.level11,"/app/#/dashboard/overview")} 
										href="javascript:void(0);" target="_self"> Allocation Analysis
									</a>
								</li>
								<li class={`sub-tabs ${this.props.currentState == LEFT_SIDEBAR.level12 && 'active'}`} >
									<a onClick={() => this.props.activeSubtabs(LEFT_SIDEBAR.level12,"/app/#/dashboard/overview/:param=fsummary")} 
										href="javascript:void(0);" target="_self"> Portfolio Summary
									</a>
								</li>
							</ul>
						</li>
						<li class = {`tabs ${this.props.isActive==LEFT_SIDEBAR_MAIN_TAB.level2 && 'active'}`} 
						onClick={() => this.props.activeMainTab(LEFT_SIDEBAR_MAIN_TAB.level2)}>
							<a href="javascript:void(0);" class="label-name Utilities-icon ">
								<span class="lbl-txt">Utilities</span>
							</a>
							<ul class="sub-tabs-box">
								<li class={`sub-tabs ${this.props.currentState == LEFT_SIDEBAR.level21 && 'active'}`}>
									<a onClick={() => this.props.activeSubtabs(LEFT_SIDEBAR.level21,"/app/#/dashboard/utility")} 
										href="javascript:void(0);" target="_self">Import History
									</a>
								</li>
								<li class={`sub-tabs ${this.props.currentState == LEFT_SIDEBAR.level22 && 'active'}`}>
									<a onClick={() => this.props.activeSubtabs(LEFT_SIDEBAR.level22,"/app/#/dashboard/utility/topschemes")} 
										href="javascript:void(0);" target="_self">Top Schemes
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			)
  }
}
export default SidebarLeft;