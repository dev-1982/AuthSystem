import { Card, Title, Text, Badge, Stack } from '@mantine/core';
import { useAuth } from '../auth/AuthContext';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <Card withBorder shadow="sm" mt="xl" p="lg">
      <Title order={2} mb="md">
        Profile
      </Title>

      <Stack>
        <Text>
          <b>Email:</b> {user?.email}
        </Text>

        <Badge color={user?.role === 'ADMIN' ? 'red' : 'blue'} size="lg">
          {user?.role}
        </Badge>
      </Stack>
    </Card>
  );
}
