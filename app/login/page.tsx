"use client";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import { useLogin } from "@/hooks/useLogin";
import AuthProvider from "@/providers/AuthProvider";
import { useLayoutEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const { token } = useAuthStore();
  const router = useRouter();

  const { login, isLoading, isError, error } = useLogin();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) =>
        !value.length ? "Username tidak boleh kosong" : null,
      password: (value) => (!value.length ? "Sandi tidak boleh kosong" : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    login({ username: values.username, password: values.password });
  };

  useLayoutEffect(() => {
    if (token) {
      router.push("/admin/profile");
    }
  }, [token, router]);

  if (token) return null;

  return (
    <AuthProvider>
      <Box>
        <Grid>
          <Grid.Col span={6} h="100vh">
            <Image src="/assets/hero.png" alt="hero" h={"100%"} />
          </Grid.Col>
          <Grid.Col span={6} pr={24}>
            <Stack gap={48} justify="center" align="stretch" h={"100%"}>
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
                    <Image src="/assets/logo.png" alt="logo" maw={300} />

                    <TextInput
                      label="Nama Pengguna"
                      withAsterisk
                      radius="xl"
                      variant="filled"
                      w="100%"
                      size="xl"
                      autoComplete="bday-day"
                      placeholder="Masukan nama pengguna"
                      error={form.errors.username}
                      key={form.key("username")}
                      {...form.getInputProps("username")}
                    />
                    <PasswordInput
                      label="Sandi"
                      withAsterisk
                      radius="xl"
                      variant="filled"
                      autoComplete="bday-day"
                      w="100%"
                      size="xl"
                      placeholder="Masukan sandi"
                      key={form.key("password")}
                      {...form.getInputProps("password")}
                    />
                    <Button
                      variant="filled"
                      color="brand.9"
                      onClick={() => {
                        form.onSubmit(handleSubmit)();
                        console.log(form.values);
                      }}
                      size="lg"
                      radius="xl"
                      tt="uppercase"
                      fullWidth
                    >
                      MASUK
                    </Button>
                  </Stack>
                </Card>
              </Flex>
              <Center>
                <Text
                  maw={400}
                  ta="center"
                  tt="uppercase"
                  fw="bold"
                  c="brand.9"
                >
                  GARUDA NUSA YOUTH ACTION (GNYA) #9 LABUAN BAJOPENGUMUMAN
                  SELEKSI SUBSTANSI © {dayjs().format("YYYY")}
                </Text>
              </Center>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>
    </AuthProvider>
  );
};

export default Login;
