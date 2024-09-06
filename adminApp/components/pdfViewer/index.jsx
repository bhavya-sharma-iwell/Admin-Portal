import React, {Fragment, useEffect, useState,useRef} from 'react'
import {LOADER_WIDTH} from 'adminApp/constants'
import Loader from 'adminApp/components/loaders'
import { closePopupWithESCKey, removeESCKeyPopUpEvent } from 'adminApp/utils/eventHandler'

function PDFViewer(props) {
   /* let [loaderShow,setLoaderShow]=useState(true)
    useEffect(()=>{
        if(loaderShow){
            fetch(props.pdfSource).then(response => {
                if(response.status == 200){
                    loaderShow = false
                    setLoaderShow(loaderShow)
                }
            } )
        }
    }, [loaderShow])*/
    const ref = useRef(null)
    let [loaderShow,setLoaderShow]=useState(props.whatsAppLoader || true)
    useEffect(()=>{
        if(loaderShow) {
            setTimeout(()=>{
                loaderShow = false
                setLoaderShow(loaderShow)
            },5000)
        }
    }, [loaderShow])

    useEffect(()=>{
            closePopupWithESCKey(props.closePdfPopup,true,ref)
        return () => {
            removeESCKeyPopUpEvent(null, ref)
          };
	},[]) 
   
    return (
        <div class={`pdfPopUpArea ${props.openOnSamePage ? 'openOnSamePage' : ''}`}>
            {props.openOnSamePage && <Fragment>
                <div class="closePdf" onClick={()=> props.closePdfPopup()} metatitle={props.metatitle ? `${props.metatitle}ClosePdfPopup` : ''}></div>
                <div class="pdfActionContainer bottom">
                    {props.sendOnWhatsApp && 
                        <div class="pdfActionOpts withIcon whatsAppIcon" onClick={()=> props.sendOnWhatsApp()} metatitle={props.metatitle ? `${props.metatitle}SendOnWhatsApp` : ''}></div>}
                    <div class="pdfActionOpts openInNewTab" onClick={()=> props.openPDFInNewTab(true)} metatitle={props.metatitle ? `${props.metatitle}openInNewTab` : ''}>Open in New Tab</div>
                    <div class="pdfActionOpts cancel" onClick={()=> props.closePdfPopup()} metatitle={props.metatitle ? `${props.metatitle}Cancel` : ''}>Cancel</div>
                </div>
            </Fragment>}
            <div class="pdfPreviewArea">
                {(loaderShow) && <Loader 
                    loaderType = 'line'
                    loaderWidth = { LOADER_WIDTH[2].width }
                    loaderHeight = { LOADER_WIDTH[2].height }
                />}
                <embed
                    src={`${props.pdfSource}#toolbar=1&view=FitH`}
                    type={props.pdfType || 'application/pdf'}
                    width={props.pdfWidth || '100%' }
                    height={props.pdfHeight || '800' }
                />
            </div>
        </div>
    )
}

export default PDFViewer