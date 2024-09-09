import React from "react"
import {connect} from 'react-redux'
import SearchFilter from "../customSelect/searchFilterCnt"
import SwitchButtonBox from '../switchButton'
import CheckBoxButton from '../checkbox/checkBoxBtn'
import {TOP_SCHEMES,SUB_SCHEMES} from '../../../constants/dashboardConst'
import {GetTopSchemesData} from '../../../actions/dashboard/getFunds'
import {TOP_SCHEMES_PERIOD } from '../../../constants/dashboardConst'


let tempFilter = [{label:'Amount',value:'non-zero'},{label:'Amount',value:'non-zero'},{label:'Amount',value:'non-zero'}]
export class FiltersStripTopSchemeInner extends React.Component{
  constructor(props){
    super(props)
    this.state = {value: '',selectedOpt:{label:'',value:0},tempFilter:tempFilter,filterBox:[], isOpen: false, filterBoxSub: [], myFilters:{}, ratio: false, overlay:false  }

  }

toggleFuntion(showHide){
     if(this.state.open!=showHide)
     {
      this.setState({
         open: showHide,
         overlay : true
       }) 
   }
   else{
    this.setState({
         open: 0
       })
    
   }
  }
  closeToolTips(){
    this.setState({
      open:0,
      overlay :false
    })
  }



  render(){ 
    return (
      <div class="filterArea">
      <div class="filter-section importSec">
         {(this.props.filterBox == '' || this.props.filterBox == 'All') && <SearchFilter placeholder="Category"
            title="category :"
            inputclass="input-group-field selector inputgrp" 
            selectedOpt={this.state.selectedOpt}
            onOptionSelection={(obj)=> this.props.onOptionSelection(obj) }
            options={TOP_SCHEMES}>
          </SearchFilter>}


           { (this.props.filterBox != '' && this.props.filterBox != 'All') && <SearchFilter placeholder="SubCategory"
            title="SubCategory :"
            inputclass="input-group-field selector inputgrp" 
            selectedOpt={this.state.selectedOpt}
            onOptionSelection={(obj,openObj)=> this.props.onOptionSelectionSub(obj,openObj) }
            options={SUB_SCHEMES[ this.props.filterBox]}
            isOpen = {true}
            >
          </SearchFilter>}
          <div class="filterResult left">
              {this.props.filterBox != '' && <span onClick={()=> this.props.crossFuntion("category")} class="filterList fullSize">{this.props.filterBox}</span>}
              {this.props.filterBox != '' && this.props.filterBoxSub != '' && <span onClick={()=> this.props.crossFuntion("subCategory")} class="filterList fullSize">{this.props.filterBoxSub}</span>}
          </div>
          <div class='fltrRightSec fr'>
       <SwitchButtonBox 
        leftTitle= "Absolute"
        rightTitle= "Annualised"
        slidePosition = {this.props.slidePosition}
        setAnnualisedData = {this.props.setAnnualisedData}
        isCheckLeft = {this.props.disablesState} 
        absolute = {this.props.absolute}
        >
        </SwitchButtonBox>
      </div>
            <div class="fltrRightSec fr">
           <div class={`customizeBtns ${this.props.disablesState=='slideRight' && 'removeDisabled'}  ${this.state.open=='openCustmize' && 'openToggle'}`} >
                  <span class="customize" onClick={() => this.toggleFuntion("openCustmize") }>Customize</span>
                    <CheckBoxButton 
                      selectedCheck= {(timePeriod)=> this.props.addMoreColumn(timePeriod)}
                      checked = {this.props.checked}
                      toggleFuntion = {(showHide)=> this.toggleFuntion(showHide)}
                      checkBoxList = {TOP_SCHEMES_PERIOD}
                      closeToolTips = {()=> this.closeToolTips()}
                    />
                    {this.state.overlay &&<div class="custom-select-overlay" onClick={()=> this.closeToolTips()}></div>}
                </div>
                </div>
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
export default connect(mapStateToProp,mapDispatchToProp)( FiltersStripTopSchemeInner);

