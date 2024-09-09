import React from 'react';
import {connect} from 'react-redux'
import Table from 'app/uiCollection/shared/table/table'
import { PrecesionValueFormater, SelectAllRows ,UnselectAllRows} from 'app/utils/dataFormater'
import {getSearchFolioIdData} from 'app/actions/admin/searchFolioId'
import { deleteTxn, DeleteMultipleTxn } from 'app/actions/admin/searchSOA'
import Loader from 'app/uiCollection/shared/loaders'
import { LOADER_WIDTH } from 'app/constants/shared/commonConst'
import ToolTipBox from 'app/uiCollection/shared/soa/filterInTable'
import SearchFilter from "app/uiCollection/shared/customSelect/searchFilterCnt"
import * as aumRecoActionList from 'app/actions/admin/aumReconcilation'
import {TXN_TYPE_FILTER_PURCHASE } from 'app/constants/shared/commonConst'
import {ShowDateFormater} from 'app/utils/dataFormater'
import RequestSOA from 'app/uiCollection/shared/soa/requestSOA.jsx'
import {notificationMsg} from 'app/utils/actionsInTable'
import { REQUEST_SOA_TIME_PEROID } from 'app/constants/shared/commonConst'
import {IfaPreferencesData} from 'app/actions/admin/ifaInitialInfo'
import DatePickerWrap from 'app/uiCollection/shared/datePicker';
import moment from 'moment'
import { closePopupWithESCKey, removeESCKeyPopUpEvent } from 'app/utils/eventHandler'

export class SOAAdmin extends React.Component{
 constructor(props){
   super(props)

   var param = {}
   param.folioId = props.selectedAUMRowData.folioid;
   param.componentForLoader = {componentName:'aumReconcilation'}
   param.bid = props.bid
   props.dispatch(getSearchFolioIdData(param))
   let timePeroidList=[];
   let selectedFY={};
   this.state = { openToggle : false ,
                  selectedFilter : {}, tableFilterData: [], 
                  selectedRows : {},
                  listOfFolioId : [],
                  getParam: param,
                  selectedFY, timePeroidList
                }
    this.ref = React.createRef(null);
 }
 tableCustomDataFun(){
  let tableCustomData = []
  tableCustomData=[
    {key:'Select',value:'select', withoutSorting: true, metatitle: this.props.metatitle ? `${this.props.metatitle}SoaSelectInTable` : ''},
    {key:'Date',value:'date',isDateFlag:true},
    {key:'Nature',value:'nature',},
    {key:(<span class="txtNotBreak">Txn Type
					<ToolTipBox 
						isInvestor = {true} 
						openToggle = {this.state.openToggle}
						closeToolTip = {(showHide, event)=> this.closeToolTip(false, event)}
            filters = {this.props.filters}
            selectedFilterBox = { (selected) => this.selectedFilterBox(selected) }								
					/>
				</span>),value:'txnType', clickHead: true, styleClass:(this.state.openToggle == 2 ? 'activeMode' : '')},
    {key:'ARN No',value:'arnNo'},
    {key:(<span>Amount <span class="unit-symbol">( <span class="rupee"></span> )</span> </span>),value:'amount', precision: 2, styleClass:'right-align', isCommaSeparated: true},
    {key:(<span>NAV <span class="unit-symbol">( <span class="rupee"></span> )</span></span>),value:'nav', precision: 4, styleClass:'right-align', isCommaSeparated: true},
    {key:(<span> Units  </span>),value:'units', precision: 4, styleClass:'right-align'},
    {key:(<span> Balance Units </span>),value:'balUnits', styleClass:'right-align'},
    {key:(<span>Sequence No</span>),value:'seqNo', styleClass:'right-align'},
    {key:(<span>Transaction No</span>),value:'txnNo', styleClass:'right-align'},
    {key:(<span>Updated On </span>),value:'updatedAt',isDateFlag:true, styleClass:'right-align'},
    {key:'Download File',value:'', actionOption: true , styleClass:'right-align', buttonInfo: {labelName: '', buttonClassName: 'actionIcon downloadIcon'}, metatitle: this.props.metatitle ? `${this.props.metatitle}SoaDownloadInTable` : ''},
    {key:'Reprocess',value:'fileOperationid',styleClass:'right-align',buttonInfo: {labelName: '', buttonClassName: 'actionIcon reProcessIcon'}, metatitle: this.props.metatitle ? `${this.props.metatitle}SoaReprocessInTable` : ''},
    {key:'Actions',value:'actions', styleClass:'right-align', buttonInfo: {labelName: 'Delete', buttonClassName: 'buttonInTable'},metatitle: this.props.metatitle ? `${this.props.metatitle}SoaActionsInTable` : ''}
  ]
  
  this.setState({
    tableCustomData
  })
}

