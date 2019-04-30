import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmailList } from "../actions";
import { bindActionCreators } from "redux";
//import {Container,ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import Autocomplete from "./AutoComplete";
import BrowseFile from "./BrowseFile";

import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import { AtomSpinner } from "react-epic-spinners";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import copyfiles from "copyfiles";
import $ from 'jquery';

class ShoppingList extends Component {
  state = {
    columns: [
      { name: "key", title: "Object Key" },
      { name: "Id", title: "Object Type ID" }
    ],
    rows: [],
    spinner: false,
    selectedFile:null,
    selectedEmails:[]
  };

  

  onSubmit=()=>{
    const {selectedFile} = this.state
    const absolutePath=document.getElementById("fileId");     
    const arrayOfPaths=[
      absolutePath,
      "D:\fileTestdestination"
    ]
    console.log(arrayOfPaths)
    copyfiles(arrayOfPaths, "-a", function(err) {
      if (err) console.error(err);
    });
  } 

  onBrowseFile = acceptedFile => {
    this.setState({
      selectedFile:acceptedFile
    });
  }

  fileHandler = acceptedFile => {
    let fileObj = acceptedFile[0];
    if (
      fileObj.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      fileObj.type !== "application/vnd.ms-excel"
    ) {
      this.setState({
        errorMsg: "Please select only .xlsx or .csv files"
      });
      return;
    }

    this.setState({
      spinner: true,
      errorMsg: "",
    });

    ExcelRenderer(fileObj, (err, resp) => {
      let newRows = [];
      let obj = {};
      if (err) {
        console.log(err);
      } else {
        resp.rows.filter(item => {
          obj = {
            key: item[0],
            Id: item[1]
          };
          newRows.push(obj);
        });
        this.setState({
          rows: newRows,
          spinner: false
        });
      }
    });
  };

  validate = rows => {
    let key = [];
    rows.filter(tem => {
      key.push(tem.key);
    });
  };

  componentDidMount = () => {
    this.props.getEmailList();
  };

  getMails=(mails)=>{
    this.setState({
      selectedEmails:mails
    });
  }

  render() {
    const { rows, columns } = this.state;
    if (this.state.spinner) {
      return (
        <AtomSpinner style={{ margin: "auto" }} size="100" color=" #003366" />
      );
    }

    return (
      <div>
        <h5 className="App">IFILE DOWNLOAD</h5>
        <hr />
        <div
          className="App"
          style={{
            width: "50%",
            float: "left",
            backgroundColor: "lightgray",
            padding: "10px"
          }}
        >
          <h5>Import File</h5>
          <Dropzone onDrop={this.fileHandler} multiple >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  style={{
                    margin: "auto",
                    width: "500px",
                    padding: "10px",
                    border: "1px dotted gray"
                  }}
                >
                  <input
                    {...getInputProps()}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                  <p>Drop file here, or click to select file</p>
                </div>
              </section>
            )}
          </Dropzone>
          {this.state.errorMsg ? (
            <p style={{ color: "red" }}>{this.state.errorMsg}</p>
          ) : (
            <div style={{ width: "500px", margin: "auto" }}>
              <Paper>
                <Grid rows={rows} columns={columns}>
                  <PagingState defaultCurrentPage={0} pageSize={5} />
                  <IntegratedPaging />
                  <Table />
                  <TableHeaderRow />
                  <PagingPanel />
                </Grid>
              </Paper>
              <Button
                style={{ margin: "10px" }}
                onClick={this.validate.bind(this, rows)}
                variant="contained"
                color="primary"
              >
                Validate
              </Button>
            </div>
          )}
        </div>
        <div
          style={{
            width: "50%",
            float: "left",
            height: "395px",
            backgroundColor: "lightgray",

            padding: "10px"
          }}
        >
          <div>
          <h5>Browse To Target</h5>
          <input
            type="file"
            id="fileId"
            //directory="" webkitdirectory=""
            onChange={e => this.onBrowseFile(e.target.files)}
          />
        </div>
        <div>
          <h5>Target Name</h5>
          <input type="text" />
        </div>
        </div>
        <div className="App" style={{ width: "50%", margin: "auto" }}>
          <h5>Email Notification</h5>
          <Autocomplete Emails={this.props.item.EmailList} getMails={this.getMails} />
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            color="primary"
            onClick={this.onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.reducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEmailList: getEmailList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
