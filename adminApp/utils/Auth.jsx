import React from 'react'
import Cookie from './Cookie'
import {connect} from 'react-redux'
// import * as userAuthInfo from 'app/actions/user';  5 lines
import Loader from 'adminApp/components/loaders'
import { LOADER_WIDTH } from 'adminApp/constants'
import SessionData from 'adminApp/utils/sessionData'
import { dependencyCheck } from 'adminApp/utils/dataFormater'
class AuthenticateUser extends React.Component {
  logOutCheck=null
  constructor(props){
    super(props);
    if(Cookie.getCookie('c_ux')){
      // this.props.dispatch(userAuthInfo.GetUserData());
    }
    else {
      // props.dispatch(userAuthInfo.logout(this.logOutCheck));
    }
    this.state = {}
  }

  UNSAFE_componentWillMount() {
    const { dispatch, currentURL,lastApiCallTime } = this.props;
    let lastApiCall
    let websiteAndCustomUrl= ((this.props.userTheme && (this.props.userTheme.website && this.props.userTheme.allowSSOLogin == 1)) && this.props.ssoToken) ? this.props.userTheme.website : this.props.userTheme &&this.props.userTheme.customURL

    if(Cookie.getCookie('c_ux')){
      this.logOutCheck = setInterval(
        () =>{
        if (SessionData.parseAndGetLocalItem('getActualTime')) {
          lastApiCall = SessionData.parseAndGetLocalItem('getActualTime')
        }      
        if (lastApiCall > 0) {
          var currentTime = new Date();
          var timeDiff = currentTime - lastApiCall;
          var getSeconds = (timeDiff / 1000) ;
          var getMinutes = getSeconds / 60; 
          var actualTimeDifferInMinutes = getMinutes
          if(Cookie.getCookie('reAuth') &&  actualTimeDifferInMinutes >26.5 ){
            // this.props.dispatch(userAuthInfo.stillAlive())
          }
          if (actualTimeDifferInMinutes > 27 ) {
            dispatch({type:"SESSION_TIMEOUT_FLAG",payload:true})
          }else{
            if (this.props.sessionTimeOutFlag) {
              dispatch({type:"SESSION_TIMEOUT_FLAG",payload:false})
            }
          }
        }
        if (!Cookie.getCookie('c_ux')) {
          localStorage.oldRedirectURL = currentURL;
          clearInterval(this.logOutCheck)
          // if(this.props.user&&this.props.user.name)
            // this.props.dispatch(userAuthInfo.logout(websiteAndCustomUrl,this.props.ssoToken));
          } 
        },3000)
    }
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    // added to prevent user opening features by copy paste url if that featuure is not allowed in featureList for client and broker routes

    if (dependencyCheck(newProps.userdata, 'addViewActionType.featureNo') != dependencyCheck(this.props.userdata, 'addViewActionType.featureNo')) {
      const feature = newProps.userdata.addViewActionType.featureNo
      if (newProps.user && (['broker', 'client'].includes(newProps.user.userType)) && feature && (newProps.userdata && newProps.userdata.allowedFeatureList) && (!(newProps.userdata.allowedFeatureList[feature]))) {
        window.location.hash = `#/${newProps.user.userType}/dashboard`
      }
    }
  }

  componentWillUnmount(){
    clearInterval(this.logOutCheck)
  }

  checkUserRole(){
    let user = this.props.user;
    if(Cookie.getCookie('c_ux')){
    }
    return true;
  }

  render() {

    if(this.props.user && this.props.user.uid){
      if (this.checkUserRole()) {
        return this.props.children;
      } 
      else {
        return null
      }
    }
    else{
      return <span>
      <Loader 
      loaderType = 'line'
      loaderWidth = { LOADER_WIDTH[2].width }
      loaderHeight = { LOADER_WIDTH[2].height }
      />
      </span>
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    currentURL: ownProps.location&&ownProps.location.pathname,
    lastApiCallTime: state.userReducer.lastApiCallTime,
    user:state.userReducer.user,
    userdata :state.userReducer,
    ssoToken :state.userReducer && state.userReducer.SSOuser && state.userReducer.SSOuser.SSOToken,
    sessionTimeOutFlag: state.dashboardReducer.sessionTimeOut,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AuthenticateUser)