 componentWillUnmount(){
  removeESCKeyPopUpEvent(null, this.ref)
 }
 componentDidMount(){
  closePopupWithESCKey(this.props.closeData,true,this.ref)
    let param = {}
    param.bid = this.props.bid
    this.props.dispatch(IfaPreferencesData(param))
    this.tableCustomDataFun()
}
   UNSAFE_componentWillReceiveProps(newProps){
    if(this.props.adminReducer.deletingTxn&&newProps.adminReducer.deletedTxn){
        setTimeout(()=> {
          this.closeErrorMsg()
        }, 2000)
        this.setState({
          selectedFilter : {},
          tableFilterData: [],
          deletedSuccess : true,
          tableTxn : false,
          selectedRows : {}
        })
        var param = {}
        param.folioId = this.props.selectedAUMRowData.folioid;
        param.bid = this.props.bid
        param.componentForLoader = {componentName:'aumReconcilation'}
        this.props.dispatch(getSearchFolioIdData(param))
    }

    let tableData =[]
    tableData =newProps.soaFolioIdData &&  newProps.soaFolioIdData.data && newProps.soaFolioIdData.data.data

    if(!this.state.tableTxn && tableData){
         let txnTypeVal;
         for( var i=0; i<tableData.length; i++){
              txnTypeVal=TXN_TYPE_FILTER_PURCHASE.find(obj=>(obj.value==tableData[i].txnType ))
              txnTypeVal= (<span class={`${(txnTypeVal)?'greenColor':'redColor'}`}>{tableData[i].txnType}</span> )
              txnTypeVal = txnTypeVal ? txnTypeVal :tableData[i].txnType;
              if(tableData[i]){
                  tableData[i].txnTypeOrignal = tableData[i].txnType;
                  tableData[i].txnType = txnTypeVal;
            }

             let balUnitsPrecision = PrecesionValueFormater(tableData[i].balUnits,4)
             let balUnits
             if(tableData[i].balUnits){
                balUnits = (<span class={`${(balUnitsPrecision < 0)? 'redColor':''}`}>{balUnitsPrecision}</span>)
                balUnits = balUnits ? balUnits: balUnitsPrecision              
                balUnitsPrecision = balUnits
              }
                tableData[i].balUnits = balUnitsPrecision;
         } 
         this.setState({tableTxn:true})
    }

    if (newProps.aumReconcilationStore && newProps.aumReconcilationStore.notification) {
      //param.folioId = this.props.selectedAUMRowData.folioid;
      //param.componentForLoader = {componentName:'aumReconcilation'}
      if (this.state.getCall) {
        let param = this.state.getParam ? this.state.getParam : {}
        this.props.dispatch(getSearchFolioIdData(param))
        this.setState({
          getCall: false,
          selectedRows: {},
          selectedArn: {},
          listOfFolioId: {},
          tableTxn : false
        })
      }
      setTimeout(()=> {
        this.clearNotification()
      }, 3000)
      
    }
    
    this.setState({
      tableData
    })
    if(newProps.ifaPreferencesData!=this.props.ifaPreferencesData && newProps.ifaPreferencesData && newProps.ifaPreferencesData[0] ){
        let timePeroidList=[];
        let selectedFY={};
        
        timePeroidList=REQUEST_SOA_TIME_PEROID
        selectedFY=REQUEST_SOA_TIME_PEROID[0]
        
        this.setState({
          selectedFY, timePeroidList
        })
    }
   }
   clearNotification(){
        this.props.dispatch({type:'HIDE_NOTIFICATION', payload: null})
    }
   closeErrorMsg(){
     this.setState({
      deletedSuccess: false
     })
     this.props.dispatch({type: 'FAILED_DELETING_TXN', payload:null})
   }

