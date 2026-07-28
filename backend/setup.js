const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("🛠️ Automated .env Generator");
rl.question('Enter your PostgreSQL password: ', (password) => {
    const envContent = `PORT=5000\nDB_USER=postgres\nDB_PASSWORD=${password.trim()}\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=finance_tracker\n`;
    fs.writeFileSync('.env', envContent);
    console.log('✅ Success! Your .env file has been created automatically.');
    rl.close();
});