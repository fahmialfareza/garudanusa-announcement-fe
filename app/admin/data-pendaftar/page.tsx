"use client";

import UpdateAnnouncementModal from "@/app/admin/data-pendaftar/UpdateAnnouncementModal";
import AdminHeader from "@/components/AdminHeader";
import {
  useDeleteAnnouncement,
  useGetAnnouncement,
} from "@/hooks/useAnnouncement";
import { UpdateAnnouncementPayload } from "@/services/announcement/announcement";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Pagination,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useDebouncedValue,
  useDisclosure,
  useDocumentTitle,
} from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const DataRegistrantPage = () => {
  useDocumentTitle("GARUDA NUSA | Admin Data Pendaftar");
  const [displayCount, setDisplayCount] = useState("50");
  const [activePage, setPage] = useState(1);
  const { announcement, isLoading: isAnnouncementLoading } =
    useGetAnnouncement();

  const { deleteAllAnnouncement, isLoading } = useDeleteAnnouncement();

  const [deleteOpen, { open: clickDeleteData, close: closeDeleteData }] =
    useDisclosure(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      search: "",
    },
  });

  const [
    editOpen,
    { open: clickEditAnnouncement, close: closeEditAnnouncement },
  ] = useDisclosure(false);

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<UpdateAnnouncementPayload>({
      id: undefined,
      name: "",
      phone: "",
      city_of_birth: "",
      date_of_birth: "",
      address_from: "",
      school: "",
      status_id: undefined,
      total_score: undefined,
    });

  const [debouncedSearchTerm] = useDebouncedValue(form.getValues().search, 500);

  function chunk<T>(array: T[] | undefined, size: number): T[][] {
    if (!array?.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  form.watch("search", ({ previousValue, value, touched, dirty }) => {
    if (!touched && !dirty) return;
    if (!value) {
      form.setValues({ search: previousValue });
      return;
    }
    form.setValues({ search: value });
  });

  const filterAnnouncement = announcement?.data.filter((item) => {
    const searchTerm = debouncedSearchTerm.toLowerCase();
    const itemValues = [
      item.name?.toLowerCase() ?? "",
      item.phone?.toLowerCase() ?? "",
      item.city_of_birth?.toLowerCase() ?? "",
      item.address_from?.toLowerCase() ?? "",
      item.school?.toLowerCase() ?? "",
      item.date_of_birth
        ? new Date(item.date_of_birth).toLocaleDateString()
        : "",
      item.total_score?.toString() ?? "",
    ];

    return (
      itemValues.some((value) => value.includes(searchTerm)) ||
      item.status?.status?.toLowerCase() == searchTerm
    );
  });

  const data = chunk(filterAnnouncement, parseInt(displayCount))[
    activePage - 1
  ];

  const rows = data?.map((item) => (
    <Table.Tr
      key={item.id}
      style={{ cursor: "pointer" }}
      onClick={() => {
        setSelectedAnnouncement({
          ...item,
          total_score: parseInt(item.total_score),
          status_id: parseInt(item.status_id),
        });
        clickEditAnnouncement();
      }}
    >
      <Table.Td>{item.number}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.phone}</Table.Td>
      <Table.Td>
        {item.city_of_birth}, {item.date_of_birth}
      </Table.Td>
      <Table.Td>{item.address_from}</Table.Td>
      <Table.Td>{item.school}</Table.Td>
      <Table.Td>
        <Badge w="100%" size="md" color={item.status.color}>
          {item.status.status}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  const rowsLoading = [...Array(10)].map((_, index) => (
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
      <Paper p="lg" radius={12}>
        <Stack gap={40}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={20}>
            <Text c="brand.9" size="lg" fw="bolder">
              Daftar Pendaftar
            </Text>
            <TextInput
              label="Cari"
              radius="md"
              miw={300}
              variant="filled"
              size="md"
              leftSection={<IconSearch size={16} />}
              {...form.getInputProps("search")}
            />
          </Flex>
          <Divider />
          <Table.ScrollContainer minWidth={"100%"}>
            <Table striped highlightOnHover fz={rem(14)}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>No.</Table.Th>
                  <Table.Th>Nama Pendaftar</Table.Th>
                  <Table.Th>No Hp</Table.Th>
                  <Table.Th>Tempat/Tgl.Lahir</Table.Th>
                  <Table.Th>Asal Daerah</Table.Th>
                  <Table.Th>Kampus/Sekolah</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {isAnnouncementLoading ? rowsLoading : rows}
              </Table.Tbody>
              <Table.Caption>Data Pendaftar</Table.Caption>
            </Table>
            <Flex
              justify="space-between"
              w="100%"
              align="center"
              gap={24}
              mt={24}
            >
              <Button
                color="red.9"
                variant="filled"
                radius="xl"
                onClick={clickDeleteData}
              >
                Hapus Semua Data
              </Button>
              <Flex align="center" gap={24} mt={24}>
                <Select
                  w="100px"
                  value={displayCount}
                  onChange={(value) => setDisplayCount(value as string)}
                  data={[
                    { value: "50", label: "50" },
                    { value: "100", label: "100" },
                    { value: "200", label: "200" },
                    { value: "300", label: "300" },
                    { value: "400", label: "400" },
                    { value: "500", label: "500" },
                  ]}
                />
                <Pagination
                  total={data?.length}
                  value={activePage}
                  onChange={setPage}
                />
              </Flex>
            </Flex>
          </Table.ScrollContainer>
        </Stack>

        <UpdateAnnouncementModal
          updateAnnouncementOpen={editOpen}
          closeUpdateAnnouncement={closeEditAnnouncement}
          payload={selectedAnnouncement}
        />
        <Modal
          opened={deleteOpen}
          onClose={closeDeleteData}
          title={`Hapus Semua Data Pendaftar`}
          centered
        >
          <Stack gap={24}>
            <Text fw="bolder" fz={24}>
              Yakin Ingin Menghapus Semua Data Pendaftar?
            </Text>
            <Flex justify="end">
              <Button
                variant="transparent"
                c="brand.9"
                onClick={closeDeleteData}
              >
                Batal
              </Button>
              <Button
                color="red.9"
                variant="filled"
                radius="xl"
                onClick={() => {
                  deleteAllAnnouncement();
                  closeDeleteData();
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

export default DataRegistrantPage;
