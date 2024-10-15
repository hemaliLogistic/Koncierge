"use client";

import React, { useEffect, useState } from "react";
import "../../../../components/NavBar/global.css";

import "./global.css";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TOAST_ALERTS } from "@/constants/keywords";
import {
    bookServiceAction,
    getRequestdataAction,
    getRequestExpireAction,
} from "@/redux/Dashboard/action";
import Loader from "@/components/Loader";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckOutForm";
import { checkoutSessionAction } from "@/redux/Home/action";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { setSelectedEmplyeeData } from "@/redux/Dashboard/DashboardSlice";
import { setSelectedUser } from "@/redux/Chat/ChatSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const NotificationItem = () => {
    //   const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );

    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const router = useRouter();
    const { notificationItem } = useParams();

    const [open, setOpen] = useState(null); // State to track which accordion is open

    const handleOpen = (index) => {
        setOpen(open === index ? null : index); // Toggle the open state
    };

    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState([]);

    const [tax, setTax] = useState(0);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [total, setTotal] = useState(0);
    const [finalValue, setFinalValue] = useState(0);
    const [isExpired, setIsExpired] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    useEffect(() => {
        GetRequestdataData();
    }, []);

    const GetRequestdataData = async () => {
        setIsLoading(true);

        try {
            const res = await dispatch(getRequestdataAction(notificationItem));

            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    const data = res.payload.data;
                    console.log("data-->>", data);

                    setNotification(data);
                    setIsExpired(data.isExpired);
                    const totalSum = data?.requestQutations?.reduce(
                        (accumulator, item) => accumulator + item?.serviceId?.price,
                        0
                    );
                    const texValue = totalSum * 0.1;
                    const taxPercentage = (texValue / totalSum) * 100;
                    const taxAmount = data?.serviceDetail?.tax;
                    const taxCalculation = (totalSum * taxAmount) / 100;
                    const finalSum = totalSum + taxCalculation;
                    setTotal(totalSum);
                    setTax(taxAmount);
                    setTaxPercentage(taxCalculation);
                    setFinalValue(finalSum);
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

    const handlePayment = async () => {
        const stripe = await stripePromise;
        setIsLoading(true); // Optional: To handle loading state

        try {
            // Prepare the data to send to the Redux action
            const items = {
                requestQutationId: Number(notificationItem),
                payment_type: "card",
                tax: tax,
                price: total,
                finalPrice: finalValue, // Price in dollars
            };
            console.log("ITEMS---", items);

            // Dispatch the Redux action to create the checkout session
            const res = await dispatch(checkoutSessionAction(items));

            // Handle the response from the Redux action
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    const sessionData = res.payload.id;
                    console.log("Session Data:", sessionData);

                    const result = await stripe.redirectToCheckout({
                        sessionId: sessionData,
                    });

                    if (result.error) {
                        console.error(result.error.message);
                    }
                } else {
                    toast.error(res.payload.message);
                }
            } else {
                toast.error(res.error.message || res.payload.message);
            }
        } catch (error) {
            toast.error("An error occurred during the payment process.");
            console.error("Error:", error);
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    //   const handlePayment = () => {
    //     setShowPaymentForm(true);
    //   };

    const GetRequestdataExpireData = async () => {
        setIsLoading(true);
        try {
            const res = await dispatch(getRequestExpireAction(notificationItem));

            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    setIsExpired(res.payload.data.isExprired);
                    return res.payload.data.isExprired;
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

    const handelAccept = async (status) => {
        const expired = await GetRequestdataExpireData();

        if (!expired) {
            await postBookService(status);
        }
    };

    const postBookService = async (status) => {
        setIsLoading(true);
        const bookServiceParam = {
            userName: notification?.serviceDetail?.userName,
            instruction: notification?.serviceDetail?.instruction,
            description: notification?.serviceDetail?.description,
            zipCode: notification?.serviceDetail?.zipCode,
            latitude: notification?.serviceDetail?.latitude,
            longitude: notification?.serviceDetail?.longitude,
            city: notification?.serviceDetail?.city,
            country: notification?.serviceDetail?.country,
            status: status,
            address: notification?.serviceDetail?.address,
            bookDate: notification?.serviceDetail?.requestDate,
            bookTime: notification?.serviceDetail?.requestTime,
            serviceIds: notification?.serviceDetail?.id,
            qutationId: notificationItem,
            bookEndTime: notification?.serviceDetail?.requestEndTime,
            bookEndDate: notification?.serviceDetail?.requestEndDate
        };

        try {
            const res = await dispatch(bookServiceAction(bookServiceParam));

            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    // await GetRequestdataData();
                    router.replace("/notification");
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
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    }
    function formatTime(dateString) {
        console.log("dateString-=-=0", dateString);

        const date = new Date(dateString);

        return moment(dateString, "HH:mm:ss").format("HH:mm");
    }
    const handleChatClick = (item) => {
        dispatch(setSelectedUser(item?.employeeId));
        router.push(`/settings-chat`);
    };

    return (
        <div className="main-container">
            {isLoading && <Loader />}
            <div>
                <p className="notification-header">{t("Notifications")}</p>
            </div>
            <div className="horizontal-line-themecolor"></div>

            {!isLoading &&
                !isExpired &&
                notification?.viewQuoteData?.status === "pending" &&
                notification?.viewQuoteData?.isPayment === false && (
                    <div className="notification-detail-container">
                        <div className="accepted-text-container">
                            <p className="accept-quotation-text">
                                {t(
                                    "The quotation is accepted by you. Please wait for the response from the service provider."
                                )}
                            </p>
                        </div>
                    </div>
                )}
            {!isLoading &&
                !isExpired &&
                notification?.viewQuoteData?.status === "rejected" &&
                notification?.viewQuoteData?.isPayment === false && (
                    <div className="notification-detail-container">
                        <div className="declined-text-container">
                            <p className="decline-quotation-text">
                                {t("You have declined this quotation")}
                            </p>
                        </div>
                    </div>
                )}
            {!isLoading && isExpired && (
                <div className="notification-detail-container">
                    <p className="decline-btn-text text-[22px]">
                        Your service has been expired
                    </p>
                </div>
            )}
            {!isLoading &&
                notification?.viewQuoteData?.status === "confirmed" &&
                notification?.viewQuoteData?.isPaymentComplete && notification?.viewQuoteData?.isPayment && (
                    <>
                        <div className="notification-detail-container">
                            <div className="accepted-text-container">
                                <p className="accept-quotation-text">
                                    {"Your payment is successfully accepted"}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            <div className="notification-box">
                <div className="notification-detail-container">
                    <div className="left-section">
                        <div className="flex">
                            <img
                                src="/images/userProfile.png"
                                className="user-profile-image"
                            />
                            <p className="user-name">
                                {notification?.serviceDetail?.userName}
                            </p>
                        </div>

                        {!isLoading && (
                            <>
                                <div className="user-message">
                                    <p className="user-name " style={{ display: "inline" }}>
                                        Appointment date:
                                    </p>
                                    <p style={{ display: "inline", paddingLeft: "5px" }}>
                                        {formatDate(notification?.serviceDetail?.requestDate)}
                                    </p>
                                </div>
                                <div className="user-message">
                                    <p className="user-name" style={{ display: "inline" }}>
                                        Appointment time:
                                    </p>
                                    <p style={{ display: "inline", paddingLeft: "5px" }}>
                                        {formatTime(notification?.serviceDetail?.requestTime)}
                                    </p>
                                </div>
                            </>
                        )}

                        <div className="user-message"></div>
                    </div>
                </div>

                <div>
                    <>
                        <div>
                            <div className="horizontal-line-graycolor"></div>
                            {notification?.requestQutations?.length > 0
                                ? notification?.requestQutations.map((item, index) => {
                                    const hasEmployee = item?.employeeId;
                                    const content = (
                                        <div className="service-left-section p-4 bg-gray-100 rounded-md">
                                            <div className="flex flex-col gap-2">
                                                <p className="service-name font-semibold text-lg">
                                                    {item?.employeeId?.firstName}{" "}
                                                    {item?.employeeId?.lastName}
                                                </p>

                                                <div className="service-detail-message text-gray-600">
                                                    Contact Through: {item?.employeeId?.mobileNumber} OR
                                                    {notification?.serviceDetail?.bookingStatus !== 'Expired' ? (
                                                        <>
                                                            <span
                                                                onClick={() => handleChatClick(item)}
                                                                className="text-blue-500 underline cursor-pointer mx-1"
                                                            >
                                                                Chat
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-blue-500 underline cursor-pointer mx-1">
                                                                Chat Ended
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    );

                                    return !hasEmployee ? (
                                        <div
                                            className="notification-detail-container"
                                            key={index}
                                        >
                                            <Accordion className="flex-col" open={open === index}>
                                                <AccordionHeader
                                                    className="service-name"
                                                    onClick={() => handleOpen(index)}
                                                >
                                                    <div className="flex justify-between items-center w-full pr-4">
                                                        <span>{item?.serviceId?.serviceName}</span>
                                                        <div className="flex items-center">
                                                            <span className="text-right mr-2 font-semibold">
                                                                ${item?.serviceId?.price}
                                                            </span>
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    open === index
                                                                        ? faChevronDown
                                                                        : faChevronRight
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </AccordionHeader>
                                                <AccordionBody>
                                                    {open === index ? content : null}
                                                </AccordionBody>
                                            </Accordion>
                                        </div>
                                    ) : (
                                        <div
                                            className="notification-detail-container"
                                            key={index}
                                        >
                                            <div className="service-left-section">
                                                <div className="flex-col">
                                                    <p className="service-name">
                                                        {item?.serviceId?.serviceName}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="amount-container">
                                                <p className="amount-text">${item?.serviceId?.price}</p>
                                            </div>
                                        </div>
                                    );
                                })
                                : null}

                            <>
                                <div className="notification-detail-container">
                                    <div className="service-left-section">
                                        <div className="flex-col">
                                            <p className="service-name">Service Amount</p>
                                        </div>
                                    </div>

                                    <div className="amount-container">
                                        <p className="amount-text">${total}</p>
                                    </div>
                                </div>
                                <div className="notification-detail-container border-b border-grayE1">
                                    <div className="service-left-section">
                                        <div className="flex-col">
                                            {/* <p className='service-name'>{`Taxes & Fee (${tax}%)`}</p> */}
                                            <p className="service-name">{`Taxes & Fee (${tax ? tax : 0}%)`}</p>
                                        </div>
                                    </div>

                                    <div className="amount-container">
                                        {/* <p className='amount-text'>$ {(total * tax) / 100}</p> */}
                                        <p className="amount-text">${taxPercentage}</p>
                                    </div>
                                </div>

                                <div className="notification-detail-container">
                                    <div className="service-left-section">
                                        <div className="flex-col">
                                            <p className="service-name">Total</p>
                                        </div>
                                    </div>

                                    <div className="amount-container">
                                        <p className="amount-text">${finalValue}</p>
                                    </div>
                                </div>
                                {!isExpired &&
                                    notification?.viewQuoteData?.status === "" &&
                                    notification?.viewQuoteData?.isPayment === false && (
                                        <div className="btn-group-container">
                                            <div
                                                className="accept-btn-container"
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <p
                                                    className="accept-btn-text"
                                                    onClick={() => handelAccept("pending")}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {t("Accept")}
                                                </p>
                                            </div>
                                            <div className="decline-button-container ">
                                                <p
                                                    className="decline-btn-text"
                                                    onClick={() => handelAccept("rejected")}
                                                >
                                                    {t("Decline")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                            </>
                            {/* )} */}
                        </div>
                        {!isExpired && (
                            <div className="btn-right-section">
                                {notification?.viewQuoteData?.status === "pending" &&
                                    notification?.viewQuoteData?.isPaymentComplete === false &&
                                    notification?.viewQuoteData?.isPayment === true ? (
                                    <div
                                        className="payment-btn-container"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        <button
                                            className="payment-btn-text"
                                            onClick={() =>
                                                handlePayment(notification?.requestQutations)
                                            }
                                        >
                                            {t("Amount to Pay ")}${finalValue}
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;
