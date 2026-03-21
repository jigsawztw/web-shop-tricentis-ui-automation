# 🛒 web-shop-tricentis-ui-automation

Автоматизированные UI-тесты для pet-проекта  
**[демо-версии интернет-магазина](https://demowebshop.tricentis.com/)**  
с использованием **[Playwright](https://playwright.dev/)**.

---

## 🚀 Быстрый старт

Следуй этим шагам, чтобы запустить тесты локально:

1. **Cклонируй репозиторий**  

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

   Примечание:

   Проверь установлен ли jdk:
   ```bash
   java -version
   ```
   Если команда не найдена, нужно установить JDK, через Chocolatey, например:
   ```bash
   choco install openjdk
   ```
   После установки проверь что выводится версия JDK:
   ```bash
   java -version
   ```
   Настрой JAVA_HOME в переменных среды и добавь %JAVA_HOME%\bin в Path.  
