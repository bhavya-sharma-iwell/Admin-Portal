import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {LEFT_SIDEBAR_TAB_PANEL_LABEL} from '../../constants'
import IfaSignUp from './IFASignUp/ifaSignUpMainBox'
import IFARegistration from './IFARegistration/ifaRegistrationMainBox'
import ARN from './Arn/arnMainBox'
import ZipPassword from './ZipPassword/zipPasswordMainBox'
import LevelInfo from './LevelInfo/levelInfoMainBox'
import SearchFilter from '../../components/customSelect/searchFilterCnt'
import UserListTable from './userListTable'
import {IFA_LOOKUP_SEARCH_OPTIONS,USER_TYPE, FILE_TYPE,COMBINED_TASK_ID} from '../../constants/adminDashboardConst'
// import {GetUserTableListData, RunAUMReco, SetMigrateBrokerRequest,GetResetToken} from 'app/actions/admin/getUserTableList'
// import {GetIFAInfoData, IfaPreferencesData} from 'app/actions/admin/ifaInitialInfo'
// import {GetArnAllInfoData} from 'app/actions/admin/arnInitialInfo'
// import {GetRtaPassInfoData} from 'app/actions/admin/rtaPassInitialInfo'
// import {GetlevelInitialData} from 'app/actions/admin/levelInitialInfo'
import Loader from '../../components/loaders'
import * as commonConst from '../../constants'
import ConfirmPopup from '../../components/guidePopup/confirmPopup'
// import {RemoveZipPassword} from 'app/actions/admin/zipPassword'
import Smtp from './smtpConfiguration'
import {reset, change,untouch} from 'redux-form';
import CropImage from '../../utils/cropImage'
// import * as ifaRegistrationAction from 'app/actions/admin/ifaRegistration'
import SearchField from '../../components/searchField'
// import {DeleteArnID} from 'app/actions/admin/arnRegistration'
import PreferencesCont from './ifaPreferences'
import {SelectAllRows, UnselectAllRows,MultiSelectFormater,DateFormater,dependencyCheck} from '../../utils/dataFormater'
import {UTIL} from '../../constants'
import moment from 'moment'
// import { getTasks,GetFundsData } from 'app/actions/admin/taskManagement'
// import {CreateBulkJobs, callMismatches, ValidCheckboxForBrokeragePayout, UpdateNilBrokerageFlag} from 'app/actions/admin/report/oneViewReport'
import OrderFilesForm from './orderFilesForm'
import * as aumReconciliation from '../searchSoa/searchSoaSlice'
import { GetUserTableListData } from './ifaLookupSlice'

class IFAOnBoarding extends Component{
    constructor(props){
        super(props);
        this.state= {
            openTab:1, successFormFrst:false, domainNameValue:'',
            activeAllFrm:false,IfaFormContainers: false, userListTable : true,
            filter:{}, arnInitInfo :[],isEmptyField:false,
            selectedOpt:IFA_LOOKUP_SEARCH_OPTIONS[0],
            uIdFrmUserList:null,logoTypeArray:[],passDeleteAlert:false,
            arnDeleteAlertBox: false,
            hideAlertBox:false,
            activeOnly : true,
            selectedRows: {},
            listOfBids: {},
            uniqueRowsId:'bid',
            isErrorMessage: false,
            showSearchFld:true,
            camsDropdown:false,
            karvyDropdown:false,
            shardMe : true,
            selectedFileType : FILE_TYPE[0]
        }
        props.dispatch({type:'SET_SELECTED_TAB_HEADER',payload:{parentTab:LEFT_SIDEBAR_TAB_PANEL_LABEL.ifalookup}})
    }
    ArnAllInfoAPI(){
        let paramArn = {}
        paramArn.bid =  this.state.storeBid ? this.state.storeBid : (this.props.ifaRegistrationDetails && this.props.ifaRegistrationDetails.bid)
        this.setState({
            storeBid: paramArn.bid
        })
        this.props.dispatch(GetArnAllInfoData(paramArn))
    }
    levelInfoAPI(){
        let paramLevel = {}
        paramLevel.bid = this.state.storeBid ? this.state.storeBid : (this.props.ifaRegistrationDetails && this.props.ifaRegistrationDetails.bid)
        paramLevel.uid = this.state.uIdFrmUserList ? this.state.uIdFrmUserList : (this.props.ifaSignUpDetails && this.props.ifaSignUpDetails.uid)
        paramLevel.orderBy = 'levelNo'
        this.props.dispatch(GetlevelInitialData(paramLevel))
    }
    openAccordionTabs(formName){
        let currentTabValue=formName;
        if(this.state.openTab != formName){
        this.setState({
           openTab:formName
        })
    }else {
        this.setState({
            openTab:''
         })
         currentTabValue=null;


    }
        this.props.dispatch({type:'TAB_STATE_MANAGEMENT',payload:currentTabValue})

        switch(formName) {
            case 2:
            let paramIfa = {}
            paramIfa.bid = this.state.storeBid ? this.state.storeBid : (this.props.ifaRegistrationDetails && this.props.ifaRegistrationDetails.bid)
            paramIfa.uid = this.state.uIdFrmUserList ? this.state.uIdFrmUserList : (this.props.ifaSignUpDetails && this.props.ifaSignUpDetails.uid)
            this.props.dispatch(GetIFAInfoData(paramIfa))
            break;

            case 3:
            this.ArnAllInfoAPI()
            break;

            case 4:
            let paramRta = {}
            paramRta.bid = this.state.storeBid ? this.state.storeBid : (this.props.ifaRegistrationDetails && this.props.ifaRegistrationDetails.bid)
            this.setState({
                storeBid: paramRta.bid
            })
            this.props.dispatch(GetRtaPassInfoData(paramRta))
            break;

            case 5:
            this.levelInfoAPI()
            break;

            case 6:
            let param = {}
                param.bid = this.state.storeBid
                param.componentForLoader = {componentName:'smtpSettingLoader'}
            this.props.dispatch(ifaRegistrationAction.getSmtpDetails(param))
            break;

            case 7:
            this.levelInfoAPI()
            let preferenceParam = {}
                preferenceParam.bid = this.state.storeBid
                this.props.dispatch(IfaPreferencesData(preferenceParam))
            break;
        }
    }

