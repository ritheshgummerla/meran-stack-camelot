import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import { Button } from "@material-ui/core";
import "font-awesome/css/font-awesome.min.css";

export default class AutoCompete extends Component {
  state = {
    selectedOption: null,
    emails: [],
    isDuplicate: false
  };

  handleChange = selectedOption => {
    const { emails } = this.state;
    const duplicate = emails.some(item => {
      this.setState({
        isDuplicate: true
      });
      return item.email === selectedOption.value;
    });
    if (!duplicate) {
      emails.push({ email: selectedOption.value });
      this.setState({
        selectedOption: null,
        emails: emails,
        isDuplicate: false
      });
    }
  };

  onDelete = id => {
    const { emails } = this.state;
    emails.splice(id, 1);
    this.setState({ selectedOption: null, emails: emails, isDuplicate: false });
  };

  render() {
    const options = [];
    const { Emails } = this.props;
    if (Emails) {
      Emails.map(item => {
        options.push({ value: item, label: item });
      });
    }
    const { selectedOption, emails } = this.state;
    return (
      <div>
        {this.state.isDuplicate ? (
          <span style={{ color: "red" }}>Email already selected</span>
        ) : (
          ""
        )}
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          isClearable
          placeholder="type.. or select.."
        />
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emails.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <i
                      class="fa fa-times-circle"
                      onClick={e => this.onDelete(i)}
                      style={{ fontSize: "20px", color: "#f50057" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {emails.length !== 0 ? (
            <Button
              style={{ margin: "10px" }}
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          ) : (
            ""
          )}
        </Paper>
      </div>
    );
  }
}
