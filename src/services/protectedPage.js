"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { getData } from "@/utils/storage";
import { useSelector } from "react-redux";

const ProtectedPageService = () => {
  const router = useRouter();
  const path = usePathname();
  const user = getData("user");
  const userAuth = user?.token;
  const selector = useSelector((state) => state.isUser);

  const afterLoginProtectedPages = [
    "/dashboard",
    "/bookings",
    "/service",
    "/history",
    "/prefrences",
    "settings",
  ];
  const afterLoginNotAccessiblePages = [
    "/",
    "/register",
    "/login",
    "/verifyEmail",
    "/resetPassword",
    "/forgotPassword",
    "/getStarted",
  ];

  useEffect(() => {
    if (afterLoginNotAccessiblePages.includes(path)) {
      console.log("path", path);
      const isRegistered = localStorage.getItem("isRegistreation");
      console.log("isRegistered", isRegistered);
      if (userAuth) {
        let dashboard_url = `/dashboard`;
        router.push(dashboard_url);
      } else if (isRegistered) {
        router.push("/verifyEmail");
      } else if (path === "/verifyEmail" && !isRegistered) {
        router.push("/");
      }
    } else {
      let isProtectedDynamicPath = false;
      afterLoginProtectedPages.map((protectedPage) => {
        if (
          (typeof protectedPage === "string" && protectedPage === path) ||
          (protectedPage instanceof RegExp && protectedPage.test(path))
        ) {
          isProtectedDynamicPath = true;
        }
      });
      if (isProtectedDynamicPath && !userAuth) {
        router.push("/");
      }
    }
  }, [userAuth, path]);

  return null;
};

export default ProtectedPageService;
