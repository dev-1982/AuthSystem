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
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'new' | 'old'>('new');

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

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

      {loading ? (
        <Group justify="center" mt="xl">
          <Loader size="lg" />
        </Group>
      ) : filtered.length === 0 ? (
        <Title order={5} c="dimmed" ta="center" mt="md">
          Пользователи не найдены
        </Title>
      ) : (
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
      )}
    </Card>
  );
}
