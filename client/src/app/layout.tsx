import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import AppAlert from "@/components/AppAlert";

const josefin_sans = Josefin_Sans({ subsets: ["latin"], style:['italic', 'normal'], weight:['400', '700'], variable: "--font-josefin_sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefin_sans.variable} font-sans`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {" "}
          <ThemeProvider theme={theme}>
            {/* <ReduxProvider>{children}</ReduxProvider> */}
            <CssBaseline />
            <ReduxProvider>
              <Navbar />
              {children}
            </ReduxProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
