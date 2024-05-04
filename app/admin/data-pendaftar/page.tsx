"use client";
import UpdateAnnouncementModal from "@/app/admin/data-pendaftar/UpdateAnnouncementModal";
import { useGetAnnouncement } from "@/hooks/useAnnouncement";
import { useGetStatus } from "@/hooks/useStatus";
import { UpdateAnnouncementPayload } from "@/services/announcement/announcement";
import {
  Badge,
  Divider,
  Flex,
  Paper,
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
  const { status, isLoading: isStatusLoading } = useGetStatus();
  const { announcement, isLoading: isAnnouncementLoading } =
    useGetAnnouncement();

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
      item.name.toLowerCase(),
      item.phone.toLowerCase(),
      item.city_of_birth.toLowerCase(),
      item.address_from.toLowerCase(),
      item.school.toLowerCase(),
      item.date_of_birth
        ? new Date(item.date_of_birth).toLocaleDateString()
        : "",
      item.status_id?.toString() ?? "",
      item.total_score?.toString() ?? "",
    ];

    return itemValues.some((value) => value.includes(searchTerm));
  });

  const rows = filterAnnouncement?.map((item) => (
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
        <Badge
          w="100%"
          size="md"
          color={
            status?.data?.find(
              (status) => status.id.toString() === item.status_id
            )?.color
          }
        >
          {
            status?.data?.find(
              (status) => status.id.toString() === item.status_id
            )?.status
          }
        </Badge>
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
    <Paper p="lg" radius={12}>
      <Stack gap={40}>
        <Flex justify="space-between" align="center">
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
              {isStatusLoading || isAnnouncementLoading ? rowsLoading : rows}
            </Table.Tbody>
            <Table.Caption>Data Pendaftar</Table.Caption>
          </Table>
        </Table.ScrollContainer>
      </Stack>

      <UpdateAnnouncementModal
        updateAnnouncementOpen={editOpen}
        closeUpdateAnnouncement={closeEditAnnouncement}
        payload={selectedAnnouncement}
      />
    </Paper>
  );
};

export default DataRegistrantPage;
