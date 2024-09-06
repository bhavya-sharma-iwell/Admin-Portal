import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import SideBarLeft from 'adminApp/components/sidebar'
import Profile from 'adminApp/components/header/userProfile'
// import {GetUserTheme, logout, stillAlive, GetUserData} from 'app/actions/user'
import Loader from 'adminApp/components/loaders'
import { LOADER_WIDTH } from 'adminApp/constants'
import ErrorBoundary from 'adminApp/components/alert/errorBoundary'
import Cookie from 'adminApp/utils/Cookie'
import { USER_TYPE , DOCS_LOCATION_DOMAIN, INVESTWELL_LOGOS, INVESTWELL_CLOUD_IMAGES, INVESTWELL_SMALL_LOGOS} from 'adminApp/constants'
import {CheckImageExists} from 'adminApp/utils/dataFormater'
import SubscriptionInfo from 'adminApp/components/header/subscriptionInfo'
import AdminInfoRoutes from '../routes'
import getUserData from '../redux/userSlice'

export class Admin extends Component{
    constructor(props){
        super(props);
        console.log('****************44444444441*')
        this.state = {currentStatus: 'true', sessionStatus: 'true',
                      leftSidebarFlag:false,selectedTab:{},selectedSubTab:{},
                      openMainTabFlag:true,
                      loadThemeCss : true,
                      updateFabIcon : true,
                    }
        //Load CSS file...
    let version = new Date().getTime()
      let cssLink= document.getElementById('loadCSS');
      cssLink.href =`/app/media/css/admin/admin.css?v=5`
    }
    componentDidMount(){
        this.props.dispatch(getUserData())
        if( (this.props.loginStore.user && this.props.loginStore.user.userType) != USER_TYPE.admin){
            this.logoutUser()
        }
    }
    logoutUser(clearIntervalLog){
        // this.props.dispatch(logout());
        this.props.dispatch({type:'SESSION_TIMEOUT_FLAG', payload: false})
        clearInterval(clearIntervalLog)
        sessionStorage.clear();
    }
    setSelectedTab(tab={},subTab={}){
        this.setState({selectedSubTab :subTab,selectedTab:tab})
  
    }
    toggleLeftSidebar(flag){

        this.setState({leftSidebarFlag:!this.state.leftSidebarFlag})
        if(typeof flag != 'undefined'){
          this.setState({leftSidebarFlag:flag})
  
        }
    }
    toggleFuntion(tab){
        this.setState({parentTab:tab})
        if(this.state.selectedTab.value!=tab.value){
           this.setState({selectedTab: tab,openMainTabFlag:true}) 
        }
        else{
         this.setState({openMainTabFlag:!this.state.openMainTabFlag})
         }
       }
    UNSAFE_componentWillReceiveProps(newProps){
        if( this.state.loadThemeCss){
            let themeCssLink = document.getElementById('loadThemeCSS')
            themeCssLink.href =''
            this.setState({
              loadThemeCss : false
            })
          }
        if(newProps.loginStore && newProps.loginStore.user && newProps.loginStore.user.userType && !sessionStorage.getItem('localUrl')){
            if(sessionStorage.getItem('previousURLBeforeLogout')){
                let previousURL = sessionStorage.getItem('previousURLBeforeLogout').replace(/"/g,"").split('#')[1]
                  sessionStorage.removeItem('previousURLBeforeLogout');
                window.location.href = '#' + previousURL
            }else{
                if(Cookie.getCookie('c_ux')){
                    if(!sessionStorage.getItem('localUrl')){
                        if((window.location.href.split('#')[1].split('/')[1] == 'login' )){
                            window.location.href = '#/admin/ifaLookup'
                        }
                        else{
                            window.location.href = '#'+window.location.href.split('#')[1]
                        }
                    }
                }
            }
            sessionStorage.setItem('localUrl',true)
            sessionStorage.removeItem('previousURLBeforeLogout')
        } 
        if(this.state.updateFabIcon && (this.props.loginStore && this.props.loginStore.user && this.props.loginStore.user.userType) ){
            let favElement = document.getElementById("favicon");
            let path = `${DOCS_LOCATION_DOMAIN}/${INVESTWELL_CLOUD_IMAGES}/${INVESTWELL_LOGOS}/${INVESTWELL_SMALL_LOGOS}/admin_Logo.ico`
            this.setState({ updateFabIcon : false }, CheckImageExists(path,function(existsImage){
              if(existsImage){
                favElement.href=path
              }
            }))
          }  
    }
    editProfile(){ }

    render(){
        let newChild="";
        if(this.props.children){ 
            newChild  =  React.cloneElement(this.props.children, {
            pageName:this.props.children.props.params.param&&this.props.children.props.params.param.split('=')[1],
            setSelectedTab : (e,f) => this.setSelectedTab(e,f),
            toggleLeftSidebar : (flag) => this.toggleLeftSidebar(flag)
            })
        } 
        return(
            <Fragment>
            <SubscriptionInfo
                userInfo = {this.props.firstLoginInfo && this.props.firstLoginInfo.user}
                metatitle = 'adminHeader'
            />
            <div class="main-body " >
            <ErrorBoundary>
            <div id="hideAfterLoad" style={{width:'100%', height:'100%',background:'white',position:'fixed',left:'0',top:'0', zIndex:'99999'}}>Loading...</div>   
             {
            //  this.props.loginStore && this.props.loginStore.loaderLogout && this.props.loginStore.loaderLogout.componentName == 'logout' &&
                <Loader 
                    loaderType = 'line'
                    loaderWidth = { LOADER_WIDTH[2].width }
                    loaderHeight = { LOADER_WIDTH[2].height }
                    zIndexUpThreelevel = 'zIndexUpThreelevel'
                         />}
                <SideBarLeft
                
                    toggleFuntion = {(showHide)=> this.toggleFuntion(showHide)}
                    selectedTab={this.state.parentTab || this.props.loginStore &&this.props.loginStore.setSelectedTab&&this.props.loginStore.setSelectedTab.parentTab}
                    selectedSubTab = {this.props.loginStore &&this.props.loginStore.setSelectedTab&&this.props.loginStore.setSelectedTab.childTab}
                    leftSidebarFlag={this.state.leftSidebarFlag}
                    openMainTabFlag = {this.state.openMainTabFlag}
                    userInfo = {this.props.firstLoginInfo && this.props.firstLoginInfo.user}
                
                >
                    
                </SideBarLeft>
                <div class = {`right-side-box right ${this.state.leftSidebarFlag&& 'extra-box '}`} >
                    <Profile
                        selectedSubTab = {this.state.selectedSubTab}
                        selectedTab = {this.state.selectedTab}
                        logoutUser={()=>this.logoutUser()}
                        toggleLeftSidebar = {() => this.toggleLeftSidebar()}
                        editProfile={()=>{this.editProfile()}}
                        metatitle = 'admin'
                    >                        
                    </Profile>
                    
                    <div class="right-main-box">
                    <h2>Welcome to Investwell Admin Panel !!! </h2>
                        <AdminInfoRoutes/>
                    </div>
                </div>
            </ErrorBoundary>
            </div>
            </Fragment>
        )
    }
}


// const mapStateToProps = (state) => {
//     return {
//       userTheme: state.userReducer.theme,
//       sessionTimeOutFlag: state.dashboardReducer.sessionTimeOut,
//       firstLoginInfo : state.userReducer,
//       loginStore: state.userReducer
//     }
// }

// export default connect(mapStateToProps,) (Admin);
export default Admin