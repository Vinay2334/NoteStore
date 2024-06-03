"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

export default function authRoutes(Component: any) {
  return function IsAuth(props: any) {

    const token = Cookies.get('auth_token');


    useEffect(() => {
      if (!token) {
        return redirect("/");
      }
    }, []);


    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}