 addButtonInTable(obj){
        let param = {};
        param.type = obj.type
        param.bid = this.props.bid
        param.txnid = obj.txnid
        param.deletionReason = obj.deletionReason||"duplicateTransactions"
        param.componentForLoader = {componentName : 'loaderDeletedTnxs'}
        this.props.dispatch(deleteTxn(param))
        this.props.dispatch({type:'GET_GO_BACK_CALL',payload:{action:true}})
        this.setState({
          selectedFilter : {},
          tableFilterData: []
        })
    }
    openFilterInHeading(param, index){
      index =2
        if (this.state.openToggle != index) {
          this.setState({
            openToggle: 2,
            openCustomizeBox:'openCustomizeBox'
          }, ()=> {
            this.tableCustomDataFun()
          })
        }
    }
    closeToolTip(){
        this.setState({
          openToggle: false,
          openCustomizeBox:''
        }, ()=>{
          this.tableCustomDataFun()
        })
    }
    selectedFilterBox(selected)
    {  
      let defaultTableData = this.props.soaFolioIdData &&  this.props.soaFolioIdData.data && this.props.soaFolioIdData.data.data
      let tableData = defaultTableData
      let selectedFilter = this.state.selectedFilter
      let tableFilterData = this.state.tableFilterData
      if(selectedFilter.hasOwnProperty(selected)){
        delete selectedFilter[selected]
        if(Object.values(selectedFilter).length>0){
          tableFilterData = tableFilterData.filter(obj=> (obj.txnType && obj.txnType.props && obj.txnType.props.children || obj.txnType) !== selected)
        }else{
          tableFilterData = []
        }
      }else{
        let filterData =[]
        filterData = defaultTableData.filter(obj=> {
          if((obj.txnType && obj.txnType.props && obj.txnType.props.children || obj.txnType) == selected){
            return ((obj.txnType && obj.txnType.props && obj.txnType.props.children) || obj.txnType) == selected
          }else{
              if(tableFilterData && tableFilterData.length>0){
                tableFilterData = tableFilterData
              }else{
                tableFilterData = []
              }
          }
        })
        tableFilterData = tableFilterData.concat(filterData)
        selectedFilter[selected] = [selected]
      }
      this.setState({
        selectedFilter,
        tableFilterData,
        tableData : Object.values(selectedFilter).length>0 ?  tableFilterData : tableData,
        selectedRows : {}
      })
    }
    selectBoxOptsFunction(tableData, customtableData){
      
        if(tableData &&  (customtableData && customtableData[0])){
            let aumRecoDataArr = []
            aumRecoDataArr = tableData
            for(let i = 0; i < aumRecoDataArr.length; i++){
                let isCheckBox = {}
                aumRecoDataArr[i][customtableData[0].value] = (<label class="customCheckBox" title="Select">
                <input type="checkbox" checked={isCheckBox[aumRecoDataArr[i].txnid]} name="actionCheck"
                    onClick={((myItr)=>()=> this.checkboxFncList(aumRecoDataArr[myItr]))(i) } />
                <span></span>
                 </label>)
            }
        }
    }

