import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import { connect } from "react-redux";
import "./Loading.css";

class Loading extends Component {
  state = {
    loading: false,
  };
  render() {
    const loading = this.props.loading;
    return (
      <>
        {loading ? (
          <div
            className="fixed top-0 w-full h-screen"
            style={{ zIndex: "200" }}
          >
            <div className="flex items-center justify-center w-full h-full bg-white">
              <img src={logo} className="h-1/6" alt="logo" id="loading"></img>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default connect((state) => {
  return {
    loading: state.loadingReducer?.loading,
  };
})(Loading);
