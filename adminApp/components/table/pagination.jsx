import React from 'react';
import SearchFilter from "../customSelect/searchFilterCnt"
import {connect} from 'react-redux'
import {PAGINATION_CONST} from '../../constants'
import {dynamicOptionList} from '../../utils/dataFormater'

export class Pagination extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedOpt:{label:this.props.recordLength,value:this.props.recordLength}
    }
  }

  createPaginationLi(){
    var {currentPage,noOfPage,setPagination} = this.props.paginationData;
    var {sortingInfo} = this.props;
    let pageNo=[];
    currentPage = parseInt(currentPage);
    noOfPage = parseInt(noOfPage);
    let leftPageIndex = Math.max(Math.min(currentPage-2,Math.max(noOfPage-4,1)),1);
    let rightPageIndex = Math.min(noOfPage,leftPageIndex+4);
    for(let itr = leftPageIndex;itr <= rightPageIndex; itr++){
        pageNo.push(
          <li class={(this.props.paginationData.currentPage==itr)&&"active"}
          onClick={()=>this.props.paginationData.setPagination({offset:itr, orderBy: sortingInfo&&sortingInfo.orderBy, orderByDesc: sortingInfo&&sortingInfo.orderByDesc})}
          key={itr}>
            {itr}
          </li>
        );
    }
    return pageNo;
  }
  
  onOptionSelection(obj){
    let pageSize = this.props.theme && this.props.theme.pageSize
    const keyName = this.props.frontEndPagination ? 'fePageSize' : 'pageSize'
    let theme = {...this.props.theme,[keyName]:obj.value}
    this.props.dispatch({type:'GOT_THEME_SUCCESS',payload:theme})
    this.setState({selectedOpt:obj})
    setTimeout(()=>{
      let param = {}
      param.offset = 1;
      param.orderByDesc = this.props.sortingInfo&&this.props.sortingInfo.orderByDesc
      param.orderBy = this.props.sortingInfo&&this.props.sortingInfo.orderBy
      this.props.paginationData.setPagination && this.props.paginationData.setPagination(param);

      if(obj.disableChangePageSize && !this.props.frontEndPagination){
        let theme = {...this.props.theme,pageSize:pageSize}
        this.props.dispatch({type:'GOT_THEME_SUCCESS',payload:theme})
      }

    },500)
  }
  componentWillUnmount(){
    if(this.props.frontEndPagination){
      let theme = Object.assign(this.props.theme, {})
      theme.fePageSize = null
      this.props.dispatch({type:'GOT_THEME_SUCCESS',payload:theme})
    }
  }
  optionsListFn(totalNoRows){
    let optionsList = PAGINATION_CONST
    if(totalNoRows <=10){
      optionsList = dynamicOptionList(optionsList,0)
    }
    if(totalNoRows <=20 && totalNoRows >=11){
      optionsList = dynamicOptionList(optionsList,1)
    }
    if(totalNoRows <=50 && totalNoRows >=21){
      optionsList = dynamicOptionList(optionsList,2)
    }
    if(totalNoRows <=100 && totalNoRows >=51){
      optionsList = dynamicOptionList(optionsList,3)
    }
    if(totalNoRows <=200 && totalNoRows >=101){
      optionsList = dynamicOptionList(optionsList,4)
    }
    if(totalNoRows && totalNoRows>10 && totalNoRows<100 && totalNoRows!=20 && totalNoRows!=50 ){
      optionsList =  [ ...optionsList , { label: totalNoRows, value: totalNoRows, disableChangePageSize: true  }  ]
    }
   if(this.props.user && this.props.user.userType == 'admin'){
    let tempOptsListArr = []
      if(totalNoRows >= 201){
        tempOptsListArr = [{label : '200', value : 200}]
        }
        if(totalNoRows >=501){
        tempOptsListArr = [...tempOptsListArr, {label : '500', value : 500}]
        }
        optionsList = [... optionsList,...tempOptsListArr]
     }
    return optionsList
  }
  
  render(){
    var {currentPage,noOfPage,setPagination} = this.props.paginationData;
    let {sortingInfo} = this.props;
    let selectedOpt = {label:this.props.recordLength,value:this.props.recordLength}
    let optionsList = this.optionsListFn(this.props.paginationData.totalNoRows)
    return(
      <div class='paginationArea withPaginationOpts'>
         {(!this.props.allowPaginationMobileView) && <div class="filterSection left">
         <div class="filter-section">
          {!this.props.showHidePaginationDropDown && <SearchFilter 
            placeholder="Page Size"
            title="Select"
            inputclass="input-group-field selector inputgrp" 
            iconClass = {` ${(optionsList&&optionsList.length == 0) ? 'removeDisabled': ''}`}
            selectedOpt={selectedOpt}
            onOptionSelection={(obj)=> this.onOptionSelection(obj) }
            options={optionsList}
          />}
          {this.props.showHidePaginationDropDown && selectedOpt.value }
            <span class="visibleRows">rows visible out of {this.props.paginationData.totalNoRows}.</span>
          </div>
        </div>}
        <div class="pagination rightSide">
          {(currentPage !=1&&noOfPage>1)&&
            <a href="javascript:void(0);" class="nxtPrev allPrev" onClick={()=>setPagination({offset:1, orderBy: sortingInfo&&sortingInfo.orderBy, orderByDesc: sortingInfo&&sortingInfo.orderByDesc })}>&laquo;</a>
          }
          {(currentPage !=1&&noOfPage>1)&&
            <a href="javascript:void(0);" class="nxtPrev Prev" onClick={()=>setPagination({offset:currentPage-1, orderBy: sortingInfo&&sortingInfo.orderBy, orderByDesc: sortingInfo&&sortingInfo.orderByDesc})}>&lsaquo;</a>
          }
          <ul>
            {this.createPaginationLi()}
          </ul>
          {(currentPage !=noOfPage&&noOfPage>1)&&
            <a href="javascript:void(0);" class="nxtPrev allPrev" onClick={()=>setPagination({offset:currentPage+1, orderBy: sortingInfo&&sortingInfo.orderBy, orderByDesc: sortingInfo&&sortingInfo.orderByDesc})}>&rsaquo;</a>
          }
          {(currentPage !=noOfPage&&noOfPage>1)&&
            <a href="javascript:void(0);" class="nxtPrev Prev" onClick={()=>setPagination({offset:noOfPage, orderBy: sortingInfo&&sortingInfo.orderBy, orderByDesc: sortingInfo&&sortingInfo.orderByDesc})}>&raquo;</a>
          }
        </div>
        <div class="cl"></div>
      </div>
    )
  }
}
const mapStateToProp = (state) =>{
  return {
    theme: state.userReducer.theme,
    user:state.userReducer.user
  }
}
const mapDispatchToProp = (dispatch) => {
  return {dispatch:dispatch}
}
export default connect(mapStateToProp,mapDispatchToProp)( Pagination)