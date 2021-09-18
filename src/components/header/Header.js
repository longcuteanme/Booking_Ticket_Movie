import React, { Suspense } from "react";
import logo from "../../assets/images/logo.png";
import "./Header.scss";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { useTranslation } from "react-i18next";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

// function scrollTo(hash) {
//   Window.scrollTo({
//     location.hash:hash,
//   })
//   location.hash = "#" + hash;
//   behavior= "smooth";
// }

function MyComponent() {
  const { t } = useTranslation();
  return (
    <header
      className="fixed top-0 w-full h-20 text-center text-black bg-white shadow-lg bg-opacity-95 hover:bg-opacity-100"
      style={{ zIndex: "100" }}
    >
      <table className="w-full h-full table-fixed">
        <tbody key="tbody">
          <tr>
            <th className="w-3/12">
              <Link onClick={scrollToTop} to="/">
                <img className="inline-block w-20" src={logo} alt="logo"></img>
              </Link>
            </th>
            <th className="w-6/12">
              <ul className="ulHeader">
                <li>
                  <Link
                    className="text-gray-900 hover:text-red-500"
                    onClick={scrollToTop}
                    to="/"
                  >
                    {t("Home")}
                  </Link>
                </li>
                <li className="text-gray-900 hover:text-red-500">
                  <Link
                    className="text-gray-900 hover:text-red-500"
                    to={{ pathname: "/" }}
                    onClick={() => {
                      window.scroll({
                        top: 750,
                        behavior: "smooth",
                      });
                    }}
                  >
                    {t("List Film")}
                  </Link>
                </li>
                <li className="text-gray-900 hover:text-red-500">
                  <Link
                    className="text-gray-900 hover:text-red-500"
                    to={{ pathname: "/" }}
                    onClick={() => {
                      window.scroll({
                        top: 1800,
                        behavior: "smooth",
                      });
                    }}
                  >
                    {t("Theater System")}
                  </Link>
                </li>
                <li className="text-gray-900 hover:text-red-500">
                  <a
                    className="text-gray-900 hover:text-red-500"
                    href="#footer"
                    // onClick={()=>scrollTo('footer')}
                  >
                    {t("Contact")}
                  </a>
                </li>
              </ul>
            </th>
            <th className="w-3/12">
              <UserButton />
            </th>
          </tr>
        </tbody>
      </table>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback="">
      <MyComponent />
    </Suspense>
  );
}
