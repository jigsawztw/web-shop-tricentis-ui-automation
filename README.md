# 🛒 web-shop-tricentis-ui-automation

Автоматизированные UI-тесты для pet-проекта  
**[демо-версии интернет-магазина](https://demowebshop.tricentis.com/)**  
с использованием **[Playwright](https://playwright.dev/)**.

---

## 🚀 Быстрый старт

Следуй этим шагам, чтобы запустить тесты локально:

1️⃣ **Cклонируй репозиторий**  

2️⃣ **Установи зависимости**  
   Установи все зависимости, указанные в `package.json`, включая Playwright:
   ```bash
   npm install
   ```

3️⃣ **Установи браузеры**

   Загрузи браузеры, используемые для тестов (Chromium, Firefox, WebKit):
   ```bash
   npx playwright install
   ```

4️⃣ **Проверка Java (для Allure отчетов)**
   
   Проверь установлен ли jdk:
   ```bash
   java -version
   ```
   Если команда не найдена, нужно установить JDK, через Chocolatey или другие пакетные менеджеры, например:
   ```bash
   choco install openjdk
   ```
   После установки снова проверь что:
   ```bash
   java -version
   ```
   выводит версию JDK.

   Настрой JAVA_HOME в переменных среды и добавь %JAVA_HOME%\bin в Path.


5️⃣ 🧪 **Запусти тесты**

   Команда выполнит все тесты, используя скрипт test из `package.json`.
   Playwright автоматически подхватит конфигурацию из `playwright.config.ts`:

   ```bash
   npm run test
   ```


6️⃣ 📊 **Отчёты**
   
   Для открытия Allure-отчётов:
   ```bash
   npm run report:allure
   ```
