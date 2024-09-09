import React from 'react'
export const Notification = (props) => {
  return (
    <div>
      <div className={`sentSuccessFully active ${ (props.myprops.errorMsg || props.myprops.notification.status)&& 'error'} `}>
        <p>{props.myprops.notification.message}</p>
        <span class="close" onClick={() => props.clearNotifications()}></span>
      </div>
    </div>
  )
}
export default Notification