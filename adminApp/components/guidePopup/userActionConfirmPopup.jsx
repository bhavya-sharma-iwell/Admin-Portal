import React from 'react'

// can refer broker meeting notes module in utilities for UI on screen 
export const UserActionConfirmPopup = (props) => {

    return (
        <div class="popUpArea posRelative">
            <div class='popContainer posRelative'>
                <span class="crossIcon" onClick={() => props.sureApply('no',props.popupCalledBy)}>X</span>
                <h2 class="bold">{props.heading ? props.heading : 'Are You Sure ?'}</h2>
                {props.subHeading && <p>{props.subHeading}</p>}
                <div class="btnsContainer right mNone">
                    <button class="cancel buttonAnimate roundButton customWidthPadding" onClick={() => props.sureApply('no',props.popupCalledBy)}>{props.leftButtonText}</button>
                    <button class=" buttonAnimate roundButton customWidthPadding" onClick={() => props.sureApply('yes',props.popupCalledBy)}>{props.rightButtonText}</button>
                </div>
            </div>
        </div>)

}
export default UserActionConfirmPopup