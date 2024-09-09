import React, { Fragment } from "react"
import {connect} from 'react-redux'
import SearchFilter from "../../components/customSelect/searchFilterCnt"
import {SOA_LIST} from '../../constants/adminDashboardConst'
import * as commonConstantList from '../../constants'
import SearchField from '../../components/searchField'
import SearchBroker from '../../components/searchBroker'

export class FiltersStripSOA extends React.Component{
  constructor(props){
    super(props)
    this.state = {};
  }

  UNSAFE_componentWillReceiveProps(newProps){
    let showHideCrossBtns = this.state.showHideCrossBtns
    if(showHideCrossBtns && ((this.props.selectedOpt && this.props.selectedOpt.value) != (newProps.selectedOpt && newProps.selectedOpt.value))){
      this.setState({
        showHideCrossBtns : false
      })
    }

  }

onEnterPress(e , searchLength){
  let searchedValue = e.name
  searchedValue = searchedValue && searchedValue.trim()
  if (searchedValue && searchedValue.length) {
      this.setState ({
      showHideCrossBtns : true,
      getDomain: searchedValue
    })
  }else{
    this.setState ({
        showHideCrossBtns : false
    })
  }
  if(e.which==commonConstantList.KeyCode.enter && e.target.value.length > searchLength)
  {
    e.target.blur();
    this.props.clickOnSearchFilter(e)
    this.setState ({
        showHideCrossBtns : true
    })
  }
}

clearSearchValue(){
  this.props.clickOnSearchFilter()
  this.setState({
      showHideCrossBtns : false,
  })
}



  render(){
    return (
        <div class={`filterArea ${(!this.props.folioNumber && (this.props.selectedOpt && this.props.selectedOpt.value == 1)) ? 'removeDisabled' : ''}`}>
          <div class="filter-section importSec">
          <SearchBroker 
              removeSearchField = {(obj)=> this.props.removeSearchField(obj)}
              onOptionSelection={(obj)=> this.props.onOptionSelection(obj,'brokerSelected') }
              isBrokerActive = {1}
              metatitle = 'adminSearchSoaBrokerSearch'
            />
          {this.props.isBrokerSelected && <Fragment> 
          <SearchFilter 
            placeholder="Search Folio"
            inputclass="input-group-field selector inputgrp" 
            selectedOpt={this.props.selectedOpt}
            onOptionSelection={(obj)=> this.props.onOptionSelection(obj) }
            options={SOA_LIST}
            iconClass = "genricFilter"
            customTitle = 'Search Folio'
            metatitle = 'adminSearchSoaSearchFolio'
          >
          </SearchFilter>
            {(this.props.selectedOpt.value == 1) &&
              <SearchField
                placeholder = {this.props.selectedOpt.label||"Search By Folio Number"}
                type = 'search'
                customClass = 'left fullSize'
                onEnterFunction = { (e) => this.onEnterPress(e , 4) }
                clearSearchValue = { () => this.clearSearchValue() }
                showHideCrossBtns = { this.state.showHideCrossBtns }
                onChangeFunction =  { (e) => this.onEnterPress(e) }
                customTitle = {this.props.selectedOpt.label||"Search By Folio Number"}
                metatitle = 'adminSearchSoaSearchByFolioNumber'
              />}
              {(this.props.selectedOpt.value == 2) &&
              <SearchField
                placeholder = {this.props.selectedOpt.label||"Search By Folio ID"}
                type = 'search'
                customClass = 'left fullSize'
                onEnterFunction = { (e) => this.onEnterPress(e , 2) }
                clearSearchValue = { () => this.clearSearchValue() }
                showHideCrossBtns = { this.state.showHideCrossBtns }
                onChangeFunction =  { (e) => this.onEnterPress(e) }
                customTitle = {this.props.selectedOpt.label||"Search By Folio ID"}
                metatitle = 'adminSearchSoaSearchByFolioId'
              />}</Fragment>}
            
          </div>
        </div>

    )
  }
  
}
const mapStateToProp = (state) =>{
    return {};
}
const mapDispatchToProp = (dispatch) => {
  return {dispatch:dispatch}
}
export default connect(mapStateToProp,mapDispatchToProp)(FiltersStripSOA);

