"use client";

import CreateStatusModal from "@/app/admin/status/CreateStatusModal";
import UpdateStatusModal from "@/app/admin/status/UpdateStatusModal";
import PreviewEditor from "@/components/PreviewEditor";
import { useDeleteStatus, useGetStatus } from "@/hooks/useStatus";
import { UpdateStatusPayload } from "@/services/status/status";
import {
  ActionIcon,
  Badge,
  Button,
  Flex,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useDocumentTitle } from "@mantine/hooks";
import { IconPencil, IconTrashX } from "@tabler/icons-react";
import { useState } from "react";

const StatusSettingsPage = () => {
  useDocumentTitle("GARUDA NUSA | Admin Status");
  const { deleteStatus } = useDeleteStatus();

  const [selectedStatus, setSelectedStatus] = useState<UpdateStatusPayload>({
    id: null,
    status: "",
    color: "",
    message: "",
  });

  const [createOpen, { open: clickCreateStatus, close: closeCreateStatus }] =
    useDisclosure(false);

  const [editOpen, { open: clickEditStatus, close: closeEditStatus }] =
    useDisclosure(false);

  const [deleteOpen, { open: clickDeleteStatus, close: closeDeleteStatus }] =
    useDisclosure(false);

  const { status } = useGetStatus();

  return (
    <Stack>
      <Paper bg="teal.1" p="lg" radius={12}>
        <Text c="teal.9" size="xl" fw="bolder" ta="center">
          SISTEM INFORMASI KELOLOSAN GARUDA NUSA YOUTH ACTION(GNYA) #9 LABUAN
          BAJO
        </Text>
      </Paper>
      <Paper p="lg" radius={12}>
        <Flex justify="space-between" align="center">
          <Text c="brand.9" size="lg" fw="bolder">
            Pengaturan Status Peserta
          </Text>
          <Button
            variant="filled"
            radius="xl"
            color="brand.9"
            size="lg"
            onClick={clickCreateStatus}
          >
            Tambah Status
          </Button>
        </Flex>
      </Paper>
      <Stack>
        {status?.data?.map((data) => (
          <Paper p={24} radius={16} key={data.id}>
            <Stack gap={20}>
              <Flex justify="space-between" align="center">
                <Badge size="xl" px={20} py={20} color={data.color}>
                  {data.status}
                </Badge>
                <Group gap={16}>
                  <ActionIcon
                    size="xl"
                    radius="xl"
                    color="yellow.9"
                    onClick={() => {
                      setSelectedStatus(data);
                      clickEditStatus();
                    }}
                  >
                    <IconPencil />
                  </ActionIcon>
                  <ActionIcon
                    size="xl"
                    radius="xl"
                    color="red.9"
                    onClick={() => {
                      setSelectedStatus(data);
                      clickDeleteStatus();
                    }}
                  >
                    <IconTrashX />
                  </ActionIcon>
                </Group>
              </Flex>
              <PreviewEditor content={data.message} />
            </Stack>
          </Paper>
        ))}
      </Stack>
      <CreateStatusModal
        createOpen={createOpen}
        closeCreateStatus={closeCreateStatus}
      />
      <UpdateStatusModal
        editOpen={editOpen}
        closeEditStatus={closeEditStatus}
        payload={selectedStatus}
      />
      <Modal
        opened={deleteOpen}
        onClose={closeDeleteStatus}
        title={`Hapus Status ${selectedStatus.status}`}
        centered
      >
        <Stack gap={24}>
          <Text fw="bolder" fz={24}>
            Yakin Ingin Menghapus Status?
          </Text>
          <Flex justify="end">
            <Button
              variant="transparent"
              c="brand.9"
              onClick={closeDeleteStatus}
            >
              Batal
            </Button>
            <Button
              color="red.9"
              variant="filled"
              radius="xl"
              onClick={() => {
                if (!selectedStatus.id) return;
                if (selectedStatus.id) {
                  deleteStatus({
                    id: selectedStatus.id,
                  });
                }
                closeDeleteStatus();
              }}
            >
              Hapus
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default StatusSettingsPage;
