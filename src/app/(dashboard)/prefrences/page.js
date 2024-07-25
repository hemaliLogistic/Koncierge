"use client";

import React from "react";
import "../../../components/NavBar/global.css";

import "./global.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(82, 82, 82, 0.2)",
        "rgba(82, 82, 82, 0.4)",
        "rgba(82, 82, 82, 0.6)",
        "rgba(82, 82, 82, 0.8)",
        "rgba(82, 82, 82, 1)",
        "rgba(82, 82, 82, 0.2)",
      ],
      borderColor: [
        "rgba(82, 82, 82, 1)",
        "rgba(82, 82, 82, 1)",
        "rgba(82, 82, 82, 1)",
        "rgba(82, 82, 82, 1)",
        "rgba(82, 82, 82, 1)",
        "rgba(82, 82, 82, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const UserDashBoard = () => {
  return (
    <div className='prefrences-main-container'>
      <div className='prefrences-box-shadow'>
        <p className='prefrences-header'>Service Preferences</p>
        <div className='horizontal-divider'></div>
        <div className='prefrences-container'>
          <div className='prefrences-left-section'>
            <div className='selection-container'>
              <p className='selection-label'>Service Type</p>
              <select className='select-input'>
                <option value='admin' selected>
                  Service Type
                </option>
                <option value='editor'>Editor</option>
                <option value='viewer'>Viewer</option>
              </select>
              <span className='selection-image'>
                <img src='/images/drop-down-icon.svg' />
              </span>
            </div>

            <div className='mt-[20px] selection-container'>
              <p className='selection-label'>Service Type Name</p>
              <select className='select-input'>
                <option value='admin' selected>
                  Service Type Name
                </option>
                <option value='editor'>Editor</option>
                <option value='viewer'>Viewer</option>
              </select>
              <span className='selection-image'>
                <img src='/images/drop-down-icon.svg' />
              </span>
            </div>

            <div className='submit-btn-container'>
              <button className='submit-btn'>Submit</button>
            </div>
          </div>

          <div className='prefrences-right-section'>
            <div className='flex'>
              {/* <img src="/images/Pie.svg" className="service-chart-image" />  */}
              <Pie data={data} className='service-chart-image' />
            </div>

            <div className='service-list-container'>
              <div className='service-element-container'>
                <img src='/images/sn1.svg' className='' />
                <p className='service-name'>Service Name 1</p>
                <div className='pl-5'>
                  <p className='service-subtext'>30 %</p>
                </div>
              </div>

              <div className='service-element-container'>
                <img src='/images/sn2.svg' className='' />
                <p className='service-name'>Service Name 2</p>
                <div className='pl-5'>
                  <p className='service-subtext'>25 %</p>
                </div>
              </div>

              <div className='service-element-container'>
                <img src='/images/sn3.svg' className='' />
                <p className='service-name'>Service Name 3</p>
                <div className='pl-5'>
                  <p className='service-subtext'>25 %</p>
                </div>
              </div>

              <div className='service-element-container'>
                <img src='/images/sn4.svg' className='' />
                <p className='service-name'>Service Name 4</p>
                <div className='pl-5'>
                  <p className='service-subtext'>10 %</p>
                </div>
              </div>

              <div className='service-element-container'>
                <img src='/images/sn5.svg' className='' />
                <p className='service-name'>Service Name 5</p>
                <div className='pl-5'>
                  <p className='service-subtext'>10 %</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
