import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,   // параллельный запуск
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // workers: 1,             // один поток для последовательного выполнения
  reporter: [
    ['list', { printSteps: true }], //видеть шаги в консоли
    ['html', { outputFolder: `playwright-report-${Date.now()}` }] //генерация папки с отчетом в отдельную папку
  ],
  use: {
    screenshot: 'only-on-failure',
    launchOptions: {
      /*  slowMo: 500, */        // замедляем действия для наглядного дебага
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          headless: true,
          /*  slowMo: 500, */
        },
      },
    },
    /*  {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
  
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },  
  ],
});