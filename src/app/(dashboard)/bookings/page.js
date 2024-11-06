"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../components/NavBar/global.css";

import "./global.css";
import DataTableComponent from "@/components/DataTable";
import PaginationComponent from "@/components/Pagination";
import Loader from "@/components/Loader";
import { useTranslation } from "next-i18next";
import useToaster from "@/hooks/useToaster";
import { useDispatch } from "react-redux";
import { upcomingBookingAction } from "@/redux/Dashboard/action";
import { TOAST_ALERTS } from "@/constants/keywords";
import { toast } from "react-toastify";

const Bookings = () => {
    const { t } = useTranslation("common");
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = React.useState(1);
    const tableRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [appointmentData, setAppointmentData] = useState([]);
    // const totalPages = 15; // Adjust this as per your requirement
    const { toaster } = useToaster();
    const dispatch = useDispatch();

    useEffect(() => {
        getAllBookingData();
    }, []);

    useEffect(() => {
        getAllBookingData();
    }, [currentPage]);

    const getAllBookingData = async () => {
        setIsLoading(true);
        const bookingParam = {
            page: currentPage,
            limit: 5,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        console.log("bookingParam-=", bookingParam);
        try {
            const res = await dispatch(upcomingBookingAction(bookingParam));


            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    setIsLoading(false);
                    setAppointmentData(res?.payload?.data?.serviceList);
                    setTotalPages(res?.payload?.data?.totalPages);
                } else {
                    setIsLoading(false);
                    toast.error(res.payload.message);
                }
            } else {
                setIsLoading(false);
                toast.error(res.error.message || res.payload.message);
            }
        } catch (error) {
            setIsLoading(false);

            toast.error(TOAST_ALERTS.ERROR_MESSAGE);
            console.log("Error", error);
        }
    };

    const handlePageChange = (page) => {
        console.log("page=-=-=", page);
        setCurrentPage(page);
        // Handle your data fetching or state update logic here
    };
    return (
        <>
            <div className='main-booking-div'>
                {/* {!isLoading && ( */}
                <div className='main-booking-table-div'>
                    <div className='content-booking-border'>
                        <h1 className='main-booking-table-title'>{t("UpcomingList")}</h1>
                    </div>
                    <div className='main-booking-table-column'>
                        <>
                            <div className='table-booking-div-content'>
                                <DataTableComponent
                                    data={appointmentData}
                                    isLoading={isLoading}
                                    isPayment={false}
                                    page={currentPage}
                                    pageType="upcoming"
                                />
                            </div>
                            {appointmentData?.length > 0 && (
                                <div className='pagination-booking-div'>
                                    <PaginationComponent
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    </div>
                </div>
                {/* )} */}
            </div>
        </>
    );
};

export default Bookings;
