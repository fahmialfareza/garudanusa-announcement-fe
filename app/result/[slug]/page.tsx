"use client";
import PreviewEditor from "@/components/PreviewEditor";
import { useCheckStatus } from "@/hooks/useCheckStatus";
import { useGetEvent } from "@/hooks/useGetEvent";
import { exportPDF } from "@/libs/pdf/downloadPdf";
import { Link } from "@/libs/router-event";
import {
  Badge,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Loader,
  LoadingOverlay,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { IconArrowNarrowLeft, IconFileDownload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const ResultPage = ({ params }: { params: { slug: string } }) => {
  useDocumentTitle(`GARUDA NUSA | Results(${params.slug})`);

  const { checkStatus, isLoading, status, isError } = useCheckStatus(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const { event } = useGetEvent(true);
  const router = useRouter();

  function setViewportMetaTag(): string {
    const viewport = document.querySelector("meta[name='viewport']");
    let originalContent = "width=device-width, initial-scale=1";
    if (viewport) {
      originalContent = viewport.getAttribute("content") || originalContent;
      viewport.setAttribute("content", "width=1440");
    } else {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "width=1920";
      document.getElementsByTagName("head")[0].appendChild(meta);
    }
    return originalContent;
  }

  function resetViewportMetaTag(originalContent: string): void {
    const viewport = document.querySelector("meta[name='viewport']");
    if (viewport) {
      viewport.setAttribute("content", originalContent);
    }
  }

  useEffect(() => {
    const originalViewportContent = setViewportMetaTag();

    return () => {
      resetViewportMetaTag(originalViewportContent);
    };
  }, []);

  useEffect(() => {
    if (params.slug) {
      checkStatus({
        numberPhone: params.slug,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  const handleDownloadPdf = () => {
    if (contentRef.current) {
      exportPDF({
        exportRef: contentRef,
        fileName: "result.pdf",
      });
    }
  };

  if (isLoading) {
    return (
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        bg="brand.9"
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{
          color: "brand.9",
          children: (
            <Flex align="center" gap={12} direction="column">
              <Loader size="lg" color="brand.9" />
              <Text c="brand.9" size="lg" fw="bolder">
                Menentukan Hasil ...!
              </Text>
            </Flex>
          ),
        }}
      />
    );
  }

  if (isError) {
    return (
      <Container>
        <Center>
          <Title>Terjadi kesalahan</Title>
        </Center>
      </Container>
    );
  }

  return (
    <Paper>
      {!isLoading && status?.data.phone ? (
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
                            : {status?.data.name}
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td fw={500} c="brand.9">
                            Skor
                          </Table.Td>
                          <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                            : {status?.data.total_score}
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td fw={500} c="brand.9">
                            Nomor Hp
                          </Table.Td>
                          <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                            : {status?.data.phone}
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td fw={500} c="brand.9">
                            Asal Daerah
                          </Table.Td>
                          <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                            : {status?.data.address_from}
                          </Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                          <Table.Td fw={500} c="brand.9">
                            Tempat/ Tgl. Lahir
                          </Table.Td>
                          <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                            : {status?.data.city_of_birth}
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td fw={500} c="brand.9">
                            Asal Kampus/Sekolah
                          </Table.Td>
                          <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                            : {status?.data.school}
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
                      color={status?.data?.status?.color}
                      radius="xs"
                      px={40}
                      py={20}
                    >
                      {status?.data?.status?.status}
                    </Badge>
                  </Center>
                  <Stack gap={24}>
                    {!isLoading ? (
                      <>
                        <PreviewEditor
                          content={status?.data?.status?.message}
                        />
                        <PreviewEditor content={event?.data?.note} />
                      </>
                    ) : null}
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
            <Center my={48}>
              <Group gap={24}>
                <Button
                  onClick={() => {
                    if (window.history.length > 0) {
                      window.history.back();
                    } else {
                      router.push("/check-status");
                    }
                  }}
                  variant="transparent"
                  component={Link}
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
      ) : null}
    </Paper>
  );
};

export default ResultPage;
