import React from 'react'
import CustomSelectLi from './customSelectLi'
import {connect} from 'react-redux'
import Loader from '../loaders'
import { LOADER_WIDTH, typingPauseTimingForSearch } from '../../constants'
import {maskUserData} from '../../utils/dataFormater'
class SearchFilter extends React.Component{
  labelName;
  valueName; 
  hideDropdownSearchField;

  constructor(props){
    super(props)
    let selectedOpt = props.selectedOpt||{};
    let clonedSelectedOpt = props.selectedOpt||{};
    this.labelName = props.labelName||'label'
    this.valueName = props.valueName||'value'
    let newSelectedOpt = {}
    if (typeof selectedOpt != 'object' || selectedOpt == null) {
        newSelectedOpt[this.labelName] = selectedOpt
        newSelectedOpt[this.valueName] = selectedOpt
    }

    selectedOpt = this.defaultSelectOption(selectedOpt);
    selectedOpt.index = 0
    this.hideDropdownSearchField = true
    this.state = {options:props.options,
                //selectedOpt:selectedOpt,
                selectedOpt:Object.assign({}, selectedOpt),
                searchFilterFlags:{isDropDownOpen:props.isOpen,selectedLi:1},
                keepDropDownOpenOnEnter: props.keepDropDownOpenOnEnter,
                resetDefault: props.resetDefault,
                isKeyPressOverlay: false,
                scrollDown: 36,
                savedIndex:0,
                multiSelectedOptions: {},
                clonedSelectedOpt,
                displayAllOpts : true,
                elementHeight:36,
              }
              setTimeout(()=> {
              this.i
              }, 2000)
  }
  componentDidMount(){
    if (!this.props.hideFocus) {
      setTimeout(() => {
        this.input && this.input.focus()
      }, 100)
    }
  }

  UNSAFE_componentWillReceiveProps(newprops){
    if (this.props.selectedOpt && (typeof newprops.selectedOpt == 'undefined')) {
      this.setState({selectedOpt:newprops.selectedOpt})
    }
    if( (newprops.options && newprops.options.length) && (!this.state.setDefaultAllSelect) && (this.props.isMultipleSelect && this.props.isDefaultAllSelected) ){
     this.selectAllOpt(newprops.options)
      this.setState({
        isAllSelect: true,
        setDefaultAllSelect:true
      })
    }
      
    if(newprops.resetDefault){
      this.labelName = newprops.labelName||'label'
      this.setState({
        selectedOpt : newprops.selectedOpt,
        resetDefault: newprops.resetDefault
      })
    }
    if(newprops.labelName !=this.props.labelName)
    this.labelName = newprops.labelName
    if(newprops.valueName !=this.props.valueName)
    this.valueName = newprops.valueName
    if(newprops.options!=this.props.options){
      this.setState({options:newprops.options}) 
    }
    if( newprops.selectedOpt &&
      ( (this.props.selectedOpt && this.props.selectedOpt[this.labelName] ) != newprops.selectedOpt[this.labelName]) ){
        this.setState({selectedOpt:newprops.selectedOpt})
    }
    // if (newprops.isOpen && this.input) {
    //   this.input.focus()  
    // }
    
    //use for clearDropDown search when leave current page
    if(newprops.resetSearchField && this.input &&this.input.value){
      this.input.value = null
      this.setState({
        showHideCrossBtns: false,
        options: this.props.options
      })
    }

    if(newprops.allowEnteredValue &&( ( (!this.props.isSearchEnable) 
    && (this.state.options && this.state.options.length<=0) ) || 
    ( this.props.isSearchEnable && (this.input && this.input.value && (this.input.value.length >=3) && this.state.options && this.state.options.length<=0))
     ))
    {
      let selectedOpt = {}
      selectedOpt[this.labelName] = this.input.value;
      selectedOpt[this.valueName] = this.input.value;
      this.props.onOptionSelection(selectedOpt)
      this.setState({
        selectedOpt,
      })
    }
    //End use for clearDropDown search when leave current page

  }

