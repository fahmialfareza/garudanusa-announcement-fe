"use client";

import { useUpdateAnnouncement } from "@/hooks/useAnnouncement";
import { useGetStatus } from "@/hooks/useStatus";
import { UpdateAnnouncementPayload } from "@/services/announcement/announcement";
import {
  Button,
  Flex,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface CreateAdminUserModalProps {
  updateAnnouncementOpen: boolean;
  closeUpdateAnnouncement: () => void;
  payload: UpdateAnnouncementPayload;
}

const UpdateAnnouncementModal = ({
  updateAnnouncementOpen,
  closeUpdateAnnouncement,
  payload,
}: CreateAdminUserModalProps) => {
  const { status } = useGetStatus();
  const { updateAnnouncement } = useUpdateAnnouncement();
  const form = useForm<UpdateAnnouncementPayload>({
    mode: "uncontrolled",
    initialValues: {
      id: payload?.id,
      name: "",
      address_from: "",
      city_of_birth: "",
      date_of_birth: "",
      phone: "",
      school: "",
      status_id: payload?.status_id?.toString(),
      total_score: payload?.total_score,
    },
  });

  const STATUS_OPTIONS = status?.data?.map((item) => ({
    value: item.id.toString(),
    label: item.status,
  }));

  useEffect(() => {
    form.setValues({
      id: payload?.id,
      name: payload?.name,
      address_from: payload?.address_from,
      city_of_birth: payload?.city_of_birth,
      date_of_birth: payload?.date_of_birth,
      phone: payload?.phone,
      school: payload?.school,
      status_id: payload?.status_id?.toString(),
      total_score: payload?.total_score,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  const handleSubmit = (data: typeof form.values) => {
    updateAnnouncement(data);
    closeUpdateAnnouncement();
  };

  return (
    <Modal
      opened={updateAnnouncementOpen}
      onClose={closeUpdateAnnouncement}
      centered
      size="lg"
      title={`Edit ${payload?.name}`}
      radius={12}
    >
      <Stack gap={24}>
        <Stack gap={10}>
          <TextInput
            label="Nama"
            withAsterisk
            radius="md"
            variant="filled"
            w="100%"
            size="lg"
            autoComplete="bday-day"
            error={form.errors.name}
            {...form.getInputProps("name")}
          />
          <TextInput
            label="No Hp"
            withAsterisk
            radius="md"
            variant="filled"
            w="100%"
            size="lg"
            autoComplete="bday-day"
            error={form.errors.phone}
            {...form.getInputProps("phone")}
          />
          <TextInput
            label="Tempat Lahir"
            withAsterisk
            radius="md"
            variant="filled"
            w="100%"
            size="lg"
            autoComplete="bday-day"
            error={form.errors.city_of_birth}
            {...form.getInputProps("city_of_birth")}
          />
          <TextInput
            label="Asal"
            withAsterisk
            radius="md"
            variant="filled"
            w="100%"
            size="lg"
            autoComplete="bday-day"
            error={form.errors.address_from}
            {...form.getInputProps("address_from")}
          />

          <TextInput
            label="Kampus/Sekolah"
            withAsterisk
            radius="md"
            variant="filled"
            w="100%"
            size="lg"
            autoComplete="bday-day"
            error={form.errors.school}
            {...form.getInputProps("school")}
          />
          <NumberInput
            label="Skor"
            hideControls
            withAsterisk
            radius="md"
            variant="filled"
            w="100%"
            size="lg"
            autoComplete="bday-day"
            error={form.errors.total_score}
            value={form.values?.total_score?.toString()}
            {...form.getInputProps("total_score")}
          />
          <Select
            label="Status"
            withAsterisk
            radius="md"
            variant="filled"
            w="100%"
            size="lg"
            data={STATUS_OPTIONS}
            autoComplete="bday-day"
            error={form.errors.status_id}
            {...form.getInputProps("status_id")}
          />
        </Stack>
        <Flex justify="end" gap="sm">
          <Button
            variant="transparent"
            c="brand.9"
            onClick={closeUpdateAnnouncement}
          >
            Batal
          </Button>
          <Button
            color="brand.9"
            variant="filled"
            radius="xl"
            onClick={() => {
              if (!form.isValid()) {
                return;
              }
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

export default UpdateAnnouncementModal;
