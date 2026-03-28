const url = 'https://klnslrowxtdezdrdgszv.supabase.co/functions/v1/send-contact-email';
const apiKey = 'sb_publishable_dP6ncuIPvEsyWkM9q19-9Q_O_rn7bSs';

console.log('Testing connection to:', url);

try {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "Teste Teste",
      email: "teste@example.com",
      phone: "11999999999",
      city: "São Paulo",
      state: "SP",
      message: "Isso é um teste de envio."
    })
  });

  const data = await response.json();
  console.log('Status:', response.status);
  console.log('Response:', JSON.stringify(data, null, 2));
} catch (error) {
  console.error('Error:', error.message);
}
