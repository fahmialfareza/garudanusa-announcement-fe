"use client";

import Announcement from "@/components/Announcement";
import CountDown from "@/components/CountDown";
import HomeFooter from "@/components/HomeFooter";
import { useGetEvent } from "@/hooks/useGetEvent";
import { Link } from "@/libs/router-event";
import {
  ActionIcon,
  Affix,
  Box,
  Card,
  Flex,
  Grid,
  Image,
  Stack,
  Text,
  em,
  rem,
} from "@mantine/core";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import { IconBrandWhatsapp, IconUserCircle } from "@tabler/icons-react";
import dayjs from "dayjs";

export default function Home() {
  const { event, isLoading, isPastDate } = useGetEvent(true);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const home = event?.data;
  useDocumentTitle("GARUDA NUSA");

  return (
    <Grid mah="100vh">
      <Grid.Col
        span={6}
        py={0}
        my={0}
        style={{
          display: `${isMobile ? "none" : "block"}`,
        }}
      >
        {home?.desktop_photo ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE}${home?.desktop_photo}`}
            alt="hero"
            h={"100%"}
          />
        ) : (
          <Box h={"100%"} bg="gray" />
        )}
      </Grid.Col>
      <Grid.Col span={isMobile ? 12 : 6} maw="100vh" px={rem(24)} py={0} my={0}>
        <Affix position={{ bottom: 20, right: 20 }}>
          <ActionIcon
            variant="filled"
            color="green.5"
            radius="xl"
            size={60}
            component={Link}
            href="https://wa.me/+6285815330595"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandWhatsapp size={48} />
          </ActionIcon>
        </Affix>
        <Stack justify="space-around" h="100vh" align="stretch">
          <Flex justify="space-between" w="100%" mb={rem(24)} mt={rem(24)}>
            <Text size="xl" c="brand.9">
              GARUDA NUSA
            </Text>
            <ActionIcon
              variant="transparent"
              color="brand.9"
              component={Link}
              href="/login"
            >
              <IconUserCircle />
            </ActionIcon>
          </Flex>
          <Flex h="100%">
            <Card p={isMobile ? 16 : 28} withBorder w="100%" radius="lg">
              <Stack
                w="100%"
                h="100%"
                justify="space-between"
                align="center"
                gap={rem(40)}
              >
                <Flex justify="space-between" w="100%">
                  <Image
                    src="/assets/logo.png"
                    alt="logo"
                    maw={isMobile ? 150 : 200}
                    fit="contain"
                  />
                  {home?.mobile_photo ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE}${home?.mobile_photo}`}
                      alt="Logo Kegiatan"
                      maw={isMobile ? 120 : 200}
                      fit="contain"
                    />
                  ) : (
                    <Box h={"100%"} maw={100} bg="gray" />
                  )}
                </Flex>
                <Text
                  c="brand.9"
                  size={isMobile ? "md" : "xl"}
                  fw="bold"
                  ta="center"
                  maw={400}
                >
                  {home?.event_name}
                </Text>
                {isPastDate ? (
                  <Announcement />
                ) : (
                  <CountDown
                    targetDate={dayjs(home?.date).toDate()}
                    isLoading={isLoading}
                    isMobile={isMobile}
                  />
                )}
                <HomeFooter headerFooterName={home?.header_footer_name} />
              </Stack>
            </Card>
          </Flex>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
