import React from 'react'
import {connect} from 'react-redux'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  tryAgain(type) {
    if ((type == 'redirect') && (this.props.userDetails && this.props.userDetails.userType)) {
      let link = ''
      switch (this.props.userDetails.userType) {
        case 'admin':
          link = '#/admin/ifaLookup'
          break;
        default:
          link = `#/${this.props.userDetails.userType}/dashboard`
      }
      window.location.hash = link
    }
    location.reload(true)
  }
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (

        <div id="popUpArea" class="midPopUpBox">
            <div class="container">
                <div class="headerArea txtCenter">
                    Error
                </div>
                <div class="contentsBox txtCenter">
                    <h3>Something went wrong.</h3>
                    {/*<div class="title"> min Secs</div>*/}
                    <p>Please click "Try again" to keep working.</p>
                   <div class="btnsContainer mTop20">
                        <input type="submit" value="Go to Dashboard" class="  buttonAnimate" onClick={() => this.tryAgain('redirect')} />
                        <input type="submit" value="Try again" class="buttonAnimate cancel" onClick={() => this.tryAgain()} />
                    </div>
                </div>
            </div>
          {/*<details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>*/}
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

const mapStateToProps = (state) => ({
    // userDetails: state.userReducer.user
})
export default connect(mapStateToProps) (ErrorBoundary);