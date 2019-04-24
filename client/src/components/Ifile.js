import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmailList } from "../actions";
import { bindActionCreators } from "redux";
//import {Container,ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import Autocomplete from "./AutoComplete";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import { AtomSpinner } from "react-epic-spinners";
import { OutTable, ExcelRenderer } from "react-excel-renderer";

class ShoppingList extends Component {
  state = {
    columns: [
      { name: "key", title: "Object Key" },
      { name: "Id", title: "Object Type ID" }
    ],
    rows: [],
    spinner: false
  };
  fileHandler = acceptedFile => {
    let fileObj = acceptedFile[0];
    console.log(fileObj.type);
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
      errorMsg: ""
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
    console.log(key);
  };

  componentDidMount = () => {
    this.props.getEmailList();
  };

  render() {
    const { rows, columns } = this.state;
    if (this.state.spinner) {
      return (
        <AtomSpinner style={{ margin: "auto" }} size="100" color=" #003366" />
      );
    }

    return (
      <div>
        <div className="App">
          <Dropzone onDrop={this.fileHandler}>
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
                  <Table />
                  <TableHeaderRow />
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
        <hr />
        <h5>Email Notification</h5>
        <div className="App" style={{ width: "520px", margin: "auto" }}>
          <Autocomplete Emails={this.props.item.EmailList} />
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
