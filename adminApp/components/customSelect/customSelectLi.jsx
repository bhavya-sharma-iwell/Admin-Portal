import React, { Fragment } from "react"
import InnerList from './innerList'
import {maskUserData} from '../../utils/dataFormater'
export class OptionEntry extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
	}

	showHideList(e, showList) {
		this.setState({ showList })
		e.stopPropagation()
	}		
	
	render(){
		let initialLength, subCategory;
		if(this.props.showSubCategoryList){
			const subCategoryLabel = [this.props.obj[this.props.labelName]];
			initialLength = this.props.childInitialArray && this.props.childInitialArray[subCategoryLabel] && Object.keys(this.props.childInitialArray[subCategoryLabel]).length
			subCategory = this.props.tempDataStore && this.props.tempDataStore.subCategory && this.props.tempDataStore.subCategory[subCategoryLabel]
		}
		
		let isSelected = false
		if (this.props.multiSelectedOptions ) {
			if (this.props.multiSelectedOptions.hasOwnProperty(this.props.obj[this.props.valueName] )) {
				isSelected = true
			}
		}

		return (
			<Fragment>
				{this.props.obj &&<li 
				class={ `${this.props.addCustomClass && this.props.obj["customClass"] ? this.props.obj["customClass"] : ""}${(( ((this.props.selectedOpt && this.props.selectedOpt.index ) === (this.props.obj && this.props.obj.index)) && ( (this.props.selectedOpt && this.props.selectedOpt.selectIndex ) === (this.props.obj && this.props.obj.selectIndex)))  ? ' selected': '')}`}  
				 label={this.props.obj[this.props.labelName]}
				 value={this.props.obj[this.props.valueName]}
				 icon={this.props.obj.icon}
				 id={this.props.objIndex}
				 onClick={() => this.props.onOptionSelection()}>
				 {this.props.isMultipleSelect && <span class={`customCheckBox ${( (subCategory && subCategory.length) && (subCategory && subCategory.length < initialLength) ) ? 'partiallySelected' : ''}
				 ${this.props.isCheckboxFixed ? 'paddingRight' : ''}`}>
	                <input type="checkbox" 
                    	checked = {isSelected}
                    	name="isSelected"
                  	/>
	                <span></span>
              	</span>}
				 {/*{isSelected && <span>Sel: </span>}*/}
				 {this.props.maskDataFlag ? maskUserData((this.props.obj[this.props.labelName]||this.props.obj[this.props.valueName]),this.props.maskingType, true): this.props.obj[this.props.labelName]||this.props.obj[this.props.valueName]} 
				 {this.props.showSubCategoryList && <span onClick={(e)=>this.showHideList(e, !this.state.showList)} class={`right pRight3 svgCommonIconOpts sideIcon ${this.state.showList ? 'rotateIcon' : ''}`}></span>}
				</li>}
				{this.state.showList &&
				 	<InnerList
						subCategoryLabel={this.props.subCategoryLabel}
						subCategoryValue={this.props.subCategoryValue}
						subCategoryListArray={this.props.subCategoryListArray}
						tempDataStore={this.props.tempDataStore}
						getParentKey={this.props.obj[this.props.labelName]}						
						selectChildOption={(obj)=>this.props.selectChildOption(obj)}
						isSelected={isSelected}
					/>}
			</Fragment>
			)
	}
}
export default OptionEntry;