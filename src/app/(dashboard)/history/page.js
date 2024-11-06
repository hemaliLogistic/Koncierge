"use client";

import React, { useEffect, useState } from "react";
import "../../../components/NavBar/global.css";
import Navbar from "../../../components/NavBar/NavBar";
import "./global.css";
import Loader from "@/components/Loader";
import DataTableComponent from "@/components/DataTable";
import PaginationComponent from "@/components/Pagination";
import { useTranslation } from "next-i18next";
import { paymentHistoryAction } from "@/redux/Home/action";
import { TOAST_ALERTS } from "@/constants/keywords";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const History = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = React.useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { t } = useTranslation("common");
    const historyData = useSelector((state) => state?.homeApi?.paymentHistoryData);
    // hooks
    const dispatch = useDispatch();
    console.log("historyData", historyData?.data?.serviceList);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const data = [
        {
            id: 1,
            serviceName: "Service Name Here",
            description: "Service Instruction",
            bookDate: "22/4/2024",
            bookTime: "8:00AM - 9:00PM",
            status: "Completed",
        },
        {
            id: 2,
            serviceName: "Service Name Here",
            description: "Service Instruction",
            bookDate: "22/4/2024",
            bookTime: "8:00AM - 9:00PM",
            status: "Pending",
        },
        {
            id: 3,
            serviceName: "Service Name Here",
            description: "Service Instruction",
            bookDate: "22/4/2024",
            bookTime: "8:00AM - 9:00PM",
            status: "Upcoming",
        },
        {
            id: 4,
            serviceName: "Service Name Here",
            description: "Service Instruction",
            bookDate: "22/4/2024",
            bookTime: "8:00AM - 9:00PM",
            status: "Completed",
        },
        {
            id: 5,
            serviceName: "Service Name Here",
            description: "Service Instruction",
            bookDate: "22/4/2024",
            bookTime: "8:00AM - 9:00PM",
            status: "Pending",
        },
    ];

    useEffect(() => {
        paymentHistoryApi()
    }, [])

    const paymentHistoryApi = async () => {
        setIsLoading(true); // Optional: To handle loading state
        try {
            // Prepare the data to send to the Redux action
            const param = {
                currentPage: currentPage,
                limit: 5 // Price in dollars
            };
            // Dispatch the Redux action to create the checkout session
            const res = await dispatch(paymentHistoryAction(param));
            // Handle the response from the Redux action
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    setIsLoading(false);
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
            console.log("Error", error);
            toast.error(TOAST_ALERTS.ERROR_MESSAGE);
        }
    };

    const handlePageChange = (page) => {
        console.log("page=-=-=", page);
        setCurrentPage(page);
        // Handle your data fetching or state update logic here
    };
    return (
        <>
            <div className='main-history-div'>
                {isLoading && <Loader />}
                {!isLoading && (
                    <div className='main-history-table-div'>
                        <div className='content-history-border'>
                            <h1 className='main-history-table-title'>{t("PaymentList")}</h1>
                        </div>
                        <div className='main-history-table-column'>
                            <div className='table-history-div-content'>
                                <DataTableComponent
                                    data={historyData?.data?.serviceList}
                                    isLoading={isLoading}
                                    isPayment={true}
                                    pageType="payment"

                                />
                            </div>
                            <div className='pagination-history-div'>
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

export default History;
