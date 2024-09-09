import React, {Component} from 'react'
import {REPORTS, LEFT_SIDEBAR, LEFT_SIDEBAR_MAIN_TAB} from '../../../constants/dashboardConst'
import {connect} from 'react-redux'
import { KeyCode } from '../../../constants/shared/commonConst'

class SessionPopup extends Component{
    setIntervalId
    // counter :60
    constructor(props){
        super(props)
        this.state = {clearIntervalTime:'',getSecondsVal:'', getMinutsVal:''}
    }

    componentDidMount(newProps){
        this.counter = 60;
    this.setIntervalId = setInterval(()=> {
    this.counter--;
    let minutesRemaining = parseInt(this.counter/60);
    let secondsRemaining = parseInt(this.counter%60);
        
      if(minutesRemaining <= 0 && secondsRemaining <= 0){
        clearInterval(this.setIntervalId)
        this.props.logoutUser(this.state.clearIntervalTime)
        this.props.dispatch({type:"SESSION_TIMEOUT_FLAG",payload:false})
        return;
      }
      /*window.onblur = ()=> {
          window.location.reload()
      }
      window.onfocus = ()=> {
          window.location.reload();
      }*/
      window.onfocus = ()=> {
          window.location.reload();
      }
      this.setState({
            getMinutsVal:minutesRemaining,
            getSecondsVal:secondsRemaining
        })
    },1000)

    this.setState({
        clearIntervalTime: this.setIntervalId
    })
    // Add event listener for Enter key press
    window.addEventListener('keydown', this.handleKeyDown);
  }

    componentWillUnmount() {
        clearInterval(this.setIntervalId);
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event.which == KeyCode.enter || event.which == KeyCode.space) {
            this.props.continueLogin(this.state.clearIntervalTime);
        }
    }

    render(){ 
        return( 
        <div id="popUpArea" class="midPopUpBox">
            {this.state.getSecondsVal !== '' && <div class="container">
                <div class="headerArea txtCenter">
                    Session Timeout
                </div>
                <div class="contentsBox txtCenter">
                    <h3>Your online session will expire in</h3>
                    <div class="title">{this.state.getMinutsVal} min {this.state.getSecondsVal} Secs</div>
                    <p>Please click "Continue" to keep working:<br />
                    or click"log off" to end your session now.</p>
                    <div class="btnsSec">
                        <input type="submit" value="Continue" class="continue" onClick={() => this.props.continueLogin(this.state.clearIntervalTime)} metatitle = {this.props.metatitle ? `${this.props.metatitle}ContinueLogin` : ''}/>
                        <input type="submit" value="Log off" class="logOff" onClick={() => this.props.logoutUser(this.state.clearIntervalTime)} metatitle = {this.props.metatitle ? `${this.props.metatitle}LogoutUser` : ''}/>
                    </div>
                </div>
            </div>}
        </div>
        )
    }
}
const mapStateToProp = (state) =>{
    return {}
  }
const mapDispatchToProps = (dispatch) =>{
    return {dispatch}
}
export default connect(mapStateToProp, mapDispatchToProps)(SessionPopup)
