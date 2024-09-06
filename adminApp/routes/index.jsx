import React,{useEffect} from 'react'
import { BrowserRouter,Route, Routes, Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { getUserData } from '../redux/userSlice';
// import Loader from 'app/components/loaders'
// import { USER_TYPE } from 'app/constants'
// import { LOADER_WIDTH } from 'app/constants/shared/commonConst'
// import * as commonConst from 'app/constants/shared/commonConst'

// const Loading = () => <div class='posRelative cl loaderMinHeight initialLoader'>
//         <Loader
//           loaderType = 'line'
//         //   loaderWidth = { LOADER_WIDTH[3].width }
//         //   loaderHeight = { LOADER_WIDTH[3].height }
//         //   loaderMessage = {commonConst.CAPTION_MESSAGE[2].label}
//         />
//       </div>

// const Admin = Loadable({
//   loader: () => import('adminApp/features'),
//   loading: Loading,
// })

// const SearchSoa = Loadable({
//   loader: () => import('adminApp/features/searchSoa'),
//   loading: Loading,
// })
// const SearchRejection = Loadable({
//   loader: () => import('adminApp/features/searchRejection'),
//   loading: Loading,
// })
// const IFAOnBoarding = Loadable({
//   loader: () => import('adminApp/features/IFAOnBoarding'),
//   loading: Loading,
// })
// const AUMReconcilation = Loadable({
//   loader: () => import('adminApp/features/aumReconcilation'),
//   loading: Loading,
// })
// const FundsAndSchemes = Loadable({
//   loader: () => import('adminApp/features/systemData'),
//   loading: Loading,
// })
// const DuplicateTxns = Loadable({
//   loader: () => import('adminApp/features/duplicateTxns'),
//   loading: Loading,
// })
// const RejectionContainer = Loadable({
//   loader: () => import('adminApp/features/misMatch'),
//   loading: Loading,
// })
// const HandleException = Loadable({
//   loader: () => import('adminApp/features/handleException'),
//   loading: Loading,
// })
// const OneViewTable = Loadable({
//   loader: () => import('adminApp/features/report/oneViewReport/oneViewTable'),
//   loading: Loading,
// })
// const TaskManagement = Loadable({
//   loader: () => import('adminApp/features/taskManagement'),
//   loading: Loading,
// })

// const FixedAsset = Loadable({
//   loader: () => import('adminApp/features/systemData/fixedAsset'),
//   loading: Loading,
// })
// const ArnMapping = Loadable({
//   loader: () => import('adminApp/features/arnMapping'),
//   loading: Loading,
// })
// const DeleteBroker = Loadable({
//   loader: () => import('adminApp/features/settings/deleteBroker'),
//   loading: Loading,
// })
// const SearchFolio = Loadable({
//   loader: () => import('adminApp/features/searchFolio'),
//   loading: Loading,
// })
// const SOADownload = Loadable({
//   loader: () => import('adminApp/features/dataManagement/SOADownload'),
//   loading: Loading,
// })
// const OrdersCont = Loadable({
//   loader: () => import('adminApp/features/orders'),
//   loading: Loading,
// })
// const EmailLog = Loadable({
//   loader: () => import('adminApp/features/dataManagement/emailLog'),
//   loading: Loading,
// })

// const SipReconciliation = Loadable({
//   loader: () => import('adminApp/features/sipReconciliation'),
//   loading: Loading,
// })

// const CompleteSchemeDetails = Loadable({
//   loader: () => import('adminApp/features/systemData/completeSchemeDetails'),
//   loading: Loading,
// })

// const FileImportHistory = Loadable({
//   loader: () => import('adminApp/features/dataManagement/fileImport'),
//   loading: Loading,
// })

// const BrokerageDataReport = Loadable({
//   loader: () => import('adminApp/features/brokerageDataReport'),
//   loading: Loading,
// })

// const FileStatus = Loadable({
//   loader: () => import('adminApp/features/analytics/fileStatus'),
//   loading: Loading,
// })

// const CronInfo = Loadable({
//   loader: () => import('adminApp/features/cronInfo'),
//   loading: Loading,
// })

// const CronTab = Loadable({
//   loader: () => import('adminApp/features/analytics/cronTab'),
//   loading: Loading,
// })

// const CronHistory = Loadable({
//   loader: () => import('adminApp/features/cronHistory'),
//   loading: Loading,
// })

// const CorporateActions = Loadable({
//   loader: () => import('adminApp/features/systemData/corporateActions'),
//   loading: Loading,
// })
// const DataDeletionModule = Loadable({
//   loader: () => import('adminApp/features/dataDeletionModule'),
//   loading: Loading,
// })
// const ApiCredential = Loadable({
//   loader: () => import('adminApp/features/createCredentials/apiCredentials'),
//   loading: Loading,
// })
// const SubUserCredential = Loadable({
//   loader: () => import('adminApp/features/createCredentials/subUserCredentials'),
//   loading: Loading,
// })

// const LoginHistory = Loadable({
//   loader: () => import('adminApp/features/loginHistory'),
//   loading: Loading,
// })

// const MobileAppStatus = Loadable({
//   loader: () => import('adminApp/features/analytics/mobileAppStatus'),
//   loading: Loading,
// })


  const About = () => (
    <>
      <div>About PAGE</div>
      <Link to='/adminApp/home'>MY home</Link>
    </>
  );

  const Home = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
      console.log('Home component mounted');
      dispatch(getUserData());
    }, []);
    
    return <div>Home Page</div>;
  };
  

