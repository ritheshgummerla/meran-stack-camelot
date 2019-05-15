import React, { Component } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const nodes = [
  {
    value: "object",
    label: "Object",
    showCheckbox: false,
    children: [
      {
        value: "department",
        label: "Department",
        children: [
          {
            value: "classification",
            label: "Classification",
            children: [
              {
                value: "docType",
                label: "Doc Type",
                children: [
                  { value: "files", label: "Files", showCheckbox: false }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export default class tree extends Component {
  state = {
    checked: [],
    expanded: ["object", "department", "classification", "docType"]
  };

  render() {
    const filteredPath = this.state.checked.join(",");
    const finalPath = filteredPath.replace(/,/g, "/");
    console.log(finalPath);
    return (
      <div>
        <CheckboxTree
          nodes={nodes}
          noCascade
          expandDisabled={true}
          checked={this.state.checked}
          expanded={this.state.expanded}
          onCheck={checked => this.setState({ checked })}
        />
      </div>
    );
  }
}
