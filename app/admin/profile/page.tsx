"use client";

import ProfileTextEditor from "@/app/admin/profile/ProfileTextEditor";
import {
  Box,
  Button,
  Center,
  Grid,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhotoUp } from "@tabler/icons-react";
import { useState } from "react";

const ProfilePage = () => {
  const [desktopImage, setDesktopImage] = useState<FileWithPath[]>([]);
  const [mobileImage, setMobileImage] = useState<FileWithPath[]>([]);

  const desktopPreviews = desktopImage.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        w="100%"
        h="100%"
        style={{ objectFit: "cover" }}
        alt="desktop image"
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const mobilePreviews = mobileImage.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        w="100%"
        h="100%"
        style={{ objectFit: "cover" }}
        alt="mobile image"
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  return (
    <Stack>
      <Paper bg="teal.1" p="lg" radius={12}>
        <Text c="teal.9" size="xl" fw="bolder" ta="center">
          SISTEM INFORMASI KELOLOSAN GARUDA NUSA YOUTH ACTION(GNYA) #9 LABUAN
          BAJO
        </Text>
      </Paper>
      <Paper p={24}>
        <Stack gap={24}>
          <Grid>
            <Grid.Col span={7}>
              <Stack>
                <TextInput
                  label="Nama Event"
                  withAsterisk
                  radius="lg"
                  variant="filled"
                  w="100%"
                  size="lg"
                  placeholder="Masukan nama event"
                />
                <TextInput
                  label="Header Footer"
                  withAsterisk
                  radius="lg"
                  variant="filled"
                  w="100%"
                  size="lg"
                  placeholder="Masukan header footer"
                />
              </Stack>
            </Grid.Col>
            <Grid.Col span={5}>
              <Stack>
                <DateTimePicker
                  label="Tanggal Pengumuman"
                  withAsterisk
                  radius="lg"
                  variant="filled"
                  w="100%"
                  size="lg"
                  placeholder="Tanggal Pengumuman"
                />
                <TextInput
                  label="Tahap Seleksi"
                  withAsterisk
                  radius="lg"
                  variant="filled"
                  w="100%"
                  size="lg"
                  placeholder="Masukan tahap seleksi"
                />
              </Stack>
            </Grid.Col>
          </Grid>
          <Stack gap={4}>
            <Text fw={500}>Catatan</Text>
            <ProfileTextEditor />
          </Stack>
          <Stack gap={4}>
            <Text fw={500} mb={28}>
              Background
            </Text>
            <SimpleGrid cols={4}>
              <Stack>
                <Text fw={500}>Desktop </Text>
                <Dropzone
                  onDrop={setDesktopImage}
                  onReject={(files) => console.log("rejected files", files)}
                  maxSize={5 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                >
                  <Stack
                    justify="center"
                    align="center"
                    gap="xl"
                    mih={220}
                    style={{ pointerEvents: "none" }}
                  >
                    <Dropzone.Idle>
                      <IconPhotoUp
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
                          Supports: PNG, JPG, JPEG, WEBP
                        </Text>
                      </Stack>
                    </Center>
                  </Stack>
                </Dropzone>
              </Stack>
              <div>{desktopPreviews}</div>
              <Stack>
                <Text fw={500}>Mobile </Text>
                <Dropzone
                  onDrop={setMobileImage}
                  onReject={(files) => console.log("rejected files", files)}
                  maxSize={5 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                >
                  <Stack
                    justify="center"
                    align="center"
                    gap="xl"
                    mih={220}
                    style={{ pointerEvents: "none" }}
                  >
                    <Dropzone.Idle>
                      <IconPhotoUp
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
                          Supports: PNG, JPG, JPEG, WEBP
                        </Text>
                      </Stack>
                    </Center>
                  </Stack>
                </Dropzone>
              </Stack>
              <Box>{mobilePreviews}</Box>
            </SimpleGrid>
          </Stack>
          <Box>
            <Button
              variant="filled"
              color="brand.9"
              size="lg"
              radius="xl"
              tt="uppercase"
              fullWidth={false}
            >
              Update
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ProfilePage;