const AdminInfoRoutes =  () =>{
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/adminApp/about" element={<About />} />
            <Route path="/adminApp/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
  )
}

export default AdminInfoRoutes;

// <Route path='/admin/searchSoa' component={SearchSoa} />
//         {/* <Route path='/admin/searchRejection' component={SearchRejection} /> */}
//         <Route path='/admin/aumReconciliation' component={AUMReconcilation} />
//         <Route path='/admin/ifaLookup' component={IFAOnBoarding} />
//         <Route path='/admin/systemData/fundsAndSchemes' component={FundsAndSchemes} />
//         <Route path='/admin/mismatchRejections/:rejectionType' component={RejectionContainer} />
//         <Route path='/admin/duplicateTxns'><DuplicateTxns/></Route>
//         <Route path='/admin/handleException' component={HandleException} />
//         <Route path='/admin/analytics/report/oneViewReport' component={OneViewTable} />
//         <Route path='/admin/taskManagement' component={TaskManagement} />
//         {/*<Route path='/admin/systemData/fdAndOtherAssets' component={FixedAsset} />*/}
//         <Route path='/admin/arnMapping' component={ArnMapping} />
//         <Route path='/admin/settings/deleteBroker' component={DeleteBroker} />
//         <Route path='/admin/searchFolio' component={SearchFolio} />
//         <Route path='/admin/dataManagement/SOADownload' component={SOADownload} />
//         <Route path='/admin/orders' component={OrdersCont} />
//         <Route path='/admin/dataManagement/emailLog' component={EmailLog} />
//         <Route path='/admin/sipReconciliation' component={SipReconciliation} />
//         <Route path='/admin/systemData/completeSchemeDetails' component={CompleteSchemeDetails} />
//         <Route path='/admin/dataManagement/importHistory' component={FileImportHistory} />
//         <Route path='/admin/brokerageDataReport' component={BrokerageDataReport} />
//         <Route path='/admin/analytics/fileStatus' component={FileStatus} />
//         <Route path='/admin/analytics/cronInfo' component={CronInfo} />
//         <Route path='/admin/analytics/cronTab' component={CronTab} />
//         <Route path='/admin/analytics/cronHistory' component={CronHistory} />
//         <Route path='/admin/systemData/corporateActions' component={CorporateActions} />
//         <Route path ='/admin/dataDeletionModule/' component={DataDeletionModule} />
//         <Route path='/admin/createCredential/apiCredential' component={ApiCredential} />
//         <Route path='/admin/createCredential/subUserCredential' component={SubUserCredential} />
//         <Route path='/admin/loginHistory' component={LoginHistory} />
//         <Route path='/admin/analytics/mobileAppStatus' component={MobileAppStatus} />