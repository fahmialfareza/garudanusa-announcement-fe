"use client";

import { useRegisterUser } from "@/hooks/useUser";
import {
  Button,
  Flex,
  Modal,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface CreateAdminUserModalProps {
  createAdminOpen: boolean;
  closeCreateAdmin: () => void;
}

const CreateAdminUserModal = ({
  closeCreateAdmin,
  createAdminOpen,
}: CreateAdminUserModalProps) => {
  const { registerUser, isSuccess } = useRegisterUser();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) => (!value.length ? "Nama tidak boleh kosong" : null),
      username: (value) =>
        !value.length ? "Username tidak boleh kosong" : null,
      password: (value) => {
        if (!value.length) {
          return "Sandi tidak boleh kosong";
        } else if (value.length < 8) {
          return "Sandi harus memiliki minimal 8 karakter";
        } else {
          return null;
        }
      },
      confirmPassword: (value, values) =>
        value !== values.password
          ? "Konfirmasi sandi harus sama dengan sandi"
          : null,
    },
  });

  const handleRegister = (values: typeof form.values) => {
    registerUser({
      name: values.name,
      username: values.username,
      password: values.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      closeCreateAdmin();
    }
  }, [isSuccess, closeCreateAdmin]);

  return (
    <Modal
      opened={createAdminOpen}
      onClose={closeCreateAdmin}
      centered
      size="md"
      title="Tambah Pengelola"
      radius={12}
      key="create-admin-user-modal"
    >
      <Stack gap={24}>
        <Stack gap={20}>
          <TextInput
            label="Nama"
            withAsterisk
            radius="md"
            variant="filled"
            w="100%"
            size="lg"
            autoComplete="bday-day"
            placeholder="Masukan nama pengelola"
            error={form.errors.name}
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Username"
            withAsterisk
            radius="md"
            variant="filled"
            w="100%"
            size="lg"
            autoComplete="bday-day"
            placeholder="Masukan nama username"
            error={form.errors.username}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            withAsterisk
            radius="md"
            variant="filled"
            autoComplete="bday-day"
            w="100%"
            size="lg"
            placeholder="Masukan password"
            error={form.errors.password}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Konfirmasi Password"
            withAsterisk
            radius="md"
            variant="filled"
            autoComplete="bday-day"
            w="100%"
            size="lg"
            placeholder="Masukan konfirmasi password"
            error={form.errors.confirmPassword}
            {...form.getInputProps("confirmPassword")}
          />
        </Stack>
        <Flex justify="end" gap="sm">
          <Button variant="transparent" c="brand.9" onClick={closeCreateAdmin}>
            Batal
          </Button>
          <Button
            color="brand.9"
            variant="filled"
            radius="xl"
            onClick={() => {
              form.onSubmit(handleRegister)();
              if (form.errors) return;
              closeCreateAdmin();
            }}
          >
            Simpan
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default CreateAdminUserModal;
