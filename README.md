# 🛒 web-shop-tricentis-ui-automation

Автоматизированные UI-тесты для pet-проекта  
**[демо-версии интернет-магазина](https://demowebshop.tricentis.com/)**  
с использованием **[Playwright](https://playwright.dev/)**.

---

## 🚀 Быстрый старт
Ниже опишу два способа запустить тесты:
   1)Локально
   2)в Docker-контейнере

Следуй этим шагам, чтобы запустить тесты локально:

1. **Cклонируй репозиторий** 

   ```bash
   git clone https://github.com/jigsawztw/web-shop-tricentis-ui-automation.git
   cd web-shop-tricentis-ui-automation
   ```

2. **Установи зависимости**  
   Установи все зависимости, указанные в `package.json`, включая Playwright:
   ```bash
   npm install
   ```

3. **Установи браузеры**

   Загрузи браузеры, используемые для тестов (Chromium, Firefox, WebKit):
   ```bash
   npx playwright install
   ```

4. 🧪 **Запусти тесты**

   Команда выполнит все тесты, используя скрипт test из `package.json`.  
   Playwright автоматически подхватит конфигурацию из `playwright.config.ts`:

   ```bash
   npm run test
   ```

6. 📊 **Отчёты**

   **для Allure отчетов:**

   ```bash
   npm run report:allure
   ```

---

## 🐳 Вариант №2(используя Docker)
   
1. **Cклонируй репозиторий**  

   ```bash
   git clone https://github.com/jigsawztw/web-shop-tricentis-ui-automation.git
   cd web-shop-tricentis-ui-automation
   ```
   
2. **Собери Docker-образ**  

   Запускать команду нужно из корневой папки репозитория, где лежит Dockerfile:

   ```bash
   docker build -t web-shop-tests .
   ```

3. **Запусти тесты в контейнере**  

   ```bash
   npm run docker:test
   ```

4. **Просмотр отчетов**  
   
   После прогона тестов в проекте появится папка allure-results , чтобы собрать отчет из полученных json:

   ```bash
   npm run report:allure
   ```


