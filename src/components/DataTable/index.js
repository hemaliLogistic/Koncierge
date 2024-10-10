"use client";

import React, { useRef } from "react";
import DataTable from "react-data-table-component";
import "./global.css";
import { useTranslation } from "next-i18next";
import Loader from "../Loader";
import moment from "moment";
import { useRouter } from "next/navigation";

const DataTableComponent = ({ data, isLoading, isPayment, page }) => {
  const tableRef = useRef(null);
  const { t } = useTranslation("common");
  const router = useRouter();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const customStyles = {
    headCells: {
      style: {
        justifyContent: "center",
        textAlign: "center",
        borderLeft: "1px solid rgb(238, 236, 236, 0.8)",
        borderBottom: "0px",
      },
    },
    cells: {
      style: {
        borderLeftWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgb(238, 236, 236, 0.8)",
        borderBottomWidth: "0px",
        justifyContent: "center",
      },
    },
  };

  const column = [
    {
      name: (
        <div className="table-main-div">
          <span className="table-header-text">
            {isPayment ? t("Sr No.") : t("Sr No.")}
          </span>
        </div>
      ),
      selector: (row, index) => row.id,
      cell: (row, index) => (
        <div className="table-main-div">
          <span className="table-text" index={index}>
            {isPayment ? row?.id : row?.sequenceNumber}
          </span>
        </div>
      ),
      sortable: true,
      grow: 0.1,
    },
    {
      name: (
        <span className="table-header-text">
          {isPayment ? t("ServiceType") : t("ServiceType")}
        </span>
      ),
      selector: (row, index) => row.serviceName,
      cell: (row, index) => (
        <div className="table-main-div">
          <span index={index} className="table-text">
            {isPayment ? row?.serviceName : row?.serviceNames}
          </span>
        </div>
      ),
      sortable: true,
      grow: 3,
    },
    {
      name: (
        <span className="table-header-text">
          {isPayment ? t("AccountName") : t("Instruction")}
        </span>
      ),
      selector: (row, index) => row.description,
      cell: (row, index) => (
        <div className="table-main-div">
          <span index={index} className="table-text">
            {isPayment ? row?.accountHolderName : row?.description}
          </span>
        </div>
      ),
      sortable: true,
      grow: 3,
    },
    {
      name: (
        <span className="table-header-text">
          {isPayment ? t("TransferDate") : t("ServiceDate")}
        </span>
      ),
      selector: (row, index) => row.requestDate,
      cell: (row, index) => (
        <div className="table-main-div">
          <span index={index} className="table-text">
            {isPayment
              ? moment(row?.transferDate).format("DD/MM/YYYY")
              : moment(row?.requestDate).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
      sortable: true,
      grow: 3,
    },
    {
      name: (
        <span className="table-header-text">
          {isPayment ? t("TransferTime") : t("ServiceTime")}
        </span>
      ),
      selector: (row, index) => row.requestTime,
      cell: (row, index) => (
        <div className="table-main-div">
          <span index={index} className="table-text">
            {isPayment
              ? moment(row?.transferTime, "HH:mm:ss").format("hh:mm A")
              : moment(row?.requestTime, "HH:mm:ss").format("hh:mm A")}
            {}
          </span>
        </div>
      ),
      sortable: true,
      grow: 3,
    },
    {
      name: <span className="table-header-text">{t("Status")}</span>,
      selector: (row, index) => row.bookingStatus,
      cell: (row, index) => {
        console.log("Row===============>", row, index);
        return (
          <>
            {row?.bookingStatus === "View Quote" ? (
              <div
                className="table-main-div"
                onClick={() => {
                  if (row?.bookingStatus !== "Requested") {
                    router.push(`/notification/${row?.id}`);
                  }
                }}
              >
                <span
                  className={
                    !isPayment
                      ? `table-main-div table-button-text w-20 h-6 ${
                          row?.bookingStatus === "View Quote"
                            ? "bg-green-600 hsb:text-[10px] text-sm"
                            : row?.bookingStatus === "Pending"
                            ? "bg-yellow-500 opacity-40"
                            : "bg-gray-500 hsb:text-[10px] text-sm"
                        } text-white px-2 py-1 text-center`
                      : ""
                  }
                >
                  {isPayment ? row?.status : row?.bookingStatus}
                </span>
              </div>
            ) : (
              <div
                className="table-main-div"
                onClick={() => {
                  if (row?.bookingStatus !== "Requested") {
                    router.push(`/notification/${row?.id}`);
                  }
                }}
              >
                <span
                  className={`table-main-div table-button-text w-20 h-6 text-white px-2 py-1 text-center ${
                    row?.bookingStatus === "View Quote"
                      ? "bg-green-600 hsb:text-[10px] text-sm"
                      : row?.bookingStatus === "Pending"
                      ? "bg-yellow-500"
                      : row?.bookingStatus === "Upcoming"
                      ? "bg-blue-500 "
                      : row?.bookingStatus === "Rejected"
                      ? "bg-red-500"
                      : row?.bookingStatus === "Confirmed"
                      ? "bg-green00"
                      : row?.bookingStatus === "Requested"
                      ? "bg-orange-500"
                      : row?.bookingStatus === "Completed"
                      ? "bg-green-500"
                      : row?.bookingStatus === "Expired"
                      ? "bg-gray-700"
                      : "bg-gray-500"
                  }`}
                >
                  {isPayment ? row?.status : row?.bookingStatus}
                </span>
              </div>
            )}
          </>
        );
      },
      sortable: true,
      grow: 1,
    },
  ];

  // Handler for row click
  const handleRowClick = (row) => {
    if (row?.bookingStatus !== "Requested") {
      router.push(`/notification/${row.id}`); // Assuming `row.id` is the identifier you want to use in the route
    }
  };

  return (
    <>
      <div
        className="scrolling-tableData w-full"
        style={{
          position: "relative",
          height: "100%",
          overflow: "auto",
        }}
        ref={tableRef}
      >
        <DataTable
          columns={column}
          data={data}
          customStyles={customStyles}
          noDataComponent={
            <div className="flex h-72 justify-center items-center">
              {!isLoading && data.length <= 0 && (
                <p className="font-Jost text-[22px] font-normal">
                  No Bookings Found
                </p>
              )}
            </div>
          }
          keyField="uniqueKey"
          onRowClicked={handleRowClick} // Add this line
        />
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default DataTableComponent;
