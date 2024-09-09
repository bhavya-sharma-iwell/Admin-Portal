import React from 'react'
import Loader from 'app/uiCollection/shared/loaders'
import { LOADER_WIDTH } from 'app/constants/shared/commonConst'

export class VoicePopup extends React.Component{
	constructor(props){
		super(props)
		this.state={
		}
	}
	
	render(){
		return(
			 <div class = { ` voiceSearchBox  ${this.props.activeAnimation ? 'animationInVoiceBox' : ''} `} >
                <span class="closeVoicdePop" metatitle = {this.props.metatitle ? `${this.props.metatitle}CloseVOicePopup` : ''} onClick={()=>this.props.hideVoicePopup()}></span>
                <h2>{this.props.searchPlaceHoldervalue} {this.props.placeholder}{this.props.folioPlaceHolder}... </h2>
                <h2>Listening... "{this.props.interimTranscript}"</h2>
                
                <div class="voiceOptionBox txtCenter posRelative ">
	                <Loader 
						name= 'loader'
						loaderType = 'line'
						loaderWidth = { LOADER_WIDTH[2].width }
						loaderHeight = { LOADER_WIDTH[2].height }
					/>
                </div>
             </div>
			)
	}
}
export default VoicePopup