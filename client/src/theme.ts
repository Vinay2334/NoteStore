"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { lime } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface TypographyVariants {
    productcard: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    productcard?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    productcard: true;
  }
}



const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      50: "#F0F7FF",
      100: "#C2E0FF",
      200: "#99CCF3",
      300: "#66B2FF",
      400: "#3399FF",
      500: "#007FFF",
      600: "#0072E6",
      700: "#0059B3",
      800: "#004C99",
      900: "#003A75",
    },
    grey: {
      50: "#F3F6F9",
      100: "#E5EAF2",
      200: "#DAE2ED",
      300: "#C7D0DD",
      400: "#B0B8C4",
      500: "#9DA8B7",
      600: "#6B7A90",
      700: "#434D5B",
      800: "#303740",
      900: "#1C2025",
    },
  },
  typography: {
    fontFamily: roboto?.style.fontFamily,
    productcard: {
      // fontFamily: 'var(--font-josefin_sans)',
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
