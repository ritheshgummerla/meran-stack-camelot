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
    deletedEmail: null
  };

  handleChange = selectedOption => {
    const { emails } = this.state;
    emails.push({ email: selectedOption.value });
    this.setState({
      selectedOption: selectedOption.value,
      emails: emails,
      deletedEmail: null
    });
    this.props.getMails(this.state.emails)
  };

  onDelete = (item, id) => {
    const { emails } = this.state;
    emails.splice(id, 1);
    this.setState({
      selectedOption: null,
      emails: emails,
      deletedEmail: item.email
    });
  };

  render() {
    let options = [];
    const { Emails } = this.props;
    const { selectedOption, emails } = this.state;

    if (this.state.deletedEmail !== null) {
      Emails.push(this.state.deletedEmail);
    }

    if (Emails) {
      Emails.sort();
      const index = Emails.indexOf(this.state.selectedOption);
      if (index !== -1) Emails.splice(index, 1);
      Emails.map((item, i) => {
        options.push({ value: item, label: item });
      });
    }

    return (
      <div>
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
                <TableRow key={i}>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <i
                      className="fa fa-times-circle"
                      onClick={e => this.onDelete(item, i)}
                      style={{ fontSize: "20px", color: "#f50057" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
