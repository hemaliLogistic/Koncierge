"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "../../../components/NavBar/global.css";
import Navbar from "../../../components/NavBar/NavBar";
import "./global.css";
import Loader from "@/components/Loader";
import DataTableComponent from "@/components/DataTable";
import PaginationComponent from "@/components/Pagination";
import { useTranslation } from "next-i18next";
import useToaster from "@/hooks/useToaster";
import { useDispatch } from "react-redux";
import { pastBookingAction } from "@/redux/Dashboard/action";
import { toast } from "react-toastify";
import { TOAST_ALERTS } from "@/constants/keywords";

const PastServices = () => {
    const { t } = useTranslation("common");
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState(1);
    const tableRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [appointmentData, setAppointmentData] = useState([]);
    const { toaster } = useToaster();
    const dispatch = useDispatch();

    const getAllBookingData = useCallback(async () => {
        setIsLoading(true);
        const bookingParam = {
            page: currentPage,
            limit: 5,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        try {
            const res = await dispatch(pastBookingAction(bookingParam));
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    setAppointmentData(res?.payload?.data?.serviceList);
                    setTotalPages(res?.payload?.data?.totalPages + 1);
                } else {
                    toast.error(res.payload.message);
                }
            } else {
                toast.error(res.error.message || res.payload.message);
            }
        } catch (error) {
            toast.error(TOAST_ALERTS.ERROR_MESSAGE);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, dispatch]);

    useEffect(() => {
        getAllBookingData();
    }, [getAllBookingData]);

    const handlePageChange = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="main-service-div">
            <div className="main-service-table-div">
                <div className="content-service-border">
                    <h1 className="main-service-table-title">{t("PastList")}</h1>
                </div>
                <div className="main-service-table-column">
                    <div className="table-service-div-content">
                        <DataTableComponent
                            data={appointmentData}
                            isLoading={isLoading}
                            isPayment={false}
                            page={currentPage}
                            pageType="pastBookings"

                        />
                    </div>
                    {appointmentData?.length > 0 && (
                        <div className="pagination-service-div">
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PastServices;
