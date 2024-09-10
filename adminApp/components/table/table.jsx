import React, { Fragment } from 'react';
import Pagination from './pagination';
import * as utilsMethods from '../../utils/dataFormater'
import CaptionInfo from '../alert/captionInfo'
import * as tableCustomTd from './tableTdList'
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SearchInTable from "./searchInTable"
import {connect} from 'react-redux'
import Loader from '../loaders'
import {UTIL} from '../../constants'


export class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: props.tableData || [], sortingInfo: { state: props.sortingInfo.state || 1, key: props.sortingInfo.key }, activeClass: 'active', getColumnSorting: '',
      withoutPaginationSorting: false, showBoxToActions: false, selectedColumnForSearch: [], checkedMultiBox: true,
      storeCurrentPage: {},
      checkedMultiSelectBox: false,
    }
  }
  componentDidMount() {
    this.getFirstSortingColumn(this.props.tableCustomData)
    this.tableCustopScrollOpts()
    window.onresize = () => {
      this.tableCustopScrollOpts()
      if (!this.props.tableHeaderNotFixed) {
        this.tableScrollWithFixedHeader()
      }
    }
    window.onscroll = () => {
      this.tableCustopScrollOpts()
      if (!this.props.tableHeaderNotFixed) {
        this.tableScrollWithFixedHeader()
      }
    }
    if(!this.props.notScrollPageTop)
    {
      window.scroll(5, 0);
    }
    if(this.props.resetCustomScroll){
      setTimeout(()=> {
        this.tableCustopScrollOpts()
      }, 300)
    }
    if(this.props.tableHeaderNotFixed){
      let mainTableScrollArea = document.getElementById('mainTableScrollArea')
      let mainRightSideArea = document.getElementsByClassName('right-main-box')[0]
      document.body.classList.remove('tableScrollAdded')
      mainTableScrollArea && mainTableScrollArea.classList.remove("fixedHeader")
      mainRightSideArea && mainRightSideArea.classList.remove('customRightSideClass')
    }
  }
  tableScrollWithFixedHeader() {
    let mainTableScrollArea = document.getElementById('mainTableScrollArea')
    let mainRightSideArea = document.getElementsByClassName('right-main-box')[0]
      let mainScrollTable = this.mainScrollTable
      let headScrollTable = this.headScrollTable
    if (window.pageYOffset > 50 && (mainScrollTable && mainScrollTable.getBoundingClientRect().top<=0.6)) {
      mainTableScrollArea && mainTableScrollArea.classList.add('fixedHeader')
      document.body.classList.add('tableScrollAdded', 'bodyOverflowHideShow')
      setTimeout(()=> {
        document.body.classList.remove('bodyOverflowHideShow')
      },100)
    } else if((mainScrollTable && mainScrollTable.getBoundingClientRect().top>=12)) {
      mainTableScrollArea && mainTableScrollArea.classList.remove("fixedHeader")
      document.body.classList.remove('tableScrollAdded')
      mainScrollTable.scrollTop = 0
    }
    if(this.props.tableHeaderNotFixed){
      mainRightSideArea && mainRightSideArea.classList.remove('customRightSideClass')
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let mainLeftSideArea = document.getElementsByClassName('left-side-box')[0]
    let mainRightSideArea = document.getElementsByClassName('right-main-box')[0]
    if (this.props != prevProps) {
      this.tableCustopScrollOpts()
      if (!this.props.tableHeaderNotFixed) {
        this.tableScrollWithFixedHeader()
        mainLeftSideArea && mainLeftSideArea.classList.add('tableHeaderFixedEnable')
        mainRightSideArea && mainRightSideArea.classList.add('customRightSideClass')
      }else{
        mainLeftSideArea && mainLeftSideArea.classList.remove('tableHeaderFixedEnable')
        mainRightSideArea && mainRightSideArea.classList.remove('customRightSideClass')
      }
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({
      tableData: newProps.tableData || []
    }, () => {
      window.onscroll = () => {
        if (!this.props.tableHeaderNotFixed) {
          this.tableScrollWithFixedHeader()
        }
      }
      setTimeout(() => {
        this.tableCustopScrollOpts()
        if (!this.props.tableHeaderNotFixed) {
          this.tableScrollWithFixedHeader()
        }
      }, 100)
    })

    let tableCustomData = this.props.tableCustomData
    if (tableCustomData.length != newProps.tableCustomData.length) {
      this.setState({ tableCustomData }, () => this.getFirstSortingColumn(newProps.tableCustomData))
    }
    else {
      for (let itr = 0; itr < tableCustomData.length; itr++) {
        if ((tableCustomData[itr].value != newProps.tableCustomData[itr].value)) {
          this.setState({ tableCustomData }, () => this.getFirstSortingColumn(newProps.tableCustomData))
          return
        }
      }
    }
    if ( newProps.frontEndSorting && !newProps.paginationData
      && newProps.tableCustomData && ( newProps.tableCustomData != this.props.tableCustomData) && newProps.tableCustomData.length
      && newProps.tableData && (newProps.tableData != this.props.tableData) && newProps.tableData.length > 0) {
      this.setState({
        withoutPaginationSorting: true
      }, function () {
        this.sortFunction(this.state.sortingInfo, this.state.columnNumber)
      })
    }
    if (newProps.tableHeadingData && newProps.tableHeadingData.length >= 0) {
      let selectedColumnForSearch = newProps.tableHeadingData || []
      this.setState({
        selectedColumnForSearch
      })
    }
    let selectedRowsLength = newProps.selectedRows && Object.keys(newProps.selectedRows).length
    if (selectedRowsLength == 0) {
      this.setState({
        checkedMultiSelectBox: false
      })
    }
    let storeCurrentPage = this.state.storeCurrentPage || {}
    let currentPage = newProps.paginationData && newProps.paginationData.currentPage
    let tableDataList = newProps.tableData || []
    for (let i = 0; i < tableDataList.length; i++) {
      if (!this.state.checkedMultiSelectBox && (selectedRowsLength > 0) && newProps.selectedRows.hasOwnProperty(tableDataList[i][this.props.selectedUniqueKey])) {
        this.setState({
          checkedMultiSelectBox: true
        })
      }
    }
    if(newProps.frontEndSearching) {
      this.setState({
        withoutPaginationSorting: true
      },()=> this.feDataSearching() )
    }
    if (newProps.totalDataRow) {
      this.setState({ totalDataRow: newProps.totalDataRow })
     
    }
  }

  feDataSearching(){
    let tableData = this.state.tableData || []
    let allColumnsKeysObj = this.props.allColumnsKeys
    let filterTableData = tableData && tableData.filter((row) => {
      for(const key in allColumnsKeysObj){
        if(!row[key].includes(allColumnsKeysObj[key]))
        return false
      }
      return true;
    })
    this.setState({ tableData: filterTableData })
  }

  getFirstSortingColumn(tableCustomData) {
    if (this.props.defaultSortingColumn && tableCustomData[this.props.defaultSortingColumn]) {
      let sortingInfo = { state: tableCustomData[this.props.defaultSortingColumn].orderByAlpha ? 1 : -1 }
      sortingInfo = { key: tableCustomData[this.props.defaultSortingColumn].value }
      this.sortTable(this.props.defaultSortingColumn, true)
      return
    }
    for (let itr = 0; itr < tableCustomData.length; itr++) {
      if (tableCustomData[itr].sorting) {
        let sortingInfo = { state: tableCustomData[itr].orderByAlpha ? 1 : -1 }
        sortingInfo = { key: tableCustomData[itr].value }
        this.setState({ columnNumber: itr }, () => this.sortTable(itr, true))
        return
      }
    }
  }

  getAttributeValue(event){
    let addViewActionType = this.props.addViewActionType
    const actionType = event.target.getAttribute('viewState');
    if(actionType){
      addViewActionType.actionType = actionType
      this.props.dispatch({type:"ADD_VIEW_ACTION",payload:addViewActionType})
    }
  }
  checkAndCallTDclick(indx, td, rowIndx, checkIndex, group) {
    if (this.props.tableTDClick && this.props.tableTDClick[indx]) {
      if (indx == 'editableCols') {
        this.setState({
          editableColumn: td,
          editableRow: rowIndx
        })
        this.props.tableTDClick[indx](checkIndex, indx, rowIndx)
      } else {
        if (this.props.radioButtonInTable && this.props.radioButtonInTable.type == 'group') {
          this.props.tableTDClick[indx](td, rowIndx, checkIndex, group)
        } else {
          this.props.tableTDClick[indx](td, indx, rowIndx)
        }
      }
    }
    if((indx == this.props.tableCustomData.length-1 || (this.props.tableCustomData[indx] && this.props.tableCustomData[indx].openColumnAction)) || (indx=='closeActions')  ){
      this.setState({
        rowIndx,
        showAction : !this.state.showAction,
        colIndex: this.props.tableCustomData[indx] && this.props.tableCustomData[indx].openColumnAction ? indx : false
      })
    }
  }

  checkAndCallFunction(event, fn, param) {
    if (fn) {
      fn(event, param);
    }
  }

  clickOnActionList(actionName) {
    if (this.props.onClickAction) {
      this.props.onClickAction(actionName)
    }
  }

  clickTableHeading(headValue, index) {
    if (this.props.sortDataDesc && this.props.tableCustomData[index].clickHead) {
      this.props.sortDataDesc(headValue, index)
    }
    if(this.props.updateTableOnSort){
      this.props.updateTableOnSortFun && this.props.updateTableOnSortFun()
      this.setState({totalDataRow :{}})
    }
  }
  checkColumnAndAppend(varValue) {
    switch (typeof (varValue)) {
      case 'string':
        return varValue
        break;
      case 'object':
        let finalVar = ''
        varValue.map((value) => {
          if (typeof (value) == 'string') {
            finalVar = `${finalVar} ${value}`
          }
        })
        return finalVar
        break;
    }
  }

  checkColumnAndAppend(varValue) {
    switch (typeof (varValue)) {
      case 'string':
        return varValue
        break;
      case 'object':
        let finalVar = ''
        varValue.map((value) => {
          if (typeof (value) == 'string') {
            finalVar = `${finalVar} ${value}`
          }
        })
        return finalVar
        break;
    }
  }

  openToolTip(actionToOpenToolTip, selectedRowForToolTip) {
    let finalContainer = actionToOpenToolTip.onClickFunction(selectedRowForToolTip)
    return finalContainer
  }
  closeToolTip() {
    this.setState({
      isToolTipOpen: false
    })
  }

  createTableTotalRow() {
    let displayTotalKeyName = this.props.displayTotalKeyName || {}
    let totalRow = [];
    {
      this.props.tableCustomData[0] && totalRow.push(
        <td class={`${this.props.tableCustomData[0].styleClass} ${this.props.totalFinalRow ? 'totalHeading'  : ''}`} key={0}
          data-title={this.props.tableCustomData[0].key}
        >
        <span class={this.props.tdSpanClass}>{`${displayTotalKeyName.scheme ? displayTotalKeyName.scheme:"Total"}`}</span>
        </td>
      )
    }

    for (let totalRowItr = 1; totalRowItr < this.props.tableCustomData.length; totalRowItr++) {
      const totalDataRow = this.state.totalDataRow || this.props.totalDataRow
      let columnValue = totalDataRow && totalDataRow[this.props.tableCustomData[totalRowItr] && this.props.tableCustomData[totalRowItr].value]
      if ((this.props.tableCustomData[totalRowItr].precision != null) && (columnValue)) {
        columnValue = utilsMethods.PrecesionValueFormater(columnValue, this.props.tableCustomData[totalRowItr].precision,this.props.tableCustomData[totalRowItr].onlyInteger)
      }

      if (this.props.tableCustomData[totalRowItr].isCommaSeparated) {
        columnValue = utilsMethods.NumberFormater(columnValue);
      }


      if (columnValue != null) {

        if (this.props.tableCustomData[totalRowItr].isDateFlag) {
          columnValue = utilsMethods.ShowDateFormater(columnValue);
        }
        if (this.props.tableCustomData[totalRowItr].isDateAndTimeFlag) {
          columnValue = utilsMethods.ShowDateAndTime(columnValue);
        }
        if (this.props.tableCustomData[totalRowItr].isCustomDateAndTime && this.props.tableCustomData[totalRowItr].format) {
          columnValue = utilsMethods.ShowCustomDateTimeFormat(columnValue, this.props.tableCustomData[totalRowItr].format);
        }
      }
      else if (this.props.tableCustomData[totalRowItr].nullValue && columnValue == null) {
        columnValue = null
      }

      if(this.props.tableCustomData[totalRowItr].totalNotAllowed) {
          columnValue = null
      }
      if(this.props.tableCustomData[totalRowItr].isPercent && columnValue){
        columnValue = `${columnValue}%`
      }
      if(!this.hideCallZeroVal(this.props.tableCustomData[totalRowItr])){
      totalRow.push(
        <td class={this.props.tableCustomData[totalRowItr].styleClass} key={totalRowItr}
          data-title={this.textOnlyShow(this.props.tableCustomData[totalRowItr].key)}
          title = {columnValue}
        >
          <span class={this.props.tdSpanClass}>{columnValue}</span>
        </td>
      )
      }
    }
    return totalRow;
  }
  textOnlyShow(keyValue) {
    let tempVar = keyValue

    if (keyValue && keyValue.props && keyValue.props.children.length > 0) {
      if (keyValue.props.children[1].type == 'span') {
        tempVar = keyValue.props.children[0]
      } else {
        tempVar = keyValue.props.children
      }
    }
    let parseString = this.checkColumnAndAppend(tempVar)

    return parseString
  }

  showBoxToActionsFun() {
    let statusToShowActionBox = this.state.showBoxToActions
    this.setState({
      showBoxToActions: !statusToShowActionBox
    })
  }

  showCopyToolTip(colValue) {
    this.setState({ showHideCopyTip: true })
    setTimeout(() => {
      this.setState({ showHideCopyTip: false })
    }, 1000)
  }

  createTableRows(tableDataFromObj, group) {
    let tableRows = [];
    let columnStartFrom = 0;
    let rowStartFrom = 0;
    let tableDataListing = tableDataFromObj || this.state.tableData
    if (this.props.totalDataRow){
      rowStartFrom = 1;
    }
    if (this.props.totalDataRow && !this.props.showTotalInBottom) {
      tableRows.push(<tr key={0} class={`${this.props.totalFinalRow ? this.props.totalFinalRow : ''}`}>{this.createTableTotalRow()}</tr>);
    }
    if (this.state.checkedMultiSelectBox && (tableDataListing && tableDataListing.length == 0)) {
      this.setState({
        checkedMultiSelectBox: false
      })
    }
    if (tableDataListing && tableDataListing.length > 0) {
      for (let i = 0; i < tableDataListing.length; i++) {
        let tableColumns = [];
        let selectedRowsLength = this.props.selectedRows && Object.keys(this.props.selectedRows).length > 0
        if (this.state.checkedMultiSelectBox && selectedRowsLength && (!this.props.selectedRows.hasOwnProperty(tableDataListing[i][this.props.selectedUniqueKey]))) {
          this.setState({
            checkedMultiSelectBox: false
          })
        }
        if (this.props.checkBoxInTable) {
          columnStartFrom = 1;
          tableColumns.push(
            <td>
              <label class="customCheckBox">
                <input type="checkbox" name="action" onClick={() => this.checkAndCallTDclick('checkboxFn', tableDataListing[i], i)} />
                <span></span>
              </label>
            {/*This span is added only for duplicate finder screen to show lock icon */}
              {(tableDataListing[i] && tableDataListing[i].updateLock == 1) && <span class="lockIcon info upArrow">
                  <span>Client Master Locked</span>
                </span>}
              
              
            </td>)
        }
        if (this.props.radioButtonInTable) {
          let checked = this.props.radioBttnChecked && this.props.radioBttnChecked(tableDataListing[i])
          let customAttr = {}
          if(this.props.radioButtonCheckUncheck){
            checked = this.props.selectUniqueKey && this.props.selectUniqueKey.hasOwnProperty(tableDataListing[i][this.props.uniqueKey]) ? true : false
            customAttr = {
              checked,
            }
          }
          columnStartFrom = 1;
          tableColumns.push(
            <td data-title="Options" metatitle= {(this.props.radioButtonInTable && this.props.radioButtonInTable.metatitle) ? this.props.radioButtonInTable.metatitle : ''}>
              <label class="customRadioBox">
                {!this.props.radioBttnChecked && <input type="radio" name={(this.props.radioButtonInTable && this.props.radioButtonInTable.type ? group : (this.props.radioButtonInTable && this.props.radioButtonInTable.name || "investor"))}
                  onClick={() => this.checkAndCallTDclick('radioButtonFn', tableDataListing[i], i, tableDataListing, group)}
                  {...customAttr}
                />}
                {this.props.radioBttnChecked && <input type="radio" name={(this.props.radioButtonInTable && this.props.radioButtonInTable.type ? group : (this.props.radioButtonInTable && this.props.radioButtonInTable.name || "investor"))}
                  onClick={() => this.checkAndCallTDclick('radioButtonFn', tableDataListing[i], i, tableDataListing, group)}
                  checked={checked}
                />}
              <span class={`${this.props.shiftTop ? 'shftTop10' : ''}`}>
					        <span class = "radioDot"></span>
				        </span>
              </label>
              {/*This span is added only for duplicate finder screen to show lock icon */}
              {(tableDataListing[i] && tableDataListing[i].updateLock == 1) && <span class="lockIcon info upArrow">
                  <span>Client Master Locked</span>
                </span>}
            </td>)
        }

        if (this.props.changeStartColumn) {
          columnStartFrom = 1;
        }

        for (let j = columnStartFrom; j < this.props.tableCustomData.length; j++) {
          let alignedValue;
          let columnCounter = 0
          /*columnCounter is used for handle 'else' case of flag based columns, 
          We need add one counter in every if block of flag based column 
          byDefault columnCounter should be 0 */
          let cellColor
          let columnValue = tableDataListing[i]  && tableDataListing[i][this.props.tableCustomData[j].value]
          let isDefaultRole = false
          let precisionValue = this.props.tableCustomData[j].precision;
          let onlyInteger = this.props.tableCustomData[j].onlyInteger;
          if(this.props.tableCustomData[j] && this.props.tableCustomData[j].cellValue){
            cellColor=tableDataListing[i][this.props.tableCustomData[j].cellValue]
            if(this.props.tableCustomData[j].mapBgcolorArray){
              cellColor = tableCustomTd.mapBgcolorFromValue(this.props.tableCustomData[j],tableDataListing[i])
            }
          }
          if (this.props.tableCustomData[j].styleClass) {
            alignedValue = this.props.tableCustomData[j].styleClass;
            if(((this.state.colIndex || this.props.tableCustomData.length-1) == j) && this.state.rowIndx == i) {
              alignedValue = `${alignedValue} ${this.state.showAction ? 'showActions' : ''}`
            }
          }
          if((tableDataListing[i] && tableDataListing[i].isDefault) && this.props.isDefaultRoleShowHide){
            isDefaultRole = tableDataListing[i].isDefault
            alignedValue = this.props.tableCustomData[j].styleAdditionalClass;
            alignedValue = `${alignedValue} removeDisabled`
          }

          if (precisionValue != null) {
            columnValue = utilsMethods.PrecesionValueFormater(columnValue, precisionValue, onlyInteger)
          }
          if(this.props.tableCustomData[j].defaultValue){
            columnValue = this.props.tableCustomData[j].defaultValue
          }

          if (this.props.tableCustomData[j].innerObjKey) {
            columnValue = tableDataListing[i][this.props.tableCustomData[j].innerObjKey][this.props.tableCustomData[j].value]
          }

          if (this.props.tableCustomData[j].isCommaSeparated) {
            columnValue = utilsMethods.NumberFormater(columnValue);
          }

          if (this.props.tableCustomData[j].smartValue) {
            columnValue = utilsMethods.smartNumber(columnValue, this.props.tableCustomData[j].precision)
          }
          if (this.props.tableCustomData[j].isFileSizeFormated) {
            columnValue = utilsMethods.fileSizeFormat(columnValue, this.props.tableCustomData[j].sizePrecision);
          }
          if (columnValue != null) {
            if(this.props.tableCustomData[j].maskingType){
              columnValue = utilsMethods.maskUserData(columnValue, this.props.tableCustomData[j].maskingType ,this.props.maskDataFlag);
            }
            if (this.props.tableCustomData[j].isDateFlag) {
              columnValue = utilsMethods.ShowDateFormater(columnValue, UTIL.frontDateFormat , this.props.tableCustomData[j].utcOffsetValue);
            }
            if (this.props.tableCustomData[j].capitalizeFirstLetter) {
              columnValue = utilsMethods.capitalizeFirstLetterEachWord(columnValue);
            }
            if (this.props.tableCustomData[j].isDateAndTimeFlag) {
              columnValue = utilsMethods.ShowDateAndTime(columnValue);
            }
            if (this.props.tableCustomData[j].isCustomDateAndTime && this.props.tableCustomData[j].format) {
              columnValue = utilsMethods.ShowCustomDateTimeFormat(columnValue, this.props.tableCustomData[j].format);
            }
            if (this.props.tableCustomData[j].nullValue && columnValue == '') {
              columnValue = utilsMethods.ConvertNullToString()
            }
          } else if (this.props.tableCustomData[j].nullValue && columnValue == null) {
            columnValue = utilsMethods.ConvertNullToString()
          }
          let oldColumnValue = columnValue;
          if (this.props.tableCustomData[j].formatter) {
            columnValue = this.props.tableCustomData[j].formatter(columnValue)
          }
          if (this.props.tableCustomData[j].buttonInfo) {
            columnValue = tableCustomTd.CreateButtonIcon(this.props.tableCustomData[j], tableDataListing[i])
          }
          if (this.props.tableCustomData[j].mapLabelValueInfo) {
            columnValue = tableCustomTd.mapLabelFromValue(this.props.tableCustomData[j], tableDataListing[i])
            if(this.props.tableCustomData[j].mapLabelValueInfo.newLabel){
              let data = tableDataListing[i] || {};
              data[this.props.tableCustomData[j].mapLabelValueInfo.newLabel] = columnValue
              tableDataListing[i] = data
            }
          }
          if(this.props.tableCustomData[j].isPercent){
            columnValue = `${columnValue}%`
          }
          if(this.props.tableCustomData[j].arrayOfValues){
            columnValue = (<Fragment>
              {(columnValue||[]).map((value, index) => (
                <span class="showLabelView" key={index}>{value}</span>
              ))}
            </Fragment>)
          }
          if (this.props.tableCustomData[j].conditionBasedClass) {
            let conditionalClass = ''
            conditionalClass = tableCustomTd.conditionBasedClassFn(this.props.tableCustomData[j].conditionBasedClass, this.props.tableCustomData[j], tableDataListing[i])
            columnCounter = +1
            tableColumns.push(
              <td title={typeof oldColumnValue == 'object' ? '' : oldColumnValue} class={alignedValue} key={this.props.tableCustomData.length + j} data-title={this.textOnlyShow(this.props.tableCustomData[j].key)}
                onClick={() => this.checkAndCallTDclick(j, tableDataListing[i], i)} metatitle={`${this.props.tableCustomData[j].metatitle ? this.props.tableCustomData[j].metatitle : ''}`}>
                <span class={conditionalClass + ' ' + this.props.tdSpanClass}>{columnValue}</span>
              </td>)
          }

          if (this.props.tableCustomData[j].toolTip) {
            columnCounter = +1
            let customColumnValue = this.openToolTip(this.props.tableCustomData[j].toolTip, tableDataListing[i])
            tableColumns.push(
              <td class={alignedValue} key={this.props.tableCustomData.length + j + Math.random()} data-title={this.textOnlyShow(this.props.tableCustomData[j].key)} metatitle={`${this.props.tableCustomData[j].metatitle ? this.props.tableCustomData[j].metatitle : ''}`}>
                <span class={this.props.tdSpanClass} onClick={() => this.checkAndCallTDclick('editableCols', j, i, tableDataListing[i])} >{customColumnValue}</span>

              </td>)
          }

          if (this.props.tableCustomData[j].editableData && !(isDefaultRole && this.props.isDefaultRoleShowHide)) {
            columnCounter = +1
            let columnInfo = this.props.tableCustomData[j].editableData
            tableColumns.push(
              <td title={typeof oldColumnValue == 'object' ? '' : oldColumnValue} class={alignedValue} key={this.props.tableCustomData.length + j} data-title={this.props.tableCustomData[j].key} metatitle={`${this.props.tableCustomData[j].metatitle ? this.props.tableCustomData[j].metatitle : ''}`} >
                <span class={this.props.tdSpanClass} >{columnValue}</span>
                <span class="showTollTips">
                  <span class='toolTipsIcon editFld' onClick={() => {this.setState({editableRow:null},()=>{ this.checkAndCallTDclick('editableCols', j, i, tableDataListing[i]) })}} ></span>
                  {(columnValue != '') && tableCustomTd.addFiltersToSearchHeading(this.props.tableCustomData[j], tableDataListing[i], i, () => this.showSearchField(j, this.props.tableCustomData[j], tableDataListing[i]), j, this.props.tdSpanClass)}
                  {tableCustomTd.clipToCopyInTable(this.props.tableCustomData[j], columnValue, () => this.showCopyToolTip(columnValue), this.state.showHideCopyTip)}
                </span>
                  {tableCustomTd.CreateEditableColumnField(this.props.tableCustomData[j], this.state.editableRow, i, this.state.editableColumn, j, this.props.showHideEditTable, columnValue, (e) => this.props.onSubmit(e), () => this.cancel(), this.props.selectedRow, this.props.inputRef)}
              </td>
            )
          }
          if (this.props.createAction && this.props.tableCustomData[j].actionsColumn) {
            columnCounter = +1
            if (this.props.multipleAction) {
              for (let cols in this.props.createAction) {
                if (cols == j) {
                  tableColumns.push(
                    <td title={typeof oldColumnValue == 'object' ? '' : oldColumnValue} class={alignedValue} key={this.props.tableCustomData.length + j} data-title={this.textOnlyShow(this.props.tableCustomData[j].key) }
                      onClick={(e) => {this.checkAndCallTDclick(j, tableDataListing[i], i);this.getAttributeValue(e);}} metatitle={`${this.props.tableCustomData[j].metatitle ? this.props.tableCustomData[j].metatitle : ''}`}>
                      <span class={this.props.tdSpanClass}>{columnValue}</span>
                      {this.props.createAction[cols](tableDataListing[i], j, i)}
                    </td>)
                }
              }
            } else {
              tableColumns.push(
                <td title={typeof oldColumnValue == 'object' ? '' : oldColumnValue} class={alignedValue} key={this.props.tableCustomData.length + j} data-title={this.textOnlyShow(this.props.tableCustomData[j].key)}
                  onClick={(e) => {this.checkAndCallTDclick(j, tableDataListing[i], i); this.getAttributeValue(e);}} metatitle={`${this.props.tableCustomData[j].metatitle ? this.props.tableCustomData[j].metatitle : ''}`}>
                  <span class={this.props.tdSpanClass}>{columnValue}</span>
                  {this.props.createAction(tableDataListing[i], j, i)}
                </td>)
              }
          } else {
            if ((columnCounter === 0 ) && !this.hideCallZeroVal(this.props.tableCustomData[j])) {
              alignedValue = `${alignedValue} ${this.props.tableCustomData[j].cellValue? cellColor : ''}`
              tableColumns.push(
                  <td title={(typeof oldColumnValue == 'object' || this.props.tableCustomData[j].removeHoverColumnValue) ? '' : oldColumnValue} class={alignedValue} key={this.props.tableCustomData.length + j} data-title={this.textOnlyShow(this.props.tableCustomData[j].key)} metatitle={`${this.props.tableCustomData[j].metatitle ? this.props.tableCustomData[j].metatitle : ''}`}>

                  <span class={this.props.tdSpanClass} onClick={(e) => {this.checkAndCallTDclick(j, tableDataListing[i], i);this.getAttributeValue(e);}} >{columnValue}</span>
                  {(columnValue != '') && ( (this.props.tableCustomData[j]&&this.props.tableCustomData[j].clipToCopy) || (this.props.tableCustomData[j]&&this.props.tableCustomData[j].addFiltersToSearch) ) && <span class={`${columnValue ? 'showTollTips' : ''}`}>
                    {tableCustomTd.clipToCopyInTable(this.props.tableCustomData[j], columnValue, () => this.showCopyToolTip(columnValue), this.state.showHideCopyTip)}
                    {(columnValue != '') && tableCustomTd.addFiltersToSearchHeading(this.props.tableCustomData[j], tableDataListing[i], i, () => this.showSearchField(j, this.props.tableCustomData[j], tableDataListing[i]), j, this.props.tdSpanClass)}
                  </span>}
                  </td>)
                }
          }
        }
        /*tableRows.push(<tr key={i+1}>{tableColumns}</tr>)*/
          // Offset - Specifies position where the next reload starts
          // Height - change on scroll
          // Debounce - to enable diable debounce
        {!this.props.tableLazyLoadNotRequired && tableRows.push(
          <LazyLoadComponent key={i + 10} height='10%' offset={[1000, 1000]}
            // placeholder={<PlaceholderForTableData />}
            visibleByDefault = {true}
            overflow = {true}
            debounce={0.05}>
            <tr key={i + 1} draggable={this.props.dragAndDrop && 'true'} onClick={(e) => this.checkAndCallFunction(e, this.props.onRowClick, tableDataListing[i])}
              onDragStart={(e) => { e.dataTransfer.setData('text/plain', null); this.checkAndCallFunction(e, this.props.dragAndDrop && this.props.dragAndDrop.onDragFunction, tableDataListing[i]) }}
            >
              {tableColumns}
            </tr>
          </LazyLoadComponent>
        )}
        {this.props.tableLazyLoadNotRequired && tableRows.push(
          <tr key={i + 1} draggable={this.props.dragAndDrop && 'true'} onClick={(e) => this.checkAndCallFunction(e, this.props.onRowClick, tableDataListing[i])}
            onDragStart={(e) => { e.dataTransfer.setData('text/plain', null); this.checkAndCallFunction(e, this.props.dragAndDrop && this.props.dragAndDrop.onDragFunction, tableDataListing[i]) }}
          >
            {tableColumns}
          </tr>
        )}
      }
    } else {
      tableRows = <tr><td colSpan={this.props.tableCustomData && this.props.tableCustomData.length} class="noPadding noDataAvailable">
        <CaptionInfo
          captionMessageInfo={this.props.captionMessageInfo}
          captionTitle={this.props.captionTitle}
          customClass={this.props.customClass}
        />
      </td>
      </tr>
    }
    if (this.props.totalDataRow && this.props.showTotalInBottom && (tableRows && tableRows.length>0)) {
      tableRows.push(<tr key={0} class={`${this.props.totalFinalRow ? this.props.totalFinalRow : ''}`}>{this.createTableTotalRow()}</tr>);
    }
    return tableRows;
  }

  createTableRowsFromObj() {
    let tableRows = []
    tableRows = tableCustomTd.createTableRowsFromDataObj(tableRows, this.props.tableDataObject, (data, group) => this.createTableRows(data, group), this.props.tableCustomData, this.props.captionMessageInfo, this.props.groupLabel)
    return tableRows;
  }

  cancel() {
    setTimeout(() => {
      this.setState({ editableRow: null })
    }, 100)
    { this.props.editableFormCancel && this.props.editableFormCancel() }
  }
  showSearchField(index, obj, rowData) {
    if (obj) {
      let customEvent = {}
      let optionsList = obj.isSearchInTable && obj.isSearchInTable.options && obj.isSearchInTable.options.list
      optionsList && optionsList.find((data, listIndex) => {
        if (rowData[obj.value] == data.label) {
          customEvent = data
        }
      })
      customEvent.which = 13
      customEvent.target = {}
      customEvent.target.value = rowData[obj.value]
      obj.isSearchInTable.functionToSearchData(customEvent, obj.value)
    }

    let selectedColumnValue = this.state.selectedColumnForSearch
    if(! (selectedColumnValue && selectedColumnValue.length>0 && selectedColumnValue.includes(index))){
      selectedColumnValue.push(index)
      if (this.props && this.props.dispatch) {
        this.props.dispatch({ type: 'TABLE_HEADING_DATA', payload: selectedColumnValue })
      }
    }
    this.setState({
      selectedColumnForSearch: selectedColumnValue
    }, () => {
      this.tableCustopScrollOpts()
    })

  }
  hideSearchFiels(indexNO) {
    let selectedColumnIndex = this.state.selectedColumnForSearch
    selectedColumnIndex.splice(selectedColumnIndex.indexOf(indexNO), 1);
    this.setState({
      selectedColumnForSearch: selectedColumnIndex
    }, () => {
      this.tableCustopScrollOpts()
    })
    if (this.props && this.props.dispatch) {
      this.props.dispatch({ type: 'TABLE_HEADING_DATA', payload: selectedColumnIndex })
    }
  }

  createSearch(listOfSearchedColumns, index, obj) {
    let searchBlock
    let objForSearch = obj && obj.isSearchInTable
    let objValue = ((obj && obj.isSearchInTable && obj.isSearchInTable.customKeyNameForApi) || (obj && obj.value))
    for (let searchItr = 0; searchItr < listOfSearchedColumns.length; searchItr++) {
      if (listOfSearchedColumns[searchItr] == index) {
        searchBlock = (<div class="fltrActionOpts">
          {obj && <SearchInTable
            completeObject={Object.assign({},obj)}
            selectedDate={objForSearch.selectedDate}
          />}
          <span onClick={(obj) => { objForSearch.clearSearchValue(objValue); this.hideSearchFiels(index) }} class="close" > X </span>
        </div>
        )
        return searchBlock
      }
    }
  }
  multiSelectOpts() {
    let selected
    let checkedMultiBox = this.state.checkedMultiBox
    let currentPage = this.props.paginationData && this.props.paginationData.currentPage
    let storeCurrentPage = this.state.storeCurrentPage || {}
    if (this.state.checkedMultiSelectBox && storeCurrentPage.hasOwnProperty(currentPage)) {
      delete storeCurrentPage[currentPage]
      this.props.unSelectAll()
      this.setState({
        checkedMultiSelectBox: false
      })
    } else {
      storeCurrentPage[currentPage] = currentPage
      this.props.selectAll()
      this.setState({
        checkedMultiSelectBox: true
      })
    }

    /*if(checkedMultiBox){
      this.props.selectAll()
      this.setState({
        checkedMultiSelectBox : true
      })
    }
    if(!checkedMultiBox){
      this.props.unSelectAll()
      this.setState({
        checkedMultiSelectBox : false
      })
    }*/
    this.setState({
      storeCurrentPage,
      checkedMultiBox: !checkedMultiBox,
    })
  }
//meargeColumn func name
  mergeColumnHeading(){

    let mergedHead = []
    let mergedColumns =  this.props.mergedColumnsData
    for (let hItr = 0; hItr < mergedColumns.length; hItr++) {
       mergedColumns[hItr].key && mergedHead.push(
          <th class={`test ${mergedColumns[hItr].styleClass} `} 
              colSpan={mergedColumns[hItr].colSpan || 0} key={hItr+mergedColumns[hItr].key} >
            <span> {mergedColumns[hItr].key} </span>
          </th>);
    }
    
     return mergedHead;
  }

  hideCallZeroVal(customRowTableHeading){
    const totalFinalData = this.props.totalDataRow || {};
    let hideCallZeroVal = false 
    if(this.props.totalDataRow && Object.keys(totalFinalData).length>0 && customRowTableHeading.removeCallZeroVal){
     hideCallZeroVal = totalFinalData[customRowTableHeading.value] ? false : true
    }
    return hideCallZeroVal
  }

  getHeading() {
    var heading = [];
    var headingStartFrom = 0
    if (this.props.changeStartColumn) {
      headingStartFrom = 1;
    }
    for (let itr = headingStartFrom; itr < this.props.tableCustomData.length; itr++) {
      let alignedValue;
      let sortingClass = '';

      if (this.props.tableCustomData[itr].styleClass) {
        alignedValue = this.props.tableCustomData[itr].styleClass;
      }
      if (this.props.tableCustomData[itr].sorting) {
        sortingClass = "upDown ";
        if (this.state.sortingInfo.key == this.props.tableCustomData[itr].value) {
          alignedValue += " sortedColumn"
          if (this.state.sortingInfo.state == 1)
            sortingClass += "activeUp";

          if (this.state.sortingInfo.state == -1)
            sortingClass += "activeDown";
        }

      }
      if (((this.props.tableCustomData[itr].key == 'Select') && this.props.selectAll && (!this.props.showHideHeaderCheck)) || (this.props.tableCustomData[itr].isSearchInTable)) {
        if ((this.props.tableCustomData[itr].key == 'Select') && this.props.selectAll) {
          this.props.tableCustomData[itr].key && heading.push(
            <th class={alignedValue + ' txtNotBreak ' + ' ' + (this.state.sortingInfo.key == this.props.tableCustomData[itr] ? this.state.activeClass : "") + '' + (this.state.showBoxToActions ? 'activeMode' : '')}
              colSpan={this.props.tableCustomData[itr].colSpan} key={itr}
            >
              <div class="multipleActions">
                <span onClick={() => { this.sortTable(itr, false, 1); this.clickTableHeading(this.props.tableCustomData[itr].value, itr) }} class={sortingClass}> {/*this.props.tableCustomData[itr].key*/} </span>

                {/*<label class="customCheckBox" title="Select"><input type="checkbox" name="action" value="on" /><span></span></label>*/}
                {/*<span class="arrow" ></span>*/}
                {this.state.checkedMultiSelectBox && <label class="customCheckBox" title="Select" onClick={() => this.multiSelectOpts()}><input type="checkbox" checked={true} name="action" value="on" /><span></span></label>}
                {!this.state.checkedMultiSelectBox && <label class="customCheckBox" title="Select" onClick={() => this.multiSelectOpts()}><input type="checkbox" checked={false} name="action" value="on" /><span></span></label>}
                {/*this.state.showBoxToActions && <ul>
                  <li onClick={()=>this.props.selectAll()}>Select All</li>
                  <li onClick={()=>this.props.unSelectAll()}>Unselect All</li>
                </ul>*/}
              </div>
            </th>)
        }
        if (this.props.tableCustomData[itr].isSearchInTable) {
          this.props.tableCustomData[itr].key && heading.push(
            <th class={alignedValue + ' ' + (this.state.sortingInfo.key == this.props.tableCustomData[itr] ? this.state.activeClass : "")}
              colSpan={this.props.tableCustomData[itr].colSpan} key={itr}
            >
              <span onClick={() => { this.sortTable(itr, false, 1); this.clickTableHeading(this.props.tableCustomData[itr].value, itr) }} class={sortingClass}> {this.props.tableCustomData[itr].key}
              </span>
              <span onClick={() => this.showSearchField(itr)} class="actionsIcon search" > search</span>

              {(this.state.selectedColumnForSearch && this.state.selectedColumnForSearch.length > 0) && this.createSearch(this.state.selectedColumnForSearch, itr, this.props.tableCustomData[itr])}

            </th>)
        }
      }
      // need to remove "this.props.selectAll" check from if condition when selectAll would be implemented in all the tables.
      else {
        if(!this.hideCallZeroVal(this.props.tableCustomData[itr])){
        this.props.tableCustomData[itr].key && heading.push(
          <th class={alignedValue + ' ' + (this.state.sortingInfo.key == this.props.tableCustomData[itr] ? this.state.activeClass : "")}
            colSpan={this.props.tableCustomData[itr].colSpan} key={itr}
          >
            <span onClick={() => { this.sortTable(itr, false, 1); this.clickTableHeading(this.props.tableCustomData[itr].value, itr) }} class={sortingClass}> {this.props.tableCustomData[itr].key} </span>
          </th>);
      }
    }
    }
    return heading;
  }

  getFooter() {
    let footer = [];
    for (let itr = 0; itr < this.props.tableCustomData.length; itr++) {
      footer.push(<td key={itr}>{this.props.footerData[this.props.tableCustomData[itr].value]}</td>)
    }
    return (<tfoot><tr>{footer}</tr></tfoot>);
  }
  // SortFunction for handling all kinds of sort
  sortFunction(sortingInfo, headingNumber = 0) {
    let tableData = this.state.tableData;
    let col = this.props.tableCustomData && this.props.tableCustomData[headingNumber] && this.props.tableCustomData[headingNumber].value;
    if (!(this.props.tableCustomData && this.props.tableCustomData[headingNumber] && this.props.tableCustomData[headingNumber].withoutSorting)) {
      tableData = tableData.sort(function (a, b) {
        if (a === null) return -sortingInfo.state;
        if (b === null) return sortingInfo.state;
        if (a[col] && b[col] && typeof a[col] == 'string' && typeof b[col] == 'string') {
          if (a[col].toLowerCase() > b[col].toLowerCase())
            return sortingInfo.state;
          return -sortingInfo.state;
        }
        if (a[col] > b[col])
          return sortingInfo.state;
        return -sortingInfo.state;
      })
    }
    if(this.props.dateSortingKey && this.props.feDateSorting && sortingInfo.key== this.props.dateSortingKey){
      let dateSortingKey = this.props.dateSortingKey
      tableData = tableData.sort(function (a, b) {
        if (new Date(a[dateSortingKey]) > new Date(b[dateSortingKey])) return sortingInfo.state;
        if (new Date(a[dateSortingKey]) < new Date(b[dateSortingKey])) return -sortingInfo.state;
        if (a[col] > b[col])
          return sortingInfo.state;
        return -sortingInfo.state;
      })
    }
    this.setState({ tableData: tableData, withoutPaginationSorting: false,updateTable: JSON.stringify(sortingInfo) });
  }


  sortTable(headingNumber, setSorting, lockPagination = 0) {
    if (this.props.tableCustomData[headingNumber].sorting) {
      let sortingInfo = this.state.sortingInfo || {};
      this.setState({ activeClass: 'active' })
      if ((this.state.columnNumber == headingNumber) && (!setSorting)) {
        if (sortingInfo.state != 1 && sortingInfo.key == this.props.tableCustomData[headingNumber].value) {
          sortingInfo.state = 1;
        }
        else if (sortingInfo.state == 1 && sortingInfo.key == this.props.tableCustomData[headingNumber].value) {
          sortingInfo.state = -1;
        }
        else if (this.props.tableCustomData[headingNumber].orderByAlpha && (sortingInfo.state != 1 && sortingInfo.key != this.props.tableCustomData[headingNumber].value)) {
          sortingInfo.state = 1;
        } else if (!this.props.tableCustomData[headingNumber].orderByAlpha && (sortingInfo.state == 1 && sortingInfo.key != this.props.tableCustomData[headingNumber].value)) {
          sortingInfo.state = -1;
        }
      } else {
        if (this.props.tableCustomData[headingNumber].orderByAlpha && (sortingInfo.state != 1 && sortingInfo.key != this.props.tableCustomData[headingNumber].value)) {
          sortingInfo.state = 1;
        } else if (!this.props.tableCustomData[headingNumber].orderByAlpha && (sortingInfo.state == 1 && sortingInfo.key != this.props.tableCustomData[headingNumber].value)) {
          sortingInfo.state = -1;
        }
      }

      let sortingInfoPagination = {
        orderBy: this.props.tableCustomData[headingNumber].value,
        orderByDesc: sortingInfo.state == 1 ? false : true,
      }

      sortingInfo.key = this.props.tableCustomData[headingNumber].value;
      this.setState({
        sortingInfo: sortingInfo,
        columnNumber: headingNumber,
        sortingInfoPagination: sortingInfoPagination
      });

      if ((this.props.paginationData && !this.props.isDefaultPagination && this.props.paginationData.setPagination && this.props.paginationData.currentPage != 1) || (this.props.paginationData && this.props.paginationData.setPagination && lockPagination == 1)) {

        /* if (!this.props.paginationData && lockPagination==1) {
           this.sortFunction(sortingInfo,headingNumber);
         }*/
        let param = {};
        param.offset = this.props.paginationData.currentPage || 1;
        param.orderBy = this.props.tableCustomData[headingNumber].value;
        param.orderByDesc = sortingInfo.state == -1 ? true : false;
        this.props.paginationData.setPagination(param);
        let sortingInfoPagination = {
          orderBy: param.orderBy,
          orderByDesc: param.orderByDesc
        }
        if(this.props.frontEndPagination){
          this.props.feSortingFun(sortingInfo, headingNumber);
        }

        this.setState({ sortingInfoPagination })

      } else {
        this.sortFunction(sortingInfo, headingNumber);
      }
    }
  }

  getRecordLength() {
    if (!this.state.tableData)
      return 0;
    return this.state.tableData.length || 0
  }
  customTableScrollFun() {
    let tableInfo = utilsMethods.CustomTableScroll(this.headScrollTable, this.mainScrollTable)
  }

  tableCustopScrollOpts() {
    let customOpts = utilsMethods.TableCustopScrollOptions(this.tHeadHeight && this.tHeadHeight.offsetHeight, this.tableWidth && this.tableWidth.offsetWidth)
    this.setState({
      customOpts: customOpts
    })
  }

  render(){
    const {customOpts} = this.state
    
    return(
  <>
    { this.props.singleTableOnScreen && this.props.tableLoader  && 
      <Loader 
        loaderType = 'tableLoader'
        loaderColumns = { this.props.tableCustomData&& this.props.tableCustomData.length }
        loaderRows = {this.props.pageSize}
        loaderPagination = { 5 }
      />}
      <div class="mainTableScrollArea" id='mainTableScrollArea' ref={(mainTableScrollArea) => {this.mainTableScrollArea = mainTableScrollArea}}>
        <div id="mainTableScroll"  class={`mainTableScroll showHead ${ (this.tableWidth && this.tableWidth.offsetHeight) >600 ? 'showContainerShadow' : 'showTableShadow' }`} onScroll = {() => this.customTableScrollFun()} ref = { (mainTable) => { this.mainScrollTable = mainTable }}>
        
        {((this.tableWidth && this.tableWidth.offsetWidth) > (this.mainScrollTable && this.mainScrollTable.offsetWidth)) && <div id="scrollTable" class="headerScroll mainTableScroll showHead " style = {{ top : ((customOpts && customOpts.headerTop) - (this.props.tableHeadScroll ? this.props.tableHeadScroll : 17)) + 'px' }} onScroll = {() => this.customTableScrollFun()} ref = { (headTable) => { this.headScrollTable = headTable }}>
          <div class="tableHeadScroll" style = {{ width : (customOpts && customOpts.mainTableWidth) + 'px' }}></div>
      </div>}
       <div class="table-cnt" >
                  <table class={this.props.tableClass}  cellPadding="0" cellSpacing="0" ref= {(tableWidth)=> {this.tableWidth = tableWidth}}  >
                   {this.props.tableCaption&&<caption>{this.props.tableCaption}</caption>}
                    <thead ref= {(tHeadHeight)=> {this.tHeadHeight = tHeadHeight}} class={((this.tableWidth && this.tableWidth.offsetWidth) > (this.mainScrollTable && this.mainScrollTable.offsetWidth)) && 'thBorderBtm activeScroll'} >
                      {this.props.mergedColumnsData && <tr class="mergeHeadingRow">{this.mergeColumnHeading()}</tr>}
                      <tr>{this.getHeading()}
                      </tr>
                    </thead>
                   <tbody ref= {(selectTBody)=> {this.selectTBody = selectTBody}} key = {this.props.updateTableOnSort?this.state.updateTable:undefined}>
                     {this.props.tableDataInObj ? this.createTableRowsFromObj() : this.createTableRows()}
                   </tbody>
                   {this.props.footerData&&this.getFooter()}
                 </table>
                 {!this.props.overLayNotRequired && this.state.showAction && <div class="custom-select-overlay showActions" onClick={()=>{this.checkAndCallTDclick('closeActions')}}></div>}
                 
               </div>
            {(this.props.paginationData&&(this.getRecordLength()>0))
                    &&<Pagination frontEndPagination = {this.props.frontEndPagination} paginationData={this.props.paginationData} sortingInfo={this.state.sortingInfoPagination} recordLength = {this.state.tableData&&this.getRecordLength()} showHidePaginationDropDown={this.props.showHidePaginationDropDown}/>}   
      </div>
      
      </div>
      </>
    )
  }
}


Table.defaultProps = { sortingInfo: {} }

const mapStateToProp =(state)=>{
  return{
    pageSize: state.user.theme && state.user.theme.pageSize,
    tableLoader: state.loader && state.loader.tableLoader,
    addViewActionType: state.user && state.user.addViewActionType, 
    maskDataFlag :  state.Login && state.Login.maskClientData
  }
}

export default connect(mapStateToProp)(Table);