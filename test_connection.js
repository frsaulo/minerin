const https = require("https");

const url =
  "https://ktdgulkppfnjptypgudz.supabase.co/functions/v1/send-contact-email";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZGd1bGtwcGZuanB0eXBndWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MTQ5NjUsImV4cCI6MjA4NTk5MDk2NX0.BwumL4ptUjZhTPX3RMMipiGAvxyzLwDz9o3IXhDOfds";

const options = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
};

const req = https.request(url, options, (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Body: ${data}`);
  });
});

req.on("error", (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(JSON.stringify({}));
req.end();
