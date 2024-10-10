import React, { useRef, useState } from "react";
import { getChatListAction, getMessageAction, SendMessageAction } from "@/redux/Chat/action";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useToaster from "@/hooks/useToaster";
import {
  setFileInput,
  setFilteredUserList1,
  setSendFileInput,
  setSendMessage,
} from "@/redux/Chat/ChatSlice";
import { getData } from "@/utils/storage";
import {
  AudioRecorder,
  ReactAudioRecorder,
  useAudioRecorder,
} from "react-audio-voice-recorder"; // Make sure this import is correct
import { coolGray } from "tailwindcss/colors";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { toaster } = useToaster();
  const inputSelector = useSelector((state) => state.chatApi);
  const chatUserList = useSelector((state) => state?.chatApi?.chatUserList);
  const [currentPage, setCurrentPage] = useState(1);

  const selectedUser = useSelector((state) => state?.chatApi?.selectedUser);

  const user = getData("user");
  const [isImage, setIsImage] = useState(false);
  const [blobFile, setBlobFile] = useState();

  const recorderControlsRef = useRef(null);

  const GetChatUserList = async () => {
    try {
      const res = await dispatch(
        getChatListAction({
          page: currentPage,
          limit: 5,
        })
      );
      if(res?.payload?.status){
        dispatch(setFilteredUserList1(res.payload?.data))
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleFileChange = (e) => {
    setIsImage(true);
    const files = e.target.files;
    const newFiles = [...(files || [])];
    const mediaList = [];

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      const mediaUrl = URL.createObjectURL(file);
      mediaList.push(mediaUrl);
    }
    if (newFiles.length > 5) {
      toaster(TOAST_ALERTS, TOAST_TYPES.ERROR);
      return;
    }

    dispatch(setFileInput(mediaList));
    dispatch(setSendFileInput(newFiles));
  };

  const removeImage = (index) => {
    const updatedMediaList = [...inputSelector.setFileInput];
    const updatedFiles = [...inputSelector.setSendFile];
    updatedMediaList.splice(index, 1);
    updatedFiles.splice(index, 1);
    dispatch(setFileInput(updatedMediaList));
    dispatch(setSendFileInput(updatedFiles));
    setIsImage(false);
  };

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    setBlobFile(blob);
    setIsImage(false);
    const url = URL.createObjectURL(blob);
    const mimeType = blob.type;
    // console.log("url====>", url, "mimeType====>", mimeType);
    const audioData = { url, mimeType };
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    // dispatch(setFileInput([url]));
    dispatch(setFileInput([audioData]));
    dispatch(setSendFileInput([url]));
  };

  const GetMessageList = async () => {
    try {
      await dispatch(
        getMessageAction({
          receiverId: selectedUser?.id,
          page: 1,
          limit: 10,
        })
      );
    } catch (error) {
      toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      console.log("Error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !inputSelector?.sendMessage &&
        inputSelector?.setSendFile.length === 0
      ) {
        toast.error("Please enter a message or select a file.");
        return;
      }

      const formData = new FormData();
      formData.append("recieverId", selectedUser?.id);
      formData.append("senderId", user?.data?.id);
      formData.append(
        "message",
        inputSelector?.sendMessage ? inputSelector?.sendMessage : ""
      );
      formData.append("typeOfChat", "userToAdmin");
      formData.append(
        "typeOfMessage",
        inputSelector?.setSendFile.length > 0 ? "media" : "text"
      );
      if (!isImage) {
        const blobUrl = inputSelector?.setSendFile[0];

        if (blobUrl && blobUrl.startsWith("blob:")) {
          const blobResponse = await fetch(blobUrl);
          const blob = await blobResponse.blob();

          const file = new File([blob], "file.audio", { type: blob.type });
          formData.append("media", file);
        } else {
          formData.append("media", inputSelector?.setSendFile[0]);
        }
      } else {
        for (let i = 0; i < inputSelector?.setSendFile.length; i++) {
          formData.append(`media`, inputSelector?.setSendFile[i]);
        }
      }

      const res = await dispatch(SendMessageAction(formData));

      if (!res?.payload) {
        toast.error(res?.payload?.errors?.[0] || "Something went wrong!");
      } else {
        setIsImage(false);
        dispatch(setSendMessage(""));
        dispatch(setFileInput([]));
        dispatch(setSendFileInput([]));
        await GetChatUserList();
      }
    } catch (error) {
      console.log("catch ma ", error);
      toast.error(TOAST_ALERTS.ERROR_MESSAGE);
    } finally {
      await GetMessageList();
      
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col items-start"
    >
      <div className="flex flex-wrap gap-2 mb-4 justify-end">
        {inputSelector.setFileInput?.map((media, index) => {
          const isAudio = media.mimeType?.startsWith("audio");

          return (
            <div key={index} className="relative group">
              {isAudio ? (
                <div className="w-72">
                  <audio controls className="w-full">
                    <source src={media.url} type={media.mimeType} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <>
                  <img
                    src={media}
                    alt={`Selected ${index}`}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-lg"
                  />
                </>
              )}
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-75 group-hover:opacity-100 transition-opacity duration-200"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center w-full border border-gray-300 rounded-lg  ">
        <div
          className=" w-12 h-9  flex justify-center items-center my-1 mx-1"
          onClick={handleFileChange}
        >
          <input
            className="hidden"
            type="file"
            name="image"
            // onChange={handleFileChange}
            id="fileInput"
            accept="image/*,video/*"
            multiple
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer h-full w-full flex justify-center items-center"
          >
            <img src="/images/gallery-logo.svg" alt="Upload" className="" />
          </label>
        </div>

        <div className="flex-1 px-2 py-1 text-sm border-none focus:outline-none">
          <input
            type="text"
            value={inputSelector?.sendMessage}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            onChange={(e) => dispatch(setSendMessage(e.target.value))}
            className="flex-1 px-2 py-1 text-sm border-none focus:outline-none w-full "
            placeholder="Type Your Question..."
          />
        </div>

        <div>
          <AudioRecorder
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
          />
        </div>

        <button
          type="submit"
          // className="text-white rounded-lg px-2 py-1 ml-2"
          disabled={
            !inputSelector?.sendMessage?.trim() &&
            !isImage &&
            inputSelector?.setSendFile.length === 0
          }
          className={`text-white rounded-lg px-2 py-1 ml-2 ${
            !inputSelector?.sendMessage?.trim() &&
            !isImage &&
            inputSelector?.setSendFile.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <img src="/images/send-logo.svg" alt="Send" className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
