import React from 'react'
import CaptionInfo from '../alert/captionInfo'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import EditableColumnField from './tableEditableForm'
import {ConvertNullToString} from '../../utils/dataFormater'

export const CreateButtonIcon = (tdInfo, fullRowData) =>{

  let multipleButtonInfo = tdInfo && tdInfo.buttonInfo && tdInfo.buttonInfo.multipleButtonInfo || []
  let createMultipleIcons = []
  multipleButtonInfo.map( (obj) => {
      createMultipleIcons.push(
        <span class={`actions ${obj.buttonClassName} ${obj.labelIcons? obj.labelIcons :''}` } onClick={()=>{obj.onButtonClick(fullRowData)}}>{obj.labelName && obj.labelName}</span> 
      )
  } )

	return (
    tdInfo && tdInfo.buttonInfo && tdInfo.buttonInfo.multipleButtonInfo  ? 
    <div class="txtLinks noWrapWithChild">
      {createMultipleIcons}
    </div>  :
		<div class={`btnsContainer smlRoundBtns ${!tdInfo.buttonInfo.removeTxtLeft ? 'txtLeft' : ''}`}>
			{tdInfo && tdInfo.buttonInfo && tdInfo.buttonInfo.iconWithLabel &&  <span>{tdInfo.buttonInfo.iconWithLabel}</span> }
			<span class={tdInfo.buttonInfo.buttonClassName}>{tdInfo.buttonInfo.labelName &&tdInfo.buttonInfo.labelName}</span>
		</div>)
}

export let createTableRowsFromDataObj = (tableRows,tableDataObject,createTableRows,tableCustomData,captionMessageInfo,groupLabel) => {
     if(tableDataObject && Object.keys(tableDataObject).length > 0){
        let count = 1
        for(let key in tableDataObject){
        let childTableRows = createTableRows(tableDataObject[key],count)
            childTableRows.unshift(
              <tr class='groupHeading'>
                <th colSpan={tableCustomData && tableCustomData.length}>{groupLabel+count}</th>
              </tr>
            ) 
            tableRows = [...tableRows, childTableRows]
          count++
        }
      }
      else{
        tableRows = <tr><td colSpan = {tableCustomData && tableCustomData.length} class="noPadding">
                    <CaptionInfo
                      captionMessageInfo = { captionMessageInfo }
                    />
                  </td>
                </tr>
      }
    return tableRows;
}


export default CreateButtonIcon;

// For adding filters to table heading search on hover, ( added bassed on flag )
export const addFiltersToSearchHeading = (tableCustomData,tableDataListing,i , showSearchField,j,tdSpanClass)=>{
    if(tableCustomData.addFiltersToSearch){
        return <span class={`toolTipsIcon  ${tableCustomData && tableCustomData.isSearchInTable && tableCustomData.isSearchInTable.toolTipsClass}`} onClick={() =>showSearchField(j,tableCustomData,tableDataListing)} ></span>
    }
}

export const clipToCopyInTable = (tableCustomData,columnValue,showCopyToolTip,showHideCopyTip)=>{
    if(tableCustomData.clipToCopy){
        return  (<CopyToClipboard text={columnValue}>
                  <span onClick={()=>showCopyToolTip(columnValue)} class={`toolTipsIcon copyClipBox  ${showHideCopyTip ? 'copied' : ''} `} title="Copy">
                  </span>
                </CopyToClipboard>)
    }
}