    selectAll(){
     
      for(let itr=0; itr<this.state.tableData.length; itr++){
          let txnTypeVal= TXN_TYPE_FILTER_PURCHASE.find((obj) => {
          if (obj.value==this.state.tableData[itr].txnTypeOrignal) {
             return true
           } 
         })
         txnTypeVal = txnTypeVal ? 'buy':'sell'
         setTimeout(()=>{
          this.affectedUnitsCal(Math.abs(this.state.tableData[itr].units), txnTypeVal )
        },100 )
        }

      let allRowsData = []
        allRowsData = SelectAllRows('txnid',this.state.tableData,'actionCheck','fullObj')
        this.setState({
            selectedRows: allRowsData.selectedRows,
            listOfFolioId: allRowsData.listOfSelectedIds,
            selectAllFlag:true,
            unSelectAllFlag:false,
            affectedUnits: null
        })

        
    }

    unSelectAll() {
      UnselectAllRows('actionCheck')
        this.setState({
            selectedRows: {},
            listOfFolioId: [],
            selectAllFlag:false,
            unSelectAllFlag:true,
            affectedUnits: null
        })        
    }  
    onOptionSelection(obj){
      this.setState({
        selectedArn: obj
      })
    }

    affectedUnitsCal(units,type){
      let ourUnitsCount = this.props.selectedAUMRowData.OurUnits
      let affectedUnits 
      if ( (this.state.affectedUnits) || (this.state.affectedUnits == 0) ) {
        affectedUnits = this.state.affectedUnits
      }else {
        affectedUnits = ourUnitsCount 
      }
      if (type=='buy') {
        affectedUnits = affectedUnits-units
      }else {
        affectedUnits = affectedUnits+units
      }
      
      this.setState({
        affectedUnits: affectedUnits
      })
    }

    checkboxFncList(currentObj){
        let selectedRows = this.state.selectedRows
        let listOfFolioId = this.state.listOfFolioId
        let txnTypeVal= TXN_TYPE_FILTER_PURCHASE.find((obj) => {
          if (obj.value==currentObj.txnTypeOrignal) {
            return true
          } 
        })
        
        if( selectedRows.hasOwnProperty(currentObj.txnid)){
            delete selectedRows[currentObj.txnid]
            delete listOfFolioId[currentObj.txnid]

            this.affectedUnitsCal(Math.abs(currentObj.units), txnTypeVal ? 'sell':'buy' )
        }else{
            selectedRows[currentObj.txnid] = currentObj
            listOfFolioId[currentObj.txnid] = currentObj
            this.affectedUnitsCal(Math.abs(currentObj.units), txnTypeVal ? 'buy':'sell' )
        }
        this.setState({
            selectedRows,
            listOfFolioId
        })
    }

    getTxnsList(){
      const array = Object.entries(this.state.listOfFolioId).map(([k, v]) => (v))
      let txnsList = []
      array.map((value)=>{
        let obj = {}
        obj.txnid = value.txnid
        obj.type = value.type
        txnsList.push(obj)
      })
      return txnsList
    }

    changeArn(){
      let param = {}
      param.arnid = this.state.selectedArn.arnid
      param.txns = this.getTxnsList()
      param.bid = this.props.bid
      param.folioid = this.props.selectedAUMRowData && this.props.selectedAUMRowData.folioid
      this.props.dispatch(aumRecoActionList.updateArnId(param))
      this.setState({
          getCall: true,
          selectedFilter : {},
          tableFilterData: []
      })
      this.props.dispatch({type:'GET_GO_BACK_CALL',payload:{action:true}})
    }

    selectUnselectAllOnScroll(){
        if(this.state.selectAllFlag){
            setTimeout(()=>{
                this.selectAll()
            },100)
        }
        if(this.state.unSelectAllFlag){
            this.unSelectAll()
        }
    }

    downloadXls(){
      let folioid = this.props.selectedAUMRowData && this.props.selectedAUMRowData.folioid
      window.open ( `/api/admin/downloadSOA_CSV?folioid=${folioid}&bid=${this.props.bid}` , '_blank' )
    }

    deleteSelectedTxns(){
        let param = {};


        param.txns = this.getTxnsList()
        param.folioid = this.props.selectedAUMRowData && this.props.selectedAUMRowData.folioid
        param.componentForLoader = {componentName : 'loaderDeletedTnxs'}
        param.bid = this.props.bid
        this.props.dispatch(DeleteMultipleTxn(param))
        this.props.dispatch({type:'GET_GO_BACK_CALL',payload:{action:true}})
        this.setState({
          selectedFilter : {},
          tableFilterData: []
        })
    }

