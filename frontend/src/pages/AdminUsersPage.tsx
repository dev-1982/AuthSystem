import { useEffect, useState } from 'react';
import {
  Table,
  Card,
  Text,
  TextInput,
  Group,
  Select,
  Stack,
  Pagination,
  Loader,
  Center
} from '@mantine/core';
import api from '../api';

type UserRow = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
};

type UsersResponse = {
  items: UserRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  useEffect(() => {
  let cancelled = false;

  async function load() {
    setLoading(true);
    try {
      const res = await api.get<UsersResponse>('/users', {
        params: {
          search: search || undefined,
          sort: sortDir,
          page,
          limit
        }
      });

      if (!cancelled) {
        setUsers(res.data.items);
        setTotalPages(Math.max(res.data.totalPages ?? 1, 1));
      }
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  load();

  return () => {
    cancelled = true;
  };
}, [search, sortDir, page]);


  const rows = users.map((u) => (
    <tr key={u.id}>
      <td>{u.id}</td>
      <td>{u.email}</td>
      <td>{u.role}</td>
      <td>{new Date(u.createdAt).toLocaleString()}</td>
    </tr>
  ));

  return (
    <Card maw={900} mx="auto" mt="xl" withBorder>
      <Group justify="space-between" mb="md">
        <Text fw={700}>All users</Text>
      </Group>

      <Stack mb="md" gap="sm">
        <TextInput
          placeholder="Search by email or id"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.currentTarget.value);
          }}
        />

        <Group gap="sm">
          <Select
            label="Sort by created date"
            data={[
              { value: 'desc', label: 'Newest first' },
              { value: 'asc', label: 'Oldest first' }
            ]}
            value={sortDir}
            onChange={(value) => {
              if (value === 'asc' || value === 'desc') {
                setSortDir(value);
              } else {
                setSortDir('desc');
              }
            }}
            w={220}
          />
        </Group>
      </Stack>

      {loading ? (
        <Center py="lg">
          <Loader />
        </Center>
      ) : (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}

      {totalPages > 1 && (
        <Group justify="center" mt="md">
          <Pagination value={page} onChange={setPage} total={totalPages} />
        </Group>
      )}
    </Card>
  );
}
