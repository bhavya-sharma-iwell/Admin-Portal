import React from 'react'

export const NumberOnlyFormat = (e) =>{
	if ([69, 187, 188, 189, 190].includes(e.keyCode)) {
        e.preventDefault();
    }
}


export const NumberOnlyTypeText = (e) => {
    e = (e) ? e : window.event;
      var charCode = (e.which) ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
          return false;
      }
      return true;
}

export default NumberOnlyFormat;