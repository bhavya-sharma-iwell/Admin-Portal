import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {LEFT_SIDEBAR_TAB_PANEL_LABEL} from '../../constants'
import {deleteTxn,getSearchFolioIdData,getSearchSoaData,unFreezeFolios, TouchFolios, freezeFolios, deleteReversals} from './searchSoaSlice'
import Table from '../../components/table/table';
import FiltersStripSOA from './filtersStrip'
import { NumberFormater, PrecesionValueFormater, DateFormater,SelectAllRows } from '../../utils/dataFormater'
import {TRUE_FALSE_COMMON,UTIL} from '../../constants'
import {SOA_LIST} from '../../constants/adminDashboardConst'
import Loader from '../../components/loaders'
import ConfirmPopup from '../../components/guidePopup/confirmPopup'
import DatePickerWrap from '../../components/datePicker'
import moment from 'moment'
class SearchSoa extends Component{
    constructor(props){
        super(props);

        this.state= {tableCustomData:[], selectedOpt:SOA_LIST[0], filter:{}, folioNumber:true, showBackButton:false,
        selectedRows:{},
        selectedUniqueKey:'folioid',
        listOfFolioId: {},freezeDateFolio: moment(),
        apiCall: true,isBrokerSelected:false,

    }
        props.dispatch({type:'SET_SELECTED_TAB_HEADER',payload:{parentTab:LEFT_SIDEBAR_TAB_PANEL_LABEL.searchsoa}})
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        let tableData = {}
        if(this.state.folioNumber && (this.state.selectedOpt.value == 1)){
            let tableCustomData = [];
            tableCustomData = [{key:'Select',value:'',metatitle:'adminSearchSoaSelectInTable'},{key:'Scheme Name',value:'schemeName'},
            {key:'Folio No',value:'folioNo'},
            {key:'Freeze Date',value:'freezeDate',isDateFlag: true},
            {key:'Folio ID ',value:'folioid', styleClass:'linkInTable', metatitle:'adminSearchSoaFolioIdInTable'},
            {key:'BID',value:'bid'},
            {key:'Domain',value:'domain'},
            ]
            tableData = newProps.soaFolioNumData && newProps.soaFolioNumData.data
            this.setState({
                tableCustomData,
                tableData,
                tableCustomColsLoader :  tableCustomData
            })
        }
        if(this.state.folioData && newProps.soaFolioNumData && newProps.soaFolioNumData.apiStatus == 0){
            this.setState({
                folioData:false,
                showBackButton:false,
                selectedRows:{},
                listOfFolioId: {},
            })


        }
        if(!this.state.folioNumber || (this.state.selectedOpt.value == 2)){
            let tableCustomDataInner = [];
            tableCustomDataInner = [{key:'Date',value:'date', isDateFlag: true},
            {key:'Nature',value:'nature'},
            {key:'Transaction Type',value:'txnType'},
            {key:'ARN-No',value:'arnNo'},
            {key:'Amount',value:'amount', precision:2, isCommaSeparated: true},
            {key:'NAV',value:'nav', precision:4},
            {key:'Units',value:'units', precision:4},
            {key:'Balance',value:'balUnits', precision:4, isCommaSeparated: true},
            {key:'Transaction id',value:'txnid'},
            {key:'Checksum',value:'checksum'},
            {key:'Remarks',value:'remarks'},
            {key:'Create Date',value:'createdAt', isDateAndTimeFlag : true},
            {key:'File Name',value:'fileOperationid'},
            {key:'BID',value:'bid'},
            {key:'Domain',value:'domain'},
            {key:'Actions',value:'actions', styleClass:'right-align', buttonInfo: {labelName: 'Delete', buttonClassName: 'buttonInTable'}, metatitle:'adminSearchSoaTableDeleteButton'}
            ]
            let tableDataInner =  newProps.soaFolioIdData&& newProps.soaFolioIdData.data&&newProps.soaFolioIdData.data.data
            this.setState({
                tableCustomDataInner,
                tableDataInner,
                //showBackButton: true,
                tableCustomColsLoader : tableCustomDataInner,
                folioData: true,
                showBackButton: true
            })
        }

        if(newProps.notificationData){
            let param = {};
            param = this.state.filter;
            setTimeout(() => {
                this.clearNotification()
            }, 1000)
            if (!newProps.notificationError) {
                if (this.state.apiCall) {
                    this.setState({ apiCall: false })
                    param.bid = this.state.bid;
            this.props.dispatch(getSearchSoaData(param));
                }
                this.setState({
                    selectedRows: {},
                    listOfFolioId: {}
                })
            }
        }
        //Updating Table Data as per deleteTransaction Api Response
        if(this.state.deletedApicall && newProps.searchSoaStore && newProps.searchSoaStore.deletedTxn){
            let param = {}
            param.bid = this.state.bid;
            param.folioId = this.state.filter && this.state.filter.folioId;
            param.componentForLoader = {componentName:'aumReconcilation'}
            this.props.dispatch(getSearchFolioIdData(param))
            this.setState({
              deletedApicall:false
            })
        }
    }
    clickOnSearchFilter(event){
        let folioNumber = false
        let param = {};
        param = this.state.filter;
        param.bid = this.state.bid;
        param.componentForLoader = {componentName:'searchSoa'}
        if(this.state.selectedOpt.value == 1){
            folioNumber = true
            param.folio = event && event.target && event.target.value || ' '
            this.props.dispatch(getSearchSoaData(param));

        }else if(this.state.selectedOpt.value == 2){
            folioNumber = false
            param.folioId = event && event.target && event.target.value || null
            this.props.dispatch(getSearchFolioIdData(param));
        }
        this.setState({
            folioNumber,
            filter: param,
            selectedRows:{},
            listOfFolioId: {},
            folioData: false
        })
    }
    onOptionSelection(obj,fldName){
        if(fldName == 'brokerSelected'){
           this.setState({ 
            isBrokerSelected:false,
            bid:obj.bid
        },()=>{
            this.setState({
                isBrokerSelected:true,
            })
        })
        }
        else{
        this.setState({ 
            selectedOpt: obj,
            folioNumber : true,
        })
    	}
        this.setState({
            filter:{},
            folioData : false,
            tableDataInner : null,
            tableData : null,

        },()=>{
            this.setState({
                showBackButton : false,
            })
        })
        this.props.dispatch({type:"GOT_FOLIO_NUMBER_DATA", payload:null})
        this.props.dispatch({type:"GOT_FOLIO_ID_DATA", payload:null})

    }
    folioIdData(obj){

        let param = {};
        param.folioId = obj.folioid
        param.bid = this.state.bid;
        param.componentForLoader = {componentName:'searchSoa'}
        this.props.dispatch(getSearchFolioIdData(param));
        this.setState({
            filter: param,
            folioNumber : false,
            //selectedOpt : {label:'', value:2},
            folioData : true,
            showBackButton: true,
        })
    }
    goback(){
        this.setState({
            folioNumber : true,
            showBackButton: false,
            folioData:false
        })
    }

    selectBoxOptsFunction(tableData, customtableData){
        if(tableData &&  (customtableData && customtableData[0])){
            let folioDataArr = []
            folioDataArr = tableData
            for(let i = 0; i < folioDataArr.length; i++){
                let rowData = folioDataArr[i]
                folioDataArr[i][customtableData[0].value] = (<label class="customCheckBox" title="Select">
                <input type="checkbox" checked={this.state.selectedRows.hasOwnProperty(folioDataArr[i][this.state.selectedUniqueKey])} name="action"
                    onClick={((myItr)=>()=> this.checkboxFncList(rowData))(i) } />
                <span></span>
                 </label>)
            }
        }
    }

    checkboxFncList(obj){
        let selectedUniqueKey = this.state.selectedUniqueKey
        let selectedRows = this.state.selectedRows
        let listOfFolioId = this.state.listOfFolioId
        if(obj && selectedRows.hasOwnProperty(obj[selectedUniqueKey])){
            delete selectedRows[obj[selectedUniqueKey]]
            delete listOfFolioId[obj[selectedUniqueKey]]
        }
        else{
            selectedRows[obj[selectedUniqueKey]] = obj
            listOfFolioId[obj[selectedUniqueKey]] = obj[selectedUniqueKey]
        }
        this.setState({
            selectedRows,
            listOfFolioId
        })

    }
    selectAll(){
        let selectedUniqueKey = this.state.selectedUniqueKey
        let tableData = this.state.tableData
       let allRowsData = SelectAllRows(selectedUniqueKey, tableData)
       let listOfSelectedIds = Object.assign(allRowsData.listOfSelectedIds, {})
       let customListId = {}
       tableData.map(obj => {
        if(obj.folioid && listOfSelectedIds.hasOwnProperty(obj.folioid) ){
            customListId[obj.folioid] = obj.folioid
        }
        return customListId
       })
        this.setState({
            selectedRows: allRowsData.selectedRows,
            listOfFolioId: customListId,
        })
    }

    unSelectAll() {
        this.setState({
            selectedRows: {},
            listOfFolioId: {},
        })
    }

    tableFiltersAction(fldName){
        let param = {}
        let apiCall
        param.folioids =  (Object.values(this.state.listOfFolioId))
        param.bid = this.state.bid
        param.componentForLoader = {componentName : 'unFreezeFolio'}
        switch (fldName) {
            case 'unFreeze':
                apiCall = true
                this.props.dispatch(unFreezeFolios(param))
            break;
            case 'freeze':
                apiCall = true
                param.freezeDate = DateFormater(this.state.freezeDateFolio)
                this.setState({freezeDateFolio:moment()})
                this.props.dispatch(freezeFolios(param))
            break;
            case 'touchFolios':
                apiCall = false
                param.uid = this.props.user && this.props.user.uid
                this.props.dispatch(TouchFolios(param))
            break;
            case 'deleteReversals':
                this.props.dispatch(deleteReversals(param))
            break
        }
        this.setState({apiCall})
    }

    clearNotification(){
        this.props.dispatch({type:"FOLIOS_UNFREEZE_SUCCESFULLY", payload: null})
        this.props.dispatch({type:"FOLIOS_UNFREEZE_FAILED", payload: null})
        this.props.dispatch({type:"FAILED_DELETING_TXN", payload: null})
        this.props.dispatch({type:"DELETED_TXN_SUCCESSFULLY", payload: null})
    }
    //deleteTransaction Function
    deleteTxn(deletedTxnData){
        this.setState({
            deletedTxnData,
            showAlert:true
        })
    }
    sureApply(paramVal){
        this.setState({
            showAlert: false,
            deletedTxnData:{}
        })
        switch (paramVal) {
            case 'yes':
            //Delete Transaction Api call
            let param = {};
            let deletedTxnData = this.state.deletedTxnData || {}
            if(deletedTxnData && Object.values(deletedTxnData).length > 0){
                param.type = deletedTxnData.type
                param.txnid = deletedTxnData.txnid
                param.deletionReason = deletedTxnData.deletionReason || "duplicateTransactions"
            }
            param.componentForLoader = {componentName : 'loaderDeletedTnxs'}
            param.bid = this.state.bid
            this.props.dispatch(deleteTxn(param))
            this.setState({
                deletedApicall:true,
                })
            break;
        }
    }

    onDateChange(date){
        this.setState({freezeDateFolio:moment(date)})
    }
    removeSearchField(){
        this.setState({
            bid: null,
            selectedBroker : null,
        })
        this.props.dispatch({type: 'GOT_BROKER_LIST_DATA', payload: null})
      }
      

    componentWillUnmount(){
        this.props.dispatch({type:"GOT_FOLIO_NUMBER_DATA", payload: null})
        this.props.dispatch({type:"FOLIOS_UNFREEZE_SUCCESFULLY", payload: null})

    }

    render(){
        let folioDetails = this.props.soaFolioIdData&& this.props.soaFolioIdData.data
        this.selectBoxOptsFunction(this.state.tableData, this.state.tableCustomData)

        return(
            <Fragment>
                <FiltersStripSOA
                    selectedOpt={this.state.selectedOpt}
                    clickOnSearchFilter= {(e)=> this.clickOnSearchFilter(e)}
                    removeSearchField= {(e)=> this.removeSearchField(e)}
                    onOptionSelection = {(obj,fldName)=> this.onOptionSelection(obj,fldName)}
                    filter = {this.state.filter}
                    isBrokerSelected = {this.state.isBrokerSelected}
                    folioNumber = {this.state.folioNumber}
                />
                <div class='posRelative'>

                {this.state.showBackButton &&
                    <div class="gotoBtns mBottom">
                        <a href="javascript:void(0);" onClick={()=> this.goback()} metatitle = 'adminSearchSoaGoBackButton' >Back</a>
                    </div>}
                    {(this.state.tableData) &&
                    <div class="filter-section buttonWithAuto mBtm20">
                    <div class={`btnsContainer mdlSizeBtns ${Object.values(this.state.selectedRows).length ? '':'removeDisabled'}`}>
                        <button type="button" class="fr" onClick={ () => this.tableFiltersAction('touchFolios') } metatitle = 'adminSearchSoaTouchFolioButton'>Touch Folios</button>
                        <button type="button" class="fr" onClick={ () => this.tableFiltersAction('unFreeze') } metatitle = 'adminSearchSoaUnfreezeButton'>Unfreeze</button>
                        <div class="filterBoxWithBtns fr noMargin">
                            <div class="filter-box calendar-box calendarBoxSingle calendarResize fl">
                                <i class="filter-icon calender left"></i>
                                <div class="custom-calendar">
                                    <DatePickerWrap
                                        peekNextMonth = {true}
                                        showMonthDropdown = {true}
                                        showYearDropdown = {true}
                                        selectStart = {true}
                                        selectedDate={this.state.freezeDateFolio}
                                        maxDate={moment()}
                                        onDateSelection ={(date) => this.onDateChange(date)}
                                        metatitle={'adminSearchSoaDate'}
                                    />
                                </div>
                         </div>
                        <div class="btnsContainer mdlSizeBtns">
                            <button type="button" onClick={ () => this.tableFiltersAction('freeze')} metatitle = 'adminSearchSoaFreezeButton'>Freeze</button>
                        </div>
                        </div>
                        <button type="button" onClick={() => this.tableFiltersAction('deleteReversals')} class='fr' metatitle = 'adminSearchSoaDeleteButton'>Delete Reversals</button>
                    </div>
                  </div>}

                {this.state.showBackButton && folioDetails && this.state.folioData && <div class="tableTransparent tableShadowOff">
                    <table cellPadding="0" cellSpacing="0" class="tableBox">
                        <tr>
                            <td width="135"> Name <span class="right">:</span></td>
                            <td>{folioDetails.applicantName}</td>
                            <td width="135">Folio <span class="right">:</span></td>
                            <td>{folioDetails.folioNo}</td>
                        </tr>
                        <tr>
                            <td>Scheme<span class="right">:</span></td>
                            <td>{folioDetails.schemeName}</td>
                            <td>Bank<span class="right">:</span></td>
                            <td>{folioDetails.bankName} {folioDetails.accountNo ? `- ${folioDetails.accountNo}` : ''}</td>
                        </tr>
                    </table>
                    <table class="tableBox totalPrice" width="100%">
                        <tr>
                            <td><span class="normalFont">Folio Source: {folioDetails && folioDetails.createdBy}</span></td>
                            <td><span class="normalFont">Freeze date: {DateFormater(folioDetails && folioDetails.freezeDate , UTIL.frontDateFormat)}</span></td>
                            <td><span class="normalFont">Folio Create Date: {DateFormater(folioDetails && folioDetails.createdAt , UTIL.frontDateFormat)}</span></td>
                        </tr>
                        <tr>
                            <td><span class="normalFont">Manual entry : {folioDetails && folioDetails.isManualEntry == TRUE_FALSE_COMMON[0].value ? TRUE_FALSE_COMMON[0].label : TRUE_FALSE_COMMON[1].label}</span></td>
                            <td><span class="normalFont">Soft ignored : {folioDetails && folioDetails.softIgnored == TRUE_FALSE_COMMON[0].value ? TRUE_FALSE_COMMON[0].label : TRUE_FALSE_COMMON[1].label}</span></td>
                            <td><span class="normalFont">Hard ignored : {folioDetails && folioDetails.hardIgnored == TRUE_FALSE_COMMON[0].value ? TRUE_FALSE_COMMON[0].label : TRUE_FALSE_COMMON[1].label}</span></td>
                        </tr>
                        <tr>
                            <td><span class="normalFont">BID: {folioDetails && folioDetails.bid}</span></td>
                            <td><span class="normalFont">Domain: {folioDetails && folioDetails.domain}</span></td>
                            <td><span class="normalFont">Last Used ARN : {folioDetails && folioDetails.arnNo}</span></td>
                        </tr>
                        <tr>
                            <td>Unit Balance: {PrecesionValueFormater(folioDetails.summary&&folioDetails.summary.units,4)} </td>
                            <td>Market Rate: <span class="rupee"></span> {NumberFormater(PrecesionValueFormater(folioDetails.summary && folioDetails.summary.nav,4))} <span class="normalFont">{folioDetails.summary && folioDetails.summary.date && "as on " + DateFormater(folioDetails.summary.date , UTIL.frontDateFormat)}</span></td>
                            <td>Market Value: <span class="rupee"></span> {NumberFormater(PrecesionValueFormater(folioDetails.summary && folioDetails.summary.amount,2))} </td>
                        </tr>
                    </table>
                </div>}

            
               {(this.props.searchSoaStore &&this.props.searchSoaStore.loaderSearchFolio &&this.props.searchSoaStore.loaderSearchFolio.componentName == 'searchSoa' ||this.props.unFreezeLoader && this.props.unFreezeLoader.loaderAumDelFolioTxn && this.props.unFreezeLoader.loaderAumDelFolioTxn.componentName == 'unFreezeFolio')&&
                <Loader 
                    loaderType = 'tableLoader'
                    loaderColumns = { this.state.tableCustomColsLoader && this.state.tableCustomColsLoader.length }
                    loaderRows = { this.props.pageSize || 20 }
                    loaderPagination = { 5 }
                    />}
               {(this.state.tableData && this.state.folioNumber) && <Table tableClass="tableBox"
                tdSpanClass="txtLimit"
                tableCustomData={this.state.tableCustomData} 
                tableData={this.state.tableData}
                tableTDClick = {{'4': (obj)=> this.folioIdData(obj) }}
                selectAll = {()=> this.selectAll()}
                unSelectAll = {()=> this.unSelectAll()}
                selectedRows = { this.state.selectedRows}
                selectedUniqueKey = {this.state.selectedUniqueKey}
                />}
                {(this.state.tableDataInner && !this.state.folioNumber) && <Table tableClass="tableBox"
                tdSpanClass="txtLimit"
                tableCustomData={this.state.tableCustomDataInner} 
                tableData={this.state.tableDataInner}
                tableTDClick = {{'15': (obj)=> this.deleteTxn(obj)}}
                />}
                </div>
                {this.state.showAlert && <ConfirmPopup
                    sureApply = {(paramVal)=> this.sureApply(paramVal) }
                />}
                {(!this.state.tableData && !this.props.soaFolioIdData.apiStatus==-1) && <p>Please Search for Data...</p>}
                {(this.props.soaFolioIdData.apiStatus==-1 && this.state.selectedOpt.value == 2) && <p>Something went wrong...</p>}

                {this.props.notificationData && <div class={`sentSuccessFully active ${this.props.notificationError && this.props.notificationError.errorMsg ? 'errorMsg' : ''}`}>
                    {this.props.notificationData}
	                <span class="close" onClick={()=>this.clearNotification()}></span>
	            </div>}
            </Fragment>
        )
    }
}
const mapStateToProp = (state) =>{
    return {
        soaFolioNumData: state.searchSoa && state.searchSoa.searchFolioNumData,
        soaFolioIdData: state.searchSoa && state.searchSoa.searchFolioIdData,
        unFreezeLoader: state.aumDeleteAllFoliosTxns,
        notificationData:state.searchSoa && state.searchSoa.notification,
        notificationError:state.searchSoa && state.searchSoa.errorMsg,
        pageSize: state.user.theme && state.user.theme.pageSize,
        searchSoaStore: state.searchSoa,
        user: state.user && state.user.user
    }
}
const mapDispatchToProp = (dispatch) => {
  return {dispatch:dispatch}
}

export default connect(mapStateToProp,mapDispatchToProp)(SearchSoa);