    getDomainName(e){
      let fileName = e.target.value + '_Logo.png'
        this.setState({
            fileName:fileName,
            domainNameValue:e.target.value
        })
    }
    getUserName(e){
        this.setState({
            userNameValue:e.target.value
        })
    }
    componentDidMount(){
        this.setState({
            activeOnly : true
        })
        this.userTableListAPI()
    }
    UNSAFE_componentWillReceiveProps(newProps){
        let StoredtabState=this.props.ifaOnboardStore && this.props.ifaOnboardStore.tabState;
        if( StoredtabState != this.state.openTab){
            this.setState({
                openTab:StoredtabState
            })
        }

        if(newProps.ifaRegistrationDetails &&(this.props.ifaRegistrationDetails && this.props.ifaRegistrationDetails.bid) != (newProps.ifaRegistrationDetails && newProps.ifaRegistrationDetails.bid))
        {
            this.setState({
                storeBid : newProps.ifaRegistrationDetails.bid
            })
        }
        if(newProps.ifaSignUpDetails && newProps.ifaSignUpDetails.uid){
            this.setState({
                successFormFrst:true,
                signUpFormDisabled : true,
            })
            if(this.props.ifaOnboardStore&&this.props.ifaOnboardStore.tabState == 0){
               this.setState({
                successFormFrst:false,
                })
            }
        }
        if( (newProps.ifaRegistrationDetails && newProps.ifaRegistrationDetails.bid)&&  !this.state.isEmptyField){
            this.setState({
                activeAllFrm:true
            })
        }
        if((newProps.ifaInfoData && newProps.ifaInfoData.data) && !this.state.isEmptyField){
            this.setState({
                ifaRegistrationInfo : (newProps.ifaInfoData && newProps.ifaInfoData.data && newProps.ifaInfoData.data[0]),
                fileName : (newProps.ifaInfoData && newProps.ifaInfoData.data && newProps.ifaInfoData.data[0]&& newProps.ifaInfoData.data[0].domain&& newProps.ifaInfoData.data[0].domain+'_Logo.png')
            })
        }
        if(newProps.arnInfoData && newProps.arnInfoData.data){
            this.setState({
                arnInitInfo : (newProps.arnInfoData && newProps.arnInfoData.data),
            })
        }
        if((newProps.levelInitialData && newProps.levelInitialData.data) && !this.state.isEmptyField){
            this.setState({
                levelInitialInfo : (newProps.levelInitialData && newProps.levelInitialData.data),
            })
        }
        if((newProps.rtaPassInfoData && newProps.rtaPassInfoData.data) && !this.state.isEmptyField){
            this.setState({
                zipPassInitInfo : (newProps.rtaPassInfoData && newProps.rtaPassInfoData.data),
            })
        }
        if((newProps.ifaInfoData && newProps.ifaInfoData.data && newProps.ifaInfoData.data[0] && newProps.ifaInfoData.data[0].bid) && !this.state.isEmptyField){
            this.setState({
                activeAllFrm: true
            })
        }
        if((newProps.ifaOnboardStore && newProps.ifaOnboardStore.notification) || (newProps.ifaOnboardStore && newProps.ifaOnboardStore.notificationData)){
            setTimeout(()=>{
                this.props.dispatch({type:'CLEAR_NOTIFICATION'})
            },2000)
        }
        if(this.state.isGetCall && (newProps.ifaAdminData && (!newProps.ifaAdminData.errorNotification && newProps.ifaAdminData.notificationStatus))){
            this.setState({
                isGetCall : false,
            }, ()=>{
                this.goBackFn()
            })
        }
        // if((newProps.unFreezeFolio && newProps.unFreezeFolio.notification)||(newProps.ifaAdminData && newProps.ifaAdminData.notificationStatus) ||(dependencyCheck(newProps.ifaOnboardStore,'ifaNotificationData')!=this.props.ifaOnboardStore.ifaNotificationData)){
        //     setTimeout(()=> {
        //         this.clearNotification()
        //     }, 2000)
        // }
        if(newProps.shardMeNotification == 1){
            this.setState({selectedRows:{}})
        }
    }
    componentWillUnmount(){
        this.props.dispatch({ type : 'GOT_USERLIST_DATA', payload: null})
    }
    onOptionSelection(obj){
        if(this.state.searchedValue && this.state.searchedValue.length > 0){
            this.setState({
                searchedValue:null,
                showHideCrossBtns : false,
                showSearchFld:false
            },()=>{
                this.setState({
                    showSearchFld:true
                })
                this.userTableListAPI()
            })
        }
        this.setState({
            selectedOpt:obj,
            filter:{},
            getNameVal:'',
            getSecondFldVal:'',
            listOfBids:{},
            selectedRows:{},
        })
    }
    getNewIFAForm(){
        this.props.dispatch({type:'GOT_IFAREGISTRATION_DATA', payload:null})
        this.props.dispatch({type:'GOT_IFAINFO_DATA', payload: null})
        this.props.dispatch({type:'GOT_IFASIGNUP_DATA', payload: null})
        this.props.dispatch({type:'GOT_ARNINFO_DATA', payload: null})
        this.props.dispatch({type:'GOT_RTAINFO_DATA', payload: null})
        this.props.dispatch({type:'GOT_LEVELINITINFO_DATA', payload: null})
        this.props.dispatch({type:'GOT_IFA_PREFERENCES_DATA', payload: null})
        this.props.dispatch({type : 'SUCCESS_CHECK_CUSTOM_URL', payload: null})

        this.props.dispatch(reset('IfaSignUpForm'));
        this.props.dispatch(reset('IFARegistrationForm'));
        this.props.dispatch(reset('ArnForm'));
        this.props.dispatch(reset('LevelInfoForm'));
        this.props.dispatch(reset('ZipPasswordForm'));
        this.props.dispatch(reset('IfaPreferencesForm'));
        this.props.dispatch({type:'TAB_STATE_MANAGEMENT',payload:1})
        this.setState({
            IfaFormContainers : true,
            userListTable : false,
            successFormFrst : false,
            signUpFormDisabled : false,
            signUpData : null,
            ifaRegistrationInfo : null,
            levelInitialInfo : null,
            zipPassInitInfo : null,
            uIdFrmUserList : null,
            activeAllFrm : false,
            openTab:1,
            isEmptyField: true,
            arnInitInfo : [],
            arnInitFldInfo : null,
            storeBid:null,
            logoTypeArray:[],
            logoType:null,
            fileName:null,
            domainNameValue: null,
            searchedValue:null,
            showHideCrossBtns : false,
            showSearchFld:false
        },()=>{
            this.setState({
                showSearchFld:true
            })
        })
    }
    userTableListAPI(paramData){
        let param = paramData ? paramData : {}
        let searchKeyValue = this.state.selectedOpt && this.state.selectedOpt.value
        let activeOnly = this.state.activeOnly
            param.activeOnly = activeOnly ? activeOnly : null 
            param.pageSize = this.props.pageSize || 30;
            param.currentPage= paramData && paramData.currentPage ? paramData.currentPage : 1;
            param[searchKeyValue] = this.state.searchedValue;
            param.userType = USER_TYPE[0].value
            param.componentForLoader = {componentName : 'ifaOnboarding'}
        if(!param.orderBy){
            param.orderByDesc = true;
            param.orderBy = 'bid'
        }
        this.setState({param})
        this.props.dispatch(GetUserTableListData(param));
    }
    getUserList(addEditIfaTrue){
        this.props.dispatch({type:'GOT_IFAREGISTRATION_DATA', payload: {bid:undefined}})
        this.props.dispatch({type:'GOT_IFAINFO_DATA', payload: {bid:undefined}})

        this.setState({
            userListTable : true,
            IfaFormContainers : false,
            activeAllFrm:false,
            signUpData : null,
            ifaRegistrationInfo : null,
            levelInitialInfo : null,
            zipPassInitInfo : null,
            storeBid:null,
            arnInitFldInfo : null,
            logoTypeArray:[],
            logoType:null,
            fileName:null
        })
        if(this.state.IfaFormContainers && addEditIfaTrue == 'addEditIfaTrue'){
            this.closeIFAFOrm('activeAddEditIFA')
            this.props.dispatch({type:'GOT_IFAREGISTRATION_DATA', payload: {bid:undefined}})
        }

        this.userTableListAPI()
    }
    userTableList(currentPage){
        let param= this.state.param ? this.state.param : {};
            param = this.state.filter
            param.currentPage=currentPage.offset;
            param.pageSize = this.props.pageSize
            param.orderByDesc = false;
            param.orderBy = 'name'
        if(currentPage.orderByDesc){
            param.orderByDesc = currentPage.orderByDesc;
        }
        if(currentPage.orderBy){
            param.orderBy = currentPage.orderBy;
        }
        this.userTableListAPI(param)
    }
    getNameVal(event){
        let searchedValue = event.name
        let showHideCrossBtns = this.state.showHideCrossBtns
        searchedValue = searchedValue && searchedValue.trim()
        showHideCrossBtns = searchedValue && searchedValue.length ? true : false
        this.setState ({
           searchedValue,
           showHideCrossBtns,
        })
    }

