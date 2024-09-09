import { PAGES_TITLES } from 'adminApp/constants'

export const SetPageTitle = (param) =>{
 	let currentPage = location.hash;
 	let max_length = -1;
	for(let i=0; i<PAGES_TITLES.length;i++){
		if(currentPage.includes(PAGES_TITLES[i].url)&&currentPage.length>max_length){
			max_length = currentPage.length;
			document.title = PAGES_TITLES[i].title;
		}
	}
}

export const HtmlOpenPopUp = (data,download) => {
    setTimeout(()=> {
    	var myWindow = window.open('', 'Bse Payment Response', 'height=4000,width=6000');
        myWindow.document.write('<html><head><title>Bse Payment Response</title>');
        myWindow.document.write('</head><body >');
        myWindow.document.write(data);
        myWindow.document.write('</body></html>');
        myWindow.document.close(); // necessary for IE >= 10
    
	    if(download){
	        myWindow.onload=function(){ // necessary if the div contain images

	            myWindow.focus(); // necessary for IE >= 10
	            myWindow.print();
	            myWindow.close();
	        }
	    }
    }, 1000)
}

export const toCamelCase = str => {
	String.prototype.toCamelCase = function() {
	    return this.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
	        if (p2) return p2.toUpperCase();
	        return p1.toLowerCase();        
	    });
	}

	return str && str.toCamelCase()
}

export default SetPageTitle
