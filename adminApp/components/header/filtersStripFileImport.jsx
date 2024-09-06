import React from "react"
import {connect} from 'react-redux'
import moment from 'moment'
import SearchFilter from "../customSelect/searchFilterCnt"
import {FILE_TYPE,REGISTRAR} from '../../../constants/dashboardConst'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { GetLevelUsersData,GetLevels } from '../../../actions/user/userAction';
import { GetDashboardData, GetFileImportData } from '../../../actions/dashboard/getFunds';
import {UTIL} from 'app/constants'

import 'react-day-picker/lib/style.css';


let tempFilter = [{label:'Amount',value:'non-zero'},{label:'Amount',value:'non-zero'},{label:'Amount',value:'non-zero'}]
export class FiltersStrip extends React.Component{
  constructor(props){
    super(props)
    this.state = {value: '',selectedOpt:{label:'',value:0},tempFilter:tempFilter}

  }

  onOptionSelection(obj,dateObj){
    var param = {}
    var startDate;
    var endDate;
    if (dateObj=="startDate") {
      param.startDate =obj;
    }
    if (dateObj=="endDate") {
      param.endDate =obj;
    }
    param.filters=[{'fileType': obj.key},{'rta': obj.value}]
    param.filters= JSON.stringify(param.filters)
    param.pageSize = 10,
    param.currentPage = 1
      this.props.dispatch(GetFileImportData(param,obj));
    }
  onDateSelection(day){
  }
  removeFiltrer(key){
    let tempFilter = this.state.tempFilter;
    tempFilter.splice(key,1)
    this.setState({tempFilter:tempFilter})
  }

  getFilesData () {
     var param = {
      "pageSize": 10,
      "currentPage" :1
    }
    this.props.dispatch(GetFileImportData(param))
  }



  render(){ 
    return (
        <div class="filter-section ">
          <SearchFilter placeholder="File type"
            title="GROUP BY"
            inputclass="input-group-field selector inputgrp" 
            selectedOpt={this.state.selectedOpt}
            onOptionSelection={(obj)=> this.onOptionSelection(obj) }
            options={FILE_TYPE}
          >
          </SearchFilter>
          <SearchFilter placeholder="Registrar"
            title="ADD A FILTER:"
            selectedOpt={this.state.selectedOpt}
            onOptionSelection={(obj)=> this.onOptionSelection(obj) }
            options={REGISTRAR}
            customClass="large-filter"
          >
          </SearchFilter>

          <div class="filter-box left calendar-box ">
            <i class="filter-icon calender left"></i>
            <div class="custom-calendar">
              <DayPickerInput placeholder={UTIL.dateFormat }
              onDayChange={(startDate)=> this.onOptionSelection(startDate.format(UTIL.dateFormat),"startDate")}  
              dayPickerProps={{
                enableOutsideDays: false,
                disabledDays: [
                  { before: moment().subtract(2, 'years').toDate() },
                  { after: moment().toDate() },
                ],
              }} />
            </div>
            <span class="date-fltr">-</span>
            <div class="custom-calendar">
              <DayPickerInput placeholder= {UTIL.dateFormat} 
              onDayChange={(endDate)=> this.onOptionSelection(endDate.format(UTIL.dateFormat),"endDate")}  
              dayPickerProps={{
                enableOutsideDays: false,
                disabledDays: [
                  { before: moment().subtract(20, 'years').toDate() },
                  { after: moment().toDate() },
                ],
              }} />
            </div>
            
          </div>

          <div class="fltrRightSec fr">
              <div class="fltrControl">
                  {/*<a onClick={() => this.props.changeTableView("tableView")} class = {`listing ${this.props.isChanged=="tableView" && 'column'}`}   href="javascript:void(0)"><i>listing</i></a>*/}
                    <a href="javascript:void(0);" class="reFresh" onClick={this.getFilesData.bind(this)}><i>Refresh</i></a>
                   
                </div>
        </div>

        
      </div>

    )
  }
  
}
const mapStateToProp = (state) =>{
    /*
  return {
    fundsAssetWise:state.dashboardReducer.fundsAssetWise.data,}*/
    return {};
}
const mapDispatchToProp = (dispatch) => {
  return {dispatch:dispatch}
}
export default connect(mapStateToProp,mapDispatchToProp)( FiltersStrip);

