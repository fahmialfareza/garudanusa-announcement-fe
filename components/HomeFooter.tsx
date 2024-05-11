"use client";
import { Center, Stack, Flex, ActionIcon, Text } from "@mantine/core";
import {
  IconBrandWhatsapp,
  IconBrandGmail,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandTiktok,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

interface HomeFooterProps {
  headerFooterName: string | undefined;
}

const HomeFooter = ({ headerFooterName }: HomeFooterProps) => {
  return (
    <Center>
      <Stack>
        <Text maw={400} ta="center" fw="bold" c="brand.9" tt="uppercase">
          {headerFooterName} © {dayjs().format("YYYY")}
        </Text>
        <Flex justify="center" gap={20}>
          <ActionIcon
            variant="filled"
            color="brand.9"
            radius="xl"
            size="lg"
            component={Link}
            href="mailto:garudanusaid@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGmail />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="brand.9"
            radius="xl"
            size="lg"
            component={Link}
            href="https://instagram.com/garudanusaid"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandInstagram />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="brand.9"
            radius="xl"
            size="lg"
            component={Link}
            href="https://www.youtube.com/@garudanusafoundation2755"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandYoutube />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="brand.9"
            radius="xl"
            size="lg"
            component={Link}
            href="https://www.tiktok.com/@garudanusaid"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandTiktok />
          </ActionIcon>
        </Flex>
      </Stack>
    </Center>
  );
};

export default HomeFooter;
