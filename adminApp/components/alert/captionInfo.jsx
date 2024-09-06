import React from 'react'

export const CaptionInfo = ( props ) => {
    return(
        <div class ={ ` captionContainers txtCenter  ${props.customClass} ` }  >
            {!props.captionTitle && <h2>No data available.</h2> }
            { ( props.captionTitle && props.captionTitle !='no' ) && <h2> { props.captionTitle } </h2>}
            {props.captionMessageInfo && <p>{props.captionMessageInfo}</p> }
        </div>
    )
}
export default CaptionInfo;


export const CaptionInfoForReports = ( props ) => {
    return(
        <div class={ ` captionContainers txtCenter noBg  ${props.customClass} ` }  >
            <div class="captionWrap">
                <span class={ `iconNameDefault ${props.iconNameCustom} `} >
                    <img src="/app/media/images/buildReportIcon.png" alt='Build a Report' />
                </span>
                {props.captionContent && 
                	<p> 
                		<span class={`reportTitle ${props.captionTitleCustomClass} `}>{props.reportTitle}</span>
                		{props.captionContent}
                	</p>
                }
            </div>
        </div>
    )
}