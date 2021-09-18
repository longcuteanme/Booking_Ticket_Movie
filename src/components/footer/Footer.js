import React, { Suspense } from "react";
import backgroundFooter from "../../assets/images/backgroundFooter.jpg";
import {
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import antd from "../../assets/icon/antd.png";
import axios from "../../assets/icon/axios.png";
import bizchart from "../../assets/icon/bizchart.png";
import i18 from "../../assets/icon/i18.png";
import lodash from "../../assets/icon/lodash.png";
import moment from "../../assets/icon/moment.png";
import redux_saga from "../../assets/icon/redux_saga.png";
import redux from "../../assets/icon/redux.png";
import tailwind from "../../assets/icon/tailwind.png";

function MyComponent() {
  const { t } = useTranslation();
  return (
    <div
      className="w-full h-auto py-24 bg-cover bg-cente px-52"
      id="footer"
      style={{ backgroundImage: `url(${backgroundFooter})` }}
    >
      <div className="grid w-full grid-cols-2 text-white">
        <div className="Info">
          <h1 className="text-3xl text-white">{t("Info Contact")}</h1>
          <table>
            <tbody key="tbody">
              <tr>
                <td className="p-2">
                  <UserOutlined style={{ color: "white", fontSize: "30px" }} />
                </td>
                <td className="p-2 text-lg">Trịnh Văn Long - 23y</td>
              </tr>
              <tr>
                <td className="p-2">
                  <PhoneOutlined style={{ color: "white", fontSize: "30px" }} />
                </td>
                <td className="p-2 text-lg">0384912727</td>
              </tr>
              <tr>
                <td className="p-2">
                  <MailOutlined style={{ color: "white", fontSize: "30px" }} />
                </td>
                <td className="p-2 text-lg">psatrinhlongat48@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="congNghe ">
          <h1 className="text-3xl text-white">{t("Technology Used")}</h1>
          <div>
            <img className="inline-block w-16 m-3" src={antd} alt="antd"></img>
            <img
              className="inline-block w-16 m-3"
              src={tailwind}
              alt="tailwind"
            ></img>
            <img
              className="inline-block w-16 m-3"
              src={axios}
              alt="axios"
            ></img>
            <img
              className="inline-block w-16 m-3"
              src={bizchart}
              alt="bizchart"
            ></img>
            <img className="inline-block w-16 m-3" src={i18} alt="i18"></img>
            <img
              className="inline-block w-16 m-3"
              src={lodash}
              alt="lodash"
            ></img>
            <img
              className="inline-block w-16 m-3"
              src={moment}
              alt="moment"
            ></img>
            <img
              className="inline-block w-16 m-3"
              src={redux}
              alt="redux"
            ></img>
            <img
              className="inline-block w-16 m-3"
              src={redux_saga}
              alt="redux_saga"
            ></img>
          </div>
        </div>
      </div>
      <hr className="my-5" style={{ color: "white", border: "1px solid" }} />
      <table className="m-auto">
        <tbody key="tbody">
          <tr>
            <td>
              <GithubOutlined
                style={{ color: "white", fontSize: "20px", padding: "5px" }}
              />
            </td>
            <td className="p-2">
              <a
                className="text-sm text-white"
                href="https://github.com/longcuteanme/Booking_Ticket_Movie"
              >
                https://github.com/longcuteanme/Booking_Ticket_Movie
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function Footer() {
  return (
    <Suspense fallback="">
      <MyComponent />
    </Suspense>
  );
}
