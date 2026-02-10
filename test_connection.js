const url = 'https://ktdgulkppfnjptypgudz.supabase.co/functions/v1/send-contact-email';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZGd1bGtwcGZuanB0eXBndWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MTQ5NjUsImV4cCI6MjA4NTk5MDk2NX0.BwumL4ptUjZhTPX3RMMipiGAvxyzLwDz9o3IXhDOfds';

console.log('Testing connection to:', url);

try {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  const data = await response.json();
  console.log('Status:', response.status);
  console.log('Response:', JSON.stringify(data, null, 2));
} catch (error) {
  console.error('Error:', error.message);
}
