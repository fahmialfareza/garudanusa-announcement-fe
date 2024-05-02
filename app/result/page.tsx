"use client";
import PreviewEditor from "@/components/PreviewEditor";
import { useGetEvent } from "@/hooks/useGetEvent";
import { exportPDF } from "@/libs/pdf/downloadPdf";
import { Link } from "@/libs/router-event";
import { useResultStore } from "@/store/status";
import {
  Badge,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconArrowNarrowLeft, IconFileDownload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const ResultPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { setResult, result } = useResultStore();
  const { event } = useGetEvent();
  const router = useRouter();

  const handleDownloadPdf = () => {
    if (contentRef.current) {
      exportPDF({
        exportRef: contentRef,
        fileName: "result.pdf",
      });
    }
  };

  if (result === null) {
    router.push("/");
    return null;
  }

  return (
    <Paper>
      <Paper bg="#F3F7F4" h="100%" w="100vw" p={40}>
        <Container fluid>
          <Paper
            bg="white"
            h="100%"
            w="100%"
            radius={16}
            p={36}
            ref={contentRef}
          >
            <Stack justify="center" align="center">
              <Center>
                <Image src="/assets/logo.png" alt="logo" maw={300} />
              </Center>
              <Text ta="center" fw="bold" c="brand.9">
                PENGUMUMAN SELEKSI {event?.data?.event_name}
              </Text>
              <Text ta="center" fw="bolder" c="teal.9" fz="h4">
                DETAIL STATUS KELOLOSAN
              </Text>
              <Stack maw="90%" justify="center" align="stretch">
                <Divider size="sm" />
                <Paper bg="teal.1" p="sm" radius={12} w="100%">
                  <Text c="teal.9" size="sm" fw="bold" ta="center">
                    IDENTITAS PENDAFTAR {event?.data?.event_name}
                  </Text>
                </Paper>

                <Paper w="100%">
                  <Table striped>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Nama Lengkap
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : {result?.data.name}
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Skor
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : {result?.data.total_score}
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Nomor Hp
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : {result?.data.phone}
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Asal Daerah
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : {result?.data.address_from}
                        </Table.Td>
                      </Table.Tr>

                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Tempat/ Tgl. Lahir
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : {result?.data.city_of_birth}
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Asal Kampus/Sekolah
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : {result?.data.school}
                        </Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </Paper>
                <Paper bg="teal.1" p="sm" radius={12} w="100%">
                  <Text c="teal.9" size="sm" fw="bold" ta="center">
                    STATUS KELOLOSAN SELEKSI {event?.data?.event_name} ANDA
                    DINYATAKAN
                  </Text>
                </Paper>
                <Center my={24}>
                  <Badge
                    variant="filled"
                    size="xl"
                    color={result?.data?.color}
                    radius="xs"
                    px={40}
                    py={20}
                  >
                    {result?.data?.status}
                  </Badge>
                </Center>
              </Stack>
            </Stack>
            <Stack gap={24}>
              <PreviewEditor content={result?.data?.message} />
              <PreviewEditor content={event?.data?.note} />
            </Stack>
          </Paper>
          <Center my={48}>
            <Group gap={24}>
              <Button
                onClick={() => {
                  setResult(null);
                }}
                variant="transparent"
                component={Link}
                href="/check-status"
                size="lg"
                color="brand.9"
                radius="xl"
                leftSection={<IconArrowNarrowLeft />}
              >
                Kembali
              </Button>
              <Button
                onClick={() => handleDownloadPdf()}
                variant="filled"
                size="lg"
                color="brand.9"
                radius="xl"
                leftSection={<IconFileDownload />}
              >
                Download Pdf
              </Button>
            </Group>
          </Center>
        </Container>
      </Paper>
    </Paper>
  );
};

export default ResultPage;
