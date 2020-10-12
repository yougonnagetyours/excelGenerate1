import React from "react";
import './App.css';
import ReactExport from "react-export-excel";
import 'bootstrap/dist/css/bootstrap.min.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

var dataSet2 = [
    {
        name: "Johnson",
        total: 25,
        remainig: 16
    },
    {
        name: "Josef",
        total: 25,
        remainig: 7
    }
];

class Download extends React.Component {
  state= {
    internalWidth: '',
    internalDepth: '',
    internalHeight: '',
    dataSet1: [
      {
        name: 'josh',
        amount: 30000,
        sex: 'M',
        is_married: true
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
    render() {
        return (
          <div className="wrapper"> 
            <div className="form-group">
                <label htmlFor="iw">Internal width</label>
                <input type="text" id="iw" className="form-control" value={this.state.internalWidth} onChange={this.handleIWChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="id">Internal depth</label>
                <input type="text" id="id" className="form-control" value={this.state.internalDepth} onChange={this.handleIDChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="ih">Internal height</label>
                <input type="text" id="ih" className="form-control" value={this.state.internalHeight} onChange={this.handleIHChange}/>
            </div>
            <button className="accept">Accept</button>
            <ExcelFile element={<button>Download Data</button>}>
                <ExcelSheet data={this.state.dataSet1} name="Employees">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Wallet Money" value="amount"/>
                    <ExcelColumn label="Gender" value="sex"/>
                    <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" : "Single"}/>
                </ExcelSheet>
                <ExcelSheet data={dataSet2} name="Leaves">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Total Leaves" value="total"/>
                    <ExcelColumn label="Remaining Leaves" value="remaining"/>
                </ExcelSheet>
            </ExcelFile>
          </div>
        );
    }
}
export default Download;