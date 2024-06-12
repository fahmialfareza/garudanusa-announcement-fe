"use client";

import { useGetEvent } from "@/hooks/useGetEvent";
import {
  AnnouncementArgs,
  useSubmitAnnouncement,
} from "@/hooks/useUpdateEvent";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Loader,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  em,
  rem,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconColorPicker, IconPhotoUp } from "@tabler/icons-react";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import id from "dayjs/locale/id";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminHeader";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(id);
dayjs.tz.setDefault("Asia/Jakarta");

const ProfilePage = () => {
  useDocumentTitle("GARUDA NUSA | Admin Profile");

  const [desktopImage, setDesktopImage] = useState<FileWithPath[]>([]);
  const [mobileImage, setMobileImage] = useState<FileWithPath[]>([]);
  const { submitAnnouncement } = useSubmitAnnouncement();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { event, isLoading } = useGetEvent(true);

  const form = useForm<Partial<AnnouncementArgs["data"]>>({
    initialValues: {
      note: event?.data.note || "",
      countdown: dayjs(dayjs(event?.data.date).toISOString()).toDate() || "",
      event_name: event?.data.event_name || "",
      header_footer_name: event?.data.header_footer_name || "",
      selection_phase: event?.data.selection_phase || "",
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Color,
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: event?.data.note || null,
    onUpdate: ({ editor }) => {
      form.setFieldValue("note", editor.getHTML());
    },
    onCreate(props) {
      props.editor.commands.setContent(event?.data.note as string);
    },
  });

  useEffect(() => {
    if (event?.data) {
      form.setValues({
        note: event?.data.note,
        countdown: dayjs(dayjs(event?.data.date).toISOString()).toDate(),
        event_name: event?.data.event_name,
        header_footer_name: event?.data.header_footer_name,
        selection_phase: event?.data.selection_phase,
      });
    }
    editor?.commands.setContent(event?.data.note as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.data]);

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

  const handleUpload = (data: typeof form.values) => {
    submitAnnouncement({
      url: "/event",
      data: {
        countdown: data.countdown,
        event_name: data.event_name as string,
        header_footer_name: data.header_footer_name as string,
        note: data.note as string,
        selection_phase: data.selection_phase as string,
        desktop_photo: desktopImage[0],
        mobile_photo: mobileImage[0],
      },
    });
  };

  return (
    <Stack pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{
          color: "brand.9",
          children: (
            <Flex align="center" gap={12} direction="column">
              <Loader size="lg" color="brand.9" />
              <Text c="brand.9" size="lg" fw="bolder">
                Memuat...
              </Text>
            </Flex>
          ),
        }}
      />
      <AdminHeader />
      <Paper p={24}>
        <Stack gap={24}>
          <TextInput
            label="Nama Event"
            withAsterisk
            radius="lg"
            variant="filled"
            w="100%"
            size="lg"
            placeholder="Masukan nama event"
            {...form.getInputProps("event_name")}
          />
          <TextInput
            label="Header Footer"
            withAsterisk
            radius="lg"
            variant="filled"
            w="100%"
            size="lg"
            placeholder="Masukan header footer"
            {...form.getInputProps("header_footer_name")}
          />
          <DateTimePicker
            valueFormat="DD MMM YYYY HH:mm WIB"
            label="Tanggal Pengumuman"
            withAsterisk
            radius="lg"
            variant="filled"
            w="100%"
            size="lg"
            placeholder="Tanggal Pengumuman"
            {...form.getInputProps("countdown")}
          />
          <TextInput
            label="Tahap Seleksi"
            withAsterisk
            radius="lg"
            variant="filled"
            w="100%"
            size="lg"
            placeholder="Masukan tahap seleksi"
            {...form.getInputProps("selection_phase")}
          />

          <Stack gap={4}>
            <Text fw={500}>Catatan</Text>
            <RichTextEditor editor={editor} mih={300} onChange={() => {}}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Control interactive={false}>
                    <IconColorPicker size="1rem" stroke={1.5} />
                  </RichTextEditor.Control>
                  <RichTextEditor.Color color="#E67701" />
                  <RichTextEditor.Color color="#087F5B" />
                  <RichTextEditor.Color color="#C92A2A" />
                  <RichTextEditor.Color color="#FAB006" />
                  <RichTextEditor.Color color="#364FC7" />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.UnsetColor />
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          </Stack>
          <Stack gap={4}>
            <Text fw={500} mb={28}>
              Background
            </Text>
            <SimpleGrid cols={isMobile ? 2 : 4}>
              <Stack>
                <Text fw={500}>Desktop </Text>
                <Dropzone
                  onDrop={setDesktopImage}
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
              <Box>
                {desktopPreviews}
                {!desktopImage.length && !isLoading ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE}${event?.data.desktop_photo}`}
                    w="100%"
                    h="100%"
                    style={{ objectFit: "cover" }}
                    alt="desktop image"
                  />
                ) : null}
              </Box>
              <Stack>
                <Text fw={500}>Logo Kegiatan </Text>
                <Dropzone
                  onDrop={setMobileImage}
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
              <Box>
                {mobilePreviews}
                {!mobileImage.length && !isLoading ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE}${event?.data.mobile_photo}`}
                    w="100%"
                    h="100%"
                    style={{ objectFit: "cover" }}
                    alt="mobile image"
                  />
                ) : null}
              </Box>
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
              onClick={() => form.onSubmit(handleUpload)()}
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
