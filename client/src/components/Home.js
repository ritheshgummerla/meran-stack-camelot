import React, { Component } from "react";
import { connect } from "react-redux";
import { onChange, onsubmit } from "../actions";
import { bindActionCreators } from "redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class Home extends Component {
  render() {
    const { onChange, onsubmit } = this.props;
    const { name, data } = this.props.state;
    console.log(data);
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
              <h5>Welcome</h5>
          </Grid>
          <Grid item xs={6}>
            <Paper style={{padding:"20px"}}>
            
            <h5>Add</h5>
              <input type="text" name="name" onChange={onChange} />
              <button onClick={e => onsubmit(name)}>submit</button>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper style={{padding:"20px"}}>
            
            <h5>content</h5>
            <hr />
            <span style={{ color: "green" }}>{data ? data.name : ""}</span>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state.reducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onChange: onChange,
      onsubmit: onsubmit
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
