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
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const me = await login(email, password);

      if (!me) return;

      if (me.role === 'ADMIN') {
        navigate('/admin/users');
      } else {
        const from = location.state?.from?.pathname || '/profile';
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Login failed';

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
        Login
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
            Login
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
