const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("🛠️ Automated .env Generator");
rl.question('Enter your PostgreSQL password: ', (password) => {
    const envContent = `PORT=5000
DB_USER=postgres
DB_PASSWORD=${password.trim()}
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finance_tracker
`;

    fs.writeFileSync('.env', envContent);
    console.log('✅ Success! Your .env file has been created automatically.');
    rl.close();
});