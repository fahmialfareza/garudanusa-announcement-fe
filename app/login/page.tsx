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

const Login = () => {
  return (
    <Box h="screen">
      <Grid>
        <Grid.Col span={6} h="100vh">
          <Image src="/assets/hero.png" alt="hero" h={"100%"} />
        </Grid.Col>
        <Grid.Col span={6} pr={24} pt={24}>
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
                  <Image src="/assets/logo.png" alt="logo" maw={480} />
                  <TextInput
                    label="Nama Pengguna"
                    withAsterisk
                    radius="xl"
                    variant="filled"
                    w="100%"
                    size="xl"
                    placeholder="Masukan nama pengguna"
                  />
                  <PasswordInput
                    label="Sandi"
                    withAsterisk
                    radius="xl"
                    variant="filled"
                    w="100%"
                    size="xl"
                    placeholder="Masukan sandi"
                  />
                  <Button
                    variant="filled"
                    color="brand.9"
                    size="lg"
                    radius="xl"
                    fullWidth
                  >
                    MASUK
                  </Button>
                </Stack>
              </Card>
            </Flex>
            <Center>
              <Text maw={400} ta="center" fw="bold" color="brand.9">
                GARUDA NUSA YOUTH ACTION (GNYA) #9 LABUAN BAJOPENGUMUMAN SELEKSI
                SUBSTANSI © {dayjs().format("YYYY")}
              </Text>
            </Center>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Login;
