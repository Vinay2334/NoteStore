"use client";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ReduxProvider } from "@/redux/provider";
import Navbar from "@/components/Navbar/Navbar";
type Props = {};

function MainClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ReduxProvider>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {" "}
          <ThemeProvider theme={theme}>
            {/* <ReduxProvider>{children}</ReduxProvider> */}
            <CssBaseline />
            <Navbar/>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </ReduxProvider>
    </>
  );
}

export default MainClientLayout;
