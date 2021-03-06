import React, { Component } from "react";
import { Layout, Menu } from "antd";
import logo from "../../../assets/images/logo.png";
import { menuList, subMenuArray } from "./configMenu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { menuQuanTriAction } from "../../../redux/actions/actionCombine";

const { SubMenu } = Menu;
const { Sider } = Layout;

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

class MenuList extends Component {
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.name}>
            {item.children.map((item2,index2) => {
              return (
                <Link
                  onClick={() => {
                    scrollToTop();
                  }}
                  to={`/QuanTri${item.path}${item2.path}`}
                  key={index2}
                >
                  <Menu.Item key={item2.key}>{item2.name}</Menu.Item>
                </Link>
              );
            })}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} icon={item.icon} onClick={() => {}}>
            <Link
              onClick={() => {
                scrollToTop();
              }}
              to={`/QuanTri${item.path}`}
            >
              {item.name}
            </Link>
          </Menu.Item>
        );
      }
    });
  };
  setOpenKeys = (arr) => {
    this.props.dispatch(menuQuanTriAction.Creators.set(arr));
  };
  onOpenChange = (keys) => {
    const latestOpenKey = keys.find(
      (key) => this.props.openKeys.indexOf(key) === -1
    );
    if (subMenuArray.indexOf(latestOpenKey) === -1) {
      this.setOpenKeys(keys);
    } else {
      this.setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className="w-full flex justify-center p-3">
          <Link
            onClick={scrollToTop} to="/"
          >
            <img className="w-1/2" src={logo} alt="logo" />
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={this.props.openKeys}
          onOpenChange={this.onOpenChange}
        >
          {this.renderMenu(menuList)}
        </Menu>
      </Sider>
    );
  }
}
export default connect((state) => {
  return {
    openKeys: state.menuQuanTriReducer.openKeys,
  };
})(MenuList);
