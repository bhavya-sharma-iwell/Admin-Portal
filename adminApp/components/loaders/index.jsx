import React from 'react';
import LineLoader from './lineLoader'
import TableLoader from './tableLoader'

export class Loader extends React.Component{
  constructor(props){
    super(props);
    this.state={}
    
  }
  selectLoader(loaderInfo){
    let loaderName = this.props.loaderType? this.props.loaderType : 'line'
    return (
      <div class={ `loaderContainer ${ loaderName == 'tableLoader' ? 'removeAbsoluteClass'  : null } ` }>     
        {loaderName == 'line'  && 
          <LineLoader
            loaderWidth = { this.props.loaderWidth }
            loaderHeight = { this.props.loaderHeight }
          />
        }
        {loaderName == 'tableLoader'  && 
          <TableLoader
            loaderColumns = { this.props.loaderColumns }
            loaderRows = { this.props.loaderRows }
            loaderPagination = { this.props.loaderPagination }
          />
        }
      {this.props.loaderMessage && <p>{this.props.loaderMessage}</p>}
      {this.props.loaderInnerPopupMessage && <h3>{this.props.loaderInnerPopupMessage}</h3>}
    </div>)
  }

  render(){
    return(
    <div class={`loader loaderBox ${this.props.zIndexUpThreelevel? this.props.zIndexUpThreelevel : ''} ${this.props.loaderCustomClass ? this.props.loaderCustomClass : ''} `}>
        {this.selectLoader(this.props.loaderInfo)}
      </div>
    )
  }
}



export default Loader;