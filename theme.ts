"use client";
import { generateColors } from "@mantine/colors-generator";
import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    brand: generateColors("#32485C"),
  },
  fontFamily: "Inter, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: { fontFamily: "Greycliff CF, sans-serif" },
});
