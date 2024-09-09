import React from 'react'

const SearchField = (props) => {

    const clearValue = (obj) => {
        let searchField = obj.target.nextSibling;
        searchField.value = null
        props.clearSearchValue(obj)
    }

    return (
        <div class={` filter-box left calendar-box searchBox noPl ${props.customParentClass} ` + (props.customTitle && 'customTitle')} >
            {props.customTitle && (!props.labelNotAllow) && <h2> {props.customTitle} </h2>}
            {props.showHideCrossBtns && <span class={`crossBtns ${('webkitSpeechRecognition' in window) && (window.isSecureContext) && props.showVoiceIcon ? 'crossBtnsAlign' : ''}`} onClick={(obj) => clearValue(obj)} ></span>}
            <input autoComplete={props.autoComplete} type={props.type} id={props.id} class={props.customClass}
                placeholder={props.placeholder}
                onKeyDown={props.onEnterFunction}
                value={props.value}
                onChange={(e) => { props.onChangeFunction && props.onChangeFunction({ name: e.target.value }) }}
                defaultValue={props.defaultValue}
                autoFocus={props.autoFocus}
                onBlur={(e) => props.onBlurFunction && props.onBlurFunction({ name: e.target.value })}
                ref={props.inputRef}
                metatitle={props.metatitle ? props.metatitle : ''}
            />
        </div>
    )
}
export default SearchField;