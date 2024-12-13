import React, { useEffect, useRef, useState } from "react";
import "../../../components/NavBar/global.css";
import "../../../app/(dashboard)/settings-chat/global.css";
import Navbar from "../../../components/NavBar/NavBar";
import Modal from "@/components/Modal/Modal";
import { useTranslation } from "next-i18next";
import {
    getMessageAction,
    getMessagePaginationAction,
} from "@/redux/Chat/action";
import { TOAST_ALERTS } from "@/constants/keywords";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SendMessage from "../sendMessageInput";
import { getData } from "@/utils/storage";
import moment from "moment";
import useToaster from "@/hooks/useToaster";
import { setPaginationMessageList } from "@/redux/Chat/ChatSlice";

const MessageList = () => {
    const dispatch = useDispatch();
    const { toaster } = useToaster();
    const selectedUser = useSelector((state) => state?.chatApi?.selectedUser);
    const messageList = useSelector((state) => state?.chatApi?.messageList);
    const user = getData("user");
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null); // Ref for the messages container
    const [paginationPage, setpaginationPage] = useState(2);

    useEffect(() => {
        GetMessageList();
    }, [selectedUser?.id]);

    const GetMessageList = async () => {
        try {
            await dispatch(
                getMessageAction({
                    receiverId: selectedUser?.id,
                    page: 1,
                    limit: 15,
                })
            );
        } catch (error) {
            toast.error(TOAST_ALERTS.ERROR_MESSAGE);
            console.log("Error", error);
        }
    };

    const messages = [...(messageList || [])].reverse();

    const groupedMessages =
        messages.length > 0
            ? messages.reduce((acc, item) => {
                if (item?.createdAt) {
                    const date = moment(item.createdAt).format("YYYY-MM-DD");
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(item);
                }
                return acc;
            }, {})
            : {};

    // Reverse the grouped messages

    useEffect(() => {
        // Scroll only when new messages are sent, not when paginating
        if (messagesContainerRef.current && paginationPage === 2) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages, paginationPage]);

    // pagination on scroll
    // Get Message List Api call

    const handleScroll = async (e) => {
        e.preventDefault();

        let element = e.target;
        const scrollHeightBefore = element.scrollHeight;

        if (element.scrollTop === 0) {
            console.log("handle scroll ma handle scroll ma");

            //   setIsLoading(true);
            await setpaginationPage(paginationPage + 1);

            try {
                const res = await dispatch(
                    getMessagePaginationAction({
                        receiverId: selectedUser?.id,
                        page: paginationPage,
                        limit: 15,
                    })
                );

                if (!res?.payload?.status) {
                } else {
                    const newMessages = res?.payload?.response;
                    dispatch(setPaginationMessageList(newMessages));
                    await new Promise((resolve) => setTimeout(resolve, 0));
                    const newScrollHeight = element.scrollHeight;
                    element.scrollTop = newScrollHeight - scrollHeightBefore;
                }
            } catch (error) {
                toaster(TOAST_ALERTS.ERROR_MESSAGE, TOAST_TYPES.ERROR);
            } finally {
                // setIsLoading(false);
            }
        }
    };

    return (
        <div className="settings-chat-right-section">
            <div
                className="setting-box-shadow h-[640px]  border border-gray-200  flex flex-col"
                style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)" }}
            >
                <div className="current-chat-profile-container border-b border-gray-200 shadow-b-lg  flex items-center p-4">
                    <div className="flex items-center">
                        <img
                            className="h-14 w-14"
                            src={
                                selectedUser?.adminProfile
                                    ? selectedUser?.adminProfile
                                    : "/images/chat-profile.svg"
                            }
                            alt="Profile"
                        />
                        <div className="ml-2">
                            <p className="current-chat-username">{selectedUser?.adminName}</p>
                            <p className="text-sm text-gray-500">
                                {" "}
                                {selectedUser?.isUserOnline ? "Online" : "Away"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="chat-container flex flex-col flex-1 overflow-hidden ">
                    <div
                        className="messages-container flex-1 overflow-y-auto p-2 mb-2 max-h-[480px]"
                        ref={messagesContainerRef}
                        onScroll={(e) => handleScroll(e)}
                    >
                        {Object.keys(groupedMessages).map((date) => {
                            const isToday = (date) => moment().isSame(date, "day");
                            const isYesterday = (date) =>
                                moment().subtract(1, "days").isSame(date, "day");
                            let displayDate = moment(date).format("MMMM Do, YYYY");

                            if (isToday(date)) {
                                displayDate = "Today";
                            } else if (isYesterday(date)) {
                                displayDate = "Yesterday";
                            }
                            return (
                                <div key={date}>
                                    <div className="date-header text-center">{displayDate}</div>
                                    {groupedMessages[date].map((item, index) => {
                                        return item?.senderId === user?.data?.id ? (
                                            <div
                                                key={index}
                                                className={`${item.isInformative
                                                    ? "w-full flex justify-center"
                                                    : "reciever-msg-container"
                                                    } flex items-center`} // added 'flex items-center' here
                                            >
                                                <div className="relative pr-1">
                                                    {item.typeOfMessage === "text" &&
                                                        !item.isInformative && (
                                                            <div className="message-box-time-text flex flex-col ">
                                                                <div className="message-box">
                                                                    <div className="message-boxgrey bg-gray-200 px-4 py-2.5 rounded-full mb-2.5 inline-flex max-w-lg break-all">
                                                                        <p className="text-sm font-normal leading-5 text-[#131726]">
                                                                            {item.message}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    {item.typeOfMessage === "image" && (
                                                        <img
                                                            src={item.message}
                                                            alt="Media"
                                                            className="media-img"
                                                        />
                                                    )}
                                                    {item.typeOfMessage === "video" && (
                                                        <video controls className="media-img">
                                                            <source src={item.message} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    )}
                                                    {item.typeOfMessage === "audio" && (
                                                        <div className="flex justify-center">
                                                            <audio controls className="media-img">
                                                                <source src={item.message} type="audio/mpeg" />
                                                                Your browser does not support the audio tag.
                                                            </audio>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="pb-2 flex items-center justify-center">
                                                    {!item.isInformative && (
                                                        <img
                                                            src={
                                                                item.profile
                                                                    ? item.profile
                                                                    : "/images/chat-profile.svg"
                                                            }
                                                            className="w-10 h-10 rounded-full object-cover"
                                                            alt="Profile"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                key={index}
                                                className={`${item.isInformative
                                                    ? "w-full flex justify-center"
                                                    : "sender-msg-container"
                                                    } flex items-center`} // Added 'flex items-center' for vertical centering
                                            >
                                                <div className="relative pr-2">

                                                    {/* Added padding-right here */}
                                                    {item.isInformative > 0 && (
                                                        <div className="message-box-time-text flex flex-col">
                                                            <div className="message-box">
                                                                <div className="message-boxgrey bg-gray-200 px-4 py-2.5 rounded-full mb-2.5 inline-flex max-w-lg break-all">
                                                                    {" "}
                                                                    {/* Added max-w-lg and break-all */}
                                                                    <p className="text-sm font-normal leading-5 text-[#131726]">
                                                                        {item.message}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {!item.isInformative &&
                                                        item.typeOfMessage === "text" && (
                                                            <div className="message-box-time-text flex flex-col">
                                                                <div className="message-box">
                                                                    <div className="message-boxgrey bg-gray-200 px-4 py-2.5 rounded-full mb-2.5 inline-flex max-w-lg break-all">
                                                                        {" "}
                                                                        {/* Added max-w-lg and break-all */}
                                                                        <p className="text-sm font-normal leading-5 text-[#131726]">
                                                                            {item.message}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    {item.typeOfMessage === "image" && (
                                                        <>
                                                            <img
                                                                src={item.message}
                                                                alt="Media"
                                                                className="media-img"
                                                            />
                                                        </>
                                                    )}
                                                    {item.typeOfMessage === "video" && (
                                                        <>
                                                            <video controls className="media-img">
                                                                <source src={item.message} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex items-center">
                                                    {" "}
                                                    {/* Added flex and items-center for vertical centering */}
                                                    {!item.isInformative && (
                                                        <img
                                                            src={
                                                                item.profile
                                                                    ? item.profile
                                                                    : "/images/chat-profile.svg"
                                                            }
                                                            className="w-10 h-10 rounded-full object-cover" // Removed extra pr-2 and centered
                                                            alt="Profile"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    {!messageList[0]?.chatDisable ? <SendMessage /> : ""}
                </div>
            </div>
        </div>
    );
};

export default MessageList;
