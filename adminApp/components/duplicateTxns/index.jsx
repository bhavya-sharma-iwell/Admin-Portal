import React from 'react';
import {connect} from 'react-redux'
import Table from 'app/uiCollection/shared/table/table'
import { NumberFormater, PrecesionValueFormater } from 'app/utils/dataFormater'
import {DateFormater} from 'app/utils/dataFormater'
import {getSearchFolioIdData} from 'app/actions/admin/searchFolioId'
import { deleteTxn } from 'app/actions/admin/searchSOA'
import Loader from 'app/uiCollection/shared/loaders'
import { LOADER_WIDTH } from 'app/constants/shared/commonConst'
import {DuplicateTxnsData} from 'app/actions/admin/duplicateTxns'
import {TRANSACTION_TYPES} from 'app/constants/admin/adminDashboardConst'


export class DuplicateTxns extends React.Component{
 constructor(props){
   super(props)
   this.state = {} 
 } 

 componentDidMount(){
  let tableCustomData = []
  let tableData = []
  let param = {}
    
   tableCustomData = [
    {key:'Select',value:'', withoutSorting:true},
    {key:'Types',value:'txnType'},
    {key:'Sequence No', value:'seqNo'},
    {key: 'Karvy PTR' , value:'karvyPTxnNo', nullValue : true},
    {key:'Tran No',value:'txnNo'},
    {key:'File Name',value:'fileName'},
    {key:'File Date',value:'nav', isDateFlag:true},
    {key:'NAV-Date',value:'navDate',isDateFlag:true}
   ]
   
  this.setState({ 
    tableCustomData
  })

let txnType = TRANSACTION_TYPES.find(obj => (obj.label == this.props.selectedRowData.txnType));
txnType = txnType?txnType.value: this.props.selectedRowData.txnType ; 

 
  param.folioid = this.props.selectedRowData.folioid
  param.amount = this.props.selectedRowData.amount
  param.navDate = DateFormater(this.props.selectedRowData.navDate)
  param.type = this.props.selectedRowData.type
  param.units = this.props.selectedRowData.units
  param.nav = this.props.selectedRowData.nav
  param.bid = this.props.bid
  this.props.dispatch(DuplicateTxnsData(param))
 }
 
 componentWillUnmount(){
   this.props.closeData();
 }
   closeErrorMsg(){
     this.setState({
      deletedSuccess: false
     })
     this.props.dispatch({type: 'FAILED_DELETING_TXN', payload:null})
   }
  selectBoxOptsFunction(tableData, customtableData){
    if(tableData &&  customtableData){
        let customDataArr = []
        customDataArr = tableData
        for(let i = 0; i < customDataArr.length; i++){
            let isCheckBox = {}
            customDataArr[i][customtableData[0].value] = (<label class="customCheckBox" title="Select">
            <input type="checkbox" checked={isCheckBox[customDataArr[i].txnid]} name="action"
                onClick={((myItr)=>()=> this.props.checkboxFncList(customDataArr[myItr]))(i) } />
            <span></span>
             </label>)
        }
    }
  } 


    render(){
      if(this.props.selectedRowData && this.props.showDuplicateDetails)
        this.selectBoxOptsFunction( (this.props.duplicateTxnsStore && this.props.duplicateTxnsStore.duplicateFolioData && this.props.duplicateTxnsStore.duplicateFolioData.data) , this.state.tableCustomData)
      
      if (this.props.duplicateTxnsStore && this.props.duplicateTxnsStore.duplicateFolioData && this.props.duplicateTxnsStore.duplicateFolioData.data) {
      let txnType;
       for(var i=0; i <  this.props.duplicateTxnsStore.duplicateFolioData.data.length; i++){
        txnType = TRANSACTION_TYPES.find(obj => (obj.value ==  this.props.duplicateTxnsStore.duplicateFolioData.data[i].txnType));
         txnType = txnType?txnType.label:  this.props.duplicateTxnsStore.duplicateFolioData.data[i].txnType ;        
         this.props.duplicateTxnsStore.duplicateFolioData.data[i].txnType = txnType;
      }
    }

      return(
          <div class="posRelative">


          {this.props.loaderDeleteTxn && this.props.loaderDeleteTxn.componentName == 'duplicateFolioTxns' 
           &&
            <Loader 
                    loaderType = 'line'
                    loaderWidth = { LOADER_WIDTH[2].width }
                    loaderHeight = { LOADER_WIDTH[2].height }
                />}
          {this.props.showDuplicateDetails && <div class={"overFlowHidden " + this.props.overLayBg}>
         <div class={"optionListingArea tableEffect tableMinHeigh " + this.props.tableActive}>
           <div class="backTableContent"><span onClick={this.props.closeData}>Go Back</span></div>
         <div class="tableListing boxShadow tableShadowOff optionsTable">
                     <div class="dataContainer">
                       <div class="tableTransparent">
                       {(this.props.selectedRowData) && <table cellPadding="0" cellSpacing="0" class="tableBox" >
                           
                           {(this.props.selectedRowData.folioid || this.props.selectedRowData.units) &&                              
                             <tr>
                               <td width="135" align="left" valign="top">Folio ID <span class="right">:</span></td>
                               <td align="left" valign="top">{this.props.selectedRowData.folioid}</td>
                               <td width="135" align="left" valign="top">Units <span class="right">:</span></td>
                               <td align="left" valign="top">{this.props.selectedRowData.units}</td>
                             </tr>
                           }
                           {( this.props.selectedRowData.amount || this.props.selectedRowData.nav) &&
                             <tr>
                                 <td align="left" valign="top">Amount <span class="right">:</span></td>
                                 <td align="left" valign="top">{this.props.selectedRowData.amount}</td>
                                 <td align="left" valign="top">NAV<span class="right">:</span></td>
                                 <td align="left" valign="top">{this.props.selectedRowData.nav}</td>
                             </tr>
                           }
                          
                           
                         </table>}
                     </div> 
                    {this.state.tableCustomData && this.props.duplicateTxnsStore && this.props.duplicateTxnsStore.duplicateFolioData && <Table tableClass="tableBox" tdSpanClass="txtLimit" 
                        tableCustomData={this.state.tableCustomData}  
                        tableData={ this.props.duplicateTxnsStore.duplicateFolioData.data}
                          /> }     
                     </div>
                     {this.props.deleteFolioTxns && <div class="btnsContainer  pRight20 pBottom txtRight">
                          <button type="button" onClick={ () => this.props.deleteFolioTxns() } class={`${Object.values(this.props.listOfFolioId).length !=0 ? '' : 'removeDisabled'}`} >Delete Txns</button>
                          <button type="button" onClick={ () => this.props.cancelFolioTxns() }>Cancel</button>
                        </div>}
                 </div>
                 </div>
              </div>}
          </div>
           )
     }
   }

const mapStateToProp = (state) =>{
 return {
  duplicateTxnsStore : state.adminFormsReducers
 }
}
const mapDispatchToProp = (dispatch) => {
 return {dispatch:dispatch}
}

export default connect(mapStateToProp,mapDispatchToProp)(DuplicateTxns);