    clearSearchValue () {
        this.setState({
            searchedValue: null,
            showHideCrossBtns : false
        }, ()=> {
            this.userTableListAPI()
        })

      }


    editAction(obj){
        this.props.dispatch({type:'GOT_IFAREGISTRATION_DATA', payload: {bid:undefined}})
        this.props.dispatch({type:'GOT_IFAINFO_DATA', payload: {bid:undefined}})
        this.props.dispatch({type:'GOT_ARNINFO_DATA', payload: null})
        this.props.dispatch({type : 'SUCCESS_CHECK_CUSTOM_URL', payload: null})
        this.setState({
            uIdFrmUserList :null,
            activeAllFrm : false,
            isEmptyField: false,
            arnInitInfo : [],
            storeBid : obj.bid,
            isSharded : obj.isSharded
        })
        if(obj.uid){
            this.setState({
                successFormFrst : true,
                IfaFormContainers : true,
                userListTable : false,
                uIdFrmUserList : obj.uid,
                domainNameValue : obj.domain,
                signUpData : obj,
                signUpFormDisabled : true,
                openTab:1,
                activeAllFrm : false,
                isEmptyField: false

            }, function(){
                let param ={}
                param.uid = obj.uid;
                param.bid = obj.bid;
                this.props.dispatch(GetIFAInfoData(param))
                /*setTimeout(() =>{
                    if(this.props.ifaInfoData && this.props.ifaInfoData.data && this.props.ifaInfoData.data[0].bid)
                    {
                        this.setState({
                            storeBid : this.props.ifaInfoData.data[0].bid
                        })
                    }
                },1000)*/

            })
        }
        this.props.dispatch({type:'TAB_STATE_MANAGEMENT',payload:1})
    }

    getArnData(e){
        const excludedArns = commonConst.excludedDefaultArns.includes(e.arnNo) ? true : false
        this.setState({
            excludedArns,
            arnInitFldInfo : e,
            resetSearchField : true,
        })
    }

    activeAllForm(){
        this.setState({
            activeAllFrm:true
        })
    }
    resetArnNum(){
        this.setState({
            arnInitFldInfo : null,
            resetSearchField : true,
        })
    }
    onDomainChange(event){
        let fileName = event.target.value + '_Logo.png'
        this.setState({fileName:fileName,domainNameValue:event.target.value})
    }
    openCropImage(file,fileSrc,logoType, hideCropper){
        if (hideCropper == 'uploadPopupImg') {
            this.setState({
                isHideCropper: true
            })
        }
      this.setState({
        isCropMessage:logoType
      })
        if(file&&file[0].name){
            let checkFileExtension = file[0].name.split('.')
            if(['png', 'PNG'].includes(checkFileExtension[checkFileExtension.length-1])){
                this.setState({
                    cropeImage:true,imageTocrop:fileSrc,
                    outerApiCall:true,uploadFileObj:file,
                    logoType:logoType,
                    uploadDiff:hideCropper

                })
            }
            if(hideCropper !== 'uploadBackgroundImg'){
                if(!['png', 'PNG'].includes(checkFileExtension[checkFileExtension.length-1])){
                    this.setState({wrongFileType:true})
                    setTimeout(()=>{
                        this.setState({wrongFileType:false})
                    },4000)
                }

            }
            if (hideCropper == 'uploadBackgroundImg') {
                this.setState({
                    logoType:logoType,
                    cropeImage:true,
                    imageTocrop:fileSrc,
                    outerApiCall:true,
                    uploadFileObj:file,
                    uploadDiff:hideCropper
                })
            }
        }
        if(logoType == 0){                                      //aspect ratio = width/height
            this.setState({
                aspectRatio:(60/44)
            })
        }
        if(logoType == 1){
            this.setState({
                aspectRatio:(224/57)
            })
        }
        if(logoType == 3){  
            this.setState({
                aspectRatio:(1920/1080)
            })
        }
        
    }
    cropMessage(){
      this.setState({
        isCropMessage:''
      })
    }
    closeCropImage(file){
        this.setState({
            cropeImage:false,imageTocrop:''
        })
    }
    uploadFileFn(blob){
        let logoTypeArray = this.state.logoTypeArray
        let matchedFlag = false                             // to make green class enabled on successfull image upload
        for(let i=0 ;i<logoTypeArray.length ;i++){
            if(this.state.logoType == logoTypeArray[i]){
                matchedFlag = true
            }
        }
        if(!matchedFlag){
            logoTypeArray.push(this.state.logoType)
        }
        this.setState({logoTypeArray:logoTypeArray})
        let newBlob = new Blob([blob],{type:'image/png'})   //modifying blob object to send cropped image file size
        newBlob.name = this.state.uploadFileObj[0].name
        newBlob.lastModified = this.state.uploadFileObj[0].lastModified
        newBlob.lastModifiedDate = this.state.uploadFileObj[0].lastModifiedDate

        const params = new FormData();
        if(this.state.logoType==2){
            let fileName=this.state.fileName && this.state.fileName.split('_')
            if(this.state.uploadDiff=='uploadPopupImg'){
                fileName=fileName[0] + '.png'
            }
            if(this.state.uploadDiff=='uploadBackgroundImg'){
                params.append('backgroundImage', 1)
                fileName=fileName[0] + '_customBackground.png'
            }
            params.append('fileName',fileName)

        }
        else{
            params.append('fileName',this.state.fileName)
        }
        params.append('folderType',this.state.logoType)
        params.append('file' ,newBlob)
        this.props.dispatch(ifaRegistrationAction.getLogoUpload(params))
        if(this.state.logoType == 0 ){
            this.setState({logoState:true})
        }else{
            this.setState({logoState:false})
        }
        if(this.state.uploadDiff == 'uploadBackgroundImg' ){
            this.setState({customBackground:true})
        }else{
            this.setState({customBackground:false})
        }
    
    }
    
