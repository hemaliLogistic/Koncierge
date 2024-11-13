"use client";

import React, { useEffect, useState } from "react";
import "../../../components/NavBar/global.css";

import "../notification/global.css";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TOAST_ALERTS } from "@/constants/keywords";
import { useDispatch } from "react-redux";
import { getNotificationAction } from "@/redux/Dashboard/action";
import Loader from "@/components/Loader";
import PaginationComponent from "@/components/Pagination";

const Notifications = () => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        getNotificationData(true);
        localStorage.setItem('isFromNotification', 'true');
    }, []);

    useEffect(() => {
        getNotificationData();
    }, [currentPage]);

    const getNotificationData = async () => {
        setIsLoading(true);
        const notificationParam = {
            page: currentPage,
            limit: 10,
        };

        try {
            const res = await dispatch(getNotificationAction(notificationParam));

            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    setNotification(res.payload.data.notifications);
                    setTotalPages(res.payload.data.totalPages);
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
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='main-container'>
            {isLoading && <Loader />}

            <div>
                <p className='notification-header'>Notifications</p>
            </div>
            <div className='horizontal-line-themecolor'></div>
            <div className='notification-box'>
                {notification && notification.length > 0 ? (
                    notification.map((item, index) => {
                        return (
                            <>
                                <div className='notification-detail-container' key={index}>
                                    <div className='left-section flex items-center'>
                                        <div className='flex'>
                                            {/* <img
                                                src='/images/userProfile.png'
                                                className='user-profile-image'
                                            />
                                            <p className='user-name'>
                                                {
                                                    item?.notificationDataGenerated.qutationSenderData
                                                        ?.firstName
                                                }  {
                                                    item?.notificationDataGenerated.qutationSenderData
                                                        ?.lastName
                                                }
                                            </p> */}

                                        </div>

                                        <div className='user-message'>
                                            {item?.notificationData?.message}
                                        </div>
                                    </div>

                                    <div className='right-section'>
                                        {item?.notificationDataGenerated?.userRequestedQutationData?.qutationStatusOfAdmin !== "rejected" &&
                                            <button
                                                onClick={() => {
                                                    const destination = item?.notificationType === "subscriptionQutationSentByAdmin"
                                                        ? `/subscription/${item?.id}`
                                                        : `/notification/${item?.notificationData?.qutationId}`;
                                                    localStorage.setItem('isFromNotification', JSON.stringify(true));
                                                    router.push(destination)
                                                }}
                                                className='btn-container'>
                                                {item?.notificationType === 'assignEmployee' || item?.notificationType === 'subscriptionQutationSentByAdmin' ? (
                                                    <p className='btn-text'>{"Pay"}</p>
                                                ) : item?.notificationType === 'completeService' ? (
                                                    <p className='btn-text'>{"View Details"}</p>
                                                ) : (

                                                    <p className='btn-text'>{t("ViewQuote")}</p>
                                                )}
                                                {/* <p className='btn-text'>{t("ViewQuote")}</p> */}
                                            </button>}
                                    </div >
                                </div>
                                <div className='horizontal-line-graycolor' />
                            </>
                        );
                    })
                ) : (
                    <div className='flex h-80 justify-center items-center'>
                        {!isLoading && (
                            <p className='font-Jost text-[22px] font-normal'>
                                Notifications Not Found
                            </p>
                        )}
                    </div>
                )}
                {
                    notification && notification.length > 0 && (
                        <div className='pagination-booking-div'>
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )
                }
            </div >
        </div >
    );
};

export default Notifications;
