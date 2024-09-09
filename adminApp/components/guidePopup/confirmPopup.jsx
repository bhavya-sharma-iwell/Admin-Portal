import React from 'react'
import { LOADER_WIDTH } from '../../constants'
import Loader from '../loaders'
import {connect} from 'react-redux'

export class ConfirmPopup extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){ 
        return( 
        <div class={`popUpArea posRelative ${this.props.customClass ? this.props.customClass : ''}`}>
        {((this.props.investorData&&this.props.investorData.loaderInvestorLookup&&this.props.investorData.loaderInvestorLookup.componentName == 'InvestorLookupTable')||
            (this.props.folioStore&&this.props.folioStore.loaderFolio&&this.props.folioStore.loaderFolio.componentName == 'folioConfirmPopUp'))
                &&
                 <Loader 
                        loaderType = 'line'
                        loaderWidth = { LOADER_WIDTH[1].width }
                        loaderHeight = { LOADER_WIDTH[1].height }
                         />}
            <div class={`popContainer ${this.props.changeMessage && 'success'} ${this.props.errorMessage && 'errorMessage'}`}>
                {!this.props.changeMessage && !this.props.errorMessage && <h2>{this.props.alertMessage ? this.props.alertMessage : 'Are you sure ?'}</h2>}
                {this.props.changeMessage && <h2>Successfully Applied.</h2>}
                {this.props.errorMessage && <h2>Something went wrong</h2>}
                {!this.props.changeMessage && !this.props.errorMessage && <div class="buttons inside">
                    <a onClick={()=> this.props.sureApply('yes')} href="javascript:void(0);" metatitle={this.props.metatitle ? `${this.props.metatitle}Yes` : ''}>Yes</a> 
                    <a onClick={()=> this.props.sureApply('No')} href="javascript:void(0);" class="gray" metatitle={this.props.metatitle ? `${this.props.metatitle}No` : ''}>No</a>
                </div>}
            </div>
        </div>)
    }
}

const mapStateToProp = (state) =>{
    return { 
        investorData:state.brokerDashboardReducer,
        folioStore:state.folioLookup
    }
}
 const mapDispatchToProp = (dispatch) => {
    return {dispatch:dispatch}
 }

export default connect(mapStateToProp,mapDispatchToProp)(ConfirmPopup);


export const PopUpCnt = (props) =>{
    let CustomCmp = props.customCmp
    return( 
        <div class={`popUpArea autoPopupArea ` + props.className  }>
            <div class={`popContainer ${props.innerDivClass ? props.innerDivClass : ''} ${(props.popupType=="success")&& 'success'} ${(props.popupType =="failed") && 'errorMessage'}`}>
                <CustomCmp />
            </div>
        </div>)
    }
