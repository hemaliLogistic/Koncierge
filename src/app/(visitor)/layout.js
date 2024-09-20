import Footer from "@/components/Footer";
import React from "react";

const VisitorLayout = ({ children }) => {
  return (
    <>
      {children}
      <Footer />{" "}
    </>
  );
};

export default VisitorLayout;
