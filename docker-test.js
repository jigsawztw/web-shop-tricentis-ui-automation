const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Папка для Allure результатов
const projectDir = path.resolve('.');
const allureDir = path.join(projectDir, 'allure-results');

// Создаём папку, если её нет
if (!fs.existsSync(allureDir)) {
  fs.mkdirSync(allureDir, { recursive: true });
}

// Формируем команду Docker
const cmd = `docker run --rm -v "${allureDir}:/app/allure-results" web-shop-tests`;

// Выполняем команду
console.log(`Запускаем Docker:\n${cmd}\n`);
execSync(cmd, { stdio: 'inherit' });
