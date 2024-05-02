"use client";
import PreviewEditor from "@/components/PreviewEditor";
import { exportPDF } from "@/libs/pdf/downloadPdf";
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
import { useRef } from "react";

const ResultPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const defaultContent =
    '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

  const handleDownloadPdf = () => {
    if (contentRef.current) {
      exportPDF({
        exportRef: contentRef,
        fileName: "result.pdf",
      });
    }
  };

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
              <Text ta="center">
                PENGUMUMAN SELEKSI LEADERLESS GROUP DISCUSSIONGARUDA NUSA YOUTH
                ACTION (GNYA) #9 LABUAN BAJO
              </Text>
              <Text ta="center">DETAIL STATUS KELOLOSAN</Text>
              <Stack maw="90%" justify="center" align="stretch">
                <Divider size="sm" />
                <Paper bg="teal.1" p="sm" radius={12} w="100%">
                  <Text c="teal.9" size="sm" fw="bold" ta="center">
                    IDENTITAS PENDAFTAR GARUDA NUSA YOUTH ACTION (GNYA) #9
                    LABUAN BAJO
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
                          : ALEXANDRA LIANI
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Skor
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : 80
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Nomor Hp
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : 082165697785
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Asal Daerah
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : SUMATERA UTARA
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Asal Daerah
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : SUMATERA UTARA
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Tempat/ Tgl. Lahir
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : KOTA MEDAN, 24 JULI 2003
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td fw={500} c="brand.9">
                          Asal Kampus/Sekolah
                        </Table.Td>
                        <Table.Td fw="bolder" c="brand.9" tt="uppercase">
                          : UNIVERSITAS BINA NUSANTARA
                        </Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </Paper>
                <Paper bg="teal.1" p="sm" radius={12} w="100%">
                  <Text c="teal.9" size="sm" fw="bold" ta="center">
                    STATUS KELOLOSAN SELEKSI LEADERLESS GROUP DISCUSSION GARUDA
                    NUSA YOUTH ACTION (GNYA) #9 LABUAN BAJO ANDA DINYATAKAN
                  </Text>
                </Paper>
                <Center my={24}>
                  <Badge
                    variant="filled"
                    size="xl"
                    color="teal.9"
                    radius="xs"
                    px={40}
                    py={20}
                  >
                    LOLOS
                  </Badge>
                </Center>
              </Stack>
            </Stack>
            <Stack gap={24}>
              <PreviewEditor content={defaultContent} />
              <PreviewEditor content={defaultContent} />
            </Stack>
          </Paper>
          <Center my={48}>
            <Group gap={24}>
              <Button
                onClick={() => handleDownloadPdf()}
                variant="transparent"
                size="lg"
                color="brand.9"
                radius="xl"
                leftSection={<IconArrowNarrowLeft />}
              >
                Download Pdf
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
