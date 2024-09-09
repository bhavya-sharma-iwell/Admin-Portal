import React from 'react'

const PopUpNotification = props => {

	return (
		<div class="popUpArea autoPopupArea fullSizeBoxContainer contentManagement">
			<div class="popContainer">
				{(props.importedCount||props.importedCount==0) && 
					<p>No. of Records Imported <span class="bold">{props.importedCount}</span></p>
				}
				{(props.rejectedCount||props.rejectedCount==0) && 
					<p>No. of Records Rejected <span class="bold">{props.rejectedCount}</span></p>
				}
				{props.message && props.url && <p>{props.message}</p>}
				{props.url && <p>
					<a href={props.url} target="_blank">
						{props.url}
					</a>
				</p>}
				{props.actions && <div class="btnsContainer withBorder pTop20" onClick={props.onSkipButtonClick}>
					<a class="cancel" href="javascript:void(0);">{(!props.rejectedCount||props.rejectedCount==0)?"OK":"Skip"}</a>
				</div>}
			</div>
		</div>
	)
}
export default PopUpNotification;