"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../components/NavBar/global.css";
import Navbar from "../../../components/NavBar/NavBar";
import "./global.css";
import Loader from "@/components/Loader";
import DataTableComponent from "@/components/DataTable";
import PaginationComponent from "@/components/Pagination";
import { useTranslation } from "next-i18next";

const PastServices = () => {
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
      <div className='main-service-div'>
        {isLoading && <Loader />}
        {!isLoading && (
          <div className='main-service-table-div'>
            <div className='content-service-border'>
              <h1 className='main-service-table-title'>{t("PastList")}</h1>
            </div>
            <div className='main-service-table-column'>
              <div className='table-service-div-content'>
                <DataTableComponent
                  data={data}
                  isLoading={isLoading}
                  isPayment={false}
                />
              </div>
              <div className='pagination-service-div'>
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

export default PastServices;
