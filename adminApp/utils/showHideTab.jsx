export const ShowHideTab = (obj,levelNo, exchange) => {
	let sideBarObj = obj && obj.isNotAllowedFor;
	if( sideBarObj && (levelNo) ){
		for(let i=0;i<sideBarObj.length;i++){
		 	if( (sideBarObj[i]=="allLevels") || (sideBarObj[i]<levelNo) || (sideBarObj[i]=='hideForExchange' && exchange ==1 ) ){
				return false;
			}
		}
	}
	return true;
}