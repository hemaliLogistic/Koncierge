"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../../components/NavBar/global.css";
import { getData, removeData, saveData } from "@/utils/storage";
import { useParams, useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import CommonPageblock from "@/components/styles/common.style";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Footer from "@/components/Footer";
import {
    bookedSlotListAction,
    requestServiceQutationAction,
    serviceByMainCategoryListAction,
} from "@/redux/Home/action";
import { useDispatch, useSelector } from "react-redux";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import useToaster from "@/hooks/useToaster";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import Modal from "@/components/Modal/Modal";
import { setIsBookingModalOpen } from "@/redux/Home/HomeSlice";
import moment from "moment";
import Header from "@/components/header";
import CustomOption from "@/components/CustomOption";
import MultiSelect from "@/components/CustomOption";
import Loader from "@/components/Loader";
import { getProfileAction } from "@/redux/Dashboard/action";

const Service = () => {
    // hooks
    const dispatch = useDispatch();
    const serviceData = useSelector((state) => state?.homeApi?.serviceListData);
    const bookedSlotData = useSelector((state) => state.homeApi?.bookedSlotData);
    // States
    const user = getData("user");
    const storedFormData = getData("FormData");
    const checkedFormData = getData("checkedFormData");
    const BookingId = getData("Bookingid");
    const router = useRouter();
    const [requestDate, setRequestDate] = useState();
    const [month, setMonth] = useState(moment().month() + 1);
    const [year, setYear] = useState(moment().year());
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [checkedState, setCheckedState] = useState({});
    const [sele̥ctedServices, setSelectedServices] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [disabledDates, setDisabledDates] = useState([]);
    const [changeStartType, setChangeStartType] = useState(false);
    const [changeEndType, setChangeEndType] = useState(false);
    const [profileData, setProfileData] = useState([]);

    const [isDisabledDate, setIsDisabledDate] = useState(() => () => false);
    const modalRef = useRef(null);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // GetService Api Call
    const getServiceListData = async () => {
        setIsLoading(true);
        const param = {
            page: currentPage,
            limit: 20,
            mainCatId: BookingId,
        };
        try {
            const res = await dispatch(serviceByMainCategoryListAction(param));
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    setIsLoading(false);
                    //   setTotalPages(res?.payload?.data?.totalPages);
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

    useEffect(() => {
        getProfileData();
    }, [])

    const getProfileData = async () => {
        setIsLoading(true);

        try {
            const res = await dispatch(getProfileAction({}));
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    const profileData = res.payload.data;
                    setIsLoading(false);
                    setProfileData(profileData);

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

    // GetBookedSlot Api Call
    const getBookedSlotListData = async () => {
        setIsLoading(true);
        const param = {
            serviceId: BookingId,
            month: month,
            year: year,
        };
        try {
            const res = await dispatch(bookedSlotListAction(param));
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    setIsLoading(false);
                    //   setTotalPages(res?.payload?.data?.totalPages);
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
    //////////////////   UseEffects   /////////////////
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (bookedSlotData?.success) {
            const newDisabledDates = bookedSlotData.data
                .filter((slot) => slot.alldisable)
                .map((slot) => moment(slot.date, "YYYY-MM-DD"));

            const checkDisabledDate = (date) => {
                const formattedDate = moment(date).format("YYYY-MM-DD");
                return newDisabledDates.some(
                    (disabledDate) => formattedDate === disabledDate.format("YYYY-MM-DD")
                );
            };
            setDisabledDates(newDisabledDates);
            setIsDisabledDate(() => checkDisabledDate);
        }
    }, [bookedSlotData]);

    useEffect(() => {
        getServiceListData();
        getBookedSlotListData();
    }, [month, year]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isModalVisible &&
                !document.querySelector(".modal-content").contains(event.target)
            ) {
                setIsModalVisible(false);
            }
            if (
                isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setTimeout(() => {
                    setIsOpen(false);
                }, 100);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalVisible, isOpen]);

    // set data from local storage
    useEffect(() => {

        if (storedFormData) {
            Object.keys(storedFormData).forEach((key) => {
                if (key === "requestDate") {
                    const date = new Date(storedFormData[key]);
                    const formattedDate = moment(date).format("YYYY/MM/DD");
                    //   console.log("Date: ", formattedDate);
                    setRequestDate(formattedDate);
                    setValue("requestDate", date);
                } else if (key === "requestTime") {
                    //   console.log("storedFormData[key]", storedFormData[key]);
                    const time = storedFormData[key];
                    setValue("requestTime", time);
                } else if (key === "serviceIds") {
                    // Initialize checked state
                    const initialCheckedState = storedFormData[key].reduce(
                        (acc, service, index) => {
                            acc[index] = true;
                            return acc;
                        },
                        {}
                    );
                    setCheckedState(initialCheckedState);
                    //  update selected services
                    if (serviceData) {
                        const initialSelectedServices = serviceData.reduce(
                            (acc, service, index) => {
                                if (storedFormData[key].includes(service.id)) {
                                    acc.push(service.serviceName);
                                }
                                return acc;
                            },
                            []
                        );
                        setSelectedServices(initialSelectedServices);
                    }
                } else {
                    setValue(key, storedFormData[key]);
                }
            });
        }
        if (user && profileData) {
            setValue('address', profileData?.address);
        }
        if (checkedFormData && !storedFormData) {
            setValue("selectedServices", checkedFormData);
        }
    }, [profileData]);

    // Toggle functions //
    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handleDateChange = (date, onChange) => {
        if (date) {
            const formattedDate = moment(date).format("YYYY/MM/DD");
            const month = moment(date).format("MMMM");
            const year = moment(date).format("YYYY");
            setRequestDate(formattedDate);
            onChange(formattedDate);
            setValue("requestDate", formattedDate);
        } else {
            setRequestDate(null);
            onChange(null);
            // setValue("requestDate", null);
        }
    };

    // const handleBlur = (e, onChange, value) => {
    //     const inputDate = moment(e.target.value, "YYYY/MM/DD", true);
    //     if (inputDate.isValid()) {
    //         const formattedDate = inputDate.format("YYYY/MM/DD");
    //         setRequestDate(formattedDate);
    //         onChange(formattedDate);
    //         setValue("requestDate", formattedDate);
    //         trigger("requestTime");
    //     } else if (!value) {
    //         setRequestDate(null);
    //         onChange(null);
    //         setValue("requestDate", null);
    //     }
    // };

    // Yup Validation //
    const schema = Yup.object().shape({
        userName: Yup.string()
            .required("Please enter your name")
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be less than 50 characters"),
        frequency: Yup.number()
            .transform((value, originalValue) => originalValue === "" ? null : value)
            .nullable()
            .min(0, "Please specify the frequency")
            .required("Frequency is required"),

        selectInterval: Yup.string()
            .required("Please select an interval")
            .nullable(),

        requestDate: Yup.date().required("Please choose a valid date."),

        requestTime: Yup.string()
            .required("Start time is required.")
            .test(
                "is-valid-time",
                "Time must be at least 1 hour from now.",
                function (value) {
                    const { requestDate } = this.parent;
                    const currentDate = moment().format("YYYY/MM/DD");
                    const match = moment(requestDate).format("YYYY/MM/DD");
                    if (match === currentDate) {
                        const currentTimePlusOneHour = moment()
                            .add(1, "hours")
                            .format("HH:mm");
                        return value >= currentTimePlusOneHour;
                    }
                    return true;
                }
            )
            .test(
                "service-data-from-time",
                `Start time should not be less than the ${serviceData[0]?.fromTime}.`,
                function (value) {
                    if (serviceData[0]?.fromTime) {
                        const serviceFromTime = moment(serviceData[0].fromTime, "HH:mm");
                        const selectedStartTime = moment(value, "HH:mm");

                        return selectedStartTime.isSameOrAfter(serviceFromTime);
                    }
                    return true;
                }
            )
            .test(
                "not-booked",
                "The selected time overlaps with a booked slot.",
                function (value) {
                    const { requestEndTime } = this.parent;
                    const bookedHours = getBookedHoursForDate(
                        requestDate,
                        bookedSlotData?.data
                    );
                    const selectedStartTime = moment(value, "HH:mm");
                    const selectedEndTime = requestEndTime
                        ? moment(requestEndTime, "HH:mm")
                        : null;

                    return bookedHours.every((time) => {
                        const bookedTime = moment(time, "HH:mm");

                        // Check if selected time overlaps with booked time
                        if (
                            selectedStartTime.isSame(bookedTime) ||
                            (selectedEndTime &&
                                bookedTime.isBetween(
                                    selectedStartTime,
                                    selectedEndTime,
                                    null,
                                    "[)"
                                ))
                        ) {
                            return false; // Overlap found
                        }

                        return true;
                    });
                }
            ),

        requestEndTime: Yup.string()
            .required("Please select an end time.")
            .test(
                "is-valid-time",
                "End time must be at least 30 minutes after the start time.",
                function (value) {
                    const { requestTime } = this.parent;
                    if (!requestTime) return true;

                    const requestTimePlus30Min = moment(requestTime, "HH:mm")
                        .add(1, "minutes")
                        .format("HH:mm");
                    return value >= requestTimePlus30Min;
                }
            )
            .test(
                "service-data-to-time",
                `End time should not be greater than the ${serviceData[0]?.toTime}.`,
                function (value) {
                    if (serviceData[0]?.toTime) {
                        const serviceToTime = moment(serviceData[0].toTime, "HH:mm");
                        const selectedEndTime = moment(value, "HH:mm");

                        return selectedEndTime.isSameOrBefore(serviceToTime);
                    }
                    return true; // No serviceData means no constraint
                }
            )
            .test(
                "not-booked",
                "The selected time overlaps with a booked slot.",
                function (value) {
                    const { requestTime } = this.parent;
                    const bookedHours = getBookedHoursForDate(
                        requestDate,
                        bookedSlotData?.data
                    );
                    const selectedStartTime = requestTime
                        ? moment(requestTime, "HH:mm")
                        : null;
                    const selectedEndTime = moment(value, "HH:mm");

                    return bookedHours.every((time) => {
                        const bookedTime = moment(time, "HH:mm");

                        // Check if selected time overlaps with booked time
                        if (
                            selectedEndTime.isSame(bookedTime) ||
                            (selectedStartTime &&
                                bookedTime.isBetween(
                                    selectedStartTime,
                                    selectedEndTime,
                                    null,
                                    "[)"
                                ))
                        ) {
                            return false; // Overlap found
                        }

                        return true; // No overlap
                    });
                }
            ),

        selectedServices: Yup.object().required("Please select a service option."),

        zipCode: Yup.string()
            .required("Please enter a valid zip code")
            .length(6, "Zipcode must be exactly 6 characters"),

        city: Yup.string()
            .required("City name is required.")
            .min(2, "City must be at least 2 characters")
            .max(100, "City must be less than 100 characters"),

        region: Yup.string()
            .required("Please enter the region.")
            .min(2, "Region must be at least 2 characters")
            .max(100, "Region must be less than 100 characters"),

        country: Yup.string()
            .required("Please select a country")
            .min(2, "Country must be at least 2 characters")
            .max(100, "Country must be less than 100 characters"),

        address: Yup.string()
            .required("Please provide your address")
            .min(5, "Address must be at least 5 characters")
            .max(200, "Address must be less than 200 characters"),

        instruction: Yup.string()
            .required("Please provide detailed instructions.")
            .min(5, "Instruction must be at least 5 characters")
            .max(500, "Instruction must be less than 500 characters"),

        description: Yup.string()
            .required("A description is required.")
            .min(10, "Description must be at least 10 characters")
            .max(1000, "Description must be less than 1000 characters"),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        reset,
        watch,
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
    });

    console.log("user=====>", watch());


    const getBookedHoursForDate = (selectedDate, bookedHoursData) => {
        const foundDate = bookedHoursData?.find((item) =>
            moment(item.date).isSame(selectedDate, "day")
        );
        let tempArray = ["14:00", "15:00", "16:00", "17:00", "19:00"];
        // return foundDate && !foundDate.alldisable ? tempArray : tempArray;
        return foundDate && !foundDate.alldisable ? foundDate?.bookedHours : []; //Real Data
    };

    const onSubmit = async (data) => {
        const interVal = data?.selectInterval?.value;
        const selectedServicesArray = Array.isArray(data.selectedServices)
            ? data.selectedServices
            : [data.selectedServices];
        const selectedServiceIds = selectedServicesArray.map(
            (service) => service.id
        );
        const { selectedServices, ...restData } = data;
        const requestData = {
            ...data,
            requestDate: requestDate,
            serviceId: selectedServiceIds[0],
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            interval: interVal,
        };
        if (!user) {
            saveData("FormData", requestData);
            setIsModalVisible(true);
            return;
        }

        try {
            const requestDataForAPI = {
                ...restData,
                serviceId: selectedServiceIds[0],
                requestDate: requestDate,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                interval: interVal,
            };
            setIsLoading(true);
            const response = await dispatch(
                requestServiceQutationAction(requestDataForAPI)
            );

            if (response?.payload?.status) {
                setIsLoading(false);
                removeData("FormData");
                removeData("Bookingid");
                removeData("checkedFormData");
                toast.success(TOAST_ALERTS.QUATATION_SUCCESS);
                router.push("/dashboard");
            } else {
                setIsLoading(false);
                toast.error(TOAST_ALERTS.ERROR_MESSAGE);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error:", error);
            toast.error(TOAST_ALERTS.ERROR_MESSAGE);
        }
    };

    const handleTimeTypeChange = () => {
        setChangeStartType(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleEndTimeTypeChange = () => {
        setChangeEndType(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <>
            <CommonPageblock>
                <Header />
                <div className="common-page">
                    <div className="main-banner">
                        <div className="common-container">
                            <div className="main-banner-text">
                                <h3>Welcome to Koncierge</h3>
                                <h1>Book Now</h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="book-service-block">
                        <div className="common-container">
                            <div className="common-title">
                                <div className="common-title-inner">
                                    <h2>Booking</h2>
                                    <h5>Koncierge</h5>
                                </div>
                                <h3>Service Book Now</h3>
                            </div>
                            <div className="book-service-block-inner">
                                <div className="left-side-form">
                                    <h2 className="common-title-form">Book a Service</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                {...register("userName")}
                                            />
                                            {errors.userName && (
                                                <p className="text-red-500">
                                                    {errors.userName.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <Controller
                                                name="selectedServices"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={serviceData}
                                                        getOptionLabel={(option) => option.serviceName}
                                                        getOptionValue={(option) => option.id}
                                                        placeholder="Service Option"
                                                        classNamePrefix="react-select"
                                                        hideSelectedOptions={false}
                                                        closeMenuOnSelect={true}
                                                        isOptionDisabled={(option) => !option.is_available}
                                                        formatOptionLabel={(option, { context }) =>
                                                            context === 'menu' ? (
                                                                <div>
                                                                    {option.serviceName} <span>({option.fromTime} - {option.toTime})</span>
                                                                </div>
                                                            ) : (
                                                                option.serviceName // Display only the serviceName in the input
                                                            )
                                                        }
                                                        onChange={(selectedOption) => field.onChange(selectedOption)} // Ensure correct handling of selected value
                                                    />
                                                )}
                                            />

                                            {errors.selectedServices && (
                                                <p className="text-red-500">
                                                    {errors.selectedServices.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-group-two">
                                            <div className="form-group">
                                                <Controller
                                                    control={control}
                                                    name="requestDate"
                                                    render={({
                                                        field: { onChange, value, ...fields },
                                                        fieldState: { error, invalid },
                                                    }) => (
                                                        <>
                                                            <DatePicker
                                                                {...fields}
                                                                minDate={new Date()}
                                                                selected={value ? new Date(value) : null}
                                                                // value={value}// Ensure correct handling of null
                                                                onChange={(date) => {
                                                                    if (!date) {
                                                                        onChange(null); // Ensure no value is selected
                                                                    } else {
                                                                        handleDateChange(date, onChange); // Handle date selection
                                                                    }
                                                                }}
                                                                // onBlur={onBlur}
                                                                placeholderText="YYYY/MM/DD"
                                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                filterDate={(date) => !isDisabledDate(date)}
                                                                preventOpenOnFocus
                                                                onFocus={(e) => e.target.blur()}
                                                                onMonthChange={(month) => {
                                                                    setMonth(month.getMonth() + 1);
                                                                    setYear(month.getFullYear()); // Update the month state
                                                                }}
                                                            />
                                                        </>
                                                    )}
                                                />
                                                <div className="icon-block-calender">
                                                    <img
                                                        src="/images/calendar-icon.png"
                                                        className=""
                                                        alt="img"
                                                    />
                                                </div>

                                                {errors.requestDate && (
                                                    <p className="text-red-500">
                                                        {errors.requestDate.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Start Time and End Time Pickers */}
                                            <div
                                                className="form-group"
                                                onClick={() => handleTimeTypeChange()}
                                                onFocus={() => handleTimeTypeChange()}
                                            >
                                                <Controller
                                                    control={control}
                                                    name="requestTime"
                                                    render={({ field }) => (
                                                        <>
                                                            <input
                                                                ref={inputRef.current}
                                                                type={changeStartType ? "time" : "text"}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value);
                                                                }}
                                                                // onBlur={field.onBlur}
                                                                value={field.value || ""}
                                                                placeholder="Start Time"
                                                                {...field}
                                                            />

                                                            {errors.requestTime && (
                                                                <p className="text-red-500">
                                                                    {errors.requestTime.message}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                            </div>

                                            <div
                                                className="form-group"
                                                onClick={() => handleEndTimeTypeChange()}
                                                onFocus={() => handleEndTimeTypeChange()}
                                            >
                                                <Controller
                                                    control={control}
                                                    name="requestEndTime"
                                                    // defaultValue={moment().add(2, "hour").format("HH:mm")} // Set default end time
                                                    render={({ field }) => (
                                                        <>
                                                            <input
                                                                type={changeEndType ? "time" : "text"}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value);
                                                                }}
                                                                onBlur={field.onBlur}
                                                                value={field.value || ""}
                                                                placeholder="End Time"
                                                                {...field}
                                                            />
                                                            {errors.requestEndTime && (
                                                                <p className="text-red-500">
                                                                    {errors.requestEndTime.message}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group-two">
                                            <div className="form-group">
                                                <Controller
                                                    name="selectInterval"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={[
                                                                { id: "1", value: "Day" },
                                                                { id: "2", value: "Week" },
                                                                { id: "3", value: "Month" },
                                                                { id: "4", value: "Year" },
                                                            ]}
                                                            getOptionLabel={(option) => option.value}
                                                            getOptionValue={(option) => option.id}
                                                            placeholder="Select Interval"
                                                            classNamePrefix="react-select"
                                                            onChange={(selectedOption) =>
                                                                field.onChange(selectedOption.value)
                                                            }
                                                            value={
                                                                field.value
                                                                    ? { value: field.value, id: field.value }
                                                                    : null
                                                            }
                                                            // components={{ Option: CustomOption }}
                                                            hideSelectedOptions={false}
                                                            closeMenuOnSelect={true}
                                                        />
                                                    )}
                                                />
                                                {errors.selectInterval && (
                                                    <p className="text-red-500">
                                                        {errors.selectInterval.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="number"
                                                    placeholder="Add Frequency"
                                                    min="0"
                                                    onInput={(e) => {
                                                        if (e.target.value < 0) {
                                                            e.target.value = 0;
                                                        }
                                                    }}
                                                    {...register("frequency")}
                                                />

                                                {errors.frequency && (
                                                    <p className="text-red-500">
                                                        {errors.frequency.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="four-block-input">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder="Zipcode"
                                                    {...register("zipCode")}
                                                />
                                                {errors.zipCode && (
                                                    <p className="text-red-500">
                                                        {errors.zipCode.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder="City"
                                                    {...register("city")}
                                                />
                                                {errors.city && (
                                                    <p className="text-red-500">{errors.city.message}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder="Region"
                                                    {...register("region")}
                                                />
                                                {errors.region && (
                                                    <p className="text-red-500">
                                                        {errors.region.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder="Country"
                                                    {...register("country")}
                                                />
                                                {errors.country && (
                                                    <p className="text-red-500">
                                                        {errors.country.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                placeholder="Your Address Here"
                                                {...register("address")}
                                            />
                                            {errors.address && (
                                                <p className="text-red-500">{errors.address.message}</p>
                                            )}
                                        </div>
                                        <div className="form-group-two">
                                            <div className="form-group">
                                                <textarea
                                                    placeholder="Complete Instruction"
                                                    {...register("instruction")}
                                                ></textarea>
                                                {errors.instruction && (
                                                    <p className="text-red-500">
                                                        {errors.instruction.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <textarea
                                                    placeholder="Complete Description"
                                                    {...register("description")}
                                                ></textarea>
                                                {errors.description && (
                                                    <p className="text-red-500">
                                                        {errors.description.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="btn-form">
                                            <button type="submit" className="common-btn btn">
                                                Request for quotation
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="right-side-img">
                                    <img
                                        src="/images/book-services-img.png"
                                        className=""
                                        alt="img"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="plan-pricing-block">
                        <div className="common-container">
                            <div className="common-title">
                                <h3>Plans & Pricing</h3>
                            </div>
                            <div className="plan-pricing-block-inner">
                                <div className="plan-pricing-block-inner-block">
                                    <div className="plan-pricing">
                                        <h2>Weekly Subscription </h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua Ut enim ad minim veniam.{" "}
                                        </p>
                                        <Link href={""}>$ 20.00</Link>
                                    </div>
                                </div>
                                <div className="plan-pricing-block-inner-block">
                                    <div className="plan-pricing">
                                        <h2>Monthly Subscription </h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua Ut enim ad minim veniam.{" "}
                                        </p>
                                        <Link href={""}>$ 40.00</Link>
                                    </div>
                                </div>
                                <div className="plan-pricing-block-inner-block">
                                    <div className="plan-pricing">
                                        <h2>Yearly Subscription </h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua Ut enim ad minim veniam.{" "}
                                        </p>
                                        <Link href={""}>$ 60.00</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={isModalVisible}
                    bookingModel={isModalVisible}
                    handleClose={handleClose} // disable handleClose
                    description={"You need to be logged in to book a service"}
                    leftButton={"Login"}
                    modalRef={modalRef}
                />
            </CommonPageblock>
            {isLoading && <Loader isAuth={true} />}
            {/* <Footer /> */}
        </>
    );
};

export default Service;