    tableFiltersAction(obj,type) {
        let param = {}
        switch (type) {
            case 'fileOrder':
                this.setState({ showOrderFileForm: true })
                this.props.dispatch(getTasks(param))
                break;
            case 'callMismatch':
                param.bids = this.selectedBids()
                param.taskid = 6
                this.setState({ isGetCall: true })
                this.props.dispatch(callMismatches(param))
                break;
            case 'updateBrokerageFlag':
                param.bids = this.selectedBids()
                this.setState({ isGetCall: true })
                this.props.dispatch(UpdateNilBrokerageFlag(param))
                break;
            case 'migration':
                param.bid = obj.bid;
                this.props.dispatch(SetMigrateBrokerRequest(param))
                break;
            case 'runAumReco':
                param.bid = JSON.stringify(obj.bid)
                this.props.dispatch(RunAUMReco(param))
                this.props.dispatch({ type: 'COMMON_LOCAL_STORAGE', payload: obj })
                break;
            case 'unFreezeFolios':
                param.bid =   [obj.bid]
                param.componentForLoader = true
                this.props.dispatch ( aumReconciliation.unFreezeFolios(param) )
            break; 
            case 'shardMe':
                param.bids = obj ? {[obj.bid]:obj.bid} : this.state.listOfBids
                param.componentForLoader = true
                // this.props.dispatch ( aumReconciliation.ShardMe(param) )
                this.setState({shardMe: true})
            break;
            case 'resetToken' : 
                param.bid = obj.bid;
                this.props.dispatch ( GetResetToken(param) )
            break;  
        }
    }

    showPassDeleteAlert(obj){
      this.setState({
        passDeleteAlert:true,
        passForDelete:obj
      })
    }
    deletePassConfirm(obj){
      if(obj == 'yes'){
        let param = this.state.passForDelete
        this.props.dispatch(RemoveZipPassword(param))
      }
      else{
        this.setState({passDeleteAlert:false})
      }
    }
    closeAlert(){
      this.setState({
        passDeleteAlert:false
      })
    }
     /* <div class="filter-box left calendar-box customTitle searchBox">
           <i class="search" ></i>
           <input type="text" class="left fullSize"
               placeholder='Domain...'
               name = 'domain'
               onBlur = {(e) => this.getNameVal(e)}
               customTitle = " "
               onChangeFunction =  { (e) => this.props.searchSchemeName(e) }
           />
       </div>*/

    closeIFAFOrm(activeAddEditIFA){
        this.props.dispatch({type:'GOT_IFA_PREFERENCES_DATA', payload: null})
        this.props.dispatch(reset('IfaPreferencesForm'));
      this.setState({
        IfaFormContainers:false,
        userListTable:true,
        storeBid:null

      })
      if(activeAddEditIFA)
            return

      let param =  this.state.param ? this.state.param : {}
      let activeOnly = this.state.activeOnly
      param.activeOnly = activeOnly ? true : null
      param.pageSize = this.props.pageSize || 30;
      param.currentPage= 1;
      param.orderByDesc = true;
      param.orderBy = 'bid'
      param.userType = USER_TYPE[0].value
      param.componentForLoader = {componentName : 'ifaOnboarding'}
      this.setState({param})
      this.props.dispatch(GetUserTableListData(param));

      this.props.dispatch({type:'GOT_IFAREGISTRATION_DATA', payload: {bid:undefined}})
    }
    searchTableFilterData(event,columnKey){
            let param = this.state.param ? this.state.param : {}
            param[columnKey] = event.value
            param.currentPage = 1
            this.setState({ param })
            this.props.dispatch(GetUserTableListData(param))          
    }
    clearTableSearchValue(clearSearchFor){
        let param = this.state.param ? this.state.param : {}
            delete param[clearSearchFor];
            this.setState({ param })
            this.props.dispatch(GetUserTableListData(param))   
        
    }
    deleteArnNoCrossBtn(arn){
        this.setState({
            arnDeleteAlertBox:true,
            arnData: arn,
            hideAlertBox: false,
            arnInitFldInfo: null
        })
        this.props.dispatch(reset('ArnForm'));
    }

    deleteArnConfirm(obj){
        this.props.dispatch({type:'GOT_ARNINFO_DATA',payload:null})
        this.props.dispatch({type:'ARNID_SECCESSFULLY_DELETED',payload:null})
        if(obj == 'yes'){
        let param={}
        param= this.state.arnData
        param.componentForLoader = {componentName:'ARN'}
        this.props.dispatch(DeleteArnID(param))
        this.setState({
            arnDeleteAlertBox:false
        })
      }
      else{
        this.setState({
            arnDeleteAlertBox:false,
            hideAlertBox: false
        })
      }

    }

    closeArnDeleteAlertBox(){
        this.setState({
            arnDeleteAlertBox:false,
            hideAlertBox:true
        }, ()=> {
            this.hideAlertBoxFn()
        })
    }

    hideAlertBoxFn(){
        this.setState({
            hideAlertBox:true
        })
    }
    onEnterFunction(e){
        if(e.keyCode == 13){
            if(this.state.IfaFormContainers){
                this.closeIFAFOrm('activeAddEditIFA')
                this.props.dispatch({type:'GOT_IFAREGISTRATION_DATA', payload: {bid:undefined}})
            }

            e.target.blur();
            this.getUserList()
        }
    }
    switchOnOff(slideBtnVal){
        switch(slideBtnVal){
            case 'slideRight' :
            this.setState({
                activeOnly : true
            }, ()=> {
                this.userTableListAPI()
            })
            break;

            case 'slideLeft' :
            this.setState({
                activeOnly :'false'
            }, ()=> {
                this.userTableListAPI()
            })
            break;
        }
    }
    checkboxFncList(obj){
        let uniqueRowsId = this.state.uniqueRowsId
        let selectedRows = this.state.selectedRows
        let listOfBids = this.state.listOfBids
        if(obj && selectedRows.hasOwnProperty(obj[uniqueRowsId])){
            delete selectedRows[obj[uniqueRowsId]]
            delete listOfBids[obj[uniqueRowsId]]
        }else{
            if (obj) {
                selectedRows[obj[uniqueRowsId]] = obj
                listOfBids[obj[uniqueRowsId]] = obj[uniqueRowsId]
            }
            
        }
        this.setState({
            selectedRows,
            listOfBids
        })

    }
    // selectBoxOptsFunction(tableData, customtableData, uniqueRowsId){
    //     if(tableData &&  (customtableData && customtableData[0])){
    //         let aumRecoDataArr = []
    //         aumRecoDataArr = tableData
    //         let isCheckBox = this.state.listOfBids
    //         for(let i = 0; i < aumRecoDataArr.length; i++){
    //             let rowData = aumRecoDataArr[i]
    //             aumRecoDataArr[i][customtableData[0].value] = (<label class="customCheckBox" title="Select">
    //             <input type="checkbox" checked={this.state.selectedRows.hasOwnProperty(aumRecoDataArr[i][uniqueRowsId])} name="action"
    //                 onClick={((myItr)=>()=> this.checkboxFncList(rowData))(i) } />
    //             <span></span>
    //              </label>)                
    //         }
    //     }
    // }
    selectBoxOptsFunction(tableData, customtableData, uniqueRowsId) {
        if (tableData && customtableData && customtableData[0]) {
            let aumRecoDataArr = tableData.map(rowData => {
                let newRowData = { ...rowData }

                // Create the checkbox element
                newRowData[customtableData[0].value] = (
                    <label className="customCheckBox" title="Select">
                        <input 
                            type="checkbox" 
                            checked={this.state.selectedRows.hasOwnProperty(rowData[uniqueRowsId])} 
                            name="action"
                            onClick={() => this.checkboxFncList(rowData)} 
                        />
                        <span></span>
                    </label>
                )
                return newRowData
            })

            return aumRecoDataArr
        }
    }