  defaultSelectOption(selectedOpt){
    if(typeof selectedOpt !='object'){
      let matchedOpt = this.props.options && Array.isArray(this.props.options) && this.props.options.filter && this.props.options.filter((obj,index)=>(obj[this.valueName] == selectedOpt||obj[this.labelName] == selectedOpt))
      return (matchedOpt && matchedOpt[0]?matchedOpt[0]:selectedOpt)  
    }
    //this.props.onOptionSelection(selectedOpt)
    return selectedOpt

    
  }
  
    removeSpecialChar(str) {
      return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    filterSuggestion(event, calledFrom) {
      let selectedOpt = this.state.selectedOpt || {};
      
      //selectedOpt[this.labelName] = event.target.value ? event.target.value : selectedOpt[this.labelName]
      if(typeof selectedOpt == 'object'){
        selectedOpt.index = 0;     
      }
      let filterValue = this.removeSpecialChar(event.target.value)
      const regex = new RegExp(filterValue, 'i');
      const filtered = this.props.options && Array.isArray(this.props.options) && this.props.options.filter((datum)=> {
        datum[this.labelName] = datum[this.labelName] && datum[this.labelName].replace(/\s\s+/g, ' ')
        return ((datum[this.labelName] && datum[this.labelName].search(regex) > -1));
      });
      if(this.props.closeSearchFilter && event.target.value ==''){
        this.props.closeSearchFilter();
      }
      if(filtered && filtered.length<0){
        selectedOpt = {};
      }

      /*if(event.target.value && event.target.value.length > 0 && calledFrom && this.props.isMultipleSelect ){
        this.clearMultiSelect()
      }*/
      this.setState({
        selectedOpt:Object.assign({}, selectedOpt),
        resetDefault: false,
        options:filtered,
        savedIndex: 0,
        scrollDown: 36
      })
      //this.setState({})
      {this.props.onSelectSearch && this.props.onSelectSearch(event)}

      if (this.props.onChangeFunction && event.target.value.length >= 1) {
          this.props.onChangeFunction && this.props.onChangeFunction(event)
      }
      if (this.props.onEnterPress && event.target.value.length >0) {
        this.props.onEnterPress && this.debounceSearchFunc(event)
      }
      if(this.props.emptySearchField && event.target.value == '' ){
        this.props.emptySearchField()
      }
      if(this.props.showAsSearchField && (calledFrom == 'onChange') && (this.state.selectedOpt && this.state.selectedOpt[this.labelName]) && (event.target.value == '')) {
        this.clearSeach(event, 'cross')
      }

      if(event.target.value&&event.target.value.length>0 ){
        this.setState({
          showHideCrossBtns: true,
          displayAllOpts : false,
        })
      }
      else{
        this.setState({
          showHideCrossBtns: false,
          displayAllOpts : true,
        })
      }

   }  

  
  showDropDown(val, clickedFrom, isMultipleSelect){
    if((this.props.modifyLikeSearchField) || (clickedFrom=='embededBtn')){
      this.input.value = null
      setTimeout(()=>{
        this.input && this.input.blur()
      },100)
      this.hideDropdownSearchField = true
      this.setState({showHideCrossBtns : false, eveluateHideDropdownSearchField : true ,clonedSelectedOpt : {}, selectedOpt : {}})
      return
    }
    let flags = this.state.searchFilterFlags;
    flags.isDropDownOpen = val
    this.setState({searchFilterFlags:flags, isKeyPressOverlay: false }, 
      ()=> {
        if ((val) && (this.input) && (!isMultipleSelect)) {
            let customScrollBar = this.customScrollBar && this.customScrollBar
              customScrollBar.scrollTop = 0
          setTimeout(()=>{
            this.input && this.input.focus()  
          },100)
        }
      }
    );
    if (!val && clickedFrom ) {
     if (Object.keys(this.state.clonedSelectedOpt||{} )) {
       this.setState ({
         selectedOpt: this.state.clonedSelectedOpt,
         savedIndex : 0,
       })
     }else{
       this.setState ({
         selectedOpt: {},
         savedIndex : 0,
       })
     }
    }
  }

  selectMultipleOptions(selectedObj, isMultipleSelect, allOptsUnSelected = true){
     if (isMultipleSelect) {
      let labelValue = (this.props.labelValue || this.valueName)
       let multiSelectedOptions = this.state.multiSelectedOptions
       if ( allOptsUnSelected && (multiSelectedOptions.hasOwnProperty(selectedObj[labelValue] ))) {
         delete multiSelectedOptions[selectedObj[labelValue]];
         this.setState({ isAllSelect: false, allOptsUnSelected : false })
       }else {
        if(selectedObj[labelValue]){
          multiSelectedOptions[selectedObj[labelValue]] =selectedObj
          if((Object.keys(multiSelectedOptions||{}).length)==(this.state.options&&this.state.options.length)){
            this.setState({ isAllSelect: true })
          }
        }
       }
       this.setState({
         multiSelectedOptions,
         onESCkeyMultipleSelectEnable : true,
       }, ()=> {
          document.addEventListener("keydown",(event) => this.onESCkeyAddMultipleSelectBttn(event), false);
          this.props.onOptionSelection(multiSelectedOptions, this.props.showSubCategoryList ? selectedObj : null)
       })
     }else{
      this.setState({
        selectedOpt:selectedObj,
        clonedSelectedOpt: selectedObj,
      })
       this.props.onOptionSelection(this.props.isMultipleSelect? this.state.multiSelectedOptions: selectedObj)
     }
   }

   hadleSelectedElement(list, allOptsUnSelected){
      if ((list) && (Array.isArray(list)) ) {
          list.map( (obj,index) => {
            this.selectMultipleOptions(obj, true, allOptsUnSelected)
          })
      }
   }

   selectAllOpt(list){
    let allOptsUnSelected = false
    if(this.state.isAllSelect){
      allOptsUnSelected = true
    }else{
      allOptsUnSelected = false
    }
    this.hadleSelectedElement(list, allOptsUnSelected)    
   }

   clearMultiSelect(){
     this.setState({
       multiSelectedOptions: {},
       isAllSelect: false
     }, ()=> {
       this.props.onOptionSelection(this.state.multiSelectedOptions)
     } )
   }

  
  giveKeyBoardSupport(event){
    //scrollTo('#ulId',20,200)
        switch(event.keyCode){
          case 40:console.log("Down Key Pressed");
                   this.onKeyDownBttn();
                  break;
          case 38:console.log("UP Key Pressed");
              this.onKeyUPBttn();
              break;
          case 27:console.log("ESC Key Pressed");
              this.onESCkeyBttn(event);
              break;
          case 13:console.log("Enter Key Pressed");
              event.preventDefault()
              this.onKeyEnterBttn(event); 
              break;
          default:console.log("in default key pressed")
        }
  }  

  onKeyDownBttn(){
    let scrollDown = this.state.scrollDown
    
    if((this.state.options && this.state.options.length >= 1) && ( (this.state.savedIndex+1) < this.state.options.length) ){
      let selectedOpt = this.state.selectedOpt || {};
      let index = (selectedOpt.index+1) % this.state.options.length; 
      selectedOpt = this.state.options[index];
      
      let getElementHeight = this.getIndexCurrentElement(index)
      if(index>= 1){
        this.setState({
          removeFirstSelector:true
        })
      }
      let newIndex = Math.round(this.getDropDownBoxHeight() / getElementHeight)
      let elementHeight = this.state.elementHeight
      elementHeight +=getElementHeight
      // if (index>= (newIndex-1) ) {
      //   let scrollDownKey = document.querySelector(".removeFirstSelector");
      //   scrollDownKey.scrollTop += getElementHeight;
      // }
      if ( elementHeight >= this.getDropDownBoxHeight()) {
        let scrollDownKey = document.querySelector(".removeFirstSelector");
        scrollDownKey.scrollTop += getElementHeight;
      }
      selectedOpt.index = index;
        this.setState({
          selectedOpt:Object.assign({}, selectedOpt),
          isKeyPressOverlay: true,
          scrollDown,
          savedIndex: index,
          elementHeight:elementHeight
        })
      }else {
        /*console.log("length done")*/
      }
  }
  onBlur(){
    if(this.props.showAsSearchField){
      this.manageSearchfield()
    }
    this.setState({
      removeFirstSelector:false,
      elementHeight:36,
    })
  }

  getIndexCurrentElement (index) {
    let currentElement = document.getElementById(`${index}`);
    let currentElementHeight = currentElement && currentElement.offsetHeight
    return currentElementHeight;
  }
  getDropDownBoxHeight () {
    let dropDownBox = document.getElementById(`dropDownBox`);
    let dropDownBoxHeight = dropDownBox && dropDownBox.offsetHeight
    if(dropDownBoxHeight < 240){
      dropDownBoxHeight = 240
    }
    return dropDownBoxHeight;
  }

onKeyUPBttn(){
  let scrollUp = this.customScrollBar && this.customScrollBar.scrollTop
  let scrollDown = this.state.scrollDown
  let selectedOpt = this.state.selectedOpt;
  if( (this.state.options && this.state.options.length>=1) && ((selectedOpt.index+1) > 1) ){
    let index = (selectedOpt.index+this.state.options.length -1) % this.state.options.length;
    if(index < 1){
      this.setState({
        removeFirstSelector:false
      })
   }
    selectedOpt = this.state.options[index];
    let getElementHeight = this.getIndexCurrentElement(index)
    selectedOpt.index = index;
    let newIndex = Math.round(this.getDropDownBoxHeight() / getElementHeight)
    let elementHeight = this.state.elementHeight
    elementHeight-=getElementHeight
    if(index <=(this.state.options.length-newIndex)){
      let scrollUpKey = document.querySelector(".removeFirstSelector");
      scrollUpKey.scrollTop -= getElementHeight;
    }
    if(index<= 1){
      getElementHeight = 0
    }
    this.setState({
      selectedOpt:Object.assign({}, selectedOpt),
      scrollDown: scrollDown - getElementHeight,
      savedIndex: index,
      elementHeight: elementHeight

    })
  }else {
    this.setState({
        savedIndex: 0,
        scrollDown: 36,
        elementHeight:36
      })
  }
}
onKeyEnterBttn(event,obj){
  this.setState({
    removeFirstSelector:false
  })
  if (this.props.onEnterPress && event.target.value.length >0 ) {
    this.debounceSearchFunc(event)
  }   
  let selectedOpt = {};
  if (!this.state.keepDropDownOpenOnEnter) {
    if(this.state.options&&this.state.options.length<=0){
      selectedOpt[this.labelName] = null;
      selectedOpt[this.valueName] = null;
    }else{
      let getIndex = this.state.selectedOpt && this.state.selectedOpt.index || 0
      selectedOpt = this.state.options&&this.state.options[getIndex]
    }
    this.setState({
      selectedOpt:selectedOpt, 
      clonedSelectedOpt: selectedOpt,
      isKeyPressOverlay: false,
    })
    if(this.state.options && Array.isArray(this.state.options)) {
      if(this.props.isMultipleSelect) {
        this.selectMultipleOptions(selectedOpt,this.props.isMultipleSelect)
      }else {
        this.props.onOptionSelection(selectedOpt)
        this.showDropDown(false);
    }
    }
    
    
    document.getElementById(event.target.id).blur();
  }
}

onESCkeyBttn(event){
  if (!this.props.defaultSearchEnable) {
    this.showDropDown(false);
    document.getElementById(event.target.id).blur();
  }
  if(this.props.isMultipleSelect && this.state.multiSelectedOptions){
    this.props.onOptionSelection(this.state.multiSelectedOptions)
  }
}
onESCkeyMultipleSelectBttn(event, multiSelectListClosed){
  if(multiSelectListClosed && event.keyCode == 27){
    let searchFilterFlags = this.state.searchFilterFlags
    searchFilterFlags.isDropDownOpen = false
    this.setState({
      searchFilterFlags
    })
    this.props.onOptionSelection(this.state.multiSelectedOptions)
  }
}
onESCkeyAddMultipleSelectBttn(event){
    if(this.state.onESCkeyMultipleSelectEnable){
    this.onESCkeyMultipleSelectBttn(event, this.state.onESCkeyMultipleSelectEnable)
      this.setState({
        onESCkeyMultipleSelectEnable : false
      })
    }
}

clearSeach(e, clickedFrom){
  this.input.value = null
  if(clickedFrom == 'cross') {
    this.props.removeSearchField && this.props.removeSearchField(e,clickedFrom)
    this.setState({
      selectedOpt: {},
      showHideCrossBtns: false,
      options: this.props.options,
      //multiSelectedOptions: {},
      isAllSelect: false,
      displayAllOpts : true,
    })
  }
  else if(clickedFrom == 'clearInputField'){
  this.setState({
    selectedOpt:{},
    showHideCrossBtns: false,
    searchFilterFlags: {isDropDownOpen: true}
  },()=>this.props.onSelectSearch('clearSearch'))
  this.props.dispatch({type:'GOT_BROKER_LIST_DATA', payload:null})
  }
}
  debounceSearchFunc(event){
    let getSearchEvent = Object.assign({}, event)
    let inDebounce = this.state.inDebounce;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => {
      if(getSearchEvent && getSearchEvent.target && getSearchEvent.target.value.length >0 ){
        this.props.onEnterPress(getSearchEvent)
      }else{
        this.props.closeSearchFilter && this.props.closeSearchFilter()
      }

    },typingPauseTimingForSearch.delay);
    this.setState({
      inDebounce
    })
  }
  manageSearchfield(action){
    let eveluateHideDropdownSearchField = this.state.eveluateHideDropdownSearchField
    switch(action){
      case 'focus':
        eveluateHideDropdownSearchField = true
        break;
      case 'blur':
        if((this.state.selectedOpt && this.state.selectedOpt[this.labelName])){
          let flags = this.state.searchFilterFlags;
          flags.isDropDownOpen = false
          this.setState({flags})
        }
        else{
          this.hideDropdownSearchField = true
        }
        eveluateHideDropdownSearchField = false
        break;
      default:
        eveluateHideDropdownSearchField = false
    }
    this.setState({eveluateHideDropdownSearchField})
  }
  clearSelectedUser(e) {
    e.stopPropagation()
    this.props.optionClearFun(true)
  }
  render(){
    let filteredArray
    let countOfSelectedOpts = Object.keys(this.state.multiSelectedOptions).length
    let subCategorySelectOpt = this.props.tempDataStore && this.props.tempDataStore.subCategory
    let isSameLength = false;
    for (const key in this.props.subCategoryListArray) {
      if (subCategorySelectOpt && subCategorySelectOpt.hasOwnProperty(key) && subCategorySelectOpt[key].length > 0 && subCategorySelectOpt[key].length != this.props.subCategoryListArray[key].length) {
         isSameLength = true
      }
    }

    if(this.props.showAsSearchField && this.state.eveluateHideDropdownSearchField){
      this.hideDropdownSearchField = this.state.options && (this.state.options.length > 0 ||((!this.props.hideNoDataAvailable) && (this.input && this.input.value && this.input.value.length >= 3))) ? false : true
    }
    return(
      <div className={`filter-box left defaultDropDown ${this.props.parentClass ? this.props.parentClass : ''} ${this.state.searchFilterFlags.isDropDownOpen ? 'open' : ''} ${this.props.showAsSearchField && this.state.searchFilterFlags.isDropDownOpen ? 'showAsSearchField' : ' '} ${this.props.showAsSearchField && this.hideDropdownSearchField ? 'zIndexSearchField' : ''} ${this.props.defaultSearchEnable ? 'showDefaultSearch' : ''} ${this.props.customClass ? this.props.customClass : ''} ${this.props.customTitle ? 'customTitle' : ''}`}>
        {this.props.customTitle && 
          <h2>{this.props.selectedOptMain && 
            <React.Fragment>
              <span title={this.props.selectedOptMain} class="filterList fullSize">{maskUserData(this.props.selectedOptMain,'name',this.props.maskDataFlag)}
                <span onClick={()=> this.props.optionClearFun(true)} class="closeBtn"></span>
              </span> 
              /</React.Fragment> } { this.props.customTitle } 
            
          </h2> }
          {this.props.showSelectAsSearchFld && this.state.showHideCrossBtns && <span class ='crossBtns' onClick = { (e)=> {this.clearSeach(e,'clearInputField')} } ></span>}
   <p  metatitle={`${this.props.metatitle ? this.props.metatitle : ''}`} class={`${this.props.showSelectAsSearchFld ? "closeOpts " : "filter-icon bygroup "} ${this.props.iconClass ? this.props.iconClass : ''} ${this.props.removeDisabled ? ' removeDisabled':''}`} 
          onClick={() =>{ this.showDropDown(true);this.props.onDropDownOpen&&this.props.onDropDownOpen()}} 
          
          title={ ( this.props.isMultipleSelect && ((( (countOfSelectedOpts) == (this.props.options && this.props.options.length ) )&& "All Selected" ) || ( (countOfSelectedOpts >= 1) && countOfSelectedOpts+" Selected" ) ) ) || (this.state.selectedOpt && maskUserData(this.state.selectedOpt[this.labelName],'name',this.props.maskDataFlag) ||this.props.placeholder)}
        >
          { !(this.state.searchFilterFlags.isDropDownOpen) &&
            <span className="titleContainer">
              {(
                this.props.isMultipleSelect &&
                (
                  (isSameLength && 'Partially Selected') || 
                  ((countOfSelectedOpts === (this.props.options && this.props.options.length)) && 'All Selected') ||
                  ((countOfSelectedOpts >= 1) && countOfSelectedOpts + " Selected")
                )
              ) || 
              ( this.state.selectedOpt && maskUserData(this.state.selectedOpt[this.labelName],'name',this.props.maskDataFlag)) || 
              this.props.placeholder}
            </span>}
            {this.props.showCrossBtn && (this.props.placeholder != 'Select User') && <span class='clearSelectUser' onClick={(e) => this.clearSelectedUser(e)} >x</span>}
          {this.state.searchFilterFlags.isDropDownOpen && <span>
            {this.props.title}
          </span> }

        <input {...this.props.input} defaultValue={this.state.selectedOpt&&this.state.selectedOpt[this.labelName]||''} style={{opacity:0}}
          onFocus = {()=>this.showDropDown(true)}
          onBlur = {()=>this.showDropDown(false)}
          class = "hiddenInputFld"
          autoComplete={this.props.autoComplete}
          ref = {(input)=> this.input == input}
        />
        </p>
        <ul class={"custom-select-box " +this.props.ulCustomClass}>
        { ( (this.props.showLoader) || (this.props.loaderName && this.props.listLoader && this.props.listLoader[this.props.loaderName] ) ) && <Loader 
            loaderType = 'line'
            loaderWidth = { LOADER_WIDTH[1].width }
            loaderHeight = { LOADER_WIDTH[1].height }
                 />}
          {this.props.showLabelInFrstChild && <li class="frstChildLabel">
            {this.props.selectedOptMain && 
            <React.Fragment>
              <span title={this.props.selectedOptMain} class="filterList fullSize">{this.props.selectedOptMain}
                <span onClick={()=> this.props.optionClearFun(true)} class="closeBtn"></span>
              </span> 
              /</React.Fragment> }
              <span class={`fltr-grp ${this.props.iconClass} `}> {this.props.title}</span></li>}

          { (this.props.selectedOptMain || this.props.isSearchEnable) 
            &&<li class={` mltyFilter fliterFirstStrip  ${ this.props.isSearchEnable ? 'searchFldEnable' : '' } `}>

          {this.props.isSearchEnable&& <input metatitle={`${this.props.metatitle ? this.props.metatitle : ''}`} type="text" class="text-field-filter" id={this.props.formFieldId ? this.props.formFieldId :'selectInput'} 
              placeholder={this.props.placeholderForInput || 'Type to Search...'} 
              ref = {input => this.input=input}
              //value={this.state.resetDefault ? "" : this.state.selectedOpt && this.state.selectedOpt[this.labelName]}
              onKeyDown={(e) => this.giveKeyBoardSupport(e)} 
              onChange={(e) => this.filterSuggestion(e,"onChange")} 
              onFocus={(e) => {this.filterSuggestion(e); (this.props.showAsSearchField && this.manageSearchfield('focus'))}}
              onBlur={() => this.onBlur()}
              // onKeyEnterBttn={(e) => this.onKeyEnterBttn(e)}
              autoComplete={this.props.autoComplete || 'off'}
            />}
            { this.state.showHideCrossBtns  && <span class ={`crossBtns ${this.props.customCrossClass ? this.props.customCrossClass:''} ${ this.props.removeDisabled ? 'removeDisabled' :''  }`} onClick = { (e)=> {this.clearSeach(e,'cross'); this.props.removeSearchField&&this.props.removeSearchField(e)} } ></span> }
          </li>}
           
          {this.props.showFirstListHead && <li class='mltyFilter fliterFirstStrip squareBox '>
            <span onClick={()=> {this.props.selectFirstList(this.props.selectedfirstList);this.showDropDown(this.props.isOpen)}} class="filterList fullSize ">{'+  ' +(this.props.selectedfirstList&&this.props.selectedfirstList.label) + "   ' "+(this.props.selectedfirstList&&this.props.selectedfirstList.value)+ " '"}</span>
          </li>}

          
          <li id="dropDownBox" class={`subItemsScroll customScrollBar animationList ${this.props.showAsSearchField && (this.hideDropdownSearchField)  ? 'hideDropdownBox' : ' '} ${this.state.removeFirstSelector ? 'removeFirstSelector': ''}`} ref = {customScrollBar => this.customScrollBar = customScrollBar}>
          <ul class={`${this.props.childListContainer ? this.props.childListContainer : ''}`}>
          {(this.props.isMultipleSelect && !this.props.removeAllOption && this.state.displayAllOpts && (this.state.options && this.state.options.length > 1)) && <li class=""
              label="All"
              value=''
              id={this.props.objIndex}
              onClick={() => {this.selectAllOpt(this.state.options); this.setState({isAllSelect: !this.state.isAllSelect })}} >
              <span class={`customCheckBox ${this.props.isCheckboxFixed && 'paddingRight'} `}>
                <input type="checkbox" 
                  checked = {!isSameLength && (countOfSelectedOpts) == (this.props.options && this.props.options.length )}
                  name="allSelect"
                />
                <span></span>
              </span>
                  All
            </li> }
          {(this.state.options) && (Array.isArray(this.state.options)) &&this.state.options.map( (obj,index) => {
            if(Array.isArray(obj)){
              obj = obj.toString()
            }
            filteredArray = this.props.subCategoryListArray && this.props.subCategoryListArray[obj.category] ? this.props.subCategoryListArray[obj.category] : []
            // obj.selectIndex = index
            // obj.index = index
            return (<CustomSelectLi 
              addCustomClass={this.props.addCustomClass}
              selectedClass={(this.state.selectedOpt && this.state.selectedOpt[this.valueName]==obj[this.valueName])}
              onOptionSelection={() => { this.selectMultipleOptions(obj,this.props.isMultipleSelect); this.showDropDown( (this.props.isMultipleSelect? true: false),null, this.props.isMultipleSelect) }}
              key={index}
              obj={obj}
              labelName={this.labelName}
              valueName = { (this.props.labelValue || this.valueName)}
              placeholder={this.props.placeholder}
              selectedOpt = {this.state.selectedOpt}
              objIndex = {index}
              multiSelectedOptions = {this.state.multiSelectedOptions}
              isMultipleSelect = {this.props.isMultipleSelect}
              isCheckboxFixed = {this.props.isCheckboxFixed}
              showSubCategoryList={this.props.showSubCategoryList}
              subCategoryLabel={this.props.subCategoryLabel}
              subCategoryValue={this.props.subCategoryValue}
              subCategoryListArray={filteredArray}
              tempDataStore={this.props.tempDataStore}
              // categoryData={this.state.options}
              childInitialArray={this.props.subCategoryListArray}
              selectChildOption={this.props.selectChildOption}
              maskDataFlag = {this.props.maskDataFlag}
              maskingType = {this.props.maskingType ? this.props.maskingType : 'name'}
            >
            </CustomSelectLi>)
          })
            
          }

          {(!this.props.hideNoDataAvailable) && (!this.props.allowEnteredValue && ( ( (!this.props.isSearchEnable) 
          && (this.state.options && this.state.options.length<=0) ) || 
          ( (!this.props.allowEnteredValue) && this.props.isSearchEnable && (this.input && this.input.value && (this.input.value.length >=3) && this.state.options && this.state.options.length<=0))
          ))&& 
            <li class="noData">No Data Available</li>
          }
          { (this.props.allowEnteredValue && ( ( (!this.props.isSearchEnable) 
          && (this.state.options && this.state.options.length<=0) ) || 
          ( (this.props.allowEnteredValue) && this.props.isSearchEnable && (this.input && this.input.value && (this.input.value.length >=3) && this.state.options && this.state.options.length<=0))
          ))&& 
            <li class="noData" onClick={() => this.showDropDown(false)}>Choose New Policy: {this.input.value}</li>
          }
          </ul>
          </li>
          { this.props.isApplyClearButtons && (this.props.isMultipleSelect) && <li class="btnsContainer smlFltrsBtns">
            <button type="button" onClick={()=> {this.props.onOptionSelection(this.state.multiSelectedOptions); this.showDropDown(false) } }>Apply</button>
             <button type="button" class="cancel" onClick={()=> {this.clearMultiSelect(); this.showDropDown(true) } }>Clear All</button>
            </li>}
            { this.props.embedApplyButton && ((this.input && this.input.value && this.input.value.length > 0)) && <div class="btnsContainer mdlSize">
            <button type="button" class={this.props.customIConClass} onClick={()=> {this.selectMultipleOptions({labelName:this.input.value , labelid : null},false);this.showDropDown(true,'embededBtn', false) }}>{this.props.embedButtonText}</button>
            </div>}


        </ul>
        { this.props.customError && this.props.isTouched && this.props.isCustomSelectBoxError && <div class='errorMsgFontSize errorMsg message'>{this.props.customError}</div>}
        {this.state.searchFilterFlags.isDropDownOpen&&<div class={`custom-select-overlay ${this.props.showAsSearchField && this.hideDropdownSearchField ? 'hideDropdownBox' : ''}`} onClick={()=> {
          ( this.props.showAsSearchField && this.manageSearchfield('blur'));  ((!this.props.showAsSearchField) && this.showDropDown(false,this.state.isKeyPressOverlay));(this.props.isMultipleSelect && (this.props.onOptionSelection(this.state.multiSelectedOptions)) ) }}
 >
        </div>}

      </div>
    )
  }
}

const mapStateToProps = (state) =>{
    return {
      listLoader: state.loader && state.loader.listLoader,
      tempDataStore : state.brokerDashboardReducer &&  state.brokerDashboardReducer.commonLocalStorage
    }
}
const mapDispatchToProp = (dispatch) => {
    return {dispatch:dispatch}
}

export default connect(mapStateToProps,mapDispatchToProp)(SearchFilter);
