"use client";

import { useGetUser } from "@/hooks/useUser";
import { Link } from "@/libs/router-event";
import AuthProvider from "@/providers/AuthProvider";
import { useAuthStore } from "@/store/auth";
import {
  AppShell,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Image,
  Stack,
  UnstyledButton,
  Text,
  Burger,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { useDisclosure, useDocumentTitle } from "@mantine/hooks";
import {
  IconDiscountCheck,
  IconFileDescription,
  IconFileUpload,
  IconLogout2,
  IconReportAnalytics,
  IconSettings,
  IconUserCircle,
  IconUserPlus,
} from "@tabler/icons-react";

import { useRouter, usePathname } from "next/navigation";

import React from "react";
interface NavLink {
  label: string;
  path: string;
  icon?: any;
}

const navLinks: NavLink[] = [
  {
    label: "Pengaturan Profil",
    path: "/admin/profile",
    icon: <IconSettings />,
  },
  {
    label: "Data Pendaftar",
    path: "/admin/data-pendaftar",
    icon: <IconFileDescription />,
  },
  {
    label: "Upload Data",
    path: "/admin/upload-data",
    icon: <IconFileUpload />,
  },
  {
    label: "Pengelola",
    path: "/admin/pengelola",
    icon: <IconUserPlus />,
  },
  {
    label: "Cek Kelolosan",
    path: "/admin/cek-kelolosan",
    icon: <IconDiscountCheck />,
  },
  {
    label: "Pengaturan Status",
    path: "/admin/status",
    icon: <IconReportAnalytics />,
  },
];

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();
  const { setToken } = useAuthStore();
  const { user } = useGetUser();
  useDocumentTitle("GARUDA NUSA | Admin Upload Data");

  return (
    <AuthProvider>
      <AppShell
        navbar={{
          width: 250,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md" withBorder={false}>
          <Box p={16}>
            <UnstyledButton onClick={toggle}>
              <Image src="/assets/logo.png" alt="logo" />
            </UnstyledButton>
          </Box>
          <Divider />
          <Flex direction="column" justify="space-between" h="100%">
            <Group mt={12}>
              {navLinks?.map((item) => (
                <Button
                  color="brand.9"
                  size="md"
                  ta="left"
                  radius="xl"
                  variant={pathname.includes(item.path) ? "filled" : "subtle"}
                  component={Link}
                  onClick={toggle}
                  fullWidth
                  justify="left"
                  href={item.path}
                  key={item.label}
                  leftSection={item.icon}
                >
                  {item.label}
                </Button>
              ))}
            </Group>
            <Stack mt={12}>
              <Button
                color="brand.9"
                size="md"
                ta="left"
                radius="xl"
                variant="transparent"
                component={Link}
                fullWidth
                justify="left"
                leftSection={<IconUserCircle />}
              >
                <Text truncate="end">{user?.data?.name}</Text>
              </Button>
              <Divider />
              <Button
                color="red.9"
                size="md"
                ta="left"
                radius="xl"
                variant="subtle"
                fullWidth
                justify="left"
                leftSection={<IconLogout2 />}
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                  setToken(null);
                }}
              >
                Keluar
              </Button>
            </Stack>
          </Flex>
        </AppShell.Navbar>
        <AppShell.Main bg="#F5F3F7">
          <div>{children}</div>
        </AppShell.Main>
      </AppShell>
    </AuthProvider>
  );
}