    selectAll(customTableData){
        let uniqueRowsId = this.state.uniqueRowsId
        let allRowsData = SelectAllRows(uniqueRowsId, customTableData)
        let selectedRows = this.state.selectedRows || {};
        let listOfBids = this.state.listOfBids || {};
        selectedRows = { ...selectedRows, ...allRowsData.selectedRows  }
        listOfBids = { ...listOfBids, ...allRowsData.listOfSelectedIds }
        this.setState({
            selectedRows,
            listOfBids,
            selectAllFlag:true,
            unSelectAllFlag:false
        })
    }

    unSelectAll(customTableData) {
        let uniqueRowsId = this.state.uniqueRowsId
        let noRowsData = UnselectAllRows()
        let selectedRows = this.state.selectedRows || {};
        let listOfBids = this.state.listOfBids || {};
        let tableData = customTableData || [];
        for(let i = 0; i < tableData.length; i++) {
            if((tableData[i]) && (tableData[i][uniqueRowsId]) ){
                delete selectedRows[tableData[i][uniqueRowsId]];
                delete listOfBids[tableData[i][uniqueRowsId]];
            }
        } 
        this.setState({
            selectedRows,
            listOfBids,
            selectAllFlag:false,
            unSelectAllFlag:true
        })
    }

    goBackFn(){
        this.setState({
            showOrderFileForm : false,
            jobs : {},
            myTaskList : [],
            startDate : null,
            endDate : null,
            selectedRows: {},
            listOfBids: {},
        })
        this.userTableListAPI()
    }
    dateDiff() {
        const startDate=this.state.startDate;
        const endDate=this.state.endDate;
        var diff = endDate.diff(startDate, 'days');
        for (var year = startDate.year(); year <= endDate.year(); year++) {
          var date = moment(year + '-02-29');
          if (date.isBetween(startDate,endDate) && date.isLeapYear()) {
              diff -= 1;
          }
        }
        return diff;
      }

    checkDiff(){
        if(this.state.startDate && this.state.endDate){
            const startDate=this.state.startDate;
            const endDate=this.state.endDate;
            //const Difference=endDate.diff(startDate,'year');
            const Difference = this.dateDiff();
            if(Difference>365){
                this.setState({
                    disableCheckboxes:true
                })
            }
            else{
                this.setState({
                    disableCheckboxes:false
                })
            }
        }
    }
    onDateChange(obj,type){
        if(type == 'startDate'){
            this.setState({
                startDate:moment(obj),
                isErrorMessage: false,
            },()=>this.checkDiff())
        }
        if(type == 'endDate'){
            this.setState({
                endDate:moment(obj),
                isErrorMessage: false,
            },()=>this.checkDiff())
        }
    }
    sinceFn(e){
        let start = '01-01-1993'
        start= moment(start,UTIL.frontDateFormat)
        let endDate = moment();
        this.props.dispatch(change('OrderFilesForm','reqToDate',endDate));
        this.props.dispatch(untouch('OrderFilesForm','reqToDate'))

        this.props.dispatch(change('OrderFilesForm','reqFromDate',start));
        this.props.dispatch(untouch('OrderFilesForm','reqFromDate'))

        this.setState({startDate:start,endDate, isSinceInception: 1},()=>this.checkDiff())
    }
    onClickFun(sourceId,taskId){
        let jobs = this.state.jobs || {}
        let myTaskList = this.state.myTaskList || []
        let taskPresent = false
        if( jobs&&jobs.hasOwnProperty(sourceId)){
            
            let myInnerValues = jobs[sourceId]
            for(let i=0;i<myInnerValues.length;i++){
                if(myInnerValues[i]==taskId){
                    taskPresent = true
                }
            }
            if(taskPresent){
                jobs[sourceId].splice(myInnerValues.indexOf(taskId), 1)
            }else {
                myInnerValues.push(taskId)
                jobs[sourceId] = myInnerValues
            }

        }else{
            myTaskList = []
            myTaskList.push(taskId)
            jobs[sourceId] = myTaskList
        }
        if (sourceId == "C" && taskId == COMBINED_TASK_ID[0]) {
            if(!this.state.camsDropdown){
                this.onAMCListSelection(sourceId)
            }
            this.setState({
                camsDropdown: !this.state.camsDropdown,
                selectedCamsAMC: null
            })
        }
        if (sourceId == "K" && taskId == COMBINED_TASK_ID[0]) {
            if(!this.state.karvyDropdown){
                this.onAMCListSelection(sourceId)
            }
            this.setState({
                karvyDropdown: !this.state.karvyDropdown,
                selectedKarvyAMC: null
            })
        }
        this.setState({
            jobs,
            myTaskList,
        })
    }
    //function for getting fund data as per selected AMCs
    onAMCListSelection(sourceId) {
        let param = {}
        param.filters = {}
        param.filters.rta = sourceId
        param.orderBy = 'name'
        this.props.dispatch(GetFundsData(param,sourceId))
    }
    //function for MultiSelectors fields
    onOptionSelectionAMCList(obj, type) {
        let optionData = (type == "selectedCamsAMC") ? dependencyCheck(this.props.taskManagementData,'fundsDataListCams.data') : dependencyCheck(this.props.taskManagementData,'fundsDataListKarvy.data')
        this.setState({
            [type]: MultiSelectFormater(obj, ["fundid"], true, optionData, true)
        })
    }
    handleSubmit(e){
        let params= {};
        let bids = []
        let isBrokerageId
        for( const [key, value] of Object.entries(this.state.jobs || {}) ) {
            isBrokerageId = value.filter(elm => elm == ValidCheckboxForBrokeragePayout(elm))
            if(isBrokerageId && isBrokerageId.length>0){
                break;
            }
        }

        let selectedRows = Object.values(this.state.selectedRows)
        for (let i=0;i< selectedRows.length;i++){
            if(bids.indexOf(selectedRows[i]['bid']) === -1) {
                bids.push(selectedRows[i]['bid']);
            }
        }
        if((isBrokerageId && isBrokerageId.length>0) && this.state.disableCheckboxes){
            this.setState({
                isErrorMessage: 'More than 12 months is not allowed for selected task'
            })
            return
        }
        if( (isBrokerageId && isBrokerageId.length>0) && (this.state.startDate < moment( 2015+'-'+1+'-'+1 + ' 00:00:00' ) ) ) {
            this.setState({
                isErrorMessage: 'Date less than 2015 not allowed for brokerage tasks'
            })
        }else {
            params.bids = bids
            params.jobs = this.state.jobs
            params.reqFromDate = DateFormater(this.state.startDate)
            params.reqToDate = DateFormater(this.state.endDate)
            params.isFoliowise = 1
            params.sinceInception = this.state.isSinceInception
            params.csv = this.state.selectedFileType && this.state.selectedFileType.levelNo 
            params.fundidList = {}
            params.fundidList.K = this.state.selectedKarvyAMC
            params.fundidList.C = this.state.selectedCamsAMC
            this.props.dispatch(CreateBulkJobs(params))
            this.setState({
                isGetCall: true,
                selectedCamsAMC: null,
                selectedKarvyAMC: null,
                camsDropdown: false,
                karvyDropdown: false
            })
        }
    }
    clearNotification(){
        this.props.dispatch({type:'CLEAR_NOTIFICATION', payload: null})
        this.props.dispatch({ type:"CLOSE_NOTIFICATION", payload: null })
        this.props.dispatch({type : 'SUCCESSFULLY_VERIFY_CREDENTIALS', payload : null})
        this.props.dispatch({type:'HIDE_NOTIFICATION', payload: null})
        this.setState({
            isErrorMessage : false,
        })
    }
    selectedBids(){
        let bids = {}
        let selectedRows = Object.values(this.state.selectedRows)
        for (let i = 0; i < selectedRows.length; i++) {
            if (bids.hasOwnProperty(bids[selectedRows[i]['bid']])) {
                delete bids[selectedRows[i]['bid']]
            } else {
                bids[selectedRows[i]['bid']] = selectedRows[i]['bid']
            }
        }
        return bids && Object.values(bids)
    }
    onFileRejection(error){
        this.setState({
            wrongFileType: true,
            showFileSizeError : 'File size should be less than 500 kb',
        }, () => {
            setTimeout(()=> {
                this.closeFileSizeError()
            }, 1000)
        })
    }

