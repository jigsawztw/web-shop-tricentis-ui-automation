import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');

  // Expect a title "to contain" a substring.
  await expect(page.getByAltText('Tricentis Demo Web Shop')).toBeVisible();

  await page.getByAltText('Tricentis Demo Web Shop').click();;

});