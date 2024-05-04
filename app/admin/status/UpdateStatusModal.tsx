import { useUpdateStatus } from "@/hooks/useStatus";
import { UpdateStatusPayload } from "@/services/status/status";
import {
  Button,
  CheckIcon,
  ColorSwatch,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconColorPicker } from "@tabler/icons-react";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface CreateStatusModalProps {
  editOpen: boolean;
  closeEditStatus: () => void;
  payload: UpdateStatusPayload;
}

const UpdateStatusModal = ({
  editOpen,
  closeEditStatus,
  payload,
}: CreateStatusModalProps) => {
  const { updateStatus } = useUpdateStatus();

  const form = useForm({
    initialValues: {
      status: payload?.status,
      color: payload?.color,
      message: payload?.message,
    },
    validate: {
      status: (value) => (!value ? "Status harus diisi" : null),
      color: (value) => (!value ? "Warna harus diisi" : null),
      message: (value) => (!value ? "Pesan harus diisi" : null),
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
    content: payload.message,
    onUpdate: ({ editor }) => {
      form.setFieldValue("message", editor.getHTML());
    },
    onCreate(props) {
      props.editor.commands.setContent(payload.message as string);
    },
  });

  const handleSubmit = (data: typeof form.values) => {
    updateStatus({
      id: payload.id,
      status: data.status,
      message: data.message,
      color: data.color,
    });
    closeEditStatus();
  };

  useEffect(() => {
    if (payload) {
      form.setValues({
        status: payload?.status,
        color: payload?.color,
      });
    }
    editor?.commands.setContent(payload?.message as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <Modal
      opened={editOpen}
      onClose={closeEditStatus}
      title="Buat Status Baru"
      radius={12}
      size="84%"
      centered
    >
      <Stack p={12}>
        <Flex justify="space-between" align="end" gap={24}>
          <TextInput
            label="Nama Status"
            withAsterisk
            radius="lg"
            variant="filled"
            w="50%"
            size="lg"
            placeholder="Masukan nama status"
            key={form.key("status")}
            {...form.getInputProps("status")}
          />
          <Stack w="50%" gap={2}>
            <Text c="#101113" fw={600}>
              Pilih Warna
            </Text>
            <Group w="100%">
              <ColorSwatch
                component="button"
                withShadow={false}
                size={40}
                color="#E67701"
                onClick={() => {
                  form.setFieldValue("color", "#E67701");
                }}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {form.getValues().color === "#E67701" && (
                  <CheckIcon style={{ width: rem(16), height: rem(16) }} />
                )}
              </ColorSwatch>
              <ColorSwatch
                component="button"
                withShadow={false}
                size={40}
                color="#087F5B"
                onClick={() => {
                  form.setFieldValue("color", "#087F5B");
                }}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {form.getValues().color === "#087F5B" && (
                  <CheckIcon style={{ width: rem(16), height: rem(16) }} />
                )}
              </ColorSwatch>
              <ColorSwatch
                component="button"
                withShadow={false}
                size={40}
                color="#364FC7"
                onClick={() => {
                  form.setFieldValue("color", "#364FC7");
                }}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {form.getValues().color === "#364FC7" && (
                  <CheckIcon style={{ width: rem(16), height: rem(16) }} />
                )}
              </ColorSwatch>
              <ColorSwatch
                component="button"
                withShadow={false}
                size={40}
                color="#C92A2A"
                onClick={() => {
                  form.setFieldValue("color", "#C92A2A");
                }}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {form.getValues().color === "#C92A2A" && (
                  <CheckIcon style={{ width: rem(16), height: rem(16) }} />
                )}
              </ColorSwatch>
              <ColorSwatch
                component="button"
                withShadow={false}
                size={40}
                color="#101113"
                onClick={() => {
                  form.setFieldValue("color", "#101113");
                }}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {form.getValues().color === "#101113" && (
                  <CheckIcon style={{ width: rem(16), height: rem(16) }} />
                )}
              </ColorSwatch>
              <ColorSwatch
                component="button"
                withShadow={false}
                size={40}
                color="#20C997"
                onClick={() => {
                  form.setFieldValue("color", "#20C997");
                }}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {form.getValues().color === "#20C997" && (
                  <CheckIcon style={{ width: rem(16), height: rem(16) }} />
                )}
              </ColorSwatch>
              <ColorSwatch
                component="button"
                withShadow={false}
                size={40}
                color="#FAB006"
                onClick={() => {
                  form.setFieldValue("color", "#FAB006");
                }}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {form.getValues().color === "#FAB006" && (
                  <CheckIcon style={{ width: rem(16), height: rem(16) }} />
                )}
              </ColorSwatch>
              <ColorSwatch
                component="button"
                withShadow={false}
                size={40}
                color="#FF6B6B"
                onClick={() => {
                  form.setFieldValue("color", "#FF6B6B");
                }}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                {form.getValues().color === "#FF6B6B" && (
                  <CheckIcon style={{ width: rem(16), height: rem(16) }} />
                )}
              </ColorSwatch>
            </Group>
          </Stack>
        </Flex>
        <Stack gap={-2}>
          <Text c="#101113" fw={600}>
            Pesan
          </Text>
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
        <Flex justify="end" gap="sm">
          <Button variant="transparent" c="brand.9" onClick={closeEditStatus}>
            Batal
          </Button>
          <Button
            color="brand.9"
            variant="filled"
            radius="xl"
            onClick={() => {
              form.validate();
              form.onSubmit(handleSubmit)();
            }}
          >
            Simpan
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default UpdateStatusModal;
