"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../components/NavBar/global.css";

import "./global.css";
import DataTableComponent from "@/components/DataTable";
import PaginationComponent from "@/components/Pagination";
import Loader from "@/components/Loader";
import { useTranslation } from "next-i18next";

const Bookings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = React.useState(1);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useTranslation("common");
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
  return (
    <>
      <div className='main-booking-div'>
        {isLoading && <Loader />}
        {!isLoading && (
          <div className='main-booking-table-div'>
            <div className='content-booking-border'>
              <h1 className='main-booking-table-title'>{t("UpcomingList")}</h1>
            </div>
            <div className='main-booking-table-column'>
              <div className='table-booking-div-content'>
                <DataTableComponent
                  data={data}
                  isLoading={isLoading}
                  isPayment={false}
                />
              </div>
              <div className='pagination-booking-div'>
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

export default Bookings;
