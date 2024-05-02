"use client";

import Announcement from "@/components/Announcement";
import CountDown from "@/components/CountDown";
import { useGetEvent } from "@/hooks/useGetEvent";
import { Link } from "@/libs/router-event";
import {
  ActionIcon,
  Box,
  Card,
  Center,
  Flex,
  Grid,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { IconUserCircle } from "@tabler/icons-react";
import dayjs from "dayjs";

export default function Home() {
  const { event, isLoading, isPastDate } = useGetEvent();
  const home = event?.data;
  useDocumentTitle("GARUDA NUSA");

  const backDropImage =
    `${process.env.NEXT_PUBLIC_API}${home?.desktop_photo}` ||
    "/assets/hero.png";

  return (
    <Box h="screen">
      <Grid>
        <Grid.Col span={6} h="100vh">
          <Image src={backDropImage} alt="hero" h={"100%"} />
        </Grid.Col>
        <Grid.Col span={6} pr={24} pt={24}>
          <Stack gap={48} justify="center" align="stretch" h={"100%"}>
            <Flex justify="space-between" w="100%" mb={24}>
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
            <Flex h="70%">
              <Card p={28} withBorder w="100%" radius="lg">
                <Stack
                  w="100%"
                  h="100%"
                  justify="center"
                  align="center"
                  gap={40}
                  my={48}
                >
                  <Image src="/assets/logo.png" alt="logo" maw={480} />
                  <Text c="brand.9" size="xl" fw="bold" ta="center" maw={400}>
                    {home?.event_name}
                  </Text>
                  {isPastDate ? (
                    <Announcement />
                  ) : (
                    <CountDown
                      targetDate={dayjs(home?.date).toDate()}
                      isLoading={isLoading}
                    />
                  )}
                </Stack>
              </Card>
            </Flex>
            <Center>
              <Text maw={400} ta="center" fw="bold" c="brand.9" tt="uppercase">
                {home?.header_footer_name} © {dayjs().format("YYYY")}
              </Text>
            </Center>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
