import React from 'react'
import {ShowHideTab} from 'adminApp/utils/showHideTab'
const TabListing = (props) => {

	const createLI = () =>{
		let li = []; 
		props.tabListing.map((obj,index)=>{
			if(!obj.isNotAllowedFor || ShowHideTab(obj,props.levelNo) ){ 
              	li.push(
              		<li key={index} 
              			class={(props.customClass.innerLi+" "+(( (props.selectedSubTab&&props.selectedSubTab.value) == obj.value)&&(props.customClass.subTabActiveClass)))} 
                  		onClick={props.liClick} >
                  		<a href={obj.url} metatitle = {props.heading ? `adminLeftSideBar${props.heading.value}${obj.value}` : ''}>{obj.label}</a>
              		</li>) 
		    }
		})
     	return li;
	}

	if(!(props.heading && props.heading.isNotAllowedFor) || ShowHideTab(props.heading,props.levelNo) ){
		return(
			<li class={props.customClass.heading+" "+((props.openMainTabFlag&&((props.heading&&props.heading.value) == (props.selectedTab&&props.selectedTab.value)))&&props.customClass.tabActiveClass)}>
				<a href={props.heading.url} class={props.customClass.headingAncher} 
					onClick={()=> {props.tabListing&&props.onHeadingClick(props.heading)}}
					metatitle = {props.heading ? `adminLeftSideBar${props.heading.value}` : ''}
				>
					<span class="lbl-txt">{props.heading.label}</span></a>
				{props.tabListing&&<ul class="sub-tabs-box customScrollBar">
				 	{createLI()}
					</ul>
				}
			</li>
			)
	}
	else{
		return null;
	}
}

export default TabListing;