import React from 'react'
import {REPORTS, LEFT_SIDEBAR, LEFT_SIDEBAR_MAIN_TAB} from '../../../constants/dashboardConst'
import {DomainNameValidator} from 'app/utils/dataFormater'

export class WelcomePopup extends React.Component{
	constructor(props){
		super(props)
		let domainNameChecked = DomainNameValidator(props.domainUrl)
		this.state = {
			domainNameChecked,
		}
	}
	componentDidMount(){
		let messages = this.state.domainNameChecked && this.state.domainNameChecked.messages
		this.messagesContainers(messages)
	}
	messagesContainers(messages){
		let contentArea = this.contentBox
		contentArea.innerHTML = messages
	}

	render(){
		const {domainNameChecked} = this.state
		
		return(	
			<div class="tourArea welcomeBox zIndexUpPopup" >
				<div class="tl-tip tbl-hdng">
					<div class="drp-dwn" > 
						<span class="icon-arrowtltip"></span>
						<div class="welcomeTxt">
							<img src="../../app/media/images/welcome.png" alt="Welcome" />
						</div>
						<div class="inner-box-tooltip">
							<button class="cross-btn-tltip" onClick={() => this.props.closePopup(false)} metatitle={this.props.metatitle ? `${this.props.metatitle}CloseWelcomePopup` : ''}></button>
							<div class="profileImg">
								<img src={domainNameChecked.image} alt={domainNameChecked.label} />
							</div>
							<div class="profileDetails">
								<h2>{domainNameChecked.label}</h2>
								<div id="contentArea" ref={contentBox => this.contentBox = contentBox}></div>
								
							</div>
						</div>
						{/*<div class="tooltip-pagination">
													<input type="button" class="common-btn btn-tooltip fr playTour" value="Start Tour" />
												</div>*/}
					</div>
				</div>
			</div>
		)
  	}
}
export default WelcomePopup;