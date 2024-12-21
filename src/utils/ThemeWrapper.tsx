"use client";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeSettings } from "@/utils/theme/Theme";

import { ReactNode } from "react";

function ThemeWrapper({ children }: { children: ReactNode }) {
  const theme = ThemeSettings();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeWrapper;
