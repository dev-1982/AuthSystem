import { Outlet, Link } from 'react-router-dom';
import { AppShell, Group, Anchor, Container, Title } from '@mantine/core';
import { useAuth } from '../auth/AuthContext';

export function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={3}>AuthSystem</Title>

          <Group gap="md">
            {!user && (
              <>
                <Anchor component={Link} to="/login">
                  Login
                </Anchor>
                <Anchor component={Link} to="/register">
                  Register
                </Anchor>
              </>
            )}

            {user && (
              <>
                <Anchor component={Link} to="/profile">
                  {user.email}
                </Anchor>
                {user.role === 'ADMIN' && (
                  <Anchor component={Link} to="/admin/users">
                    Admin
                  </Anchor>
                )}
                <Anchor component="button" onClick={logout}>
                  Logout
                </Anchor>
              </>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="sm">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