    onFYSelection(obj){
      this.setState({
        selectedFY: obj
      })
    }

    onDateChange(date,type){
      this.setState({
        [type]: date
      })
    }

    requestSOA(){
      removeESCKeyPopUpEvent(null, this.ref)
        if( this.state.selectedFY && this.state.selectedFY.value == REQUEST_SOA_TIME_PEROID[3].value ){
            if(!(this.state.startDate&&this.state.endDate)){
              this.props.dispatch({ type:"SHOW_HIDE_NOTIFICATION", payload: { message: "Enter Both Start and End Date", status: -1 } })      
            }
            else{
              this.props.requestSOA(this.props.selectedAUMRowData.folioid)
            }
        }
        else{
          this.props.requestSOA(this.props.selectedAUMRowData.folioid)
        }
    }
     render(){
      window.onscroll = ()=>{
        this.selectUnselectAllOnScroll()
      }
      let showComponentLoader;
       if(this.props.soaFolioIdData &&  this.props.soaFolioIdData.data){
         var getFolioData = this.props.soaFolioIdData
       }

       /*if (getFolioData&&getFolioData.data&&getFolioData.data.data && this.state.tableCustomData) {
            this.addButtonInTable(getFolioData.data.data, this.state.tableCustomData)
        }
       */
        if (this.props.aumReconcilationStore && this.props.aumReconcilationStore.loaderSearchFolio && this.props.aumReconcilationStore.loaderSearchFolio.componentName == 'aumReconcilation') {
          showComponentLoader = true
        }if (this.props.adminReducer && this.props.adminReducer.loaderDeleteTxn && this.props.adminReducer.loaderDeleteTxn.componentName == 'loaderDeletedTnxs') {
          showComponentLoader = true
        }
        else {
          showComponentLoader = false
        }

        this.selectBoxOptsFunction( (this.state.tableData),this.state.tableCustomData)
        let loaderMessage= ''
        if(this.props.SOAJobStore &&this.props.SOAJobStore.loaderCamsCaptcha&& this.props.SOAJobStore.loaderCamsCaptcha.componentName){
          loaderMessage = 'We are fetching your details...'
        }

       return(
          <div>
            {((this.props.adminSoaDetails && this.props.adminReducer && this.props.adminReducer.errorMsg && (!this.props.aumReconcilationStore.msgFlag) ) || (this.props.adminSoaDetails && this.props.adminReducer && this.state.deletedSuccess && (!this.props.aumReconcilationStore.msgFlag)) ) 
              && <div class="showErrorMsg">
              <div class={`errorContents ${this.props.adminReducer.deletedTxn ? 'success':''}`}>
                {this.props.adminReducer.errorMsg && <span>{this.props.adminReducer.errorMsg}</span>}
                {this.props.adminReducer.deletedTxn && <span>Transaction Deleted Successfully</span>}
                <span class="closeError" onClick={()=>this.closeErrorMsg()} metatitle={this.props.metatitle ? `${this.props.metatitle}SoaTransactionDeletion` : ''}>X</span>
              </div>
            </div>}

          
            {( (this.props.showSOADetails && this.props.aumDeleteFoliosTxns && this.props.aumDeleteFoliosTxns.errorMsg)
             || ( this.props.showSOADetails && this.props.aumDeleteFoliosTxns  && this.props.deletedAllTxn  ) ) 
              && <div class="showErrorMsg">
              <div class={`errorContents ${this.props.deletedAllTxn ? 'success':''}`}>
                {this.props.aumDeleteFoliosTxns.errorMsg && <span>{this.props.aumDeleteFoliosTxns.errorMsg}</span>}
                {this.props.deletedAllTxn && <span>We have taken your request, It will be processed in sometime</span>}
                <span class="closeError" onClick={()=>this.props.closeDeleteMsg()} metatitle={this.props.metatitle ? `${this.props.metatitle}SoaDeleteAllTxn` : ''}>X</span>
              </div>
            </div>}

          
              {showComponentLoader && <div class="zIndexUpTwolevel">
            <Loader 
                    loaderType = 'line'
                    loaderWidth = { LOADER_WIDTH[2].width }
                    loaderHeight = { LOADER_WIDTH[2].height }
                />
                </div>}
          {getFolioData && <div class={"overFlowHidden minHeight overFlowNone filterBoxInTable " + this.props.overLayBg}>
         <div class={"optionListingArea posRelative tableEffect tableMinHeight " + this.props.tableActive}>
              {((this.props.SOAJobStore &&this.props.SOAJobStore.loaderCamsCaptcha&& this.props.SOAJobStore.loaderCamsCaptcha.componentName=='RequestSOA')  ||
                (this.props.SOAJobStore &&this.props.SOAJobStore.loaderDownloadKarvyTemp&& this.props.SOAJobStore.loaderDownloadKarvyTemp.componentName=='RequestSOA')
              )
                && <Loader 
                loaderType = 'line'
                loaderWidth = { LOADER_WIDTH[2].width }
                loaderHeight = { LOADER_WIDTH[2].height }
                loaderInnerPopupMessage = {loaderMessage}
                loaderCustomClass = 'zIndexMoreThanTiny'
              />}

           <div class="backTableContent"><span onClick={this.props.closeData} metatitle={this.props.metatitle ? `${this.props.metatitle}SoaGoBack` : ''}>Go Back</span></div>
         <div class="tableListing boxShadow tableShadowOff optionsTable forResponsive">
                     <div class="dataContainer">
                       <div class="tableTransparent">
                         <table cellPadding="0" cellSpacing="0" class="tableBox" >
                           
                           {(getFolioData.data.applicantName || getFolioData.data.folioNo) &&                              
                             <tr>
                               <td width="135" align="left" valign="top">Name <span class="right">:</span></td>
                               <td align="left" valign="top">{getFolioData.data.applicantName}</td>
                               <td width="135" align="left" valign="top">Folio No <span class="right">:</span></td>
                               <td align="left" valign="top">{getFolioData.data.folioNo}</td>
                             </tr>
                           }
                           {(getFolioData.data.schemeName) &&
                             <tr>
                                 <td align="left" valign="top">Scheme <span class="right">:</span></td>
                                   <td align="left" valign="top">{getFolioData.data.schemeName}</td>
                                   <td align="left" valign="top">&nbsp;</td>
                                   <td align="left" valign="top">&nbsp;</td>
                             </tr>
                           }
                           {(getFolioData.data.moh1) &&
                             <tr>
                                 <td align="left" valign="top">Mode<span class="right">:</span></td>
                                   <td align="left" valign="top">{getFolioData.data.moh1}</td> 
                                   <td align="left" valign="top">&nbsp;</td>
                                   <td align="left" valign="top">&nbsp;</td>
                             </tr>
                           }
                           {/*(getFolioData.data.bankName) &&
                             <tr>
                                 <td align="left" valign="top">Bank<span class="right">:</span></td>
                                   <td align="left" valign="top">{getFolioData.data.bankName}</td>
                                   <td align="left" valign="top">&nbsp;</td>
                                   <td align="left" valign="top">&nbsp;</td>
                             </tr>
                           */}

                           {(this.props.assessmentDate && this.props.selectedArn && this.props.selectedArn.arnNo) &&
                             <tr>
                                 <td align="left" valign="top">Reconcile Date<span class="right">:</span></td>
                                   <td align="left" valign="top">{this.props.assessmentDate}</td>
                                   <td align="left" valign="top">ARN No<span class="right">:</span></td>
                                   <td align="left" valign="top">{this.props.selectedArn && this.props.selectedArn.arnNo}</td>
                             </tr>
                           }
                           {(this.props.selectedAUMRowData) &&
                             <tr>
                                 <td align="left" valign="top">Freeze Date<span class="right">:</span></td>
                                   <td align="left" valign="top">{ShowDateFormater(this.props.selectedAUMRowData.freezeDate)}</td>
                                   <td align="left" valign="top">Freeze Units<span class="right">:</span></td>
                                   <td align="left" valign="top">{this.props.selectedAUMRowData.freezeUnits || 0}</td>
                             </tr>
                           }
                           
                         </table>


                         <table class="tableBox totalPrice" cellpadding="0" cellspacing="0" width="100%">
                         {(this.props.selectedAUMRowData) && <tr>
                                                        <td valign="middle" align="left">Units in AUM File : {PrecesionValueFormater(this.props.selectedAUMRowData.units,4)}  as on : {ShowDateFormater(this.props.assessDate)} </td>
                                                        <td valign="middle" align="left">Our Units : {PrecesionValueFormater(this.props.selectedAUMRowData.OurUnits,4)} </td>
                                                        <td valign="middle" align="left">UnitDiff : {PrecesionValueFormater(this.props.selectedAUMRowData.unitDiff,4)} (Our Units - Units in AUM File)</td>
                                                      </tr>}
                                                                                                   
                                                    </table>
                        
                          <div class="filterArea rollingReturnArea showLevel customBtmSec customSmall">
                            <div class="filter-section smallContainer zIndexUpToScroll">
                            {(Object.keys(this.state.selectedRows).length !=0) && <SearchFilter placeholder='Select ARN'
                              //title="Select ARN"
                              inputclass="input-group-field selector inputgrp" 
                              onOptionSelection={(obj)=> this.onOptionSelection(obj,'arnSelected') }
                              options={(this.props.getAllArnData ? this.props.getAllArnData : this.props.getArnData)}
                              showLoader = {this.state.arnInfoLoader }
                              labelName = "arnNo"
                              valueName = "arnid"
                              customTitle = "Select ARN"
                              metatitle = {this.props.metatitle ? `${this.props.metatitle}SoaSelectArn` : ''}
                            />}
                            <div class=" fr downloadOpts">
                                <button type="button" onClick = { () => this.downloadXls() } class="downloadXls" metatitle = {this.props.metatitle ? `${this.props.metatitle}SoaDownloadXls` : ''}>Download</button>
                            </div>
                            <div class="btnsContainer fr mNone pRight20">                        
                        <button  type="button" onClick={ () => this.requestSOA() } metatitle = {this.props.metatitle ? `${this.props.metatitle}SoaRequestSoaButton` : ''}>Request SOA</button>
                        {(Object.keys(this.state.selectedRows).length !=0) && (this.state.selectedArn && this.state.selectedArn.arnid) && <button type="button" onClick={ () => this.changeArn() } metatitle = {this.props.metatitle ? `${this.props.metatitle}SoaChangeArnButton` : ''}>Change ARN</button>}
                        {(Object.keys(this.state.selectedRows).length === 0 && this.state.selectedRows.constructor === Object) && <button type="button" onClick={ () => this.props.deleteFolioTxns() } metatitle = {this.props.metatitle ? `${this.props.metatitle}SoaDeleteFolioTxns` : ''}>Delete Folio Transactions</button>}
                        {(Object.keys(this.state.selectedRows).length !=0) && <button type="button" onClick={ () => this.deleteSelectedTxns() } metatitle = {this.props.metatitle ? `${this.props.metatitle}SoaDeleteSelectedTxns` : ''}>Delete Selected Transactions</button>}
                        
                          </div>
                          { this.state.selectedFY && this.state.selectedFY.value == REQUEST_SOA_TIME_PEROID[3].value && 
                            <div class="filter-section customCalendarBox fr">
                              <div class="filter-box calendar-box">
                                <i class="filter-icon calender left"></i>
                                <div class="custom-calendar">
                                    <DatePickerWrap 
                                        startDate={this.state.startDate}
                                        selectedDate={this.state.startDate}
                                        maxDate={moment()}
                                        onDateSelection ={(date) => this.onDateChange(date,'startDate')}
                                        metatitle = {this.props.metatitle ? `${this.props.metatitle}SoaStartDate` : ''}
                                   />
                                </div>
                                <span class="date-fltr">-</span>
                                <div class="custom-calendar">
                                    <DatePickerWrap 
                                        startDate={this.state.startDate}
                                        minDate={moment(this.state.startDate)}
                                        maxDate={moment()}
                                        selectedDate={this.state.endDate}
                                        onDateSelection={(date)=> this.onDateChange(date,'endDate')}
                                        metatitle = {this.props.metatitle ? `${this.props.metatitle}SoaEndDate` : ''}
                                    />
                                </div>
                              </div>
                            </div> 
                          }
                          <div class="selectOpts fr">
                            <div class="filter-section selectBox zIndexAuto">
                                <SearchFilter 
                                  placeholder={"Select"}
                                  customClass='right defaultDropDown showFrstChild'
                                  placeholderForInput = "Search...."
                                  inputclass="input-group-field selector inputgrp " 
                                  selectedOpt={this.state.selectedFY}
                                  onOptionSelection={(obj)=> this.onFYSelection(obj) }
                                  options = {this.state.timePeroidList}
                                  labelName = "label"
                                  labelValue = "value"
                                  metatitle = {this.props.metatitle ? `${this.props.metatitle}SoaFySelection` : ''}
                                />
                            </div>
                          </div>
                        
                        </div>
                        </div>
                     </div> 
                   {this.state.tableCustomData  && <Table tableClass="tableBox" tdSpanClass="txtLimit" 
                        tableCustomData={this.state.tableCustomData}  
                        tableData={ this.state.tableData}
                        sortDataDesc = {(param, index)=>this.openFilterInHeading(param, index)}
                        openCustomizeBox = {this.state.openCustomizeBox}
                        tableTDClick= {{'12':((obj) => this.props.downloadFileImport(obj)),
                                      '13':((obj) => this.props.reprocessFileImport(obj)),
                                      '14':((obj) => this.addButtonInTable(obj))}}
                        selectAll = {()=> this.selectAll()}
                        unSelectAll = {()=> this.unSelectAll()}
                        selectedRows = {this.state.selectedRows}
                        selectedUniqueKey = 'txnid'
                        tableHeaderNotFixed = {true}
                         /> 
                        }
                     </div>
                 </div>
                 </div>
              </div>}
               {this.props.SOAJobStore && this.props.SOAJobStore.isRequestSOA && <RequestSOA
                rta = { (this.props.selectedOpt && this.props.selectedOpt.code ? this.props.selectedOpt.code :  (this.props.selectedAUMRowData && this.props.selectedAUMRowData.rta) ) }
                selectedRow = {this.props.selectedAUMRowData}
                bid = {this.props.bid}
                selectedFY={this.state.selectedFY}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                addEvent = {()=>closePopupWithESCKey(this.props.closeData,true,this.ref)}
               />}
              {notificationMsg(this.props.SOAJobStore && this.props.SOAJobStore.notificationData,'SHOW_HIDE_NOTIFICATION',this.props)}
          
              {(Object.keys(this.state.selectedRows).length !=0) &&  <div class={`sentSuccessFully active `}>
                    Affected Units: {PrecesionValueFormater(this.state.affectedUnits,4)}
              </div>}

          </div>
           )
     }
   }

const mapStateToProp = (state) =>{
 return {
   soaFolioIdData: state.adminSearchReducers && state.adminSearchReducers.searchFolioIdData,
   adminReducer: state.adminSearchReducers && state.adminSearchReducers,
   aumReconcilationStore: state.adminSearchReducers,
   getArnData: state.adminFormsReducers.arnInfoData.data,
   //aumReconciliationStore: state.adminSearchReducers,
   SOAJobStore:state.SOAJob,
   ifaPreferencesData : state.adminFormsReducers.ifaPreferencesData,
 }
}
const mapDispatchToProp = (dispatch) => {
 return {dispatch:dispatch}
}

export default connect(mapStateToProp,mapDispatchToProp)(SOAAdmin);
