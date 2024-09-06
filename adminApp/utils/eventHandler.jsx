import { KeyCode } from 'adminApp/constants'

export const closePopupESCC = (event,functionCall) => {
    let eventValue=event&&event.which
    if(eventValue===KeyCode.esc && functionCall)  {
        functionCall()
    }
}
export const closePopupSecondLevel = (functionCall) => (event) => {
    let eventValue=event&&event.which
    if(eventValue===KeyCode.esc && functionCall)  {
        functionCall()
    }
}
export const closePopupWithESCKey = (functionCall, level2, ref) => {
    if(level2){
        ref.current = closePopupSecondLevel(functionCall)
    }
    document.addEventListener("keydown", level2 ? ref.current : (event) => closePopupESCC(event,functionCall), level2 ? true : false);     
}

export const removeESCKeyPopUpEvent = (functionCall,ref) => {
    document.removeEventListener("keydown", ref ? ref.current : (event) => closePopupESCC(event,functionCall), ref ? true : false);
}

export default closePopupESCC