"use client";
import Navbar from "@/components/NavBar/NavBar";
import Segment from "@/components/Segment/Segment";
import React from "react";
import Modal from "@/components/Modal/Modal";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const DashBoardLayout = ({ children }) => {
  const pathname = usePathname();

  const routeWithoutSegment = "/notification";

  return (
    <>
      {/* <NextUIProvider> */}
      <Navbar />
      {/* Conditionally render the Segment component */}
      {pathname !== routeWithoutSegment && <Segment />}
      <Modal />
      {children}
      <Footer />
      {/* </NextUIProvider> */}
    </>
  );
};

export default DashBoardLayout;
