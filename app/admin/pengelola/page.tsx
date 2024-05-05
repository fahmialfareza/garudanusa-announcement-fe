"use client";

import CreateAdminUserModal from "@/app/admin/pengelola/CreateAdminUserModal";
import AdminHeader from "@/components/AdminHeader";
import { useDeleteUser, useGetUsers } from "@/hooks/useUser";
import {
  Paper,
  Text,
  Button,
  Flex,
  Table,
  Stack,
  Group,
  ActionIcon,
  Divider,
  Modal,
  Skeleton,
} from "@mantine/core";
import { useDisclosure, useDocumentTitle } from "@mantine/hooks";
import { IconPencil, IconTrashX } from "@tabler/icons-react";
import React, { useState } from "react";

const UserAdminPage = () => {
  useDocumentTitle("GARUDA NUSA | Admin Pengelola");
  const { users, isLoading } = useGetUsers();
  const { deleteUser } = useDeleteUser();

  const [
    createOpen,
    { open: clickCreateAdminUser, close: closeCreateAdminUser },
  ] = useDisclosure(false);

  const [deleteOpen, { open: clickDeleteUser, close: closeDeleteUser }] =
    useDisclosure(false);

  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
  }>({
    id: 0,
    name: "",
  });

  const rows = users?.data?.map((item) => (
    <Table.Tr key={item.id + "pengelola"}>
      <Table.Td fw="bold">{item.number}</Table.Td>
      <Table.Td fw={500}>{item.name}</Table.Td>
      <Table.Td fw={500}>{item.username}</Table.Td>
      <Table.Td>
        <Group gap={16}>
          {/* <ActionIcon
            size="lg"
            radius="xl"
            color="yellow.9"
            onClick={() => {
            }}
          >
            <IconPencil />
          </ActionIcon> */}
          <ActionIcon
            size="lg"
            radius="xl"
            color="red.9"
            onClick={() => {
              setSelectedUser({ id: item.id, name: item.name });
              clickDeleteUser();
            }}
          >
            <IconTrashX />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const rowsLoading = [...Array(5)].map((_, index) => (
    <Table.Tr key={index + "pengelola"}>
      <Table.Td>
        <Skeleton height={20} />
      </Table.Td>
      <Table.Td>
        <Skeleton height={20} />
      </Table.Td>
      <Table.Td>
        <Skeleton height={20} />
      </Table.Td>
      <Table.Td>
        <Skeleton height={20} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <AdminHeader />
      <Paper p="lg" radius={12} mih={"50vh"}>
        <Stack gap={40}>
          <Flex justify="space-between" align="center">
            <Text c="brand.9" size="lg" fw="bolder">
              Daftar Pengelola
            </Text>
            <Button
              variant="filled"
              radius="xl"
              color="brand.9"
              size="lg"
              onClick={clickCreateAdminUser}
            >
              Tambah Pengelola
            </Button>
          </Flex>
          <Divider />
          <Table stickyHeader stickyHeaderOffset={60}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>No.</Table.Th>
                <Table.Th>Nama Admin</Table.Th>
                <Table.Th>Username</Table.Th>
                <Table.Th>Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{isLoading ? rowsLoading : rows}</Table.Tbody>
            <Table.Caption>Pengelola Garuda Nusa</Table.Caption>
          </Table>
        </Stack>
        <CreateAdminUserModal
          createAdminOpen={createOpen}
          closeCreateAdmin={closeCreateAdminUser}
        />
        <Modal
          opened={deleteOpen}
          onClose={closeDeleteUser}
          title={`Hapus Admin ${selectedUser.name}`}
          key="delete-user-modal"
          centered
        >
          <Stack gap={24}>
            <Text fw="bolder" fz={24}>
              Yakin Ingin Menghapus User?
            </Text>
            <Flex justify="end">
              <Button
                variant="transparent"
                c="brand.9"
                onClick={closeDeleteUser}
              >
                Batal
              </Button>
              <Button
                color="red.9"
                variant="filled"
                radius="xl"
                onClick={() => {
                  if (!selectedUser.id) return;
                  if (selectedUser.id) {
                    deleteUser({
                      id: selectedUser.id,
                    });
                  }
                  closeDeleteUser();
                }}
              >
                Hapus
              </Button>
            </Flex>
          </Stack>
        </Modal>
      </Paper>
    </>
  );
};

export default UserAdminPage;
