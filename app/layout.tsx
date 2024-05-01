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

export const metadata: Metadata = {
  title: "Garuda Nusa",
  description: "Generated by create next app",
};

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
            <div>{children}</div>
            <HandleOnComplete />
          </MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
