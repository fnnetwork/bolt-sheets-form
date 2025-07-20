const SHEET_ID = '1PUQl06YOWJKFqNl_mT7Q3j_Op3rMKaDf2pzdwAEjKrQ';
const SHEET_NAME = 'Pessoas';
const API_KEY = 'AIzaSyAcBmUwBM40iya-70_EStB24GlaVSSK9EE';

const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}`;

export async function checkEmailInSheet(email: string): Promise<boolean> {
  const url = `${BASE_URL}?key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const values = data.values || [];
  return values.some((row: string[]) => row[0]?.toLowerCase() === email.toLowerCase());
}

export async function addToSheet(email: string, sector: string): Promise<void> {
  const url = `${BASE_URL}:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      values: [[email, sector]],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

