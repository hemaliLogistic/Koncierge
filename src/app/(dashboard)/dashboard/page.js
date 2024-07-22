"use client";

import React from "react";
import "../../../components/NavBar/global.css";
import Navbar from "../../../components/NavBar/NavBar";
import "./global.css";
import { useTranslation } from "next-i18next";

const UserDashBoard = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className='main-container-div'>
        <div class='dashboard-view'>
          <div class='total-booking'>
            <div class='column-view '>
              <div>
                <h3 class='title-text'>{t("TotalBookings")}</h3>
              </div>
              <div className='calendar-div'>
                <p class='booking-text'>10</p>
                <img src='/images/calendarAll.png' className='w-8 h-8' />
              </div>
            </div>
          </div>
          <div class='upcoming-booking'>
            <div class='column-view '>
              <div>
                <h3 class='title-text'>{t("UpcomingBookings")}</h3>
              </div>
              <div className='calendar-div'>
                <p class='booking-text'>4</p>
                <img src='/images/calendar.png' className='w-8 h-8' />
              </div>
            </div>
          </div>
          <div class='pending-booking'>
            <div class='column-view '>
              <div>
                <h3 class='title-text'>{t("PendingBookings")}</h3>
              </div>
              <div className='calendar-div'>
                <p class='booking-text'>4</p>
                <img src='/images/calendarPending.png' className='w-8 h-8' />
              </div>
            </div>
          </div>
          <div class='completed-booking'>
            <div class='column-view '>
              <div>
                <h3 class='title-text'>{t("CompletedBookings")}</h3>
              </div>
              <div className='calendar-div'>
                <p class='booking-text'>4</p>
                <img src='/images/taskComplete.png' className='w-8 h-8' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashBoard;
