import React,{useState, useEffect, memo} from "react"
import SearchFilter from '../customSelect/searchFilterCnt'
import {getBrokerList} from './searchBrokerSlice'
import {connect} from 'react-redux'


const SearchBroker = (props) => {

	const [showHideCrossBtns, setCrossBtns] = useState(false);
	const [defaultSearchEnable, setdefaultSearch] = useState(!props.selectedBroker)
	const [selectedBroker, selectBroker] = useState(props.selectedBroker||{})

  	const removeSearchField=(e, clickedOn)=>{
		props.dispatch({type: 'GOT_BROKER_LIST_DATA', payload: null})
		setdefaultSearch(true)
        if (clickedOn) {
        	props.removeSearchField()
        }
    }
    const onOptionSelection=(obj)=>{ 		
		props.onOptionSelection(obj)
		setdefaultSearch(false)
		selectBroker(obj)
	}

	const searchBrokerFn=(event)=>{
		let eventValue = event&& event.target && event.target.value
        let param = {}
        param.ifa = eventValue
        if(props.isBrokerActive){
            param.isActive = props.isBrokerActive
        }
        props.dispatch(getBrokerList(param))

        onChangeFunction()
    }
    const onChangeFunction=(event)=>{
    	setCrossBtns(true)
    }

	return (
		<React.Fragment>
			<SearchFilter
                placeholder ='Select Broker'
                inputclass="input-group-field selector inputgrp" 
                iconClass= "closeOpts showInOneLine "
                placeholderForInput = "Search Broker...."
                customTitle = "Broker "
                isOpen = {!props.selectedBroker}
                isSearchEnable = {true}
                closeSearchFilter = {(e, clickedOn)=> removeSearchField(e, clickedOn)}
                showHideCrossBtns = { showHideCrossBtns }
                removeSearchField = {(e, clickedOn)=> removeSearchField(e, clickedOn)}
                onOptionSelection={(obj)=> onOptionSelection(obj) }
                options={props.brokerListData}
                labelName = "domain"
                valueName = "bid"
                iconClass = {props.showSelectAsSearchFld ? "" : "genricFilter"}
                onEnterPress = {(event) => searchBrokerFn(event)}
                onChangeFunction = {(event)=> onChangeFunction(event)}
                onSelectSearch = {props.onSelectSearch}
                defaultSearchEnable = {defaultSearchEnable}
                selectedOpt = {selectedBroker}
                parentClass = {props.parentClass}
                showSelectAsSearchFld = {props.showSelectAsSearchFld}
                metatitle = {props.metatitle}
              />
		</React.Fragment>
	)
	
}

const mapStateToProps =(state)=> {
	return {
		brokerListData: state.broker && state.broker.brokerListData
	}
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch:dispatch}
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBroker);