import React , {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Table from '../../components/table/table'
// import {addActionTd } from 'app/utils/actionsInTable'
import Loader from '../../components/table/table'
//import { LOADER_WIDTH } from 'app/constants/shared/commonConst'
// import { GetAuthorizationKey } from 'app/actions/admin/report/oneViewReport'
// import SwitchButtonBox from 'app/uiCollection/shared/switchButton'
// import {RemarksUpdated} from 'app/actions/admin/getUserTableList'
import {dependencyCheck} from '../../utils/dataFormater'
import {TRUE_FALSE_COMMON,LEVEL_NUMBERS_VALUE,SHARDING_STATUS,ADMIN_LOGIN_HISTORY_REASON} from '../../constants'
import TxnPopup from '../../components/guidePopup/transactionPopup'
import LoginReasonForm from '../../components/loginReasonForm'
import { GetAuthorizationKey } from '../../redux/authorizationSlice'

class UserListTable extends Component{
    constructor(props){
        super(props);
        let paginationData ={};
        let subUserType = dependencyCheck(this.props.userReducer, "user.subUserType")
        if(this.props.userTableData && this.props.userTableData.data){
            paginationData.currentPage = parseInt(this.props.userTableData.data.currentPage);
            paginationData.noOfPage = parseInt(this.props.userTableData.data.noOfPages);
            paginationData.totalNoRows = parseInt(props.userTableData.data.totalNoRows);
            paginationData.pageSize =parseInt(props.userTableData.data.pageSize);
        }
        this.state = {
            tableCustomData: [], filter: {}, paginationData, actions: '', gotToken: false,
            selectedReason: {}, subUserType
        }
    }
    UNSAFE_componentWillReceiveProps(newProps){
        let tableData = {};
        let paginationData ={};
        let actions = []
        let tableCustomData = [
                {key:'Select',value:'',metatitle :'adminIfaLookupSelect'},
                {key: 'BID', value:'bid',sorting:true},
                {key: 'Created Date', value:'createdAt', isDateFlag:true, sorting:true, nullValue:true},
                {key: 'Name', value:'name', styleClass:'linkInTable',sorting:true,orderByAlpha: true, metatitle: 'adminIfaLookupName'},
                {key: 'User Name', value:'username'},
                {key: 'Email', value:'email', nullValue: true,sorting:true},
                {key: 'Mobile No.', value:'phone', sorting:true},
                {key: 'Remarks', value:'remarks', nullValue:true, styleClass:'editTableColumn', 
                    editableData: {
                        columnsConfig: {name:'remarks',type:'text',}, 
                    },
                    metatitle :'adminIfaLookupRemark'              
                },
                {key: 'Last Login', value:'lastLogin',isDateFlag:true,nullValue:true},
                {key: 'Domain', value:'domain', nullValue: true,sorting:true},
                {key:'Service RM', value:'executiveAdminName',sorting:true,orderByAlpha:true,nullValue: true},
                {key: 'Sharded', value:'isSharded',mapLabelValueInfo :{mapLabelValueArray: SHARDING_STATUS},searchedValue: TRUE_FALSE_COMMON.find(elm => this.props.param && this.props.param.isSharded == elm.value ), 
                 isSearchInTable: {
                    functionToSearchData: (event, columnKey) => this.props.searchTableFilterData(event, columnKey),
                    clearSearchValue: (clearSearchFor) => this.props.clearTableSearchValue(clearSearchFor),
                    searchType: "select",
               toolTipsClass: 'searchFld',
                    options: { list: TRUE_FALSE_COMMON, labelName: 'label', labelValue: 'value' },
                    isOpen: false,
                }},
                {key: 'Actions', value:'actions', actionsColumn: true, styleClass:'showToolTipUnderSpan right-align ', metatitle :'adminIfaLookupActions'}
            ]
        if(this.props.selectedOpt && [LEVEL_NUMBERS_VALUE[8].levelNo,LEVEL_NUMBERS_VALUE[10].levelNo].includes(this.props.selectedOpt.levelNo)){
            tableCustomData.pop();
        }
            actions = [
                   
                    {label : 'Run AUM Reco', customClass : 'aumReco', onClickAction: (obj, type) => this.props.tableFiltersAction(obj, 'runAumReco')},
                ]
                if(this.props.userReducer && this.props.userReducer.user && this.props.userReducer.user.subUserType!="executive" ){
                    actions.unshift( {label : 'Edit User', customClass : 'edit', onClickAction: (obj) => this.props.editAction(obj)})
                }
                
            tableData = newProps.userTableData && newProps.userTableData.data && newProps.userTableData.data.data;
            if(tableData && tableData[0] && Object.keys(tableData[0]).includes('executiveAdmin')){
                tableCustomData.splice(4,0,{key: 'Service RM', value:'executiveAdmin',sorting:true,orderByAlpha: true })
            }
            if(tableCustomData || tableData)
            {
                this.setState({
                    tableCustomData : tableCustomData,
                    tableData : tableData,
                    actions : actions
                })
            }
            if(newProps.userTableData && newProps.userTableData.data){
                paginationData.currentPage=parseInt(newProps.userTableData.data.currentPage);
                paginationData.noOfPage = parseInt(newProps.userTableData.data.noOfPages);
                paginationData.totalNoRows = parseInt(newProps.userTableData.data.totalNoRows);
                paginationData.pageSize =parseInt(newProps.userTableData.data.pageSize);
                paginationData.setPagination= (offset) => newProps.userTableList(offset);
                this.setState({
                    paginationData : paginationData
                })
                let userTableData = newProps.userTableData.data.data || [];
                // userTableData.map((obj, index)=>{
                //     obj['actions'] = this.createActions(obj)
                // })
                // let actionArray = userTableData.map((obj, index) => ({
                //     ...obj,
                //     actions: this.createActions(obj)
                // }))
                // let finalTableData = this.props.selectBoxOptsFunction(actionArray, tableCustomData, 'bid'); 

                this.setState({
                    tableData: userTableData
                })
            }

        // if (newProps.ifaAdminData.authorizationKey && !this.state.gotToken) {
        //     this.setState({
        //         gotToken: true,
        //         brokerDetails: null,
        //         openAdminLogForm: false,
        //     })
        //     var paramObj = {
        //             token: newProps.ifaAdminData.authorizationKey.token,   
        //             uid : this.props.userReducer && this.props.userReducer.user && this.props.userReducer.user.uid
        //     }
        //     var getParamList = "";
        //     for (var key in paramObj) {
        //     if (getParamList != "") {
        //         getParamList += "&";
        //     }
        //         getParamList += key + "=" + encodeURIComponent(paramObj[key]);
        //     }
        //     let hostedVal = window.location.host
        //     let url = 'http://' +this.state.domain +'.'+ hostedVal.split('.')[1]+'.'+hostedVal.split('.')[2];
        //     //let url = 'http://' +this.state.domain + window.location.host.split('admin')[1];
        //     const midUrl = this.state.btnType == 'openInApp' ? '/app/appLogin?' : '/app/#/login?'
		// 	window.open(`${url}${midUrl}${getParamList}`, '_blank');
        //     this.props.dispatch({type: 'GOT_AUTHORIZATION_KEY', payload: null})
        // }
        if(this.state.ifaUpdatelist && (newProps.ifaAdminData && (!newProps.ifaAdminData.errorNotification && newProps.ifaAdminData.notificationStatus))){
            this.setState({
                ifaUpdatelist : false,
            }, ()=>{
                this.props.userTableListAPI()
            })
        }
    }

    createActions(rowData){
        let listActions=[]

        listActions.push(
                <li>
                    <a href="javascript:void(0);" class="aumReco" onClick={()=>this.props.tableFiltersAction(rowData,"runAumReco")} metatitle = 'adminIfaLookupRunAumReco'>Run AUM Reco</a>
                </li>,
                <li>
                    <a href="javascript:void(0);" class="edit" onClick={()=>this.props.editAction(rowData)}metatitle ='adminIfaLookupEditUser'>Edit</a>
                </li>

            )
        if(rowData&&rowData.isMigration){
            listActions.push(
                <li>
                    <a href="javascript:void(0);" class="edit" onClick={()=>this.props.tableFiltersAction(rowData,"migration")} metatitle ='adminIfaLookupMigration'>Migration</a>
                </li>
            )
        }
        if(dependencyCheck(this.props.userReducer,'user.subUserType')!="executive" ){
            listActions.push(
            <li>
                 <a href="javascript:void(0);" class="unFreeze" onClick={()=>this.props.tableFiltersAction(rowData,'unFreezeFolios')} metatitle ='adminIfaLookupUnFreezeFolios'>Unfreeze Folio</a>
            </li>
            )
            // if (rowData.isSharded == 0) {
            //     listActions.push(
            //         <li>
            //             <a href="javascript:void(0);" class="unFreeze" onClick={() => this.props.tableFiltersAction(rowData, 'shardMe')}>Shard Me</a>
            //         </li>
            //     )
            // }
        }
        listActions.push(
            <li>
                <a href="javascript:void(0);" class="unFreeze" onClick={() => this.props.tableFiltersAction(rowData, 'resetToken')} metatitle ='adminIfaLookupResetToken'>Reset Token</a>
            </li>
        )
        let actionlist = listActions ?   
            <div data-title="Average Days">
                <div class="tl-tip"><a href="javascript:void(0)" class="dotted-icon"></a>
                    <div class="drp-dwn"> <span class="icon-arrowtltip"></span>
                        <ul class="action">
                            {listActions}
                        </ul>
                    </div>
                </div>
            </div> : null

        return actionlist
    }
    GetAuthorizationKey(obj) {
        let param = {}
        if (this.state.brokerDetails) {
            param.domain = this.state.brokerDetails.domain
            param.bid = this.state.brokerDetails.bid
            param.reason = obj && obj.label || this.state.selectedReason.label
            // param.remarks = obj.remarks || ''
        }
        this.setState({
            domain: param.domain,
            gotToken: false
        })
        param.componentForLoader = { componentName: 'ifaOnboarding' }
        this.props.dispatch(GetAuthorizationKey(param))
    }

    gotToBrokerDashboard(obj) {
        this.setState({
            openAdminLogForm: true,
            brokerDetails: obj,
            selectedReason: this.state.subUserType == "executive" ? ADMIN_LOGIN_HISTORY_REASON[0] : ADMIN_LOGIN_HISTORY_REASON[2]
        })
    }

    clearNotification(){
        this.props.dispatch({type:'CLEAR_NOTIFICATION', payload: null})
    }
    editableFormSubmit(event){
        let getName = this.inputRef.name
        let params = {}
        params[getName] = this.inputRef.value
        params.bid = this.state.selectedRow && this.state.selectedRow.bid
        switch(getName){
            case 'remarks':
            this.setState({
                ifaUpdatelist: true,
                showHideEditTable: false
            })
            this.props.dispatch(RemarksUpdated(params))
            break;
        }
    }
    selectEditableObj(obj){
        this.props.dispatch({type : 'SUCCESS_CHECK_CUSTOM_URL', payload: null})
        this.setState({
            selectedRow : obj,
            showHideEditTable: true,
        })
        setTimeout(()=>{
            this.clearNotification()
        },100)
    }

    onOptionSelection(obj, fldName) {
        this.setState({
            [fldName]: obj
        })
    }

    submitLoginReasonForm(obj,btnName) {
		this.setState({ btnType:btnName })
        this.GetAuthorizationKey(obj)
    }

    hideTxnPopup(){
        this.setState({ openAdminLogForm: false })
    }

    render(){
        let selectedRowsLength = this.props.selectedRows && Object.keys(this.props.selectedRows).length
        if(this.state.tableData && this.state.tableCustomData && this.props.userReducer && this.props.userReducer.user )
            this.props.selectBoxOptsFunction(this.state.tableData, this.state.tableCustomData, 'bid')

        let customTableAttr = {}
        if (this.props.userReducer && this.props.userReducer.user && this.props.userReducer.user.subUserType !="executive") {
            customTableAttr = {
                selectAll : (customTableData)=> this.props.selectAll(this.state.tableData),
                unSelectAll: (customTableData)=> this.props.unSelectAll(this.state.tableData)
            }
        }
        //let tableTDClick
        /*if(this.props.userReducer && this.props.userReducer.user && this.props.userReducer.user.subUserType!="executive" ){
            tableTDClick= {
                    '3':((obj) => this.gotToBrokerDashboard(obj)),
                    'editableCols': ((obj) => this.selectEditableObj(obj))
                }
        }*/
        /*else{
            tableTDClick= {
                '2':((obj) => this.gotToBrokerDashboard(obj)),
                'editableCols': ((obj) => this.selectEditableObj(obj))
            }
        }*/

        return(
            <Fragment>
            <div class={`fr pTop10 pBtm10 mLeft10 ${this.props.tableLoader ? 'removeDisabled' : ''}`}>
                {/* <SwitchButtonBox 
                  leftTitle= "Active"
                  rightTitle= " All"
                  switchSlideFun= {(slideVal)=>this.props.switchOnOff(slideVal)}
                  metatitle = {'adminIfaLookupSwitchButton'}
                /> */}
            </div>
            {this.props.userReducer && this.props.userReducer.user && <div class="btnsContainer txtRight fr">
                {this.props.userReducer.user.subUserType != "executive" && selectedRowsLength == 0 && <button type="submit" onClick= {()=> this.props.getNewIFAForm()} metatitle = 'adminIfaLookupCreateIfa'>Create New IFA</button>}
                {((this.props.userReducer.user.subUserType == "executive" && selectedRowsLength == 1) || this.props.userReducer.user.subUserType != "executive" && selectedRowsLength > 0) && <Fragment>
                    <button type='button' onClick={()=> this.props.tableFiltersAction(null,'updateBrokerageFlag')} metatitle = 'adminIfaLookupSendNilBrokerage'>Send Nil Brokerage</button>
                    <button type='button' onClick={()=> this.props.tableFiltersAction(null,'fileOrder')} metatitle = 'adminIfaLookupFileOrder'> File Order </button>
                    <button type='button' onClick={()=> this.props.tableFiltersAction(null,'callMismatch')} metatitle = 'adminIfaLookupCallMisMatch'> Call Mismatch Folios</button>
                </Fragment>}
            </div>}
            <div class="cl"></div>
             <div class="overFlowNone posRelative tableListing midTableContainer">
             {(this.props.ifaLookup && this.props.ifaLookup.loaderIfa && this.props.ifaLookup.loaderIfa.componentName == 'ifaOnboarding')||(this.props.aumDeleteAllFoliosTxns) &&
             <Loader 
                loaderType = 'tableLoader'
                loaderColumns = { this.state.tableCustomData && this.state.tableCustomData.length }
                loaderRows = { this.props.pageSize || 10 }
                loaderPagination = { 5 }
            />}
            {this.state.tableCustomData && <Table tableClass="tableBox"
                tdSpanClass="txtLimit"
                tableCustomData = {this.state.tableCustomData}
                tableData = {this.state.tableData}
                paginationData = {this.state.paginationData}
                setPagination = {(currentPage) => this.props.userTableList(currentPage)}
                // createAction = {(selectedRow)=>addActionTd(this.state.actions,selectedRow)}
                tableTDClick= {{
                                    '3':((obj) => this.gotToBrokerDashboard(obj)),
                                    'editableCols': ((obj) => this.selectEditableObj(obj))
                                }}
                selectedRow = { this.state.selectedRow }
                showHideEditTable = {this.state.showHideEditTable}
                onSubmit = {(event)=>this.editableFormSubmit(event)}
                inputRef = {(input)=>{this.inputRef=input}}
                selectedRows = { this.props.selectedRows}
                selectedUniqueKey = {this.props.uniqueRowsId}
                singleTableOnScreen={true}
                tableHeadScroll = {12}
                {...customTableAttr}
            />}
                    {this.state.openAdminLogForm && <TxnPopup
                        hideTxnPopup={(fldName) => this.hideTxnPopup()}
                        txnPopupTitle="Alert"
                        hideFormSecClass = {true}
                        children={
                            <LoginReasonForm
						    	onSubmit={(event,btnName) => this.submitLoginReasonForm(event,btnName)}
                                onOptionSelection={(obj, fldName) => this.onOptionSelection(obj, fldName)}
                                brokerDetails={this.state.brokerDetails}
                                selectedReason={this.state.selectedReason}
                                metatitle = 'adminIfaLookup'
                            />
                        }
                        metatitle = 'adminIfaLookup'
                    />}
            </div>
            </Fragment>
        )
    }
}
const mapStateToProp = (state) =>{
    return {
        ifaOnboardStore: state.adminFormsReducers ,
        pageSize: state.user.theme && state.user.theme.pageSize,
        ifaAdminData:state.reportAdmin,
        userReducer: state.user,
        ifaLookup: state.ifaLookup
    }
}
const mapDispatchToProp = dispatch => {
    return { dispatch : dispatch }
}

export default connect(mapStateToProp,mapDispatchToProp)(UserListTable);
