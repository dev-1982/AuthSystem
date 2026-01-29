import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title } from '@mantine/core';
import api from '../api';
import { useAuth } from '../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError('');
      const res = await api.post('/auth/login', { email, password });
      await login(res.data.accessToken);
      navigate('/profile');
    } catch (e: any) {
      setError(e.response?.data?.message ?? 'Login failed');
    }
  };

  return (
    <Paper maw={400} mx="auto" mt="xl" p="lg" withBorder>
      <Title order={2} mb="md">
        Login
      </Title>
      <TextInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        mb="sm"
      />
      <PasswordInput
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        mb="sm"
      />
      {error && (
        <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>
      )}
      <Button fullWidth onClick={handleSubmit} mb="sm">
        Sign in
      </Button>
      <div>
        No account? <Link to="/register">Register</Link>
      </div>
    </Paper>
  );
}
