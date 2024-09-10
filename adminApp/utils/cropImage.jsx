import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';
import {connect} from 'react-redux'
import Cropper from 'react-cropper';
// import {UploadFile} from 'app/actions/shared/utils'
import * as commonConst from '../constants'
import Loader from '../components/loaders'
import { LOADER_WIDTH,TRUE_FALSE_COMMON } from '../constants'

export class CropImageCnt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaderState : true
    };
  }

  cropImage() {
    if (typeof this.cropper && this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    const params = new FormData();
    this.cropper && this.cropper.getCroppedCanvas().toBlob((blob)=>{

      params.append('file',this.props.orgFileName ? this.props.orgFileName[0]  : blob)
      params.append('fileHandle',this.props.fileHandle)
      params.append('appid',this.props.appid)
      // params.append('arnNo',this.props.arnNo)
      if(this.props.outerApiCall){
        this.props.uploadFileFn(blob)
      }else{
        this.props.dispatch(UploadFile(params))
      }
    
    },this.props.croppedExtension||'image/png')
    this.props.closeCropImage();
  }
  componentDidMount(){
    if (this.props.isHideCropper && this.state.loaderState) {
      setTimeout(()=> {
        this.cropImage()
        this.setState({
          loaderState: false
        })
      },2000)
    }
  }

  onCropperInit(cropper) {
    this.cropper = cropper;
  }
  

  render() {
    let cropperCustomAttr = {}
    if(!this.props.aspectRatioAuto){
      cropperCustomAttr = {
          aspectRatio : ((!this.props.resizable) &&(this.props.aspectRatio ? this.props.aspectRatio : (16/9)))
      } 
    }else{
      cropperCustomAttr = {}
    }

    return (
              <div id="cropperArea" class="cropperArea">
                  {(this.state.loaderState && this.props.isHideCropper) && 
                    <Loader 
                        loaderType = 'line'
                        loaderWidth = { LOADER_WIDTH[2].width }
                        loaderHeight = { LOADER_WIDTH[2].height }
                    /> }
                      <div class={`cropperContainer ${this.props.popUpInCenter ? this.props.popUpInCenter : ''}`}>
                          <h3>{this.props.cropperTitle || commonConst.CROPPER_TITLE[0].label}</h3>
                            <div class="cropperBox" metatitle = {this.props.metatitle ? this.props.metatitle : ''}>
                              <Cropper
                                style={{ height: 400, width: '100%' }}
                                preview=".img-preview"
                                guides={false}
                                viewMode={this.props.viewMode}
                                src={this.props.imageTocrop}
                                onInitialized={(cropper) => this.onCropperInit(cropper)}
                                // onInitialized={(cropper) => this.onCropperInit(cropper)}
                                minCanvasWidth = {this.props.minCanvasWidth}
                                minCanvasHeight = {this.props.minCanvasHeight}
                                {...cropperCustomAttr}
                              />
                            <img style={{ width: '100%' }} src={this.state.cropResult} alt="" />
                            </div>
                            <div class="cropperBtmArea">
                              <div class="btnsContainer">
                                    <button class="lightSky" onClick={this.props.closeCropImage} metatitle = {this.props.metatitle ? `${this.props.metatitle}Cancel`: ''}>Cancel</button>
                                    <button onClick = {()=>this.cropImage()} metatitle = {this.props.metatitle ? `${this.props.metatitle}Save` : ''}>Save</button>
                              </div>
                            </div>
                        </div>
                    </div>
    );
  }
}


const mapStateToprops = (state) =>{
  return {}
}

const mapDispatchToprops = (dispatch) =>{
  return {dispatch:dispatch}
}

export default connect(mapStateToprops,mapDispatchToprops)(CropImageCnt);