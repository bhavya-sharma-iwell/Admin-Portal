import React from 'react'
import SOCIAL_URL from '../../../constants/socialURL'
import Profile from './userProfile'

export class RightSideContent extends React.Component{
	render(){
		let newChild="";
	    if(this.props.children){ 
	      newChild  =  React.cloneElement(this.props.children, {
	      	isActive: this.props.isActive,
	      	pageName:this.props.children.props.params.param&&this.props.children.props.params.param.split('=')[1],
	      	showOverlayFlag: this.props.showOverlayFlag
	    	})
	    } 
		return(	
		<div class = {`right-side-box right ${this.props.isOpen==11 && 'extra-box '}`} >
			<Profile toggleFuntion = {this.props.toggleFuntion}
				currentState = {this.props.currentState||"Investor Lookup"}
				isActive = {this.props.isActive||"Investor"}
				logoutUser={this.props.logoutUser}
			>
			</Profile>
			<div class="right-main-box">
				{newChild}
			</div>

	    </div>
	  )
  }
}
export default RightSideContent;
