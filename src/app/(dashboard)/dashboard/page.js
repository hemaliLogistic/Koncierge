"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../components/NavBar/global.css";
import Navbar from "../../../components/NavBar/NavBar";
import "./global.css";
import { useTranslation } from "next-i18next";
import Loader from "@/components/Loader";
import DataTableComponent from "@/components/DataTable";
import { Button, IconButton } from "@material-tailwind/react";
import PaginationComponent from "@/components/Pagination";

const UserDashBoard = () => {
  const { t } = useTranslation("common");
  const [totalBooking, setTotalBooking] = useState("10");
  const [pendingBooking, setPendingBooking] = useState("4");
  const [completedBooking, setCompletedBooking] = useState("15");
  const [upcomingBooking, setUpcomingBooking] = useState("100");
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = React.useState(1);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 15; // Adjust this as per your requirement

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const data = [
    {
      id: 1,
      name: "Service Name Here",
      instuction: "Service Instruction",
      date: "22/4/2024",
      time: "8:00AM - 9:00PM",
      status: "Completed",
    },
    {
      id: 2,
      name: "Service Name Here",
      instuction: "Service Instruction",
      date: "22/4/2024",
      time: "8:00AM - 9:00PM",
      status: "Pending",
    },
    {
      id: 3,
      name: "Service Name Here",
      instuction: "Service Instruction",
      date: "22/4/2024",
      time: "8:00AM - 9:00PM",
      status: "Upcoming",
    },
    {
      id: 4,
      name: "Service Name Here",
      instuction: "Service Instruction",
      date: "22/4/2024",
      time: "8:00AM - 9:00PM",
      status: "Completed",
    },
    {
      id: 5,
      name: "Service Name Here",
      instuction: "Service Instruction",
      date: "22/4/2024",
      time: "8:00AM - 9:00PM",
      status: "Pending",
    },
  ];

  const handlePageChange = (page) => {
    console.log("page=-=-=", page);
    setCurrentPage(page);
    // Handle your data fetching or state update logic here
  };

  const handleClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
    className: "rounded-full",
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <>
      <div className='main-container-div'>
        <div className='dashboard-view'>
          <div class='total-booking'>
            <div class='column-view '>
              <div>
                <h3 class='title-text'>{t("TotalBookings")}</h3>
              </div>
              <div className='calendar-div'>
                <p class='booking-text'>{totalBooking}</p>
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
                <p class='booking-text'>{upcomingBooking}</p>
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
                <p class='booking-text'>{pendingBooking}</p>
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
                <p class='booking-text'>{completedBooking}</p>
                <img src='/images/taskComplete.png' className='w-8 h-8' />
              </div>
            </div>
          </div>
        </div>
        {isLoading && <Loader />}
        {!isLoading && (
          <div className='main-table-div'>
            <div className='content-border'>
              <h1 className='main-table-title'>{t("AllList")}</h1>
            </div>
            <div className='main-table-column'>
              <div className='table-div-content'>
                <DataTableComponent
                  data={data}
                  isLoading={isLoading}
                  isPayment={false}
                />
              </div>
              <div className='pagination-div'>
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashBoard;
