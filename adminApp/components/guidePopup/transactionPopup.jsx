import React,{Component} from 'react'
import { closePopupWithESCKey } from '../../utils/eventHandler'

export class TxnPopup extends Component{
	constructor(props){
		super(props)
		this.state={}
	}

	componentDidMount(){
		closePopupWithESCKey(this.props.hideTxnPopup)
	}

	render(){
		return(
			<div id="popUpFullPage" class={`${this.props.popupTopOfThePage ? this.props.popupTopOfThePage : ''} postionFixedPopUpFullPage`}>
			 	<div class={` contentmainArea  ${this.props.removeScroll ? 'horizontalScrollar' : ''} ${this.props.popupFullSize ? '' : 'smallSize' } ${this.props.overlayEnabled ? 'posRelative zIndexUp' : ''} ${this.props.popupXSmallSize ? 'xSmallSize' : ''} ${this.props.customParentClass ? `${this.props.customParentClass}` :''} `}>
				 	<div class="popHeader">
						<h2>{this.props.txnPopupTitle}</h2>
						<span class="closeBtns" onClick={()=>this.props.hideTxnPopup()} metatitle={this.props.metatitle ? `${this.props.metatitle}Close` : ''}>Close</span>
					</div>
					<div class={`${this.props.popUpContainer ? 'dataContainer' : "popContainerArea"}`}>
						{!this.props.customContainer && <div class={`siteArea singleContainer ${this.props.customClass} `}>
							<div class="rightContainer">
								<div class="formContainer">
									<div class={`${!this.props.hideFormSecClass ? "formSec" : ''}`}>
										{this.props.children}
									</div>
								</div>
							</div>
						</div>}
						{this.props.customContainer && <div>
							{this.props.children}
						</div>}
					</div>
				</div>
				{this.props.overlayEnabled && <div class="custom-select-overlay" onClick={()=>this.props.hideTxnPopup()} metatitle = {this.props.metatitle ? `${this.props.metatitle}CustomselectOverlay` : '' }></div>}
			</div>
		)
	}
}
export default TxnPopup