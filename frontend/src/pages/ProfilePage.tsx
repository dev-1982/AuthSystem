import { Card, Text, Button } from '@mantine/core';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

export function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Card maw={500} mx="auto" mt="xl" withBorder>
      <Text fw={700} mb="sm">
        Profile
      </Text>
      <Text>Email: {user.email}</Text>
      <Text>Role: {user.role}</Text>
      <Text>Created: {new Date(user.createdAt).toLocaleString()}</Text>

      <Button mt="md" onClick={logout}>
        Logout
      </Button>

      {user.role === 'ADMIN' && (
        <Button
          mt="md"
          ml="md"
          variant="outline"
          component={Link}
          to="/admin/users"
        >
          Admin users
        </Button>
      )}
    </Card>
  );
}
