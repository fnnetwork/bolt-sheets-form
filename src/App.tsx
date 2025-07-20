
import React, { useState } from 'react';
import { addToSheet, checkEmailInSheet } from './lib/sheets';

const sectors = [
  "LESTE",
  "Leste Inferior Central Premium - N\u00edvel 1",
  "Leste Inferior Central Premium - N\u00edvel 2",
  "Leste Inferior Lateral - N\u00edvel 1",
  "Leste Inferior Lateral - N\u00edvel 2",
  "Leste Inferior Lateral Corner - N\u00edvel 1",
  "Leste Inferior Lateral Corner - N\u00edvel 2",
  "Leste Inferior Lateral Premium - N\u00edvel 1",
  "Leste Inferior Lateral Premium - N\u00edvel 2",
  "Leste Superior Lateral - N\u00edvel 1",
  "Leste Superior Lateral - N\u00edvel 2",
  "Leste Superior Lateral Corner - N\u00edvel 1",
  "Leste Superior Lateral Corner - N\u00edvel 2",
  "NORTE",
  "Norte Endzone - N\u00edvel 1",
  "Norte Endzone - N\u00edvel 2",
  "OESTE",
  "Oeste Inferior Central Premium - N\u00edvel 1",
  "Oeste Inferior Central Premium - N\u00edvel 2",
  "Oeste Inferior Lateral - N\u00edvel 1",
  "Oeste Inferior Lateral - N\u00edvel 2",
  "Oeste Inferior Lateral Corner - N\u00edvel 1",
  "Oeste Inferior Lateral Corner - N\u00edvel 2",
  "Oeste Inferior Lateral Premium - N\u00edvel 1",
  "Oeste Inferior Lateral Premium - N\u00edvel 2",
  "Oeste Superior Lateral - N\u00edvel 1",
  "Oeste Superior Lateral - N\u00edvel 2",
  "Oeste Superior Lateral Corner - N\u00edvel 1",
  "Oeste Superior Lateral Corner - N\u00edvel 2",
  "SUL",
  "Sul Endzone - N\u00edvel 1",
  "Sul Endzone - N\u00edvel 2"
];

export default function App() {
  const [email, setEmail] = useState('');
  const [sector, setSector] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const exists = await checkEmailInSheet(email);
      if (!exists) {
        await addToSheet(email, sector);
        setMessage('Cadastro realizado com sucesso!');
      } else {
        setMessage('Este e-mail já está cadastrado.');
      }
    } catch (err) {
      setMessage('Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Cadastro de Participante</h1>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          className="w-full p-2 border rounded"
        />
        <select
          required
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecione seu setor</option>
          {sectors.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
        {message && <p className="text-center text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
