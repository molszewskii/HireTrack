import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import type { RegisterRequest } from '../types/Auth';
import InputField from '../components/InputField';


const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    username: '',
    password: '',
    confirm_password: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirm_password) {
      setError("Hasła nie są identyczne.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(formData);

      navigate('/login', { state: { message: 'Konto założone! Zaloguj się.' } });
    } catch (err: any) {
      if (err.response?.data?.email) {
        setError("Użytkownik z tym adresem e-mail już istnieje.");
      } else if (err.response?.data?.username) {
        setError("Ta nazwa użytkownika jest już zajęta.");
      } else {
        setError("Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Stwórz konto HireTrack</h2>

        <form onSubmit={handleSubmit} className="space-y-1">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-200">
              {error}
            </div>
          )}

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputField
            label="Nazwa użytkownika"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <InputField
            label="Hasło"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <InputField
            label="Potwierdź hasło"
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-4 disabled:opacity-50"
          >
            {loading ? 'Rejestracja...' : 'Zarejestruj się'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Masz już konto?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;