    onFileTypeSelection(obj, fldName){
        this.setState({ [fldName]:obj })
    }

    closeFileSizeError(){
        this.setState({
            wrongFileType: false,
            showFileSizeError : null,
        })
        this.props.dispatch({type : 'UPLOAD_FILE_SIZE_BIGGER_THAN_CHECK', payload : false})
    }

    render(){
        return(
            <div class={`formContainerArea whtbackground ${this.state.userListTable && 'fullArea'}`}>
                {!this.state.showOrderFileForm && <Fragment>
                <div class={`filterArea ${this.props.tableLoader ? 'removeDisabled' : ''}`}>
                    <div class="filter-section importSec zIndexUp">
                        <div class="btnsContainer left mNone">
                            {/*<button type="submit" onClick = {() => this.getNewIFAForm()}>Create New IFA</button>
                                                        <div class="orBox">OR</div>*/}
                        </div>

                        {this.state.showSearchFld && <SearchField
                        placeholder = {`${this.state.selectedOpt && this.state.selectedOpt.placeHolder}...`}
                        type = 'search'
                        customClass = 'left fullSize'
                        customParentClass = 'mTopNone'
                        name="domain"
                        onEnterFunction = { (e) => this.onEnterFunction(e) }
                        clearSearchValue = { () => this.clearSearchValue() }
                        showHideCrossBtns = { this.state.showHideCrossBtns }
                        onChangeFunction =  { (e) => this.getNameVal(e) }
                        customTitle = "Search :"
                        metatitle = {'adminIfaSearch'}
                       />}

                        <SearchFilter placeholder ='Select User Type'
                            inputClass = 'input-group-field selector inputgrp'
                            parentClass = 'mTopNone'
                            selectedOpt= {this.state.selectedOpt}
                            onOptionSelection = {(obj) => this.onOptionSelection(obj)}
                            options = {IFA_LOOKUP_SEARCH_OPTIONS}
                            iconClass = "genricFilter"
                            customTitle = "Search in :"
                            metatitle = {'adminIfaSearchIn'}
                        />

                    <div class="btnsContainer left mTop30">
                        <button type="submit" onClick = {() => this.getUserList('addEditIfaTrue')} metatitle = 'adminIfaSearchButton'>Search</button>
                    </div>

                    </div>
                </div>
                {this.state.storeBid &&
                            <div class="assignBid pBtm15">
                                Assign Bid No : {this.state.storeBid}
                            </div>

                        }
                {this.state.userListTable &&
                    <UserListTable
                        userTableData = {this.props.userTableData && this.props.userTableData}
                        userTableList = {(currentPage) => this.userTableList(currentPage)}
                        editAction = {(obj) => this.editAction(obj)}
                        selectedOpt = {this.state.selectedOpt}
                        getNewIFAForm = {() => this.getNewIFAForm()}
                        tableFiltersAction = {(obj, type)=> this.tableFiltersAction(obj, type)}
                        switchOnOff = {(slideBtnVal) => this.switchOnOff(slideBtnVal)}
                        userTableListAPI = {()=> this.userTableListAPI()}
                        selectBoxOptsFunction = {(tableData, customtableData, uniqueRowsId) => this.selectBoxOptsFunction(tableData, customtableData, uniqueRowsId)}
                        selectAll = {(customTableData)=> this.selectAll(customTableData)}
                        unSelectAll = {(customTableData)=> this.unSelectAll(customTableData)}
                        selectedRows = { this.state.selectedRows}
                        uniqueRowsId = {this.state.uniqueRowsId}
                        aumDeleteAllFoliosTxns ={this.props.aumDeleteAllFoliosTxns}
                        searchTableFilterData = {(event, columnKey) => this.searchTableFilterData(event, columnKey)}
				    	clearTableSearchValue = {(clearSearchVal) => this.clearTableSearchValue(clearSearchVal)}
                        param = {this.state.param}
                        tableLoader = {this.props.tableLoader}
                    />
                }
                </Fragment>}
                {/* {this.state.showOrderFileForm &&
                    <Fragment>
                        <div class="filterArea">
                            <div class="gotoBtns"><a onClick={()=> this.goBackFn()} href="javascript:void(0);" metatitle = 'adminIfaOrderFileFormGoBack'>Go Back</a></div> 
                        </div>
                        <div class="managementFormArea">
                             <OrderFilesForm
                                disableCheckboxes={this.state.disableCheckboxes} 
                                onSubmit={(e)=>this.handleSubmit(e)}
                                onDateChange = {(obj,type)=>this.onDateChange(obj,type)}
                                startDate = {this.state.startDate}
                                endDate = {this.state.endDate}
                                sinceFn={(e)=>this.sinceFn(e)}
                                onClickFun = {(sourceId,taskId)=>this.onClickFun(sourceId,taskId)}
                                taskListData = {this.props.taskManagementData&&this.props.taskManagementData.taskListData}
                                isErrorMessage = {this.state.isErrorMessage}
                                camsDropdown={this.state.camsDropdown}
                                karvyDropdown={this.state.karvyDropdown}
                                fundsDataListKarvy={dependencyCheck(this.props.taskManagementData,'fundsDataListKarvy.data')}
                                fundsDataListCams={dependencyCheck(this.props.taskManagementData,'fundsDataListCams.data')}
                                onOptionSelectionAMCList={(obj, type) => this.onOptionSelectionAMCList(obj, type)}
                                selectedKarvyAMC={this.state.selectedKarvyAMC}
                                selectedCamsAMC={this.state.selectedCamsAMC}
                                selectedFileType = {this.state.selectedFileType}
                                onFileTypeSelection={(obj, type) => this.onFileTypeSelection(obj, type)}
                             />
                        </div>
                    </Fragment>
                } */}
            <div class="posRelative">
             {this.props.ifaOnboardStore && this.props.ifaOnboardStore.loaderIfa && ((this.props.ifaOnboardStore.loaderIfa.componentName == 'ifaForm') || this.props.ifaOnboardStore.loaderIfa) &&
             <Loader
                loaderType = 'line'
                loaderWidth = { commonConst.LOADER_WIDTH[2].width }
                loaderHeight = { commonConst.LOADER_WIDTH[2].height }
            />}
            {this.props.ifaOnboardStore && this.props.ifaOnboardStore.deleteArnLoader && this.props.ifaOnboardStore.deleteArnLoader.componentName == 'ARN' &&
              <Loader
                loaderType = 'line'
                loaderWidth = { commonConst.LOADER_WIDTH[2].width }
                loaderHeight = { commonConst.LOADER_WIDTH[2].height }
            />}
                {/* {this.state.IfaFormContainers && <div>
                    <div class="rightContainer fullArea">
                        <div class="formContainer">
                            <div class="formSec">
                                <div class="tabsListingContainer">
                                    <ul>
                                        <li class="backTableContent">
                                          <div >
                                              <span onClick={()=>this.closeIFAFOrm()} class="fl" metatitle = 'adminIfaCloseIfa'>&nbsp;</span>
                                              <div class="cl"></div>
                                          </div>
                                        </li>
                                        <IfaSignUp
                                            openAccordionTabs={(tabName)=> this.openAccordionTabs(tabName)}
                                            openTab={this.props.ifaOnboardStore&&this.props.ifaOnboardStore.tabState}
                                            successFormFrst = {this.state.successFormFrst}
                                            //domainNameValue={(e) => this.getDomainName(e)}
                                            nameValue={(e) => this.getUserName(e)}
                                            signUpData = {this.state.signUpData}
                                            signUpFormDisabled = {this.state.signUpFormDisabled}
                                            //domainName = {this.props.ifaInfoData && this.props.ifaInfoData.data && this.props.ifaInfoData.data[0] && this.props.ifaInfoData.data[0].domain}
                                             uIdFrmUserList = {this.state.uIdFrmUserList}
                                        />
                                        <IFARegistration
                                            openAccordionTabs={(tabName)=> this.openAccordionTabs(tabName)}
                                            openTab={this.props.ifaOnboardStore&&this.props.ifaOnboardStore.tabState}
                                            successFormFrst = {this.state.successFormFrst}
                                            uIdFrmUserList = {this.state.uIdFrmUserList}
                                            ifaRegistrationInfo = {this.state.ifaRegistrationInfo || {domain:this.state.domainNameValue,compName:this.state.userNameValue}}
                                            activeAllForm = {() => this.activeAllForm()}
                                            openCropImage = {(file,fileSrc,logoType)=>this.openCropImage(file,fileSrc,logoType)}
                                            onDomainChange = {(e)=>this.onDomainChange(e)}
                                            fileName = {this.state.fileName}
                                            logoState = {this.state.logoState}
                                            cropMessage = {()=>this.cropMessage()}
                                            isCropMessage = {this.state.isCropMessage}
                                            logoTypeArray = {this.state.logoTypeArray}
                                            logo = {this.props.ifaInfoData && this.props.ifaInfoData.data && this.props.ifaInfoData.data[0] && this.props.ifaInfoData.data[0].logo}
                                            largeLogo = {this.props.ifaInfoData && this.props.ifaInfoData.data && this.props.ifaInfoData.data[0] && this.props.ifaInfoData.data[0].largeLogo}
                                            domain = {this.props.ifaInfoData && this.props.ifaInfoData.data && this.props.ifaInfoData.data[0] && this.props.ifaInfoData.data[0].domain}
                                            domainNameValue={(e) => this.getDomainName(e)}
                                            storeBid = {this.state.storeBid}
                                            onFileRejection = {error => this.onFileRejection(error)}
                                            tableFiltersAction = {(obj, type)=> this.tableFiltersAction(obj, type)}
                                            isSharded ={ this.state.isSharded}
                                            closeIFAFOrm = {()=>this.closeIFAFOrm()}
                                        />
                                        <PreferencesCont 
                                            openAccordionTabs={(tabName)=> this.openAccordionTabs(tabName)}
                                            openTab={this.props.ifaOnboardStore&&this.props.ifaOnboardStore.tabState}
                                            activeAllFrm = {this.state.activeAllFrm}
                                            storeBid = {this.state.storeBid}
                                            openCropImage = {(file,fileSrc,logoType,hideCropper)=>this.openCropImage(file,fileSrc,logoType,hideCropper)}
                                            fileName = {this.state.fileName}
                                            logoState = {this.state.logoState}
                                            customBackground ={this.state.customBackground}
                                            logoTypeArray = {this.state.logoTypeArray}
                                            logo = {this.props.ifaPopupData}
                                            uploadDiff = {this.state.uploadDiff}

                                        />
                                        <ARN
                                            openAccordionTabs={(tabName)=> this.openAccordionTabs(tabName)}
                                            openTab={this.props.ifaOnboardStore&&this.props.ifaOnboardStore.tabState}
                                            activeAllFrm = {this.state.activeAllFrm}
                                            arnInitInfo = {this.state.arnInitInfo}
                                            getArnData = {(e) => this.getArnData(e)}
                                            arnInitFldInfo = {this.state.arnInitFldInfo}
                                            storeBid = {this.state.storeBid}
                                            resetArnNum = { () => this.resetArnNum()  }
                                            arnDeleteAlertBox = {this.state.arnDeleteAlertBox}
                                            deleteArnNoCrossBtn ={(arn)=>this.deleteArnNoCrossBtn(arn)}
                                            closeArnDeleteAlertBox={()=>this.closeArnDeleteAlertBox()}
                                            ifaRegistrationDetails={this.state.ifaRegistrationDetails}
                                            hideAlertBox={this.state.hideAlertBox}
                                            hideAlertBoxFn={()=>this.hideAlertBoxFn()}
                                            resetSearchField = { this.state.resetSearchField}
                                            ArnAllInfoAPI = {() => this.ArnAllInfoAPI()}
                                            excludedArns = {this.state.excludedArns}

                                        />
                                        <ZipPassword
                                            openAccordionTabs={(tabName)=> this.openAccordionTabs(tabName)}
                                            openTab={this.props.ifaOnboardStore&&this.props.ifaOnboardStore.tabState}
                                            activeAllFrm = {this.state.activeAllFrm}
                                            zipPassInitInfo = {this.state.zipPassInitInfo}
                                            storeBid = {this.state.storeBid}
                                            showPassDeleteAlert = {(obj)=>this.showPassDeleteAlert(obj)}
                                            passDeleteAlert = {this.state.passDeleteAlert}
                                            closeAlert = {()=>this.closeAlert()}
                                            uIdFrmUserList = {this.state.uIdFrmUserList}
                                        />
                                        <LevelInfo
                                            openAccordionTabs={(tabName)=> this.openAccordionTabs(tabName)}
                                            openTab={this.props.ifaOnboardStore&&this.props.ifaOnboardStore.tabState}
                                            activeAllFrm = {this.state.activeAllFrm}
                                            uIdFrmUserList = {this.state.uIdFrmUserList}
                                            levelInitialInfo = {this.state.levelInitialInfo}
                                            storeBid = {this.state.storeBid}
                                            levelInfoAPI = {()=> this.levelInfoAPI()}
                                        />
                                        <Smtp
                                            storeBid = {this.state.storeBid}
                                            activeAllFrm = {this.state.activeAllFrm}
                                            openTab={this.props.ifaOnboardStore&&this.props.ifaOnboardStore.tabState}
                                            openAccordionTabs={(tabName)=> this.openAccordionTabs(tabName)}
                                        />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>} */}
                <div class="cl"></div>
                {/* {this.state.cropeImage &&
                <CropImage
                    imageTocrop = {this.state.imageTocrop}
                    closeCropImage = {(file)=> this.closeCropImage(file)}
                    uploadFileFn = {(blob)=>this.uploadFileFn(blob)}
                    outerApiCall = {this.state.outerApiCall}
                    aspectRatio = {this.state.aspectRatio}
                    cropperTitle = {commonConst.CROPPER_TITLE[1].label}
                    resizable = {true}
                    isHideCropper= {this.state.isHideCropper}
                    metatitle = 'adminIfaCropImage'
                />} */}
            </div>
            
                {this.state.passDeleteAlert && <ConfirmPopup
        				sureApply = {(paramVal)=> this.deletePassConfirm(paramVal) }
        				changeMessage = {this.state.changeMessage}
        				errorMessage = {this.state.errorMessage}
                        metatitle = 'adminIfaDeletePassConfirm'
        				/>}
                {this.state.arnDeleteAlertBox && <ConfirmPopup
                        sureApply = {(obj)=>this.deleteArnConfirm(obj) }
                        metatitle = 'adminIfaDeleteArnConfirm'
                />}        
            {this.props.ifaOnboardStore && this.props.ifaOnboardStore.logoUploadData && this.props.ifaOnboardStore.logoUploadData.message && this.props.ifaOnboardStore.notification && <div class={` ${this.props.ifaOnboardStore.notification ? ' sentSuccessFully active ':' sentSuccessFully active errorMsg '}`}>
                {this.props.ifaOnboardStore.logoUploadData && this.props.ifaOnboardStore.logoUploadData.message }
            </div>}
            {this.state.wrongFileType && <div class='sentSuccessFully active errorMsg'>
            {this.state.showFileSizeError ? this.state.showFileSizeError : 'Error!!! Only PNG files are allowed.'}
            <span class="close" onClick ={(event)=> this.closeFileSizeError() } metatitle = 'adminIfaCloseFileSizeError'></span>
            </div>}
            { this.props.ifaAdminData && this.props.ifaAdminData.notificationStatus && 
                <div class={`sentSuccessFully active ${this.props.ifaAdminData.errorNotification? 'error': ''} `}>
                    {this.props.ifaAdminData.notificationStatus} 
                    <span class="close" onClick= {()=> this.clearNotification()} metatitle = 'adminIfaAdminDataNotification'></span>
                </div> 
            }
            {/* { this.props.ifaOnboardStore.ifaNotificationData && this.props.ifaOnboardStore.ifaNotificationData.message && 
                    <div class={`sentSuccessFully active ${this.props.ifaOnboardStore.ifaNotificationData.status==-1? 'error': ''} `}>
                        {this.props.ifaOnboardStore.ifaNotificationData.message} 
                    <span class="close" onClick= {()=> this.clearNotification()} metatitle = 'adminIfaOnboardStoreNotification'></span>
                </div> } */}
                    { this.props.unFreezeFolio && this.props.unFreezeFolio.notification &&
                    <div class={`sentSuccessFully active ${this.props.unFreezeFolio.errorMsg? 'error': ''} `}>
                        {this.props.unFreezeFolio.notification} 
                        <span class="close" onClick= {()=> this.clearNotification()} metatitle = 'adminIfaUnFreezeFolioNotification'></span>
                    </div> 
                }
            </div>
        )
    }
}

