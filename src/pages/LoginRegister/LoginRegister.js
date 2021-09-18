import React, { Component,Suspense } from "react";
import backgroundLogin from "../../assets/images/backgroundFooter.jpg";
import logo from "../../assets/images/logo.png";
import DangNhap from "./DangNhap/DangNhap";
import DangKy from "./DangKy/DangKy";
import { USER_ACCESS_TOKEN } from "../../utils/constants/settingSystem";
import { Redirect } from "react-router-dom";
import { Translation } from "react-i18next";
import { getCookie } from "../../utils/functions/systemFunction";

class MyComponent extends Component {
  state = {
    dangNhap: true,
  };
  changeDangNhap = (boolean) => {
    this.setState({
      dangNhap: boolean,
    });
  };
  render() {
    if (getCookie(USER_ACCESS_TOKEN)!=='{}') {
      if(this.props.history.length<2){
        return <Redirect to="/" />
      }
      else{
        return this.props.history.goBack();
      }
    } else {
      return (
        <div
          className="flex items-center justify-center w-full h-auto min-h-screen bg-center bg-cover"
          style={{ backgroundImage: `url(${backgroundLogin})` }}
        >
          <div className="w-1/2 h-auto p-5 bg-white shadow-2xl rounded-xl">
            <div className="flex items-center justify-center w-full mb-5">
              <img className="inline-block" src={logo} alt="logo m-0" />
              <h1 className="inline-block m-0 text-5xl">{<Translation>{(t) => <>{t("Sign in")}</>}</Translation>}</h1>
            </div>
            <div className="w-full p-3 border-2 border-collapse rounded-xl">
              <div className="grid w-full grid-cols-2">
                <div
                  className="w-full p-3 cursor-pointer"
                  style={
                    this.state.dangNhap
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "#C2B8A3" }
                  }
                  onClick={() => {
                    this.changeDangNhap(true);
                  }}
                >
                  <h1 className="m-0 text-xl text-center">{<Translation>{(t) => <>{t("Sign in")}</>}</Translation>}</h1>
                </div>
                <div
                  className="w-full p-3 cursor-pointer"
                  style={
                    !this.state.dangNhap
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "#C2B8A3" }
                  }
                  onClick={() => {
                    this.changeDangNhap(false);
                  }}
                >
                  <h1 className="m-0 text-xl text-center">{<Translation>{(t) => <>{t("Register")}</>}</Translation>}</h1>
                </div>
              </div>
              <div>
                {this.state?.dangNhap ? (
                  <DangNhap history={this.props.history}/>
                ) : (
                  <DangKy changeDangNhap={this.changeDangNhap}/>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default function LoginRegister(props) {
  return (
    <Suspense fallback="">
      <MyComponent {...props} />
    </Suspense>
  );
}
