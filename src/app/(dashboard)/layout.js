import Navbar from "@/components/NavBar/NavBar";
import Segment from "@/components/Segment/Segment";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Modal from "@/components/Modal/Modal";

const DashBoardLayout = ({ children }) => {
  return (
    <>
      {/* <NextUIProvider> */}
      <Navbar />

      <Segment />
      {/* <Modal /> */}

      {children}
      {/* </NextUIProvider> */}
    </>
  );
};

export default DashBoardLayout;
