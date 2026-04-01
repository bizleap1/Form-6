const { Client } = require('pg');

const connectionString = "postgresql://postgres.udvogbevphqvlewlrbzi:Bizleap%401234@db.udvogbevphqvlewlrbzi.supabase.co:5432/postgres?sslmode=require";
// Also try without the project ref in username
const altConnectionString = "postgresql://postgres:Bizleap%401234@db.udvogbevphqvlewlrbzi.supabase.co:5432/postgres?sslmode=require";

async function testConnection(url, label) {
  console.log(`Testing ${label}...`);
  const client = new Client({
    connectionString: url,
  });
  try {
    await client.connect();
    console.log(`${label} connected successfully!`);
    await client.end();
    return true;
  } catch (err) {
    console.error(`${label} failed:`, err.message);
    return false;
  }
}

async function run() {
  await testConnection(connectionString, "Pooler Format Username");
  await testConnection(altConnectionString, "Direct Format Username");
}

run();
