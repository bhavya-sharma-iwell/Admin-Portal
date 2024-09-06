//import {LOADER_TEXT} from 'app/constants/dashboardConst'
import React from 'react';
const defaultProps = {
  className: '',
  color: 'rainbow',
  height: 2,
  hideDelay: .4,
  pageProgress:{onGoingApiCallCount:0},
  speed: .4,
  style: {}
};

export const ProgressBar = function(props){
  props = {
    ...defaultProps,
    ...props
  };

  //var randomNumber = Math.floor(Math.random() * (LOADER_TEXT.length) );

  let containerStyle = {
    opacity: (props.pageProgress.onGoingApiCallCount>0) ? 1 : 0,
    /*WebkitTransition: `${props.speed}s opacity`,
    transition: `${props.speed}s opacity`,
    WebkitTransitionDelay: `${props.pageProgress.percent < 100 ? 0 : props.hideDelay}s`,
    transitionDelay: `${props.pageProgress.percent < 100 ? 0 : props.hideDelay}s`*/
  };
  let loaderStyle = {
    height: (props.pageProgress.onGoingApiCallCount>0) ? '100%' : 0,
  };

  let barStyle = {
    display: 'inline-block',
    position: 'fixed',
    top: 0,
    left: 0,
    maxWidth: '100% !important',
    height: `${props.height}px`,
    boxShadow: '1px 1px 1px rgba(0,0,0,0.4)',
    borderRadius: '0 1px 1px 0',
    /*WebkitTransition: `${props.speed}s width, ${props.speed}s background-color`,
    transition: `${props.speed}s width, ${props.speed}s background-color`,*/
    ...props.style
  };

  if (props.color === 'rainbow') {
    barStyle.backgroundImage = props.style.backgroundImage || 'linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #FF2D55)';
    barStyle.backgroundSize = props.style.backgroundSize || `100vw ${props.height}px`;
  } else {
    barStyle.backgroundColor = props.style.backgroundColor || props.color;
  }
  /*loader text message use inside loader class: <p>{LOADER_TEXT[randomNumber].key}</p>*/
  return (
    <div className={props.className} style={containerStyle}>
      <div className={props.className.length ? `${props.className}__bar` : ''} style={barStyle}></div>
      <div class="insideArea" style={loaderStyle}>
        <div class="loader">          
          <img src="app/media/images/loader.gif" alt="loader" />
          <p>Analyzing your data...</p>
        </div>
      </div>
    </div>
  );
};
export default ProgressBar;