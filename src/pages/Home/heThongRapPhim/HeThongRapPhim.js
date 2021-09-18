import React, { Component } from "react";
import HeThongRap from "./heThongRap/HeThongRap";
import CumRapTheoHeThong from './cumRapTheoHeThong/CumRapTheoHeThong'
import PhimTheoCumRap from './phimTheoCumRap/PhimTheoCumRap'

export default class HeThongRapPhim extends Component {
    
  render() {
    return (
      <div className="w-5/6 mx-auto shadow-xl">
        <table className="w-full border border-collapse border-gray-300 table-fixed ">
          <thead key="thead">
            <tr>
              <th className="w-1/12 align-top border border-collapse border-gray-300">
                <HeThongRap/>
              </th>
              <th className="w-1/3 align-top border border-collapse border-gray-300">
                <CumRapTheoHeThong/>
              </th>
              <th className="w-7/12 align-top border border-collapse border-gray-300">
                <PhimTheoCumRap/>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

