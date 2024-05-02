"use client";

import { HandleOnComplete } from "@/libs/router-event";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { theme } from "@/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "./nprogress.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <ReactQueryProvider>
          <MantineProvider theme={theme}>
            <Toaster position="top-right" richColors />
            <div>{children}</div>
            <HandleOnComplete />
          </MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
