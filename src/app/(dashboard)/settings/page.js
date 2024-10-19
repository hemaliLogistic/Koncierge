"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../../components/NavBar/global.css";
import "./global.css";
import Navbar from "../../../components/NavBar/NavBar";
import Modal from "@/components/Modal/Modal";
import { useTranslation } from "next-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { getCountries, parsePhoneNumberFromString } from "libphonenumber-js";
import {
    changePasswordAction,
    editProfileAction,
    getProfileAction,
} from "@/redux/Dashboard/action";
import { toast } from "react-toastify";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import useToaster from "@/hooks/useToaster";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, RHFTextInput } from "@/components/hook-form";
import { getCountryCallingCode } from "libphonenumber-js";
import { coolGray } from "tailwindcss/colors";
import Image from "next/image";
import { removeData } from "@/utils/storage";
import { signOut } from "next-auth/react";
import PlacesAutocomplete from "@/components/PlacesAutocomplete";

const Settings = () => {
    const [modalPlacement, setModalPlacement] = React.useState("auto");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isWrongPassword, setIsWrongPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState([]);
    const [profileImage, setProfileImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [country, setCountry] = useState("us");
    const [file, setFile] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [addressValue, setAddressValue] = useState("");

    const [isLogOutModalVisible, setIsLogOutModalVisible] = useState(false);

    const maxRetries = 10;

    const { t } = useTranslation("common");
    const router = useRouter();
    const { toaster } = useToaster();
    const dispatch = useDispatch();
    useEffect(() => {
        getProfileData(true);
    }, []);

    const getProfileData = async (noImageData) => {
        setIsLoading(true);

        try {
            const res = await dispatch(getProfileAction({}));
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    const profileData = res.payload.data;
                    setIsLoading(false);
                    setProfileData(profileData);
                    if (noImageData) {
                        setProfileImage(profileData?.fullImagePath);
                    }
                    if (profileData.mobileNumber) {
                        setPhoneNum(
                            `${profileData?.mobileCountryCode} ${profileData.mobileNumber}`
                        );
                    }
                    setCountryCode(profileData?.mobileCountryCode);

                    methods.reset({
                        name: res.payload.data.name,
                        address: res.payload.data.address,
                    });
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

    const defaultValues = useMemo(
        () => ({
            name: profileData?.name || "",
            address: profileData?.address || "",
            phoneNumber: phoneNum || "",
        }),
        [profileData]
    );

    const formSchema = useMemo(() => {
        return yup.object().shape({
            name: yup.string().required(t("enterName")).trim(t("validName")),
            address: yup.string().required(t("enterAddress")).trim(t("validAddress")),
        });
    }, [t]);

    const methods = useForm({
        resolver: yupResolver(formSchema),
        defaultValues,
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isDirty },
        reset,
        setValue,
    } = methods;

    const onSubmitForm = async (formData) => {
        try {
            const address =
                addressValue?.length > 0 ? addressValue : profileData?.address;
            const { name } = formData;
            let registrationParams = {};
            const profileFormData = new FormData();
            profileFormData.append("name", name);
            profileFormData.append("address", address);
            if (file) {
                profileFormData.append("image", file);
            }
            if (phoneNumber) {
                profileFormData.append("mobileNumber", phoneNumber);
                profileFormData.append("mobileCountryCode", countryCode);
            }
            setIsLoading(true);
            const res = await dispatch(editProfileAction(profileFormData));

            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    setIsLoading(false);
                    // await setProfileImage("");
                    getProfileData(false);
                    toaster(TOAST_ALERTS.UPDATE_PROFILE, TOAST_TYPES.SUCCESS);
                    // setIsLoading(false);
                    reset();
                } else {
                    setIsLoading(false);
                    toast.error(res.payload.message);
                }
                reset();

            } else {
                setIsLoading(false);
                toast.error(res.error.message || res.payload.message);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(TOAST_ALERTS.ERROR_MESSAGE);
            console.log("error", error);
        }
    };

    const changePasswordApiCall = async (
        oldPassword,
        newPassword,
        handleClear
    ) => {
        let passwordParams = {};
        if (profileData && profileData?.isPasswordAvail) {
            passwordParams.password = newPassword;
            passwordParams.oldpassword = oldPassword;
        } else {
            passwordParams.password = newPassword;
        }

        try {
            const res = await dispatch(changePasswordAction(passwordParams));

            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    const profileData = res.payload.data;
                    setIsModalVisible(false);
                    toast.success(res.payload.message);
                    handleClear();
                } else {
                    setErrorMessage(res.payload.message);
                }
            } else {
                toast.error(res.error.message || res.payload.message);
            }
        } catch (error) {
            // setIsLoading(false);
            setIsWrongPassword(true);
            toast.error(TOAST_ALERTS.ERROR_MESSAGE);
        }
    };

    const handleImageUpload = async (e) => {
        const fileobj = e.target.files[0]; // Get the selected file
        if (fileobj) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result; // Base64 URL of the image
                const imageObject = {
                    url: imageUrl,
                    type: fileobj.type,
                    name: fileobj.name,
                };
                // Set the base64 image URL to the state to display it
                setProfileImage(imageObject.url);
            };
            reader.readAsDataURL(fileobj); // Convert to base64 URL
        }
        await updateProfileImage(fileobj);
    };

    const updateProfileImage = async (file) => {
        try {
            // Create a FormData object
            const formData = new FormData();
            formData.append('image', file); // Append the file to FormData

            const res = await dispatch(editProfileAction(formData));

            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    setIsLoading(false);
                    // await setProfileImage("");
                    getProfileData(false);
                    toaster(TOAST_ALERTS.UPDATE_PROFILE, TOAST_TYPES.SUCCESS);
                    // setIsLoading(false);
                } else {
                    setIsLoading(false);
                    toast.error(res.payload.message);
                }
            } else {
                setIsLoading(false);
                toast.error(res.error.message || res.payload.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle any network or unexpected errors
        }
    }

    const handlePassword = (oldPassword, password, handleClear) => {
        if (profileData?.isPasswordAvail) {
            if (
                typeof oldPassword === "string" &&
                oldPassword !== "" &&
                typeof password === "string" &&
                password !== ""
            ) {
                // setIsModalVisible(false);
                changePasswordApiCall(oldPassword, password, handleClear);
            }
        } else {
            if (typeof password === "string") {
                // setIsModalVisible(false);
                changePasswordApiCall(oldPassword, password, handleClear);
            }
        }
    };
    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handlePhoneChange = (phone, country) => {
        const countryCode = country.dialCode; // or country.countryCode
        setCountryCode(countryCode);
        const phoneWithoutCountryCode = phone.slice(countryCode.length);
        setPhoneNumber(phoneWithoutCountryCode);
    };

    const handleAddressChange = (value) => {
        setAddressValue(value);
    };

    const handleLogOutOpen = () => {
        setIsLogOutModalVisible(true);
    };

    const handleLogoutClose = async () => {
        localStorage.clear();
        removeData("user");
        await signOut({ redirect: false });
        router.push("/");
    };

    const handleStateClose = () => {
        setIsLogOutModalVisible(false);

    }

    return (
        <>
            <div className="settings-main-container">
                {isLoading && <Loader />}
                <div className="settings-left-section">
                    <div className="flex items-center">
                        <div className="setting-box-shadow flex">
                            <div className="flex-grow">
                                <p className="user-name">User Name</p>
                                <p className="user-description">{profileData?.name}</p>
                                <div className="setting-icon-container">
                                    <img
                                        src="/images/key.svg"
                                        alt="Import"
                                        className="setting-icon-img"
                                    />
                                    <button
                                        onClick={() => setIsModalVisible(true)}
                                        className="setting-icon-text"
                                    >
                                        {t("changePassword")}
                                    </button>
                                </div>
                            </div>
                            <div className="setting-image-container">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="imageUpload"
                                    className="hidden"
                                    onChange={handleImageUpload} // Update here
                                />
                                <div className="image-upload-label">
                                    <Image
                                        // Display uploaded image if available, else default image
                                        src={profileImage ? profileImage : '/images/import-image.svg'}
                                        alt="Profile Image"
                                        className="setting-image-element object-cover cursor-pointer"
                                        onError={() => setProfileImage('/images/import-image.svg')}
                                        onClick={() => {
                                            const fileInput = document.getElementById('imageUpload');
                                            fileInput.click();
                                        }}
                                        width={80}
                                        height={80}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="chat-btn-container"
                        // onClick={() => router.push("/settings-chat")}
                        onClick={() => handleLogOutOpen()}
                    >
                        <p className="chat-btn-text">{t("Logout")}</p>
                    </button>
                </div>

                <div className="settings-right-section">
                    <div className="setting-box-shadow">
                        <div className="editprofile-header-container ">
                            <p className="editprofile-header-text">{t("editProfile")}</p>
                        </div>

                        <div className="setting-horizontal-divider"></div>

                        <FormProvider
                            methods={methods}
                            onSubmit={handleSubmit(onSubmitForm)}
                            className=""
                        >
                            <div className="setting-input-container">
                                <RHFTextInput
                                    name="name"
                                    type={"text"}
                                    className="setting-input-field "
                                    placeholder="User Name"
                                />
                            </div>

                            <div className="setting-input-container flex flex-col lg:flex-row gap-7">
                                <input
                                    type="text"
                                    placeholder="Email Address"
                                    className="setting-input-field"
                                    readOnly
                                    value={profileData?.email}
                                    disabled
                                />
                                <Controller
                                    name="phoneNumber"
                                    control={methods.control}
                                    render={({ field }) => (
                                        <PhoneInput
                                            country={"us"}
                                            value={phoneNum}
                                            onChange={(phone, country) => {
                                                handlePhoneChange(phone, country);
                                                field.onChange(phone); // Update form state
                                            }}
                                            placeholder="Phone Number"
                                            inputClass="w-[100%] h-[60px] font-Mulish text-lg font-normal"
                                        />
                                    )}
                                />

                            </div>

                            <div className="setting-input-container">
                                {profileData && (
                                    <Controller
                                        name="address"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <PlacesAutocomplete
                                                name="address"
                                                type="text"
                                                className="setting-input-field"
                                                placeholder="Address"
                                                defaultAddress={profileData?.address}
                                                handleAddressChange={(value) => {
                                                    handleAddressChange(value);
                                                    field.onChange(value); // Update form state
                                                }}
                                                autocomplete
                                                value={field.value}
                                            />
                                        )}
                                    />

                                )}
                            </div>
                            <div className="setting-horizontal-divider mt-[30px]"></div>
                            <div className="buttons-container">
                                <button
                                    type="submit"
                                    disabled={!isDirty || isSubmitting}
                                    className={`button-update ${!isDirty ? "bg-gray-350 cursor-not-allowed opacity-50" : ""}`}
                                >
                                    Update Profile
                                </button>
                                {/* <button className='button-cancel'>Cancel</button> */}
                            </div>
                        </FormProvider>
                    </div>
                </div>
                <Modal
                    isOpen={isModalVisible}
                    handleClose={() => handleClose()} // disable handleClose
                    handlePassword={(oldPassword, newPassword, handleClear) => {
                        handlePassword(oldPassword, newPassword, handleClear);
                    }}
                    description={"Change Password"}
                    leftButton={"Save"}
                    rightButton={"Cancel"}
                    isChangePassword={true}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    isWrongPassword={isWrongPassword}
                    // isOldPassword={false}
                    isOldPassword={profileData?.isPasswordAvail}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />

                {isLogOutModalVisible ? (
                    <Modal
                        isOpen={isLogOutModalVisible}
                        handleClose={handleStateClose}
                        handleLogout={handleLogoutClose}
                        description={"Are you sure you want to LOG OUT?"}
                        leftButton={"Yes"}
                        rightButton={"No"}
                    />
                ) : null}
            </div>
        </>
    );
};

export default Settings;
