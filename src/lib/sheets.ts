
const SPREADSHEET_ID = '1PUQl06YOWJKFqNl_mT7Q3j_Op3rMKaDf2pzdwAEjKrQ';
const API_KEY = 'AIzaSyAcBmUwBM40iya-70_EStB24GlaVSSK9EE';
const SHEET_NAME = 'Pessoas';

export async function checkEmailInSheet(email: string): Promise<boolean> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar dados da planilha');
  const data = await res.json();

  const rows: string[][] = data.values || [];
  return rows.some(row => row[0]?.toLowerCase() === email.toLowerCase());
}

export async function addToSheet(email: string, setor: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;
  const body = {
    values: [[email, setor, new Date().toISOString()]],
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Erro ao adicionar no Google Sheets: ${err}`);
  }
}
