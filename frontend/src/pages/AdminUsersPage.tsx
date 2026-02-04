import { useEffect, useState } from 'react';
import {
  Card,
  Title,
  TextInput,
  Select,
  Group,
  Loader,
  Badge,
  Table,
  Pagination,
  Center,
} from '@mantine/core';
import { api } from '../api';

type User = {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
};

export function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 добавлено для пагинации
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'new' | 'old'>('new');

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await api.get(`/users?page=${page}&limit=${limit}`);

      setUsers(res.data.items ?? []);
      setTotalPages(res.data.totalPages ?? 1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, [page, limit]);

  // 🔥 поиск + сортировка — НЕ ТРОГАЮ
  const filtered = users
    .filter(
      (u) =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === 'new'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return (
    <Card withBorder shadow="sm" p="lg">
      <Title order={2} mb="lg">
        Users
      </Title>

      <Group grow mb="md">
        <TextInput
          label="Search by email or id"
          placeholder="example@mail.com"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        <Select
          label="Sort by created date"
          value={sort}
          onChange={(v) => setSort((v as 'new' | 'old') ?? 'new')}
          data={[
            { value: 'new', label: 'Newest first' },
            { value: 'old', label: 'Oldest first' },
          ]}
        />
      </Group>

      {/* 🔥 выбор количества строк */}
      <Group justify="space-between" mb="md">
        <Select
          label="Rows per page"
          value={String(limit)}
          onChange={(v) => {
            setLimit(Number(v));
            setPage(1); // сброс на первую страницу
          }}
          data={[
            { value: '5', label: '5' },
            { value: '10', label: '10' },
            { value: '50', label: '50' },
          ]}
          w={120}
        />
      </Group>

      {loading ? (
        <Group justify="center" mt="xl">
          <Loader size="lg" />
        </Group>
      ) : filtered.length === 0 ? (
        <Title order={5} c="dimmed" ta="center" mt="md">
          Пользователи не найдены
        </Title>
      ) : (
        <>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Created</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filtered.map((u) => (
                <Table.Tr key={u.id}>
                  <Table.Td>{u.id}</Table.Td>
                  <Table.Td>{u.email}</Table.Td>
                  <Table.Td>
                    <Badge color={u.role === 'ADMIN' ? 'red' : 'blue'}>
                      {u.role}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{new Date(u.createdAt).toLocaleString()}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {/* 🔥 пагинация */}
          <Center mt="md">
            <Pagination total={totalPages} value={page} onChange={setPage} />
          </Center>
        </>
      )}
    </Card>
  );
}
