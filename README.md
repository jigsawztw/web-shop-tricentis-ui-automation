# web-shop-tricentis-ui-automation  
Автоматизированные тесты для pet-проекта **[демо-версии магазина](https://demowebshop.tricentis.com/)** с использованием [Playwright](https://playwright.dev/).

# Быстрый старт

Следуй этим шагам, чтобы запустить тесты локально на своём компьютере.

### 1. Установите зависимости

Для установки всех зависимостей, указанных в **package.json**, включая **Playwright**:
```bash
npm install
```

### 2. Установите браузеры

Для загрузки браузеров (Chromium, Firefox, WebKit), которые используются для тестов.
```bash
npx playwright install
```

### 3. Запустите тесты

Команда выполняет все тесты, используя скрипт test, который настроен в **package.json**.
**Playwright** автоматически подхватит конфигурацию из **playwright.config.ts**/**playwright.config.js** файла
```bash
npm test
```