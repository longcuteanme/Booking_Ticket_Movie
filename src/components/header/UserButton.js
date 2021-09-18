import React, { Suspense,useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Select } from "antd";
import {
  USER_ACCESS_TOKEN,
  USER_INFO,
} from "../../utils/constants/settingSystem";
import { deleteAllCookies, getCookie } from "../../utils/functions/systemFunction";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {localeAction} from '../../redux/actions/actionCombine'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
const { Option } = Select;

function MyComponent(props) {
  const { t, i18n } = useTranslation();
  const value = useSelector((state) => state.localeReducer.value);
  const dispatch = useDispatch();
  const handleChange = async (value) => {
    await i18n.changeLanguage(value);
    await dispatch(localeAction.Creators.change(value))
  };
  useEffect(() => {
    i18n.changeLanguage(value)
  },[]);
  const menu = (
    <Menu>
      <Menu.Item className="bg-white hover:bg-gray-400">
        <Link className="text-black " onClick={scrollToTop} to="/TaiKhoan">
          {t("Account Info")}
        </Link>
      </Menu.Item>
      {JSON.parse(getCookie(USER_INFO))?.maLoaiNguoiDung ===
      "QuanTri" ? (
        <Menu.Item className="bg-white hover:bg-gray-400">
          <Link
            className="text-black "
            onClick={scrollToTop}
            to="/QuanTri/DashBoard"
          >
            {t("Administrator")}
          </Link>
        </Menu.Item>
      ) : (
        <></>
      )}

      <Menu.Item className="bg-white hover:bg-gray-400">
        <Link
          className="text-black "
          to="/"
          onClick={() => {
            deleteAllCookies();
            scrollToTop();
          }}
        >
          {t("Sign out")}
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      {getCookie(USER_ACCESS_TOKEN)!=='{}' ? (
        <div className="inline-block mr-3">
          <Dropdown overlay={menu} placement="bottomCenter">
            <div className="flex items-center">
              <div className="flex items-center inline-block p-1 mr-2 border-2 border-gray-500 rounded-full h-9">
                <UserOutlined style={{ fontSize: "25px", color: "gray" }} />
              </div>
              <p className="inline-block m-0 text-sm font-bold text-gray-500 cursor-pointer hover:underline">
                {JSON.parse(getCookie(USER_INFO))?.hoTen}
              </p>
            </div>
          </Dropdown>
        </div>
      ) : (
        <Link
          className="inline-block m-0 mr-3 text-sm font-bold text-gray-500 cursor-pointer hover:text-gray-600"
          to="/Login"
          onClick={scrollToTop}
        >
          {`${t("Sign in")}/${t("Register")}`}
        </Link>
      )}
      <div className="inline-block">
        <Select value={value} style={{ width: 100 }} onChange={handleChange}>
          <Option value="en">English</Option>
          <Option value="vi">Tiếng việt</Option>
          <Option value="chi">中国人</Option>
        </Select>
      </div>
    </div>
  );
}

export default function UserButton() {
  return (
    <Suspense fallback="">
      <MyComponent />
    </Suspense>
  );
}
