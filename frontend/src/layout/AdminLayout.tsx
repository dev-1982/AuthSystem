import {
  AppShell,
  Burger,
  Group,
  Title,
  NavLink,
  ScrollArea,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { IconUsers, IconLogout, IconDashboard } from '@tabler/icons-react';
import { useAuth } from '../auth/AuthContext';

export function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3}>Admin Panel</Title>
          </Group>

          <Group>
            <span>{user?.email}</span>
            <ActionIcon color="red" variant="light" onClick={logout}>
              <IconLogout size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <ScrollArea>
          <NavLink
            component={Link}
            to="/admin"
            label="Dashboard"
            leftSection={<IconDashboard size={18} />}
            active={location.pathname === '/admin'}
          />

          <NavLink
            component={Link}
            to="/admin/users"
            label="Users"
            leftSection={<IconUsers size={18} />}
            active={location.pathname.startsWith('/admin/users')}
          />
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
