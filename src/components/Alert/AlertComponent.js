import React, { Component } from "react";
import { Alert } from "antd";
import { connect } from "react-redux";
import { alertAction } from "../../redux/actions/actionCombine";

class AlertComponent extends Component {
  onClose = () => {
    this.props.dispatch(alertAction.Creators.close());
  };
  // setTime=setTimeout(this.onClose, 3000);
  componentDidUpdate = () => {
    if (this.props.alert.open) setTimeout(this.onClose, 3000);
  };
  componentDidMount = () => {
    if (this.props.alert.open) setTimeout(this.onClose, 3000);
  };
  // componentWillUnmount=()=>{

  // }
  render() {
    const { message, description, type, open } = this.props.alert;
    if (open)
      return (
        <div className="fixed bottom-3 right-7" style={{ zIndex: "220", boxShadow: '0px 0px 1px gray' }}>
          <Alert
            message={message}
            description={description}
            type={type}
            onClose={this.onClose}
            showIcon
            // closable
          />
        </div>
      );
    else return <></>;
  }
}
export default connect((state) => {
  return {
    alert: state.alertReducer,
  };
})(AlertComponent);