export const CreateEditableColumnField = (tableCustomData,editableRow,i,editableColumn,j ,showHideEditTable,columnValue,onSubmit,cancel,selectedRow,inputRef)=>{
    let columnInfo = tableCustomData.editableData
    if(tableCustomData.editableData &&  (editableRow==i) && (editableColumn==j) && showHideEditTable ){
        return  (
            <EditableColumnField 
              type= {columnInfo.columnsConfig && columnInfo.columnsConfig.type}
              name= {columnInfo.columnsConfig && columnInfo.columnsConfig.name}
              placeholder = {columnValue || columnInfo.columnsConfig && columnInfo.columnsConfig.placeholder}
              title = {columnInfo.columnsConfig && columnInfo.columnsConfig.title}

              validator={columnInfo && columnInfo.validation && columnInfo.validation.validator}
              options = {columnInfo.options && columnInfo.options.list}
              labelName = {columnInfo.options &&columnInfo.options.labelName}
              labelValue = {columnInfo.options && columnInfo.options.labelValue}
              onClickAction = {columnInfo.columnsConfig && columnInfo.columnsConfig.onClickFun}
              onChange = {(e)=>{columnInfo.columnsConfig &&columnInfo.columnsConfig.onChange && columnInfo.columnsConfig.onChange(e)}}
              closeOnSelect = {columnInfo.columnsConfig && columnInfo.columnsConfig.closeOnSelect}
              onSubmit = {(e)=>onSubmit(e)}

              maxDate = {columnInfo.columnsConfig && columnInfo.columnsConfig.maxDate}
              selectedDate = {columnInfo.columnsConfig && columnInfo.columnsConfig.selectedDate}
              cancel = {()=> cancel()}
              selectedRow = {selectedRow }
              inputRef = { inputRef }
              isSearchEnable = {columnInfo && columnInfo.isSearchEnable}
            />
        )
    }
}

// Highlight fields with color based on conditions
export const conditionBasedClassFn = (obj,columnData,rowData) =>{
    let conditionalClass = ''
    switch(obj.conditionType){
      case 'multiple':
        obj.conditionsArray.find((childObj,index)=>{
          if(Object.keys(childObj)[0] == rowData[obj.conditionKey]){
              conditionalClass = Object.values(childObj)[0]
          }
        })
      break;
      case 'boolean':
        if(rowData[obj.conditionKey]){
          conditionalClass = Object.values(obj.conditionsArray[1])
        }else{
          conditionalClass = Object.values(obj.conditionsArray[0])
        }
      break;
      case 'positiveNegative':
        if(rowData[obj.conditionKey] >= 0){
          conditionalClass = Object.values(obj.conditionsArray[1])
        }else{
          conditionalClass = Object.values(obj.conditionsArray[0])
        }
      break;
    }
  return conditionalClass
}

// Icon Added based on conditions
export const conditionBasedIconFn = (obj, rowData) => {
  let conditionIcon = ''
  switch (obj.conditionType) {
    case 'multiple':
      obj.conditionsArray.forEach((childObj) => {
        const key = Object.keys(childObj)[0]
        if (key === rowData[obj.conditionKey]) {
          conditionIcon = Object.values(childObj)[0]
        }
      })
      break
    case 'boolean':
    case 'positiveNegative':
      const conditionIndex = obj.conditionType === 'boolean' ? (rowData[obj.conditionKey] ? 1 : 0) : (rowData[obj.conditionKey] >= 0 ? 1 : 0)
      conditionIcon = Object.values(obj.conditionsArray[conditionIndex])
      break
  }
  return conditionIcon
}

// Mapping the value to be shown on FE based on constants

export const mapLabelFromValue = (columnData,rowData) =>{
    let labelName = rowData[columnData.value]
    if((columnData && columnData.nullValue) && labelName == null){
      labelName = ConvertNullToString()
    }
    columnData.mapLabelValueInfo.mapLabelValueArray.find((childObj,index)=>{
      if(childObj.value == rowData[columnData.value]){
          labelName = childObj.label
      }
    })
  return labelName
}

export const mapBgcolorFromValue=(columnData,rowData)=>{
  let bgColor = rowData[columnData.cellValue]
  columnData.mapBgcolorArray.find((childObj)=>{
    if(childObj.value == bgColor){
        bgColor = childObj.bgcolor
    }
  })
return bgColor
}