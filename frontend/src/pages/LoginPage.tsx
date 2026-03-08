import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import InputField from '../components/InputField';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      login(data); 
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Nieprawidłowy e-mail lub hasło.');
      } else {
        setError('Wystąpił błąd połączenia z serwerem.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Zaloguj się</h2>
          <p className="text-gray-500 mt-2">Witaj z powrotem w HireTrack</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <InputField
            label="Adres E-mail"
            type="email"
            placeholder="twoj@email.com"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />

          <InputField
            label="Hasło"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Nie masz jeszcze konta? </span>
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Zarejestruj się
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;