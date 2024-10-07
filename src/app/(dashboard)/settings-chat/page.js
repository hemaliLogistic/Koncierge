"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../components/NavBar/global.css";
import "./global.css";
import Navbar from "../../../components/NavBar/NavBar";
import Modal from "@/components/Modal/Modal";
import { useTranslation } from "next-i18next";
import UserList from "@/components/Chat/UserList";
import MessageList from "@/components/Chat/MessageList";
import io from "@/components/Chat/clientIo";
import { getData } from "@/utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { setNewMessage } from "@/redux/Chat/ChatSlice";

const SettingsChat = () => {
    io.sails.autoConnect = false;
    const user = getData("user");
    const userAuth = user?.token;
    const dispatch = useDispatch();
    const chatIdRef = useRef();
    //unread count
    const [reciveChatData, setReciveChatData] = useState(null);
    const [chatIdCollection, setChatIdCollection] = useState([]);
    const selectedUser = useSelector((state) => state?.chatApi?.selectedUser);

    const reciverFetch = function getlivedata(a, b) {
        console.log("in page.js ====>", { a, b });
        if (a?.data) {
            const isSameChatGroup = chatIdRef.current == a?.data?.senderId;
            if (a?.action === "sendMessage" && isSameChatGroup) {
                dispatch(setNewMessage(a?.data));
            }
            setReciveChatData(a?.data?.chatMessage);
        }
    };

    useEffect(() => {
        chatIdRef.current = selectedUser?.id;
    }, []);

    useEffect(() => {
        reciverFetch();
    }, [chatIdRef.current]);

    useEffect(() => {
        io.sails.transports = ["websocket"];
        io.sails.headers = {
            Authorization: `Bearer ${userAuth || ""}`,
        };

        const mySocket = io.sails.connect(process.env.NEXT_PUBLIC_HOSTBACKEND_URL);

        mySocket.on("connect", () => {
            console.log("Socket connected");
            mySocket.get(
                `/api/v1/subscribe-user/${user?.data?.id}`,
                (resData, jwres) => {
                    mySocket.on("user", reciverFetch);
                }
            );
        });

        mySocket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
        });

        mySocket.on("error", (error) => {
            console.error("Socket error:", error);
        });
    }, [userAuth]);

    return (
        <div className="settings-main-container">
            <UserList chatIdRef={chatIdRef} />
            {selectedUser?.id ? <MessageList /> : <> No Message</>}
        </div>
    );
};

export default SettingsChat;
