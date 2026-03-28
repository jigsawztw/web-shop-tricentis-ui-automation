const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectDir = path.resolve('.');
const allureDir = path.join(projectDir, 'allure-results');

if (!fs.existsSync(allureDir)) {
  fs.mkdirSync(allureDir, { recursive: true });
}

const cmd = `docker run --rm -v "${allureDir}:/app/allure-results" web-shop-tests`;

console.log(`Запускаем Docker:\n${cmd}\n`);
execSync(cmd, { stdio: 'inherit' });
