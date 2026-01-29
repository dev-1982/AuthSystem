import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title } from '@mantine/core';
import api from '../api';
import { useAuth } from '../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError('');
      const res = await api.post('/auth/register', { email, password });
      await login(res.data.accessToken);
      navigate('/profile');
    } catch (e: any) {
      setError(e.response?.data?.message ?? 'Registration failed');
    }
  };

  return (
    <Paper maw={400} mx="auto" mt="xl" p="lg" withBorder>
      <Title order={2} mb="md">
        Register
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
        Sign up
      </Button>
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </Paper>
  );
}
