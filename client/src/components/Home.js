import React, { Component } from "react";
import { connect } from "react-redux";
import { onChange, onsubmit } from "../actions";
import { bindActionCreators } from "redux";

class Home extends Component {
  render() {
    const { onChange, onsubmit } = this.props;
    const { name, data } = this.props.state;
    console.log(data);
    return (
      <div>
        Welcome
        <input type="text" name="name" onChange={onChange} />
        <button onClick={e => onsubmit(name)}>submit</button>
        <hr />
        <span style={{color:"green"}}>{data ? data.name : ""}</span>
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
