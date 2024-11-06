"use client";

import React, { useEffect, useState } from "react";
import "../../../../components/NavBar/global.css";

import "./global.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TOAST_ALERTS } from "@/constants/keywords";
import {
    bookServiceAction,
    getRequestdataAction,
    getRequestExpireAction,
    rattingServiceAction,
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
    const { t } = useTranslation("common");
    const [isLoading, setIsLoading] = useState(false);
    const [bookingId, setBookingId] = useState();
    const dispatch = useDispatch();
    const router = useRouter();

    // Array to track the rating for each label
    const { reviewService } = useParams();
    const [formData, setFormData] = useState({
        ServiceQuality: 0,
        AttentionToDetail: 0,
        Responsiveness: 0,
        Timeliness: 0,
        Cleanliness: 0,
        EaseOfBooking: 0,
        RespectForProperty: 0,
        OverallExperience: 0,
        feedback: '',
    });

    // Handle star rating click
    const handleRating = (category, rating) => {
        setFormData((prevData) => ({
            ...prevData,
            [category]: rating,
        }));
    };
    const searchParams = useSearchParams();

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    useEffect(() => {
        const params = Object?.fromEntries(searchParams?.entries());
        // console.log("params", params?.bookingId)
        setBookingId(params?.bookingId);
    }, [searchParams]);

    const onSubmitForm = async () => {
        try {
            setIsLoading(true);
            let payload = {
                serviceQuality: formData?.ServiceQuality,
                attentionToDetail: formData?.AttentionToDetail,
                responsiveness: formData?.Responsiveness,
                timeliness: formData?.Timeliness,
                cleanlinessOfAreas: formData?.Cleanliness,
                easeOfBooking: formData?.EaseOfBooking,
                respectForProperty: formData?.RespectForProperty,
                overallExperience: formData?.OverallExperience,
                feedback: formData?.feedback,
                serviceId: reviewService,
                bookingId: bookingId,
            };
            const res = await dispatch(rattingServiceAction(payload));

            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    setIsLoading(false);
                    toast.success(res.payload.message);
                    router.push('/home');
                } else {
                    setIsLoading(false);
                    toast.error(res.payload.message);
                }
            } else {
                setIsLoading(false);
                toast.error(res.error.message || res.payload.message);
            }
        } catch (error) {
            console.log("error", error);

            setIsLoading(false);
            toast.error(TOAST_ALERTS.ERROR_MESSAGE);
        }
    };

    return (
        <div className="main-container">
            {isLoading && <Loader />}
            <div>
                <p className="notification-header">{t("Rate Service")}</p>
            </div>
            <div className="horizontal-line-themecolor"></div>
            <form className="space-y-4 mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                        "ServiceQuality",
                        "AttentionToDetail",
                        "Responsiveness",
                        "Timeliness",
                        "Cleanliness",
                        "EaseOfBooking",
                        "RespectForProperty",
                        "OverallExperience",
                    ].map((label, index) => (
                        <div key={index} className="space-y-2">
                            <label className="text-lg font-medium">
                                {label.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 cursor-pointer ${formData[label] > i ? 'text-yellow-500' : 'text-gray-300'
                                            }`}
                                        fill={formData[label] > i ? 'currentColor' : 'none'}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        onClick={() => handleRating(label, i + 1)}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Input Fields */}
                <div className="space-y-4 mt-6">
                    <input
                        type="text"
                        name="feedback"
                        placeholder="Additional Comments"
                        className="border rounded-lg p-2 w-full"
                        value={formData.feedback}
                        onChange={handleInputChange}
                    />
                </div>


            </form>
            {/* Submit button */}
            <button
                type="submit"
                className="w-40 mt-4 bg-green-700 text-white p-2 rounded-lg hover:bg-green-600 transition"
                onClick={onSubmitForm}
            >
                Submit
            </button>
        </div >
    );
};

export default NotificationItem;
