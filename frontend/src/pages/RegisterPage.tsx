import { useState } from 'react';
import {
  Card,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/auth/register', { email, password });

      notifications.show({
        color: 'green',
        message: 'Registration successful',
      });

      navigate('/login');
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Registration failed';

      notifications.show({
        color: 'red',
        message: msg,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card withBorder shadow="sm" mt="xl" p="lg">
      <Title order={2} mb="md" ta="center">
        Register
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />

          <Button type="submit" loading={loading} fullWidth>
            Register
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
