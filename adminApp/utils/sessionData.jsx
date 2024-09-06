export const SessionData = {
	setItem: function(name, value){
			if(value)
				sessionStorage.setItem(name,JSON.stringify(value))
		
	},
	parseAndGetItem: function(name){
		if(sessionStorage.getItem(name))
			return JSON.parse(sessionStorage.getItem(name)); 
		return;
	//	 return JSON.parse(sessionStorage.user)[name];

    },
    setLocalItem: function(name, value){
		if(value)
			window.localStorage.setItem(name,JSON.stringify(value))
		
	},
	parseAndGetLocalItem: function(name){
		if(localStorage && localStorage.getItem(name))
			return JSON.parse(localStorage.getItem(name)); 
		return;
    },

    deleteItem: function (name) {
    	if(name && localStorage)
			localStorage.removeItem(name) 
    },

    deleteSessionItem: function (name) {
    	if(name)
			sessionStorage.removeItem(name)
    }
    
}
export default SessionData;