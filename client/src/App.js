import React, { Component } from 'react' 
import "./App.css"; 
import { Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { history } from "../src/history/history";
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Ifile from "./components/Ifile"



class App extends Component {
  render() {
    return (
      <div className="App">
      <Router history={history}>
      <NavBar/>
      <Route exact path="/" component={Home} />
      <Route exact path="/ifile" component={Ifile} />
        </Router>
      </div>
    )
  }
}

export default App



// import React, { Component } from "react";
// import {
//   Grid,
//   Table,
//   TableHeaderRow
// } from "@devexpress/dx-react-grid-material-ui";
// import Paper from "@material-ui/core/Paper";
// import Dropzone from "react-dropzone";
// import Button from "@material-ui/core/Button";
// import { AtomSpinner } from "react-epic-spinners";
// import { OutTable, ExcelRenderer } from "react-excel-renderer";
// import "./App.css";
// import Excel from "exceljs/dist/es5/exceljs.browser";
// let workbook = new Excel.Workbook();

// class App extends Component {
//   state = {
//     columns: [
//       { name: "key", title: "Object Key" },
//       { name: "Id", title: "Object Type ID" }
//     ],
//     rows: [],
//     spinner: false
//   };

//   fileHandler = acceptedFile => {
//     let fileObj = acceptedFile[0];
//     console.log(fileObj.type)
//     if(fileObj.type!=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && fileObj.type!=="application/vnd.ms-excel"){
//       this.setState({
//         errorMsg:"Please select only .xlsx or .csv files"
//       })
//       return
//     }
    
//     this.setState({
//       spinner: true,
//       errorMsg:""
//     });
//     //const workbook = new Excel.Workbook();
//     //   workbook.xlsx.readFile(fileObj)
//     //   .then(function() {
//     //     debugger
//     //     const workSheet = workbook.getWorksheet(1);
//     //     console.log(workSheet)
//     //   }).catch(function(error) {
//     //     debugger
//     //     console.log(error);
//     // });

//     ExcelRenderer(fileObj, (err, resp) => {
//       let newRows = [];
//       let obj = {};
//       if (err) {
//         console.log(err);
//       } else {
//         resp.rows.filter(item => {
//           obj = {
//             key: item[0],
//             Id: item[1]
//           };
//           newRows.push(obj);
//         });
//         this.setState({
//           rows: newRows,
//           spinner: false
//         });
//       }
//     });
//   };

//   validate = rows => {
//     let key = [];
//     rows.filter(tem => {
//       key.push(tem.key);
//     });
//     console.log(key);
//   };

//   render() {
//     const { rows, columns } = this.state;
//     if (this.state.spinner) {
//       return (
//         <AtomSpinner style={{ margin: "auto" }} size="100" color=" #003366" />
//       );
//     }

//     return (
//       <div className="App">
//         <Dropzone onDrop={this.fileHandler}>
//           {({ getRootProps, getInputProps }) => (
//             <section>
//               <div
//                 {...getRootProps()}
//                 style={{
//                   margin: "auto",
//                   width: "500px",
//                   padding: "10px",
//                   border: "1px dotted gray"
//                 }}
//               >
//                 <input
//                   {...getInputProps()}
//                   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                 />
//                 <p>Drop file here, or click to select file</p>
//               </div>
//             </section>
//           )}
//         </Dropzone>
//         {this.state.errorMsg ? <p style={{color:"red"}}>{this.state.errorMsg}</p> :
//         <div style={{ width: "520px", margin: "auto" }}>
//           <Paper>
//             <Grid rows={rows} columns={columns}>
//               <Table />
//               <TableHeaderRow />
//             </Grid>
//           </Paper>
//           <Button
//             style={{ margin: "10px" }}
//             onClick={this.validate.bind(this, rows)}
//             variant="contained"
//             color="primary"
//           >
//             Validate
//           </Button>
//         </div>
//          }
//       </div>
//     );
//   }
// }

// export default App;
