// import React, {Component} from 'react'
// import AccordionTabsList from './accordionTabsList'
// import {TABS_LIST_LABEL} from 'app/constants/admin'

// class AccordionList extends Component{
//     constructor(props){
//         super(props);

//     }

//     render(){
//         return(
//             <div class="accordianContainer">
//                 <div class="accordian">
//                     <ul>
//                         <AccordionTabsList
//                             heading={TABS_LIST_LABEL.ifasignup}
//                             openAccordionTabs={()=>this.props.openAccordionTabs(1)}
//                             signUpFormDisabled = {this.props.signUpFormDisabled}
//                         />
//                         <AccordionTabsList
//                             heading={TABS_LIST_LABEL.ifaregistration}
//                             openAccordionTabs={()=>this.props.openAccordionTabs(2)}
//                             customClass={'removeDisabled'}
//                             successFormFrst = {this.props.successFormFrst}
//                         />
//                         <AccordionTabsList
//                             heading={TABS_LIST_LABEL.preferences}
//                             openAccordionTabs={()=>this.props.openAccordionTabs(6)}
//                             customClass={'removeDisabled'}
//                             activeAllFrm = {this.props.activeAllFrm}
//                         />
//                         <AccordionTabsList
//                             heading={TABS_LIST_LABEL.arn}
//                             openAccordionTabs={()=>this.props.openAccordionTabs(3)}
//                             customClass={'removeDisabled'}
//                             activeAllFrm = {this.props.activeAllFrm}
//                         />
//                         <AccordionTabsList
//                             heading={TABS_LIST_LABEL.zippassword}
//                             openAccordionTabs={()=>this.props.openAccordionTabs(4)}
//                             customClass={'removeDisabled'}
//                             activeAllFrm = {this.props.activeAllFrm}
//                         />
//                         <AccordionTabsList
//                             heading={TABS_LIST_LABEL.levelinfo}
//                             openAccordionTabs={()=>this.props.openAccordionTabs(5)}
//                             customClass={'removeDisabled'}
//                             activeAllFrm = {this.props.activeAllFrm}
//                         />
                        
//                     </ul>
//                 </div>
//             </div>
//         )
//     }
// }
// export default AccordionList;