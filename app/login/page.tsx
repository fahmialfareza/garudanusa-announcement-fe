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
  em,
} from "@mantine/core";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import { useLogin } from "@/hooks/useLogin";
import AuthProvider from "@/providers/AuthProvider";
import { useLayoutEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import { useGetEvent } from "@/hooks/useGetEvent";

const Login = () => {
  const { token } = useAuthStore();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const router = useRouter();
  useDocumentTitle("GARUDA NUSA | Login");
  const { event, isPastDate } = useGetEvent();
  const home = event?.data;

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
        <Grid gutter={0}>
          <Grid.Col
            span={6}
            h="100vh"
            style={{
              display: `${isMobile ? "none" : "block"}`,
            }}
          >
            {home?.desktop_photo ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE}${home?.desktop_photo}`}
                alt="hero"
                h={"100%"}
              />
            ) : (
              <Box h={"100%"} bg="gray" />
            )}
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 6} px={24}>
            <Stack gap={48} justify="center" align="stretch" h={"100%"}>
              <Flex h={isMobile ? "80%" : "70%"}>
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
