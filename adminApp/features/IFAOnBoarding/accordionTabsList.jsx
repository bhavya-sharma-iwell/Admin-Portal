import React from 'react'
const AccordionTabsList = (props) => {
	return(
		<li onClick={(tabsName)=> props.openAccordionTabs(tabsName)} class={` ${((!props.successFormFrst && !props.activeAllFrm) && props.customClass) } `}>
			<a href="javascript:void(0);">
				{props.heading.label}</a>
		</li>
		)
}

export default AccordionTabsList;