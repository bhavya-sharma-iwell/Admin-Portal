import React, { useEffect, useState } from 'react'
import Table from './table'

const TransmissionHistoryTable = (props) => {
    const [state, setState] = useState({
        paginationData: {},
        updatedTableData: []
    })

    useEffect(() => {
        let paginationData = {}
        const tableData = props.transmissionHistoryData
        if (tableData) {
            paginationData.currentPage = parseInt(tableData.currentPage);
            paginationData.noOfPage = parseInt(tableData.noOfPages);
            paginationData.totalNoRows = parseInt(tableData.totalNoOfRows);
            paginationData.pageSize = parseInt(tableData.pageSize);
            paginationData.setPagination = (offset) => props.paginationList(offset);
            const updatedTableData = tableData.data && tableData.data.map((obj) => {
                obj.delete =
                    <div class="actionOptsBox displayInlineBlock">
                        <span class="deleteOpts" onClick={() => props.deleteTransaction(obj)}></span>
                    </div>
                return obj
            })
            setState((prevState) => ({ ...prevState, paginationData, updatedTableData }))
        }
    }, [props.transmissionHistoryData,props.pageSize ])

    const tableCustomData = [
        { key: 'Created At', isDateAndTimeFlag:true, value: 'createdAt', sorting:true},
        { key: 'Created By', value: 'createdBy' },
        { key: 'From Folio / Scheme', value: 'fromFolioAndScheme',
            isSearchInTable: {
                functionToSearchData: (event, columnKey) => props.searchTableData(event, columnKey),
                clearSearchValue: (clearSearchFor) => props.clearSearchValue(clearSearchFor),
                searchType: "text",
                customKeyNameForApi: 'fromFolioLike'
            },
        },
        { key: 'To Folio / Scheme', value: 'toFolioAndScheme' ,
            isSearchInTable: {
                functionToSearchData: (event, columnKey) => props.searchTableData(event, columnKey),
                clearSearchValue: (clearSearchFor) => props.clearSearchValue(clearSearchFor),
                searchType: "text",
                customKeyNameForApi: 'toFolioLike'
            },
        },
        { key: 'Transfer Type', value: 'transferType' },
        { key: 'Units', value: 'units', sorting:true},
        { key: 'Transfer Date', isDateAndTimeFlag:true, value: 'transferDate', sorting:true},
        { key: 'Updated At', isDateAndTimeFlag:true, value: 'updatedAt', sorting:true },
        { key: 'Actions', value: 'delete', metatitle: props.metatitle ? `${props.metatitle}Delete` : ''}
    ]
  return (
      <div class=" tableListing midTableContainer tableOverEffect overFlowNone posRelative pTop20 ">
          <Table
              tableClass="tableBox"
              tdSpanClass="txtLimit"
              tableCustomData={tableCustomData}
              tableData={state.updatedTableData}
              paginationData={state.paginationData}
              setPagination={(currentPage) => props.paginationList(currentPage)}
              isDefaultPagination = {true}
              tableTDClick={{ '8':((obj) => props.deleteTransaction(obj)) }}
              singleTableOnScreen={true}
          />

      </div>
  )
}
export default TransmissionHistoryTable