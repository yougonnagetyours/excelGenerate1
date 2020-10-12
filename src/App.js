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
    dataSet1: [
      {
        function: '',
        dim1: '',
        dim2: '',
      }
    ]
  }

  handleIWChange = (e) =>{
    this.setState({
      internalWidth: e.target.value
    })
    console.log('click')
  }
  handleIDChange = (e) =>{
    this.setState({
      internalDepth: e.target.value
    })
    console.log('click')
  }
  handleIHChange = (e) =>{
    this.setState({
      internalHeight: e.target.value
    })
    console.log('click')
  }

  handleAcceptButton = () =>{

    const width = parseInt(this.state.internalWidth);
    const depth = parseInt(this.state.internalDepth);
    const height = parseInt(this.state.internalHeight);

    const bottom = {
      function: 'bottom',
      dim1: width+7,
      dim2: depth+7,
    }
    const longSide = {
      function: 'long side',
      dim1: width+7,
      dim2: height+20,
    }
    const shortSide = {
      function: 'short side',
      dim1: depth+7,
      dim2: height+20,
    }
    this.setState({
      dataSet1: [
      {...bottom},
      {...longSide},
      {...shortSide},
    ]
    })
  }
    render() {
        return (
          <div className="wrapper"> 
            <div className="form-group">
                <label htmlFor="iw">Internal width</label>
                <input type="number" id="iw" className="form-control" value={this.state.internalWidth} onChange={this.handleIWChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="id">Internal depth</label>
                <input type="text" id="id" className="form-control" value={this.state.internalDepth} onChange={this.handleIDChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="ih">Internal height</label>
                <input type="text" id="ih" className="form-control" value={this.state.internalHeight} onChange={this.handleIHChange}/>
            </div>
            <button className="accept" onClick={this.handleAcceptButton}>Accept</button>
            <ExcelFile element={<button>Download Data</button>}>
                <ExcelSheet data={this.state.dataSet1} name="Employees">
                    <ExcelColumn label="Function" value="function"/>
                    <ExcelColumn label="Dim 1 MM" value="dim1"/>
                    <ExcelColumn label="Dim 2 MM" value="dim2"/>
                </ExcelSheet>
            </ExcelFile>
          </div>
        );
    }
}
export default Download;