const mapStateToProp = (state) =>{
    return {
        ifaSignUpDetails: state.adminFormsReducers && state.adminFormsReducers.ifaSignUpData.data,
        ifaRegistrationDetails: state.adminFormsReducers && state.adminFormsReducers.ifaRegistrationData.data,
        // userTableData: state.adminFormsReducers && state.adminFormsReducers.userTableData,
        // ifaInfoData: state.adminFormsReducers && state.adminFormsReducers.ifaInfoData,
        userTableData: state.ifaLookup && state.ifaLookup.userTableData,
        ifaTableLoader: state.ifaLookup && state.ifaLookup.loading,
        arnInfoData: state.adminFormsReducers && state.adminFormsReducers.arnInfoData,
        rtaPassInfoData: state.adminFormsReducers && state.adminFormsReducers.rtaPassInfoData,
        levelInitialData: state.adminFormsReducers && state.adminFormsReducers.levelInitialData,
        ifaOnboardStore: state.adminFormsReducers,
        pageSize: state.user.theme && state.user.theme.pageSize,
        taskManagementData : state.taskManagement,
        ifaAdminData:state.reportAdmin,
        taskManagementData : state.taskManagement,
        unFreezeFolio: state.adminSearchReducers,
        aumDeleteAllFoliosTxns :state.aumDeleteAllFoliosTxns && state.aumDeleteAllFoliosTxns.loaderAumDelFolioTxn,
        shardMeNotification : state.adminSearchReducers && state.adminSearchReducers.shardMeNotification,
        // tableLoader: state.loader.tableLoader,

    }
}
const mapDispatchToProp = (dispatch) =>{
    return {dispatch:dispatch }
}

export default connect(mapStateToProp, mapDispatchToProp)(IFAOnBoarding);
