import React from "react";
import './App.css';
import ReactExport from "react-export-excel";
import 'bootstrap/dist/css/bootstrap.min.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class Download extends React.Component {
  state= {
    internalWidth: null,
    internalDepth: '',
    internalHeight: '',
    matrixWidth: '',
    matrixDepth: '',
    matrixHeight: '',
    dataSet1: [
      {}
    ]
  }
// handlers
// Dimensions
  handleIWChange = (e) =>{
    this.setState({
      internalWidth: e.target.value
    })
  }
  handleIDChange = (e) =>{
    this.setState({
      internalDepth: e.target.value
    })
  }
  handleIHChange = (e) =>{
    this.setState({
      internalHeight: e.target.value
    })
  }
  // Matrix
  handleMatrixWidthChange = (e) =>{
    this.setState({
      matrixWidth: e.target.value
    })
  }
   handleMatrixDepthChange = (e) =>{
    this.setState({
      matrixDepth: e.target.value
    })
  }
   handleMatrixHeightChange = (e) =>{
    this.setState({
      matrixHeight: e.target.value
    })
  }

  handleAcceptButton = () =>{

    const width = parseInt(this.state.internalWidth)-7; //substract for velcro
    const depth = parseInt(this.state.internalDepth)-7; //substract for velcro
    const height = parseInt(this.state.internalHeight);

    const matrixWidth = parseInt(this.state.matrixWidth);
    const matrixDepth = parseInt(this.state.matrixDepth);
    const matrixHeight = parseInt(this.state.matrixHeight);

    let divider = '';

    const stitching = 7;        //straight value
    const stitchingToBott = 7;  //straight value
    const foldingSides = 20;    //straight value
    const folding = 12;         //straight value
    let divWidth = 0;
    let verticalWidth = 0;
    let divQuantity = 0;
    let vertQuantity = 0;
    
    //checking matrix values
    if (matrixWidth == 1) {
      verticalWidth = width+stitching*2;
      divQuantity = 0;
      vertQuantity = matrixDepth-1; //optimize
    } else {
        divQuantity = (matrixWidth-1)*matrixDepth;
        vertQuantity = matrixDepth-1; //optimize
        divWidth = (depth/matrixDepth)+stitching*2
    }

    // if (matrixDepth == 0) {
    //   verticalDepth = width+stitching*2;
    //   divQuantity = 0;
    //   vertQuantity = matrixDepth-1; //optimize
    // }

    const bottom = {
      function: 'bottom',
      dim1: width+stitching*2,
      dim2: depth+stitching*2,
      quantity: 1
    }
    const longSide = {
      function: 'long side',
      dim1: width+stitching*2,
      dim2: height+foldingSides+stitchingToBott,
      quantity: 2
    }
    const shortSide = {
      function: 'short side',
      dim1: depth+stitching*2,
      dim2: height+foldingSides+stitchingToBott,
      quantity: 2
    }
    const vertical = {
      function: 'vertical',
      dim1: width+stitching*2,
      dim2: height+folding+stitchingToBott,
      quantity: vertQuantity
    }
    if (divQuantity){
      divider = {
        function: 'divider',
        dim1: divWidth,
        dim2: height+folding+stitchingToBott,
        quantity: divQuantity
      }
    }
    
    this.setState({
      dataSet1: [
      bottom,
      longSide,
      shortSide,
      vertical,
      divider,
    ]
    })
  }
    render() {
        return (
          <div className="wrapper"> 
            <div className="form-group internal-width">
                <label htmlFor="iw">Internal width</label>
                <input type="number" id="iw" className="form-control" value={this.state.internalWidth} onChange={this.handleIWChange}/>
            </div>
            <div className="form-group internal-depth">
                <label htmlFor="id">Internal depth</label>
                <input type="number" id="id" className="form-control" value={this.state.internalDepth} onChange={this.handleIDChange}/> 
            </div>
            <div className="form-group internal-height">
                <label htmlFor="ih">Internal height</label>
                <input type="number" id="ih" className="form-control" value={this.state.internalHeight} onChange={this.handleIHChange}/>
            </div>
            <div className="form-group matrix">
                <label htmlFor="matrix">Matrix</label>
                <input type="number" id="matrix" className="form-control matrix-width" value={this.state.matrixWidth} onChange={this.handleMatrixWidthChange}/>
                <input type="number" id="matrix" className="form-control matrix-depth" value={this.state.matrixDepth} onChange={this.handleMatrixDepthChange}/>
                <input type="number" id="matrix" className="form-control matrix-height" value={this.state.matrixHeight} onChange={this.handleMatrixHeightChange}/>
            </div>
            <button className="accept" onClick={this.handleAcceptButton}>Accept</button>
            <ExcelFile element={<button>Download Data</button>}>
                <ExcelSheet data={this.state.dataSet1} name="Employees">
                    <ExcelColumn label="Function" value="function"/>
                    <ExcelColumn label="Dim 1 MM" value="dim1"/>
                    <ExcelColumn label="Dim 2 MM" value="dim2"/>
                    <ExcelColumn label="Quantity" value="quantity"/>
                </ExcelSheet>
            </ExcelFile>
          </div>
        );
    }
}
export default Download;