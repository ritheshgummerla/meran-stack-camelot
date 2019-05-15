import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmailList, onValidate, ifileRequest } from "../actions";
import { bindActionCreators } from "redux";
import { Container, Row, Col, Progress } from "reactstrap";
import Autocomplete from "./AutoComplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
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
import TreeComponent from "./tree";

class ShoppingList extends Component {
  state = {
    columns: [
      { name: "key", title: "Object Key" },
      { name: "Id", title: "Object Type ID" },
      { name: "Status", title: "status" },
      { name: "message", title: "message" }
    ],
    value: 0,
    rows: [],
    spinner: false,
    selectedFile: null,
    selectedEmails: [],
    newRows: [],
    updatedRows: [],
    isUpdated: false,
    validIds: [],
    destinationPath: ""
  };
  onSubmit = () => {
    const { validIds, selectedEmails, destinationPath } = this.state;
    let IfileRequestData = {
      validIds: validIds,
      selectedEmails: selectedEmails,
      destinationPath: destinationPath
    };
    this.props.ifileRequest(IfileRequestData);
  };

  onBrowseFile = acceptedFile => {
    this.setState({
      selectedFile: acceptedFile
    });
  };

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
      isUpdated: false,
      errorMsg: ""
    });

    ExcelRenderer(fileObj, (err, resp) => {
      const { newRows } = this.state;
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
          newRows,
          rows: newRows,
          spinner: false
        });
      }
    });
  };

  validate = rows => {
    let id = [];
    rows.filter(tem => {
      id.push(tem.Id);
    });
    this.props.onValidate(id);
  };

  componentDidMount = () => {
    this.props.getEmailList();
  };

  getMails = mails => {
    this.setState({
      selectedEmails: mails
    });
  };

  onSelectPath = e => {
    this.setState({
      destinationPath: e.target.value
    });
  };

  componentWillReceiveProps = props => {
    const { rows,  validIds } = this.state;
    const { validData } = props.item;
    console.log(props);
    if (validData) {
      let updated = rows.map(item => {
        validData.data.filter(ids => {
          if (ids.id === item.Id) {
            item.Status = ids.status;
            validIds.push(item.Id);
          }
        });
        return item;
      });
      this.setState({
        value: this.state.value++,
        isUpdated: true,
        updatedRows: updated,
        validIds
      });
    }
  };

  render() {
    console.log(this.props.item.IfileResponse.data);
    const {
      rows,
      columns,
      updatedRows,
      isUpdated,
      value
    } = this.state;
    if (this.state.spinner) {
      return (
        <AtomSpinner style={{ margin: "auto" }} size="100" color=" #003366" />
      );
    }
    return (
      <Container>
        <ToastContainer autoClose={2000} />
        <Row>
          <Col xs="6" sm="6">
            <Dropzone onDrop={this.fileHandler} multiple>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    style={{
                      width: "540px",
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
              <div>
                <Paper>
                  <Grid rows={isUpdated ? updatedRows : rows} columns={columns}>
                    <PagingState defaultCurrentPage={0} pageSize={10} />
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
                <input
                  type="text"
                  style={{ width: "350px" }}
                  id="fileId"
                  placeholder="paste destination path..."
                  onChange={e => this.onSelectPath(e)}
                />
                <div className="App">
                  <h5>Email Notification</h5>
                  <Autocomplete
                    Emails={this.props.item.EmailList}
                    getMails={this.getMails}
                  />
                </div>
              </div>
            )}
          </Col>
          <Col xs="6" sm="6" style={{ height: "400px", overflow: "auto" }}>
            <TreeComponent />
          </Col>
        </Row>
        <Progress value={value} />
        <Row>
          <Col sm="12" md={{ size: 6, offset: 5 }}>
            <Button
              style={{ margin: "10px" }}
              variant="contained"
              color="primary"
              onClick={this.onSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.reducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEmailList: getEmailList,
      onValidate: onValidate,
      ifileRequest: ifileRequest
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
