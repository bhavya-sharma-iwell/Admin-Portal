import axios from 'axios'
// import {logout} from '../../actions/user'
import SessionData from 'adminApp/utils/sessionData'
import * as commonConst from 'adminApp/constants'
import moment from 'moment'
import { EncryptData } from 'adminApp/utils/encryption'
import {CHECK_FOR_MAINTAINANCE} from 'adminApp/constants'

export const config = function(store){
  var setIntervalId;
  var onGoingApiCallCount = 0;
  
  let addClientIdToRequestParam = (param={}) =>{
  	let obj = param;
  	let uid = SessionData.parseAndGetItem('uid');
  	if(typeof obj.investorUid !=undefined)
  	obj.investorUid = uid;
  	if(!obj.selectedUser){
		obj.selectedUser ={uid:uid,levelNo:SessionData.parseAndGetItem('levelNo')};
  	}
  	return obj;
  }

  var updateLoaderInterval = function() {
  	if(setIntervalId){
  		clearInterval(setIntervalId)
  	}
		 setIntervalId = setInterval(function(){
			let pageProgress = 0;
			if(store.getState().config){
				pageProgress = store.getState().config.pageProgress+25;
			}
			if(pageProgress+25 >100){
					pageProgress =100;
					clearInterval(setIntervalId)
			}

			store.dispatch({type:"UPDATE_LOADER",payload:{onGoingApiCallCount:onGoingApiCallCount}})
		},3000)
	};

	axios.interceptors.request.use(function(config) {

		if(config && config.url){
			config.url = config.url.replace('/api/', '/webapi/')
		}
		let userReducer = store.getState() && store.getState().user
		let urlFounded = commonConst.URL_ARRAY.find((obj)=>{
			if(config.url == obj.url){
				return true
			}
		})
		if(urlFounded){
			return config
		}
		let currentState = store.getState();
		onGoingApiCallCount++

		if(currentState.user.user&&currentState.user.user.userType !="client"){
			if(config.data){
				config.data = addClientIdToRequestParam(config.data) 
			}
			else{
				config.params=addClientIdToRequestParam(config.params)
			}
		}

		store.dispatch({type:"UPDATE_LOADER",payload:{onGoingApiCallCount:onGoingApiCallCount}});

		var apiCallTime = new Date();
		var getActualTime = apiCallTime.getTime()
		if (getActualTime) {
			SessionData.setLocalItem('getActualTime', getActualTime);
			store.dispatch({type:"LAST_API_CALL_TIME",payload:getActualTime});
		}

		//updateLoaderInterval();

		let removeUnsecureChar = function(obj){
			for (const key in obj) {
			    if(obj.hasOwnProperty(key)){
			    	if(typeof (obj[key]) == 'object'){
	                   removeUnsecureChar(obj[[key]]);
			    	}
			    	else{
			    		if(typeof obj[key] =="string"){
			    			obj[key] = obj[key].replace(/\~|\`|\<|\>|\{|\}|\%|\^/g,"");
	                   		obj[key] = obj[key].trim();
			    		}
	                   }
			    }
			}
		}

		if(config.method =="POST"&&config.data){
			let obj = JSON.parse(config.data);
			//obj.dublicate = {a:"hgagg~~~~~>><><><",tt:{b:"dghgsg><>`~$%^"}}
			removeUnsecureChar(obj);
			config.data = JSON.stringify(obj);
		}
		let refreshKey
		let refreshData = (getMomentInitial) => {
			refreshKey = getMomentInitial ? getMomentInitial : moment()
			store.dispatch({type:"ADD_REFRESH_KEY",payload:refreshKey});
			SessionData.setItem('moment', refreshKey)
		}
		if( (config.method == 'post') || ( (config.method == 'get') && (config.url=="/webapi/auth/getLoggedInUser") )){
			refreshData()
		}

		if(config.method == 'get'){
				if(!config.params){
					config.params={}
				}
				if (config && config.params) {
					if (config.params.getNewData) {
						userReducer.refreshKey = moment()
						refreshData(userReducer.refreshKey)
					}
					if (config.params.componentForLoader) {
						delete config.params.componentForLoader
					}
				}
				if(userReducer && userReducer.refreshKey){
				   config.params['refreshKey'] = userReducer.refreshKey
				}
				else{
					 refreshKey = SessionData.parseAndGetItem('moment')
					if(refreshKey){
						config.params['refreshKey'] = refreshKey
					}	
			}
		}
		let addViewActionType = userReducer && userReducer.addViewActionType || {}
		if(config.method =="post"){
			if (addViewActionType && addViewActionType.featureNo && addViewActionType.actionType) {
				let authCheck = `{"featureTag":"${addViewActionType.featureNo}", "method":"${addViewActionType.actionType}"}`
				config.headers['view-state'] = EncryptData(authCheck)
			}
			if(userReducer && userReducer.recaptchaToken){
				if(!config.data){
					config.data={}
				}
				config.data["g-recaptcha-response"] = userReducer.recaptchaToken
				setTimeout(()=>{store.dispatch({ type: "SAVE_RECAPTCHA_TOKEN", payload: null })}, 500 )
			}
			if (config.data && config.data.componentForLoader) {
				delete config.data.componentForLoader
			}
		}
		return config;
 	})

	axios.interceptors.response.use(response => {
		clearInterval(setIntervalId)
		--onGoingApiCallCount
		store.dispatch({type:"UPDATE_LOADER",payload:{onGoingApiCallCount:onGoingApiCallCount}});
		if(response.data&&response.data.status==-2){
			store.dispatch({ type: "SHOW_RECAPTCHA_POPUP", payload: 1 }); 

			let head = document.getElementsByTagName("head")[0]
	  		let script = document.createElement("script")
	  		script.src = "https://www.google.com/recaptcha/api.js"
	  		head.appendChild(script)
		}
		return response.data;
	}, error => {
		if (error.config.url && !(error.config.url.includes('checkSystemAvailability')) && (CHECK_FOR_MAINTAINANCE.includes(error.response.status))) {
			// check for maintainance
			store.dispatch({ type: "CHECK_FOR_MAINTAINANCE", payload: true })
		}
		let errorStatus = 'Error: Request failed with status code 401'
		if(error.status==401 || error == errorStatus)
		{
			alert('Please clear your cookies/cache from browser, if you are facing trouble with the application')
			// store.dispatch(logout());
			window.location = "#/login"
			location.reload();
		}

  		return error;
	});
}

export default config;