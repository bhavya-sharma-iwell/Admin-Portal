import React from 'react'

export const TableLoader = props => {
    let loaderRows = props.loaderRows ? props.loaderRows : 10;
    let loaderColumns = props.loaderColumns ? props.loaderColumns : 5;

    const totalColumnFunction = () => {
        let totalColumn = []
        for(let i =0 ; i<loaderColumns; i++) {
            totalColumn.push(<td key={i+1}><span class = 'txtLimit'>Contents</span></td> )
        }
        return totalColumn;
    }
   const totalRowsFunction = () => {
       let totalRows = []
    for(let i = 0 ; i< loaderRows; i++)
    {
        totalRows.push(<tr key={i+1}>{totalColumnFunction()}</tr>)
    }
    return totalRows;
   }
   const paginationFunction = () => {
       let pagination = []
       for( let i =1; i < props.loaderPagination + 1 ; i++ ){
        pagination.push( <li key={i+1}> {i} </li> );
       }
       return pagination;
   }

    return(
        <div class = "contentLoader">
            <table class = "tableBox"  cellPadding = '0' cellSpacing = '0' >
                <thead>
                    <tr>
                        { totalColumnFunction() }
                    </tr>
                </thead>
                <tbody>
                    { totalRowsFunction() }
                </tbody>
            </table>
            {props.loaderPagination && <div class="paginationArea">
                <span class="numberOfRows">1 rows visible out of { props.loaderPagination }</span>
                <div class="pagination rightSide">
                    <ul>
                       { paginationFunction() }
                    </ul>
                </div>
                <div class="cl"></div>
            </div>}
        </div>
    )
}
export default TableLoader;