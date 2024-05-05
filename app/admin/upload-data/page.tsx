"use client";

import AdminHeader from "@/components/AdminHeader";
import { useFileUpload } from "@/hooks/useUploadRegristrant";
import { Link } from "@/libs/router-event";
import {
  Button,
  Center,
  Flex,
  List,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { Dropzone, FileWithPath, MS_EXCEL_MIME_TYPE } from "@mantine/dropzone";
import { IconCircleCheck, IconFileSpreadsheet } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UploadDataPage = () => {
  const [dataRegistrant, setDataRegistrant] = useState<FileWithPath[]>([]);

  const { uploadFile, isSuccess } = useFileUpload();

  const handleUpload = (files: FileWithPath[]) => {
    if (files.length === 0) {
      return;
    }
    files.forEach((file) => {
      uploadFile({
        url: "/announcement/import",
        file: file,
        fieldName: "announcement",
      });
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setDataRegistrant([]);
    }
  }, [isSuccess]);

  return (
    <>
      <AdminHeader />

      <Paper p="lg" radius={12} h="80vh">
        <Stack gap={24}>
          <Flex justify="space-between" align="center">
            <Text fw={500} size="lg" c="brand.9">
              Upload File Pendaftar{" "}
            </Text>
            <Button
              variant="filled"
              color="brand.9"
              size="lg"
              radius="xl"
              onClick={() => handleUpload(dataRegistrant)}
            >
              Submit
            </Button>
          </Flex>
          <Dropzone
            onDrop={setDataRegistrant}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={5 * 1024 ** 2}
            accept={MS_EXCEL_MIME_TYPE}
          >
            <Stack
              justify="center"
              align="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Idle>
                <IconFileSpreadsheet
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-brand-9)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>
              <Center>
                <Stack>
                  <Text size="xl" c="blue" ta="center">
                    browse
                  </Text>
                  <Text size="xs" c="dimmed" inline ta="center">
                    Supports: .xls 2003-2007
                  </Text>
                </Stack>
              </Center>
            </Stack>
          </Dropzone>
          {dataRegistrant.map((file) => (
            <Paper key={file.name}>
              <Flex gap={4} justify="center" align="center">
                <IconFileSpreadsheet
                  style={{
                    width: rem(28),
                    height: rem(28),
                    color: "var(--mantine-color-brand-9)",
                  }}
                  stroke={1.5}
                />
                <Text c="brand.9" size="xl" fw="bolder">
                  {file.name}
                </Text>
              </Flex>
            </Paper>
          ))}
          <Paper bg="yellow.2" p="xl" radius={12}>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="brand.9" size={20} radius="xl">
                  <IconCircleCheck
                    style={{ width: rem(14), height: rem(14) }}
                  />
                </ThemeIcon>
              }
            >
              <List.Item>
                <Text c="brand.9" size="xl" fw="bolder">
                  Silahkan hapus header pada template yang berwarna kuning
                </Text>
              </List.Item>
              <List.Item>
                <Text c="brand.9" size="xl" fw="normal">
                  Pilih file Microsoft excel dengan file type(.xls:2003-2007)
                </Text>
              </List.Item>
              <List.Item>
                <Text c="teal.9" size="xl" fw="bolder">
                  Download Template{" "}
                  <Button
                    variant="transparent"
                    fz="xl"
                    ml="-16"
                    c="teal.9"
                    component={Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/assets/template_data.xlsx"
                    fw="bolder"
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "var(--mantine-color-teal-8)",
                    }}
                  >
                    DISINI!
                  </Button>
                </Text>
              </List.Item>
            </List>
          </Paper>
        </Stack>
      </Paper>
    </>
  );
};

export default UploadDataPage;
