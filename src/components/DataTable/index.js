"use client";

import React, { useRef } from "react";
import DataTable from "react-data-table-component";
import "./global.css";
import { useTranslation } from "next-i18next";

const DataTableComponent = ({ data, isLoading, isPayment }) => {
  const tableRef = useRef(null);
  const { t } = useTranslation("common");

  console.log("data", data);

  const customStyles = {
    headCells: {
      style: {
        justifyContent: "center",
        textAlign: "center",
        borderLeft: "1px solid rgb(238, 236, 236, 0.8)",
        borderBottom: "0px",
      },
    },
  };

  const cellStryle = {
    borderLeftWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(238, 236, 236, 0.8)",
    borderBottomWidth: "0px",
    justifyContent: "center",
  };

  const column = [
    {
      name: (
        <div className='table-main-div'>
          <span className='table-header-text'>
            {isPayment ? t("Sr No.") : t("Sr No.")}
          </span>
        </div>
      ),
      selector: (row, index) => row.id,
      cell: (row, index) => (
        <div className='table-main-div'>
          <span className='table-text' index={index}>
            {row?.id}
          </span>
        </div>
      ),
      sortable: true,
      grow: 0.1,

      conditionalCellStyles: [
        {
          when: (row) => row.id,
          style: cellStryle,
        },
      ],
    },
    {
      name: (
        <span className='table-header-text'>
          {isPayment ? t("ServiceType") : t("ServiceType")}
        </span>
      ),
      selector: (row, index) => row.name,
      cell: (row, index) => (
        <div className='table-main-div'>
          <span index={index} className='table-text'>
            {row?.name}
          </span>
        </div>
      ),
      sortable: true,
      grow: 3,
      conditionalCellStyles: [
        {
          when: (row) => row.id,
          style: cellStryle,
        },
      ],
    },
    {
      name: (
        <span className='table-header-text'>
          {isPayment ? t("AccountName") : t("Instruction")}
        </span>
      ),
      selector: (row, index) => row.instuction,
      cell: (row, index) => (
        <div className='table-main-div'>
          <span index={index} className='table-text'>
            {row?.instuction}
          </span>
        </div>
      ),
      sortable: true,
      grow: 3,
      conditionalCellStyles: [
        {
          when: (row) => row.id,
          style: cellStryle,
        },
      ],
    },
    {
      name: (
        <span className='table-header-text'>
          {isPayment ? t("TransferDate") : t("ServiceDate")}
        </span>
      ),
      selector: (row, index) => row.date,
      cell: (row, index) => (
        <div className='table-main-div'>
          <span index={index} className='table-text'>
            {row?.date}
          </span>
        </div>
      ),
      sortable: true,
      grow: 3,
      conditionalCellStyles: [
        {
          when: (row) => row.id,
          style: cellStryle,
        },
      ],
    },
    {
      name: (
        <span className='table-header-text'>
          {isPayment ? t("TransferTime") : t("ServiceTime")}
        </span>
      ),
      selector: (row, index) => row.time,
      cell: (row, index) => (
        <div className='table-main-div'>
          <span index={index} className='table-text'>
            {row?.time}
          </span>
        </div>
      ),
      sortable: true,
      grow: 3,
      conditionalCellStyles: [
        {
          when: (row) => row.id,
          style: cellStryle,
        },
      ],
    },
    {
      name: <span className='table-header-text'>{t("Status")}</span>,
      selector: (row, index) => row.status,
      cell: (row, index) => (
        <div className='table-main-div'>
          <span
            className={`table-main-div table-button-text w-28 h-6 ${
              row?.status === "Completed"
                ? "bg-green00"
                : row?.status === "Pending"
                ? "bg-green00 opacity-40"
                : "bg-gray-500"
            } text-white px-2 py-1 text-center`}>
            {row?.status}
          </span>
        </div>
      ),
      sortable: true,
      grow: 1,
      conditionalCellStyles: [
        {
          when: (row) => row.id,
          style: cellStryle,
        },
      ],
    },
  ];

  return (
    <>
      <div
        className='scrolling-tableData w-full'
        style={{
          position: "relative",
          height: "100%",
          overflow: "auto",
        }}
        ref={tableRef}>
        <DataTable
          columns={column.map((col) => ({
            ...col,
            cell: (row) => <div className=''>{col.cell(row)}</div>,
          }))}
          data={data}
          customStyles={customStyles}
          noDataComponent={
            <div style={{ height: "100px", margin: "10px 0" }}>
              {isLoading && <Loader />}
            </div>
          }
          fixedHeader
          fixedHeaderScrollHeight='calc(100vh - 80px)'
          className='sticky-header'
          keyField='uniqueKey'
        />
      </div>
    </>
  );
};

export default DataTableComponent;
