import React from 'react'

import Table from './table'

export const ParseAndCreateTable = (props) =>{
	let tableData = Object.assign([],props.tableData);
	let tableCustomData = props.tableCustomData||[]
	let tempRow = tableData[0] && JSON.parse(tableData[0].data)

	for(let objKey in tempRow){
		if(tempRow.hasOwnProperty(objKey)&&(objKey!="data"))
      		tableCustomData.push({key:objKey,value:objKey})      		
	}
	
	tableData = tableData.map(obj=>{
		let tempObj = JSON.parse(obj.data)
		return Object.assign({},tempObj,obj)
	})

	return(
		<div>
			<Table tableClass="tableBox" tdSpanClass="txtLimit" 
	          tableCustomData={tableCustomData}  
	          tableData={tableData}
	          paginationData = {props.PaginationData}
	          tableTDClick={props.tableTDClick}
	          singleTableOnScreen = {props.singleTableOnScreen ? true : false}
	        />   
		</div>)
}
export default ParseAndCreateTable;