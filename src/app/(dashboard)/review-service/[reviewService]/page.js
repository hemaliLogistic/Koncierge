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
    const { reviewService } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [ratings, setRatings] = useState(Array(8).fill(0)); // Array to track the rating for each label
    const [formData, setFormData] = useState({
        comments: '',
        email: '',
        contact: '',
    });

    // Handle star rating click
    const handleRating = (index, rating) => {
        const updatedRatings = [...ratings];
        updatedRatings[index] = rating;
        setRatings(updatedRatings);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="main-container">
            {isLoading && <Loader />}
            <div>
                <p className="notification-header">{t("Rate Service")}</p>
            </div>
            <div className="horizontal-line-themecolor"></div>
            <form className="space-y-4 mt-5">
                {/* Form fields with star ratings */}


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                        "Service Quality",
                        "Attention To Detail",
                        "Responsiveness",
                        "Timeliness",
                        "Cleanliness",
                        "Ease Of Booking",
                        "Respect For Property",
                        "Overall Experience",
                    ].map((label, index) => (
                        <div key={index} className="space-y-2">
                            {/* Label */}
                            <label className="text-lg font-medium">
                                {t(label)}
                            </label>
                            {/* Star Rating for each label */}
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 cursor-pointer ${ratings[index] > i ? 'text-yellow-500' : 'text-gray-300'
                                            }`}
                                        fill={ratings[index] > i ? 'currentColor' : 'none'}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        onClick={() => handleRating(index, i + 1)}
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
                        name="comments"
                        placeholder="Additional Comments"
                        className="border rounded-lg p-2 w-full"
                        value={formData.comments}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="border rounded-lg p-2 w-full"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact Number"
                        className="border rounded-lg p-2 w-full"
                        value={formData.contact}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-green-700 text-white p-2 rounded-lg hover:bg-green-600 transition"
                >
                    {t("Submit")}
                </button>
            </form>
        </div >
    );
};

export default NotificationItem;
